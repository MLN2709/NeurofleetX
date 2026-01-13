package com.neurofleetx.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "maintenance_alerts")
public class MaintenanceAlert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleId;
    private String component; // Engine, Tire, Battery
    private String severity;  // CRITICAL, HIGH, MEDIUM, LOW
    private String status;    // OPEN, RESOLVED
    private LocalDate predictionDate; // Calculated by AI Engine
    private double healthScore;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getVehicleId() { return vehicleId; }
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public LocalDate getPredictionDate() { return predictionDate; }
    public void setPredictionDate(LocalDate predictionDate) { this.predictionDate = predictionDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}