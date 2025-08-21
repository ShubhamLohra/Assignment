package com.aicrm.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Deal entity representing business opportunities in the CRM
 */
@Entity
@Table(name = "deals")
public class Deal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_id", nullable = false)
    private Lead lead;
    
    @Column(name = "title", nullable = false)
    private String title;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "stage")
    private DealStage stage;
    
    @Column(name = "value", precision = 10, scale = 2)
    private BigDecimal value;
    
    @Column(name = "probability")
    private Integer probability;
    
    @Column(name = "expected_close_date")
    private LocalDate expectedCloseDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private User assignedTo;
    
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Enums
    public enum DealStage {
        QUALIFIED, CONTACTED, NEGOTIATION, CLOSED, LOST
    }
    
    // Constructors
    public Deal() {}
    
    public Deal(Lead lead, String title, DealStage stage, BigDecimal value, 
                Integer probability, LocalDate expectedCloseDate) {
        this.lead = lead;
        this.title = title;
        this.stage = stage;
        this.value = value;
        this.probability = probability;
        this.expectedCloseDate = expectedCloseDate;
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
    
    public Lead getLead() {
        return lead;
    }
    
    public void setLead(Lead lead) {
        this.lead = lead;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public DealStage getStage() {
        return stage;
    }
    
    public void setStage(DealStage stage) {
        this.stage = stage;
    }
    
    public BigDecimal getValue() {
        return value;
    }
    
    public void setValue(BigDecimal value) {
        this.value = value;
    }
    
    public Integer getProbability() {
        return probability;
    }
    
    public void setProbability(Integer probability) {
        this.probability = probability;
    }
    
    public LocalDate getExpectedCloseDate() {
        return expectedCloseDate;
    }
    
    public void setExpectedCloseDate(LocalDate expectedCloseDate) {
        this.expectedCloseDate = expectedCloseDate;
    }
    
    public User getAssignedTo() {
        return assignedTo;
    }
    
    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
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
        return "Deal{" +
                "id=" + id +
                ", lead=" + (lead != null ? lead.getName() : "null") +
                ", title='" + title + '\'' +
                ", stage=" + stage +
                ", value=" + value +
                ", probability=" + probability +
                ", expectedCloseDate=" + expectedCloseDate +
                ", assignedTo=" + (assignedTo != null ? assignedTo.getUsername() : "null") +
                ", notes='" + notes + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
