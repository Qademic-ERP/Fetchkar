package fetchkar_backend.repository;

import fetchkar_backend.model.WallItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface WallItemRepository extends JpaRepository<WallItem, UUID> {
}
