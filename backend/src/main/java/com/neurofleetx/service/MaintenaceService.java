package com.neurofleetx.service;

import com.neurofleetx.model.MaintenanceAlert;
import com.neurofleetx.repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

@Service
public class MaintenanceService {
    @Autowired
    private MaintenanceRepository repository;

    // Predictive logic for maintenance dates
    public LocalDate calculatePredictedDate(int mileage, double wearRate) {
        long daysRemaining = (long) ((10000 - (mileage % 10000)) / (wearRate * 10));
        return LocalDate.now().plusDays(daysRemaining);
    }

    public Map<String, Long> getAnalytics() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalAlerts", repository.count());
        stats.put("openAlerts", repository.countByStatus("OPEN"));
        return stats;
    }

    public List<MaintenanceAlert> getAllOpen() {
        return repository.findByStatus("OPEN");
    }
}
