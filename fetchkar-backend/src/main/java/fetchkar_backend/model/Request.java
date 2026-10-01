package fetchkar_backend.model;

import jakarta.persistence.*;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
public class Request {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne @JoinColumn(name = "client_id")
    private Client client;
    @ManyToOne @JoinColumn(name = "template_id")
    private Template template;
    private String requestName;
    private String uniqueLinkSlug;
    private String status;
    private String tags;
    private LocalDateTime lastReminderSentAt;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    // getters and setters
    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
    public String getRequestName() { return requestName; }
    public void setRequestName(String requestName) { this.requestName = requestName; }
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }
    public Template getTemplate() { return template; }
    public void setTemplate(Template template) { this.template = template; }
    public String getUniqueLinkSlug() { return uniqueLinkSlug; }
    public void setUniqueLinkSlug(String uniqueLinkSlug) { this.uniqueLinkSlug = uniqueLinkSlug; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getLastReminderSentAt() { return lastReminderSentAt; }
    public void setLastReminderSentAt(LocalDateTime lastReminderSentAt) { this.lastReminderSentAt = lastReminderSentAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
