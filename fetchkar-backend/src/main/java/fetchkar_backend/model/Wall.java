package fetchkar_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@Entity
@Table(name = "walls")
public class Wall {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true)
    private String slug;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String themeConfig;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "wall", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WallItem> items;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getThemeConfig() { return themeConfig; }
    public void setThemeConfig(String themeConfig) { this.themeConfig = themeConfig; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public List<WallItem> getItems() { return items; }
    public void setItems(List<WallItem> items) { this.items = items; }
}
