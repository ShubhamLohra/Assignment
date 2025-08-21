package com.aicrm.controller;

import com.aicrm.entity.Lead;
import com.aicrm.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class LeadController {
    
    @Autowired
    private LeadService leadService;
    
    @GetMapping
    public ResponseEntity<List<Lead>> getAllLeads() {
        List<Lead> leads = leadService.getAllLeads();
        return ResponseEntity.ok(leads);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Lead> getLeadById(@PathVariable Long id) {
        try {
            Lead lead = leadService.getLeadById(id);
            return ResponseEntity.ok(lead);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<Lead> createLead(@RequestBody Lead lead) {
        Lead createdLead = leadService.createLead(lead);
        return ResponseEntity.ok(createdLead);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Lead> updateLead(@PathVariable Long id, @RequestBody Lead leadDetails) {
        try {
            Lead updatedLead = leadService.updateLead(id, leadDetails);
            return ResponseEntity.ok(updatedLead);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        try {
            leadService.deleteLead(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/stats/dashboard")
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
