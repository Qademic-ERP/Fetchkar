package fetchkar_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import java.util.List;


@Service
public class EmailService {

    @Value("${resend.api.key:placeholder}")
    private String resendApiKey;
    
    // The verified domain in Resend for free tier users
    @Value("${resend.verified.domain:requests@clientping.in}")
    private String verifiedDomain;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    

    /**
     * Sends an email using the Resend API.
     * Uses the "Reply-To" trick for free-tier white-labeling.
     */
    public void sendReminderEmail(String clientEmail, String clientName, String agencyEmail, String agencyName, String requestLink) {
        
        // Format: "Agency Name <requests@clientping.in>"
        String fromHeader = agencyName + " <" + verifiedDomain + ">";

        String htmlBody = "<h2>Hello " + clientName + ",</h2>"
                + "<p><strong>" + agencyName + "</strong> is waiting for you to complete a request.</p>"
                + "<p><a href='" + requestLink + "' style='padding: 10px 20px; background-color: #7C3AED; color: white; text-decoration: none; border-radius: 5px;'>View Request</a></p>"
                + "<p style='color: #666; font-size: 12px; margin-top: 40px;'>Powered by ClientPing</p>";

        // Map<String, Object> payload = Map.of(
            // "from", fromHeader,
            // "to", List.of(clientEmail),
            // "reply_to", agencyEmail,
            // "subject", "Action Required: Request from " + agencyName,
            // "html", htmlBody
        // );

        try {
            String jsonPayload = String.format(
                "{\"from\":\"%s\", \"to\":[\"%s\"], \"reply_to\":\"%s\", \"subject\":\"Action Required: Request from %s\", \"html\":\"%s\"}",
                fromHeader.replace("\"", "\\\""),
                clientEmail.replace("\"", "\\\""),
                agencyEmail.replace("\"", "\\\""),
                agencyName.replace("\"", "\\\""),
                htmlBody.replace("\"", "\\\"").replace("\n", "")
            );
            
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.resend.com/emails"))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                System.out.println("Email successfully sent via Resend API to " + clientEmail);
            } else {
                System.err.println("Failed to send email: " + response.body());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
