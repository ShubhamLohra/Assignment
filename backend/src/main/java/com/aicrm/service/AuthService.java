package com.aicrm.service;

import com.aicrm.dto.AuthResponse;
import com.aicrm.dto.LoginRequest;
import com.aicrm.dto.SignupRequest;
import com.aicrm.entity.User;
import com.aicrm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /**
     * User signup
     */
    public AuthResponse signup(SignupRequest request) {
        // Validate input
        if (request.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long");
        }
        
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        
        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.UserRole.AGENT); // Default role
        user.setIsActive(true);
        
        // Save user
        User savedUser = userRepository.save(user);
        
        // Generate simple token (in production, use JWT)
        String token = generateToken(savedUser);
        
        return new AuthResponse(
            token,
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getFullName(),
            savedUser.getEmail(),
            savedUser.getRole().toString(),
            "User registered successfully"
        );
    }

    /**
     * User login - supports both username and email
     */
    public AuthResponse login(LoginRequest request) {
        // Try to find user by username first, then by email
        User user = null;
        
        // First try to find by username
        Optional<User> userByUsername = userRepository.findByUsernameAndIsActiveTrue(request.getUsername());
        if (userByUsername.isPresent()) {
            user = userByUsername.get();
        } else {
            // If not found by username, try by email
            Optional<User> userByEmail = userRepository.findByEmailAndIsActiveTrue(request.getUsername());
            if (userByEmail.isPresent()) {
                user = userByEmail.get();
            } else {
                throw new IllegalArgumentException("Invalid username/email or password");
            }
        }
        
        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username/email or password");
        }
        
        // Generate token
        String token = generateToken(user);
        
        return new AuthResponse(
            token,
            user.getId(),
            user.getUsername(),
            user.getFullName(),
            user.getEmail(),
            user.getRole().toString(),
            "Login successful"
        );
    }

    /**
     * Get user from token
     */
    public User getUserFromToken(String token) {
        // In production, validate JWT token here
        // For now, we'll use a simple approach
        try {
            // Extract user ID from token (assuming token format: "user_id:random_string")
            String[] parts = token.split(":");
            if (parts.length == 2) {
                Long userId = Long.parseLong(parts[0]);
                return userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid token"));
            }
            throw new IllegalArgumentException("Invalid token format");
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid token");
        }
    }

    /**
     * Generate simple token (replace with JWT in production)
     */
    private String generateToken(User user) {
        // Simple token format: "user_id:random_string"
        // In production, use JWT with proper expiration and signing
        return user.getId() + ":" + UUID.randomUUID().toString();
    }
}
