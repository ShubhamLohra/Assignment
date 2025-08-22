package com.aicrm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * User entity representing system users
 */
@Entity
@Table(name = "users")
@Schema(description = "User entity representing system users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier for the user", example = "1")
    private Long id;
    
    @Column(name = "username", nullable = false, unique = true)
    @Schema(description = "Unique username for login", example = "john_doe", required = true)
    private String username;
    
    @Column(name = "email", nullable = false, unique = true)
    @Schema(description = "Email address", example = "john.doe@example.com", required = true)
    private String email;
    
    @Column(name = "password", nullable = false)
    @JsonIgnore
    @Schema(description = "Hashed password", required = true)
    private String password;
    
    @Column(name = "full_name", nullable = false)
    @Schema(description = "Full name of the user", example = "John Doe", required = true)
    private String fullName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    @Schema(description = "User role in the system", example = "AGENT")
    private UserRole role;
    
    @Column(name = "is_active")
    @Schema(description = "Whether the user account is active", example = "true")
    private Boolean isActive;
    
    @Column(name = "created_at")
    @Schema(description = "Account creation timestamp")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @Schema(description = "Last update timestamp")
    private LocalDateTime updatedAt;

    // Enums
    public enum UserRole {
        ADMIN, MANAGER, AGENT
    }
    
    // Constructors
    public User() {
        this.isActive = true;
        this.role = UserRole.AGENT;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public User(String username, String email, String password, String fullName) {
        this();
        this.username = username;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", fullName='" + fullName + '\'' +
                ", role=" + role +
                ", isActive=" + isActive +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
