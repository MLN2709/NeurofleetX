package com.neurofleetx.controller;

import com.neurofleetx.model.Booking;
import com.neurofleetx.model.Vehicle;
import com.neurofleetx.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.saveBooking(booking);
    }

    @GetMapping("/recommendations")
    public List<Vehicle> recommend(@RequestParam String type, 
                                   @RequestParam int passengers, 
                                   @RequestParam boolean preferEV) {
        return bookingService.getRecommendations(type, passengers, preferEV);
    }
}