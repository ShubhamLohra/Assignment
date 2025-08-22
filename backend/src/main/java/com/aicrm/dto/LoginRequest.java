package com.aicrm.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Login request data")
public class LoginRequest {
    
    @NotBlank(message = "Username or email is required")
    @Schema(description = "Username or email for login", example = "john_doe or john@example.com", required = true)
    private String username;
    
    @NotBlank(message = "Password is required")
    @Schema(description = "Password for login", example = "password123", required = true)
    private String password;

    // Constructors
    public LoginRequest() {}

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
    // Note: This field can contain either username or email address

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
