package com.aicrm.dto;

import com.aicrm.entity.Lead.LeadSource;
import com.aicrm.entity.Lead.LeadStatus;
import com.aicrm.entity.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

public class LeadDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String city;
    private Service service;
    private BigDecimal budget;
    private LocalDate eventDate;
    private LeadStatus status;
    private LeadSource source;
    private String notes;
    
    // Constructors
    public LeadDTO() {}
    
    public LeadDTO(String name, String email, String phone, String city, Service service, 
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
}
