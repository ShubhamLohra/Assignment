package com.aicrm.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Lead entity representing potential customers in the CRM
 */
@Entity
@Table(name = "leads")
@Schema(description = "Lead entity representing potential customers in the CRM system")
public class Lead {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier for the lead", example = "1")
    private Long id;
    
    @Column(name = "name", nullable = false)
    @Schema(description = "Full name of the lead", example = "John Doe", required = true)
    private String name;
    
    @Column(name = "email")
    @Schema(description = "Email address of the lead", example = "john.doe@example.com")
    private String email;
    
    @Column(name = "phone")
    @Schema(description = "Phone number of the lead", example = "+1234567890")
    private String phone;
    
    @Column(name = "city")
    @Schema(description = "City where the lead is located", example = "New York")
    private String city;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Service service;
    
    @Column(name = "budget", precision = 10, scale = 2)
    private BigDecimal budget;
    
    @Column(name = "event_date")
    private LocalDate eventDate;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private LeadStatus status;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "source")
    private LeadSource source;
    
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User assignedTo;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Enums
    public enum LeadStatus {
        NEW, CONTACTED, QUALIFIED, PROPOSAL, NEGOTIATION, CLOSED_WON, LOST
    }
    
    public enum LeadSource {
        INSTAGRAM, WHATSAPP, WEBSITE, REFERRAL, OTHER
    }
    
    // Constructors
    public Lead() {}
    
    public Lead(String name, String email, String phone, String city, Service service, 
                BigDecimal budget, LocalDate eventDate, LeadSource source) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.service = service;
        this.budget = budget;
        this.eventDate = eventDate;
        this.source = source;
        this.status = LeadStatus.NEW;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getCity() {
        return city;
    }
    
    public void setCity(String city) {
        this.city = city;
    }
    
    public Service getService() {
        return service;
    }
    
    public void setService(Service service) {
        this.service = service;
    }
    
    public BigDecimal getBudget() {
        return budget;
    }
    
    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }
    
    public LocalDate getEventDate() {
        return eventDate;
    }
    
    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    
    public LeadStatus getStatus() {
        return status;
    }
    
    public void setStatus(LeadStatus status) {
        this.status = status;
    }
    
    public LeadSource getSource() {
        return source;
    }
    
    public void setSource(LeadSource source) {
        this.source = source;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public User getAssignedTo() {
        return assignedTo;
    }
    
    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
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
        return "Lead{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", city='" + city + '\'' +
                ", service=" + (service != null ? service.getName() : "null") +
                ", budget=" + budget +
                ", eventDate=" + eventDate +
                ", status=" + status +
                ", source=" + source +
                ", notes='" + notes + '\'' +
                ", assignedTo=" + (assignedTo != null ? assignedTo.getUsername() : "null") +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
