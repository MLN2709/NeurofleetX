// src/components/VehicleCard.js

import React from 'react';
import { Link } from 'react-router-dom'; // *** ADD THIS IMPORT ***

// Reusable Status Chip Styles (KEEP SAME)
const getStatusChipStyle = (status) => {
    // ... (Your existing status chip logic)
    let color, bgColor;
    switch (status) {
        case 'Available': color = '#155724'; bgColor = '#d4edda'; break; // Green
        case 'In Use': color = '#004085'; bgColor = '#cce5ff'; break;      // Blue
        case 'Idle': color = '#856404'; bgColor = '#fff3cd'; break;       // Yellow
        case 'Needs Service': color = '#721c24'; bgColor = '#f8d7da'; break; // Red
        default: color = '#383d41'; bgColor = '#e2e3e5';
    }
    return {
        padding: '5px 10px',
        borderRadius: '15px',
        fontSize: '12px',
        fontWeight: 'bold',
        color,
        backgroundColor: bgColor,
        display: 'inline-block',
    };
};

// Reusable Fuel/Battery Bar Component (KEEP SAME)
const FuelBatteryBar = ({ value, isElectric }) => {
    const icon = isElectric ? '⚡' : '⛽'; 
    const barColor = value < 20 ? '#dc3545' : '#28a745'; 
    
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px'
    };
    const barStyle = {
        flexGrow: 1,
        height: '10px',
        backgroundColor: '#e9ecef',
        borderRadius: '5px',
        overflow: 'hidden',
        marginLeft: '10px'
    };
    const fillStyle = {
        width: `${value}%`,
        height: '100%',
        backgroundColor: barColor,
        transition: 'width 0.5s',
    };

    return (
        <div style={containerStyle}>
            <span role="img" aria-label={isElectric ? "battery" : "fuel"}>{icon}</span>
            <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>{value}%</span>
            <div style={barStyle}>
                <div style={fillStyle}></div>
            </div>
        </div>
    );
};


const VehicleCard = ({ vehicle, telemetry }) => {
    const powerValue = vehicle.isElectric ? telemetry.battery : telemetry.fuel;

    // Standard Card Style 
    const cardStyle = {
        padding: '20px',
        margin: '15px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
        width: '300px', 
        textAlign: 'left',
        borderLeft: `5px solid ${getStatusChipStyle(telemetry.status).color}`,
        transition: 'transform 0.2s',
        cursor: 'pointer'
    };

    return (
        <div style={cardStyle}>
            {/* Header: Plate and Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#0A387D' }}>{vehicle.plate}</h3>
                <span style={getStatusChipStyle(telemetry.status)}>{telemetry.status}</span>
            </div>

            {/* Vehicle Details */}
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                {vehicle.make} {vehicle.model}
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                Speed: <span style={{ fontWeight: 'bold' }}>{telemetry.speed} kph</span>
            </p>

            {/* Location Pin */}
            <div style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
                <span role="img" aria-label="location-pin" style={{ fontSize: '18px', marginRight: '5px', color: '#dc3545' }}>📍</span>
                <span style={{ fontSize: '14px' }}>
                    Lat: {telemetry.lat.toFixed(4)}, Lng: {telemetry.lng.toFixed(4)}
                </span>
            </div>

            {/* Battery/Fuel Bar */}
            <FuelBatteryBar value={powerValue} isElectric={vehicle.isElectric} />
            
            {/* Action Link: NOW LINKS TO EDIT PAGE */}
            <div style={{ textAlign: 'right', marginTop: '15px' }}>
                <Link 
                    to={`/fleet/edit-vehicle/${vehicle.id}`} // *** DYNAMIC ROUTE ***
                    style={{ color: '#007bff', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}
                >
                    Edit Details →
                </Link>
            </div>
        </div>
    );
};

export default VehicleCard;
