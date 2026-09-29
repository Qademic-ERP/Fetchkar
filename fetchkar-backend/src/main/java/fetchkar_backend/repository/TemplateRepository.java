package fetchkar_backend.repository;

import fetchkar_backend.model.Template;
import fetchkar_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface TemplateRepository extends JpaRepository<Template, UUID> {
    List<Template> findByUser(User user);
}
