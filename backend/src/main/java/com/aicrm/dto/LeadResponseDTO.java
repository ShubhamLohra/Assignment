package com.aicrm.dto;

import com.aicrm.entity.Lead.LeadSource;
import com.aicrm.entity.Lead.LeadStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Schema(description = "Lead response DTO for API responses")
public class LeadResponseDTO {
    
    @Schema(description = "Unique identifier for the lead", example = "1")
    private Long id;
    
    @Schema(description = "Full name of the lead", example = "John Doe")
    private String name;
    
    @Schema(description = "Email address of the lead", example = "john.doe@example.com")
    private String email;
    
    @Schema(description = "Phone number of the lead", example = "+1234567890")
    private String phone;
    
    @Schema(description = "City where the lead is located", example = "New York")
    private String city;
    
    @Schema(description = "Service ID", example = "1")
    private Long serviceId;
    
    @Schema(description = "Service name", example = "Wedding Photography")
    private String serviceName;
    
    @Schema(description = "Budget for the service", example = "1500.00")
    private BigDecimal budget;
    
    @Schema(description = "Event date", example = "2025-12-25")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate eventDate;
    
    @Schema(description = "Current status of the lead", example = "NEW")
    private LeadStatus status;
    
    @Schema(description = "Source of the lead", example = "WEBSITE")
    private LeadSource source;
    
    @Schema(description = "Additional notes about the lead")
    private String notes;
    
    @Schema(description = "Assigned user ID", example = "1")
    private Long assignedToId;
    
    @Schema(description = "Assigned user name", example = "John Smith")
    private String assignedToName;
    
    @Schema(description = "When the lead was created")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @Schema(description = "When the lead was last updated")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
    
    // Constructors
    public LeadResponseDTO() {}
    
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
    
    public Long getServiceId() {
        return serviceId;
    }
    
    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }
    
    public String getServiceName() {
        return serviceName;
    }
    
    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
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
    
    public Long getAssignedToId() {
        return assignedToId;
    }
    
    public void setAssignedToId(Long assignedToId) {
        this.assignedToId = assignedToId;
    }
    
    public String getAssignedToName() {
        return assignedToName;
    }
    
    public void setAssignedToName(String assignedToName) {
        this.assignedToName = assignedToName;
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
}
