package fetchkar_backend.controller;

import fetchkar_backend.model.Client;
import fetchkar_backend.model.User;
import fetchkar_backend.repository.ClientRepository;
import fetchkar_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*") // Simplification for dev
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getClients() {
        // In real app, get user from JWT. For now, fetch first user.
        User user = userRepository.findAll().stream().findFirst().orElse(null);
        if (user == null) return ResponseEntity.ok(List.of());

        List<Client> clients = clientRepository.findByUser(user);
        
        List<Map<String, Object>> response = clients.stream().map(c -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", c.getId());
            map.put("name", c.getName());
            map.put("email", c.getEmail());
            map.put("phone", c.getPhone());
            map.put("requests", 0); // Aggregate later
            map.put("status", "Active");
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        User user = userRepository.findAll().stream().findFirst().orElse(null);
        if (user != null) {
            client.setUser(user);
            client.setCreatedAt(LocalDateTime.now());
            return ResponseEntity.ok(clientRepository.save(client));
        }
        return ResponseEntity.badRequest().build();
    }
}
