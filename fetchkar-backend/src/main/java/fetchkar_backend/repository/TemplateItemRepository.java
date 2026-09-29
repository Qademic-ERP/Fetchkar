package fetchkar_backend.repository;
import fetchkar_backend.model.TemplateItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface TemplateItemRepository extends JpaRepository<TemplateItem, UUID> {}
