import os

base_dir = r"c:\Users\shiva\Desktop\1000$ per month\fetchkar\fetchkar-backend\src\main\java\fetchkar_backend"
dirs = ["config", "security", "controller", "dto"]
for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

files = {
    "dto/AuthRequest.java": """package fetchkar_backend.dto;
public class AuthRequest {
    private String email;
    private String password;
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}""",
    "controller/AuthController.java": """package fetchkar_backend.controller;
import fetchkar_backend.dto.AuthRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok("mock-jwt-token");
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        return ResponseEntity.ok("User registered successfully");
    }
}""",
    "controller/RequestController.java": """package fetchkar_backend.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {
    @GetMapping
    public ResponseEntity<List<String>> getRequests() {
        return ResponseEntity.ok(List.of("Request 1", "Request 2"));
    }
    
    @PostMapping
    public ResponseEntity<String> createRequest() {
        return ResponseEntity.ok("Request created with slug: unique-slug-123");
    }
}""",
    "controller/ClientPageController.java": """package fetchkar_backend.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/public/requests")
public class ClientPageController {
    @GetMapping("/{slug}")
    public ResponseEntity<String> getPublicRequest(@PathVariable String slug) {
        return ResponseEntity.ok("Public data for request " + slug);
    }
}""",
    "security/SecurityConfig.java": """package fetchkar_backend.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/public/**").permitAll()
                .anyRequest().permitAll() // Allow all for demo purposes
            );
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // Allow all origins for dev
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}"""
}

for rel_path, content in files.items():
    with open(os.path.join(base_dir, rel_path), "w") as f:
        f.write(content)

print("Backend API logic generated successfully.")
