package com.aicrm.controller;

import com.aicrm.entity.Deal;
import com.aicrm.entity.Deal.DealStage;
import com.aicrm.service.DealService;
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

@RestController
@RequestMapping("/api/deals")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@Tag(name = "Deal Management", description = "APIs for managing deals and pipeline in the CRM system")
public class DealController {
    
    @Autowired
    private DealService dealService;
    
    @GetMapping
    @Operation(summary = "Get all deals", description = "Retrieves a list of all deals in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved deals",
                    content = @Content(schema = @Schema(implementation = Deal.class)))
    })
    public ResponseEntity<List<Deal>> getAllDeals() {
        List<Deal> deals = dealService.getAllDeals();
        return ResponseEntity.ok(deals);
    }
    
    @GetMapping("/stage/{stage}")
    public ResponseEntity<List<Deal>> getDealsByStage(@PathVariable String stage) {
        try {
            DealStage dealStage = DealStage.valueOf(stage.toUpperCase());
            List<Deal> deals = dealService.getDealsByStage(dealStage);
            return ResponseEntity.ok(deals);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Deal> getDealById(@PathVariable Long id) {
        try {
            Deal deal = dealService.getDealById(id);
            return ResponseEntity.ok(deal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<Deal> createDeal(@RequestBody Deal deal) {
        Deal createdDeal = dealService.createDeal(deal);
        return ResponseEntity.ok(createdDeal);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(@PathVariable Long id, @RequestBody Deal dealDetails) {
        try {
            Deal updatedDeal = dealService.updateDeal(id, dealDetails);
            return ResponseEntity.ok(updatedDeal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeal(@PathVariable Long id) {
        try {
            dealService.deleteDeal(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/stats/pipeline")
    @Operation(summary = "Get pipeline statistics", description = "Retrieves pipeline statistics including active deals, closed deals, and total value")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved pipeline stats")
    })
    public ResponseEntity<Map<String, Object>> getPipelineStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("activeDeals", dealService.getActiveDealsCount());
        stats.put("closedDeals", dealService.getClosedDealsCount());
        stats.put("totalClosedValue", dealService.getTotalClosedValue());
        return ResponseEntity.ok(stats);
    }
}
