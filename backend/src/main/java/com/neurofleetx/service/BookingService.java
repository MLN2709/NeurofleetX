package com.neurofleetx.service;

import com.neurofleetx.model.Booking;
import com.neurofleetx.model.Vehicle; // Assuming Module 4 Entity exists
import com.neurofleetx.repository.BookingRepository;
import com.neurofleetx.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private VehicleRepository vehicleRepository;

    public Booking saveBooking(Booking booking) {
        // Simple Cost Estimation Logic
        booking.setEstimatedCost(booking.getPassengers() * 15.0); 
        return bookingRepository.save(booking);
    }

    // AI-Powered Recommendation Engine Logic
    public List<Vehicle> getRecommendations(String type, int passengers, boolean preferEV) {
        return vehicleRepository.findAll().stream()
            .filter(v -> v.getStatus().equals("Available"))
            .filter(v -> v.getType().equalsIgnoreCase(type))
            .filter(v -> preferEV ? v.getType().contains("EV") : true)
            .limit(3) // Top 3 recommendations
            .collect(Collectors.toList());
    }
}
