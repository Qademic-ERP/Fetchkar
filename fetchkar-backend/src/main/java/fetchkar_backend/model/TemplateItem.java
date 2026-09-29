package fetchkar_backend.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "template_items")
public class TemplateItem {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne @JoinColumn(name = "template_id")
    private Template template;
    private String itemType;
    private String label;
    private String options;
    private Integer displayOrder;
    // getters and setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Template getTemplate() { return template; }
    public void setTemplate(Template template) { this.template = template; }
    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public String getOptions() { return options; }
    public void setOptions(String options) { this.options = options; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
