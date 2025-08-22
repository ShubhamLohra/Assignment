package com.aicrm.controller;

import com.aicrm.entity.Service;
import com.aicrm.repository.ServiceRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@Tag(name = "Service Management", description = "APIs for managing available services")
public class ServiceController {
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    @GetMapping
    @Operation(summary = "Get all services", description = "Retrieves a list of all available services")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved services",
                    content = @Content(schema = @Schema(implementation = Service.class)))
    })
    public ResponseEntity<List<Service>> getAllServices() {
        List<Service> services = serviceRepository.findAll();
        return ResponseEntity.ok(services);
    }
    
    @GetMapping("/active")
    @Operation(summary = "Get active services", description = "Retrieves a list of all active services")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved active services",
                    content = @Content(schema = @Schema(implementation = Service.class)))
    })
    public ResponseEntity<List<Service>> getActiveServices() {
        List<Service> services = serviceRepository.findAllActive();
        return ResponseEntity.ok(services);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get service by ID", description = "Retrieves a specific service by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved service",
                    content = @Content(schema = @Schema(implementation = Service.class))),
        @ApiResponse(responseCode = "404", description = "Service not found")
    })
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {
        Service service = serviceRepository.findById(id)
                .orElse(null);
        if (service == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(service);
    }
    
    @PostMapping
    @Operation(summary = "Create a new service", description = "Creates a new service in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully created service",
                    content = @Content(schema = @Schema(implementation = Service.class)))
    })
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        Service createdService = serviceRepository.save(service);
        return ResponseEntity.ok(createdService);
    }
}
