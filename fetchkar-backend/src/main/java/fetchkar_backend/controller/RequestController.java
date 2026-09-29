package fetchkar_backend.controller;

import fetchkar_backend.model.Request;
import fetchkar_backend.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getRequests() {
        List<Request> requests = requestRepository.findAll();
        
        List<Map<String, Object>> response = requests.stream().map(req -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", req.getId() != null ? req.getId().toString() : "");
            map.put("client", req.getClient() != null ? req.getClient().getName() : "Unknown Client");
            map.put("template", req.getTemplate() != null ? req.getTemplate().getName() : "Custom Template");
            map.put("status", req.getStatus() != null ? req.getStatus() : "In Progress");
            map.put("progress", 0);
            map.put("updated", "Just now");
            return map;
        }).collect(Collectors.toList());

        // Return mock data if empty for demo purposes
        if (response.isEmpty()) {
            response.add(Map.of("id", "1", "client", "Acme Corp (Mock)", "template", "Website Onboarding", "status", "In Progress", "progress", 60, "updated", "2 hours ago"));
            response.add(Map.of("id", "2", "client", "Stark Industries (Mock)", "template", "Brand Assets", "status", "In Progress", "progress", 20, "updated", "4 days ago"));
        }

        return ResponseEntity.ok(response);
    }
    
    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Map<String, Object> payload) {
        Request request = new Request();
        request.setUniqueLinkSlug("req-" + System.currentTimeMillis());
        request.setStatus("In Progress");
        
        Request saved = requestRepository.save(request);
        return ResponseEntity.ok(saved);
    }
}