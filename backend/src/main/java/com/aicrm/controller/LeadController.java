package com.aicrm.controller;

import com.aicrm.dto.LeadResponseDTO;
import com.aicrm.entity.Lead;
import com.aicrm.service.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.aicrm.dto.LeadMapper.toResponseDTO;
import static com.aicrm.dto.LeadMapper.toResponseDTOList;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@Tag(name = "Lead Management", description = "APIs for managing leads in the CRM system")
public class LeadController {
    
    @Autowired
    private LeadService leadService;
    
    @GetMapping
    @Operation(summary = "Get all leads", description = "Retrieves a list of all leads in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved leads",
                    content = @Content(schema = @Schema(implementation = LeadResponseDTO.class)))
    })
    public ResponseEntity<List<LeadResponseDTO>> getAllLeads() {
        List<Lead> leads = leadService.getAllLeads();
        List<LeadResponseDTO> leadDTOs = toResponseDTOList(leads);
        return ResponseEntity.ok(leadDTOs);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get lead by ID", description = "Retrieves a specific lead by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved lead",
                    content = @Content(schema = @Schema(implementation = LeadResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Lead not found")
    })
    public ResponseEntity<LeadResponseDTO> getLeadById(@Parameter(description = "ID of the lead to retrieve") @PathVariable Long id) {
        try {
            Lead lead = leadService.getLeadById(id);
            LeadResponseDTO leadDTO = toResponseDTO(lead);
            return ResponseEntity.ok(leadDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new lead", description = "Creates a new lead in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully created lead",
                    content = @Content(schema = @Schema(implementation = LeadResponseDTO.class)))
    })
    public ResponseEntity<LeadResponseDTO> createLead(@Parameter(description = "Lead object to create") @RequestBody Lead lead) {
        Lead createdLead = leadService.createLead(lead);
        LeadResponseDTO leadDTO = toResponseDTO(createdLead);
        return ResponseEntity.ok(leadDTO);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update lead", description = "Updates an existing lead in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully updated lead",
                    content = @Content(schema = @Schema(implementation = LeadResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Lead not found")
    })
    public ResponseEntity<LeadResponseDTO> updateLead(@Parameter(description = "ID of the lead to update") @PathVariable Long id, 
                                                    @Parameter(description = "Updated lead details") @RequestBody Lead leadDetails) {
        try {
            Lead updatedLead = leadService.updateLead(id, leadDetails);
            LeadResponseDTO leadDTO = toResponseDTO(updatedLead);
            return ResponseEntity.ok(leadDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete lead", description = "Deletes a lead from the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully deleted lead"),
        @ApiResponse(responseCode = "404", description = "Lead not found")
    })
    public ResponseEntity<Void> deleteLead(@Parameter(description = "ID of the lead to delete") @PathVariable Long id) {
        try {
            leadService.deleteLead(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/stats/dashboard")
    @Operation(summary = "Get dashboard statistics", description = "Retrieves lead statistics for the dashboard")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved dashboard stats")
    })
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalLeads", leadService.getTotalLeads());
        stats.put("newLeads", leadService.getNewLeadsCount());
        stats.put("qualifiedLeads", leadService.getQualifiedLeadsCount());
        stats.put("contactedLeads", leadService.getContactedLeadsCount());
        stats.put("lostLeads", leadService.getLostLeadsCount());
        return ResponseEntity.ok(stats);
    }
}
