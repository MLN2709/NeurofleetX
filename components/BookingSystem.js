import React, { useState } from 'react';

const BookingSystem = () => {
    const [form, setForm] = useState({ pickup: '', dropoff: '', type: 'Sedan', passengers: 1, ev: false });
    const [recs, setRecs] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(`http://localhost:8080/api/bookings/recommendations?type=${form.type}&passengers=${form.passengers}&preferEV=${form.ev}`);
        const data = await response.json();
        setRecs(data);
    };

    const handleBook = async (vehicleId) => {
        const response = await fetch('http://localhost:8080/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, vehicleId, status: 'CONFIRMED' })
        });
        if (response.ok) alert("Booking Confirmed!");
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Smart Booking & AI Recommendations</h2>
            <input placeholder="Pickup" onChange={e => setForm({...form, pickup: e.target.value})} />
            <input placeholder="Dropoff" onChange={e => setForm({...form, dropoff: e.target.value})} />
            <select onChange={e => setForm({...form, type: e.target.value})}>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="EV">EV</option>
            </select>
            <button onClick={handleSearch}>Find Best Vehicle</button>

            <h3>AI Recommendations:</h3>
            {recs.map(v => (
                <div key={v.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <p>{v.model} - {v.type} (Recommended for you)</p>
                    <button onClick={() => handleBook(v.id)}>Book Now</button>
                </div>
            ))}
        </div>
    );
};

export default BookingSystem;
