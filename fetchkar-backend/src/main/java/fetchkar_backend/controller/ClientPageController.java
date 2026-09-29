package fetchkar_backend.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/public/requests")
public class ClientPageController {
    @GetMapping("/{slug}")
    public ResponseEntity<String> getPublicRequest(@PathVariable String slug) {
        return ResponseEntity.ok("Public data for request " + slug);
    }
}