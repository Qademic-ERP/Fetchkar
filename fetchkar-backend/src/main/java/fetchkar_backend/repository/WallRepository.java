package fetchkar_backend.repository;

import fetchkar_backend.model.Wall;
import fetchkar_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface WallRepository extends JpaRepository<Wall, UUID> {
    List<Wall> findByUser(User user);
    Optional<Wall> findBySlug(String slug);
}
