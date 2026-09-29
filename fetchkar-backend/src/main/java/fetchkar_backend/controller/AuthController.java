package fetchkar_backend.controller;

import fetchkar_backend.dto.AuthRequest;
import fetchkar_backend.model.User;
import fetchkar_backend.repository.UserRepository;
import fetchkar_backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // In a real app, use BCrypt. For now, simple check:
            if (user.getPasswordHash().equals(request.getPassword())) {
                String token = jwtService.generateToken(user.getEmail(), user.getId().toString());
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("businessName", user.getBusinessName());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        if (userRepository.findByEmail(request.get("email")).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email already exists"));
        }

        User user = new User();
        user.setEmail(request.get("email"));
        user.setPasswordHash(request.get("password")); // Hash this later
        user.setBusinessName(request.get("businessName"));
        
        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail(), user.getId().toString());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("businessName", user.getBusinessName());
        
        return ResponseEntity.ok(response);
    }
}