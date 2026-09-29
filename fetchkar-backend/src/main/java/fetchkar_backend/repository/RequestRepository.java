package fetchkar_backend.repository;
import fetchkar_backend.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface RequestRepository extends JpaRepository<Request, UUID> {}
