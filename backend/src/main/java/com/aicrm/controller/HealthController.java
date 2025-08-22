package com.aicrm.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/health")
@Tag(name = "Health Check", description = "Health monitoring and system status endpoints")
public class HealthController {

    @GetMapping
    @Operation(summary = "Health check", description = "Returns the current health status of the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "System is healthy",
                    content = @Content(schema = @Schema(implementation = Map.class)))
    })
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("service", "AI CRM Backend");
        health.put("version", "1.0.0");
        health.put("java.version", System.getProperty("java.version"));
        return ResponseEntity.ok(health);
    }

    @GetMapping("/info")
    @Operation(summary = "System information", description = "Returns detailed system information")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "System information retrieved successfully")
    })
    public ResponseEntity<Map<String, Object>> systemInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("application", "AI CRM System");
        info.put("description", "AI-enabled CRM system with lead management and deal tracking");
        info.put("version", "1.0.0");
        info.put("java.version", System.getProperty("java.version"));
        info.put("java.vendor", System.getProperty("java.vendor"));
        info.put("os.name", System.getProperty("os.name"));
        info.put("os.version", System.getProperty("os.version"));
        info.put("startup.time", LocalDateTime.now());
        return ResponseEntity.ok(info);
    }
}
