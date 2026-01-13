package com.neurofleetx.controller;

import com.neurofleetx.model.MaintenanceAlert;
import com.neurofleetx.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/maintenance")
@CrossOrigin(origins = "http://localhost:3000")
public class MaintenanceController {
    @Autowired
    private MaintenanceService service;

    @GetMapping("/analytics")
    public Map<String, Long> getAnalytics() {
        return service.getAnalytics();
    }

    @GetMapping("/alerts/open/all")
    public List<MaintenanceAlert> getAlerts() {
        return service.getAllOpen();
    }
}
