package fetchkar_backend.repository;
import fetchkar_backend.model.RequestItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface RequestItemRepository extends JpaRepository<RequestItem, UUID> {}
