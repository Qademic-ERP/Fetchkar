package fetchkar_backend.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "wall_items")
public class WallItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "wall_id", nullable = false)
    private Wall wall;

    @ManyToOne
    @JoinColumn(name = "request_item_id", nullable = false)
    private RequestItem requestItem;

    private Integer displayOrder;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Wall getWall() { return wall; }
    public void setWall(Wall wall) { this.wall = wall; }
    public RequestItem getRequestItem() { return requestItem; }
    public void setRequestItem(RequestItem requestItem) { this.requestItem = requestItem; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
