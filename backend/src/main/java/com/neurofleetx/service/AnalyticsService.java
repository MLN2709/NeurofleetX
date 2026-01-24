package com.neurofleetx.service;

import com.neurofleetx.repository.VehicleRepository;
import com.neurofleetx.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsService {
    @Autowired
    private VehicleRepository vehicleRepo;
    
    @Autowired
    private BookingRepository bookingRepo;

    public Map<String, Object> getGlobalStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalVehicles", vehicleRepo.count());
        stats.put("activeBookings", bookingRepo.countByStatus("ONGOING"));
        stats.put("averageFleetHealth", 85.5); // Logic to average health metrics
        return stats;
    }

    public Map<String, Long> getVehicleTypeDistribution() {
        Map<String, Long> distribution = new HashMap<>();
        distribution.put("Sedan", vehicleRepo.countByType("Sedan"));
        distribution.put("SUV", vehicleRepo.countByType("SUV"));
        distribution.put("EV", vehicleRepo.countByType("EV"));
        return distribution;
    }
}
