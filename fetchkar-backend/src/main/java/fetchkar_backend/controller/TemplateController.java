package fetchkar_backend.controller;

import fetchkar_backend.model.Template;
import fetchkar_backend.model.User;
import fetchkar_backend.repository.TemplateRepository;
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
@RequestMapping("/api/templates")
@CrossOrigin(origins = "*")
public class TemplateController {

    @Autowired
    private TemplateRepository templateRepository;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getTemplates() {
        User user = userRepository.findAll().stream().findFirst().orElse(null);
        if (user == null) return ResponseEntity.ok(List.of());

        List<Template> templates = templateRepository.findByUser(user);
        
        List<Map<String, Object>> response = templates.stream().map(t -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", t.getId());
            map.put("name", t.getName());
            map.put("items", 0); // Aggregate later
            map.put("category", "General");
            map.put("uses", 0);
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Template> createTemplate(@RequestBody Template template) {
        User user = userRepository.findAll().stream().findFirst().orElse(null);
        if (user != null) {
            template.setUser(user);
            template.setCreatedAt(LocalDateTime.now());
            return ResponseEntity.ok(templateRepository.save(template));
        }
        return ResponseEntity.badRequest().build();
    }
}
