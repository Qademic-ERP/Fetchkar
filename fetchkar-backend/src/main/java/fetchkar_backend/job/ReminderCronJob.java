package fetchkar_backend.job;

import fetchkar_backend.model.Request;
import fetchkar_backend.repository.RequestRepository;
import fetchkar_backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReminderCronJob {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private EmailService emailService;

    // Runs every day at 10 AM
    @Scheduled(cron = "0 0 10 * * ?")
    public void sendAutomatedReminders() {
        System.out.println("Running daily reminder cron job...");

        // In a real app, query requests that are 'in_progress' and created/updated > N days ago
        List<Request> staleRequests = requestRepository.findAll().stream()
                .filter(r -> "In Progress".equalsIgnoreCase(r.getStatus()))
                .filter(r -> r.getCreatedAt() != null && r.getCreatedAt().isBefore(LocalDateTime.now().minusDays(3)))
                .collect(Collectors.toList());

        for (Request request : staleRequests) {
            String clientEmail = request.getClient() != null ? request.getClient().getEmail() : null;
            if (clientEmail != null && !clientEmail.isEmpty()) {
                String clientName = request.getClient().getName();
                String agencyEmail = request.getUser().getEmail();
                String agencyName = request.getUser().getBusinessName();
                String link = "https://clientping.in/r/" + request.getUniqueLinkSlug();

                emailService.sendReminderEmail(clientEmail, clientName, agencyEmail, agencyName, link);
                
                // Update the lastReminderSentAt field
                request.setLastReminderSentAt(LocalDateTime.now());
                requestRepository.save(request);
            }
        }
    }
}
