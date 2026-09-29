package fetchkar_backend.repository;

import fetchkar_backend.model.Client;
import fetchkar_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface ClientRepository extends JpaRepository<Client, UUID> {
    List<Client> findByUser(User user);
}
