package com.aicrm.service;

import com.aicrm.entity.Lead;
import com.aicrm.repository.LeadRepository;
import com.aicrm.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LeadService {
    
    @Autowired
    private LeadRepository leadRepository;
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    public List<Lead> getAllLeads() {
        return leadRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Lead createLead(Lead lead) {
        // Validate service_id if provided
        if (lead.getService() != null && lead.getService().getId() != null) {
            if (!serviceRepository.existsById(lead.getService().getId())) {
                throw new RuntimeException("Service with ID " + lead.getService().getId() + " does not exist");
            }
        }
        
        lead.setCreatedAt(LocalDateTime.now());
        lead.setUpdatedAt(LocalDateTime.now());
        return leadRepository.save(lead);
    }
    
    public Lead getLeadById(Long id) {
        return leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found with id: " + id));
    }
    
    public Lead updateLead(Long id, Lead leadDetails) {
        Lead lead = getLeadById(id);
        
        // Validate service_id if provided
        if (leadDetails.getService() != null && leadDetails.getService().getId() != null) {
            if (!serviceRepository.existsById(leadDetails.getService().getId())) {
                throw new RuntimeException("Service with ID " + leadDetails.getService().getId() + " does not exist");
            }
        }
        
        lead.setName(leadDetails.getName());
        lead.setEmail(leadDetails.getEmail());
        lead.setPhone(leadDetails.getPhone());
        lead.setCity(leadDetails.getCity());
        lead.setService(leadDetails.getService());
        lead.setBudget(leadDetails.getBudget());
        lead.setStatus(leadDetails.getStatus());
        lead.setSource(leadDetails.getSource());
        lead.setNotes(leadDetails.getNotes());
        lead.setUpdatedAt(LocalDateTime.now());
        return leadRepository.save(lead);
    }
    
    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }
    
    public Long getTotalLeads() {
        return leadRepository.count();
    }
    
    public Long getNewLeadsCount() {
        return leadRepository.countNewLeads();
    }
    
    public Long getQualifiedLeadsCount() {
        return leadRepository.countQualifiedLeads();
    }
    
    public Long getContactedLeadsCount() {
        return leadRepository.countContactedLeads();
    }
    
    public Long getLostLeadsCount() {
        return leadRepository.countLostLeads();
    }
}
