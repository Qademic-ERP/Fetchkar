package fetchkar_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@org.springframework.scheduling.annotation.EnableScheduling
public class FetchkarBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FetchkarBackendApplication.class, args);
	}

}
