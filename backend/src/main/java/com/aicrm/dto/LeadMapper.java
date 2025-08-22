package com.aicrm.dto;

import com.aicrm.entity.Lead;
import com.aicrm.entity.Service;
import com.aicrm.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class LeadMapper {
    
    /**
     * Convert Lead entity to LeadResponseDTO safely handling lazy loading
     */
    public static LeadResponseDTO toResponseDTO(Lead lead) {
        if (lead == null) {
            return null;
        }
        
        LeadResponseDTO dto = new LeadResponseDTO();
        dto.setId(lead.getId());
        dto.setName(lead.getName());
        dto.setEmail(lead.getEmail());
        dto.setPhone(lead.getPhone());
        dto.setCity(lead.getCity());
        dto.setBudget(lead.getBudget());
        dto.setEventDate(lead.getEventDate());
        dto.setStatus(lead.getStatus());
        dto.setSource(lead.getSource());
        dto.setNotes(lead.getNotes());
        dto.setCreatedAt(lead.getCreatedAt());
        dto.setUpdatedAt(lead.getUpdatedAt());
        
        // Safely handle Service relationship
        Service service = lead.getService();
        if (service != null) {
            dto.setServiceId(service.getId());
            dto.setServiceName(service.getName());
        }
        
        // Safely handle User relationship
        User assignedTo = lead.getAssignedTo();
        if (assignedTo != null) {
            dto.setAssignedToId(assignedTo.getId());
            dto.setAssignedToName(assignedTo.getUsername());
        }
        
        return dto;
    }
    
    /**
     * Convert list of Lead entities to list of LeadResponseDTOs
     */
    public static List<LeadResponseDTO> toResponseDTOList(List<Lead> leads) {
        if (leads == null) {
            return null;
        }
        
        return leads.stream()
                .map(LeadMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert LeadResponseDTO to Lead entity (for updates)
     */
    public static Lead toEntity(LeadResponseDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Lead lead = new Lead();
        lead.setId(dto.getId());
        lead.setName(dto.getName());
        lead.setEmail(dto.getEmail());
        lead.setPhone(dto.getPhone());
        lead.setCity(dto.getCity());
        lead.setBudget(dto.getBudget());
        lead.setEventDate(dto.getEventDate());
        lead.setStatus(dto.getStatus());
        lead.setSource(dto.getSource());
        lead.setNotes(dto.getNotes());
        
        return lead;
    }
}
