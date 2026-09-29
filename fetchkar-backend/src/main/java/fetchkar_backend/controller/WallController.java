package fetchkar_backend.controller;

import fetchkar_backend.model.Wall;
import fetchkar_backend.model.User;
import fetchkar_backend.repository.WallRepository;
import fetchkar_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.util.UUID;

@RestController
@RequestMapping("/api/walls")
@CrossOrigin(origins = "*")
public class WallController {

    @Autowired
    private WallRepository wallRepository;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getWalls() {
        User user = userRepository.findAll().stream().findFirst().orElse(null);
        if (user == null) return ResponseEntity.ok(List.of());

        List<Wall> walls = wallRepository.findByUser(user);
        
        List<Map<String, Object>> response = walls.stream().map(w -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", w.getId());
            map.put("name", w.getName());
            map.put("slug", w.getSlug());
            map.put("testimonials", 0); // Aggregate later
            map.put("views", 0);
            map.put("status", "Live");
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Wall> createWall(@RequestBody Wall wall) {
        User user = userRepository.findAll().stream().findFirst().orElse(null);
        if (user != null) {
            wall.setUser(user);
            wall.setCreatedAt(LocalDateTime.now());
            if (wall.getSlug() == null) {
                wall.setSlug(UUID.randomUUID().toString().substring(0, 8));
            }
            return ResponseEntity.ok(wallRepository.save(wall));
        }
        return ResponseEntity.badRequest().build();
    }
}
