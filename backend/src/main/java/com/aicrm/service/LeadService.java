package com.aicrm.service;

import com.aicrm.entity.Lead;
import com.aicrm.repository.LeadRepository;
import com.aicrm.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class LeadService {
    
    @Autowired
    private LeadRepository leadRepository;
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    public List<Lead> getAllLeads() {
        try {
            // Try the complex query first
            List<Object[]> results = leadRepository.findAllWithServiceByOrderByCreatedAtDesc();
            List<Lead> leads = new ArrayList<>();
            
            for (Object[] result : results) {
                Lead lead = (Lead) result[0];
                com.aicrm.entity.Service service = (com.aicrm.entity.Service) result[1];
                
                // Set the service directly to avoid lazy loading issues
                if (service != null) {
                    lead.setService(service);
                }
                
                leads.add(lead);
            }
            
            return leads;
        } catch (Exception e) {
            // Fallback to simple query if complex query fails
            return leadRepository.findAllByOrderByCreatedAtDesc();
        }
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
        
        // Only update fields that are provided (not null)
        if (leadDetails.getName() != null) {
            lead.setName(leadDetails.getName());
        }
        if (leadDetails.getEmail() != null) {
            lead.setEmail(leadDetails.getEmail());
        }
        if (leadDetails.getPhone() != null) {
            lead.setPhone(leadDetails.getPhone());
        }
        if (leadDetails.getCity() != null) {
            lead.setCity(leadDetails.getCity());
        }
        if (leadDetails.getService() != null) {
            lead.setService(leadDetails.getService());
        }
        if (leadDetails.getBudget() != null) {
            lead.setBudget(leadDetails.getBudget());
        }
        if (leadDetails.getStatus() != null) {
            lead.setStatus(leadDetails.getStatus());
        }
        if (leadDetails.getSource() != null) {
            lead.setSource(leadDetails.getSource());
        }
        if (leadDetails.getNotes() != null) {
            lead.setNotes(leadDetails.getNotes());
        }
        
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
