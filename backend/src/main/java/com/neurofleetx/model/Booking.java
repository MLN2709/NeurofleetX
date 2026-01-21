package com.neurofleetx.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;
    private String pickupLocation;
    private String dropoffLocation;
    private String vehicleType; // e.g., Sedan, SUV, EV
    private int passengers;
    private LocalDateTime bookingDate = LocalDateTime.now();
    private String status = "PENDING"; // PENDING, CONFIRMED, CANCELLED
    private Double estimatedCost;
    
    // Links to the vehicle assigned
    private Long vehicleId;
}
