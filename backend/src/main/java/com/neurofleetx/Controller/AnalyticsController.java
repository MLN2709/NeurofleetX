package com.neurofleetx.controller;

import com.neurofleetx.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        // Aggregates total vehicles, active bookings, and fleet health
        return ResponseEntity.ok(analyticsService.getGlobalStats());
    }

    @GetMapping("/fleet-distribution")
    public ResponseEntity<Map<String, Long>> getFleetDistribution() {
        // Returns count by vehicle type (EV, Sedan, SUV)
        return ResponseEntity.ok(analyticsService.getVehicleTypeDistribution());
    }
}
