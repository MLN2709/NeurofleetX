// src/components/VehicleInventory.js

import React, { useState, useEffect } from 'react';
import { getInventoryList, createAlert } from '../data/locationMockData'; 

// --- SHARED STYLES ---

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    marginBottom: '50px'
};

const thStyle = {
    backgroundColor: '#0A387D', 
    color: 'white',
    padding: '15px',
    textAlign: 'left',
    fontWeight: '700',
    fontSize: '1em',
    verticalAlign: 'middle', 
    whiteSpace: 'nowrap', 
};

const tdStyle = {
    padding: '15px',
    borderBottom: '1px solid #ddd',
    fontSize: '0.95em',
    color: '#333',
    textAlign: 'left', 
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
};

const numericDataStyle = { 
    ...tdStyle, 
    fontFamily: 'monospace, sans-serif',
};

const statusColors = {
    'In Service': '#28a745', 
    'Idling': '#ffc107',     
    'Maintenance': '#dc3545',
    'Off-Road': '#6c757d',   
    'Needs Service': '#ff851b',
};

// --- ALERT SPECIFIC STYLES AND COLORS ---

const alertSeverityColors = {
    'Overspeeding': { bg: '#FAD4D4', text: '#B80000', border: '#DC3545' },      // High Priority (Red)
    'Battery Failure': { bg: '#FAD4D4', text: '#B80000', border: '#DC3545' }, // High Priority (Red)
    'Scheduled Maintenance': { bg: '#FFF3CD', text: '#856404', border: '#FFC107' }, // Medium Priority (Yellow)
};

const alertThStyle = {
    ...thStyle,
    backgroundColor: '#B80000', // Darker Red for Alert Header
};

const getAlertRowStyle = (type) => ({
    backgroundColor: alertSeverityColors[type]?.bg || '#f9f9f9',
    borderLeft: `5px solid ${alertSeverityColors[type]?.border || '#B80000'}`,
});

// Function to determine the fuel type display (Unchanged)
const getFuelDisplay = (fuelType) => {
    if (fuelType.toLowerCase() === 'electric') {
        return <span style={{ color: '#007bff', fontWeight: 'bold', display: 'inline-block' }}>⚡ EV</span>;
    } 
    return <span style={{ color: '#333', fontWeight: 'bold', display: 'inline-block' }}>⛽ {fuelType}</span>;
};

// Helper function to get the icon based on battery level (Unchanged)
const getBatteryIcon = (level) => {
    if (level > 75) return '🔋';
    if (level > 40) return '🪫';
    if (level > 10) return '⚠️';
    return '🚨';
};

// --- SIMULATION LOGIC (Unchanged) ---

const VehicleInventory = () => {
    const [inventory, setInventory] = useState(getInventoryList());
    const [alerts, setAlerts] = useState([]); 

    useEffect(() => {
        const SIMULATION_CYCLE_MS = 3000;
        const SERVICE_INTERVAL_KM = 1000;
        
        const intervalId = setInterval(() => {
            
            setInventory(prevInventory => 
                prevInventory.map(vehicle => {
                    let { currentBattery, status, totalDistance } = vehicle;
                    let currentSpeed;

                    if (status === 'In Service' || status === 'Needs Service') {
                        currentSpeed = Math.floor(Math.random() * 121); 
                    } else {
                        currentSpeed = 0;
                    }
                    
                    if (status !== 'Maintenance' && status !== 'Off-Road') {
                        
                        // BATTERY LOGIC
                        if (status === 'In Service') {
                            const drain = Math.floor(Math.random() * 2) + 1; 
                            currentBattery = Math.max(0, currentBattery - drain);

                        } else if (status === 'Idling') {
                            const drain = 0.1; 
                            currentBattery = Math.max(0, currentBattery - drain);
                            currentBattery = parseFloat(currentBattery.toFixed(1)); 
                        }
                        
                        if (currentBattery <= 0) {
                            currentBattery = 0;
                            status = 'Maintenance';
                            setAlerts(prev => [...prev, createAlert(vehicle.plate, "Battery Failure", "Vehicle ran out of charge/power while operating.")]);
                        }
                        
                        // DISTANCE LOGIC
                        const distanceChange = currentSpeed * (SIMULATION_CYCLE_MS / 3600000) * 10;
                        totalDistance += distanceChange; 
                        totalDistance = parseFloat(totalDistance.toFixed(0)); 
                        
                        // Check for service interval
                        if (Math.floor(totalDistance / SERVICE_INTERVAL_KM) > Math.floor(vehicle.totalDistance / SERVICE_INTERVAL_KM)) {
                             status = 'Needs Service';
                             setAlerts(prev => [...prev, createAlert(vehicle.plate, "Scheduled Maintenance", `Reached ${SERVICE_INTERVAL_KM}km service interval.` )]);
                        }
                    } 
                    
                    // OVERSPEEDING ALERT LOGIC
                    if (currentSpeed > 100) {
                        setAlerts(prev => [...prev, createAlert(vehicle.plate, "Overspeeding", `Speed recorded at ${currentSpeed} km/h.`)]);
                    }
                    
                    return { 
                        ...vehicle, 
                        currentBattery, 
                        status: status, 
                        totalDistance,
                        currentSpeed
                    };
                })
            );
        }, 3000); 

        return () => clearInterval(intervalId);
    }, []); 
    
    // Reverse alerts so the newest is at the top
    const sortedAlerts = [...alerts].reverse();
    
    // --- RENDER ---
    
    const columnWidths = {
        plate: '12%', type: '8%', makeModel: '18%', driverName: '15%', 
        distance: '12%', speed: '11%', battery: '12%', status: '12%', efficiency: '8%',
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* 1. ACTIVE FLEET ALERTS TABLE */}
            {alerts.length > 0 && (
                <>
                    <h3 style={{ color: '#B80000', borderBottom: '2px solid #E34A4A', paddingBottom: '10px', marginTop: '30px', display: 'flex', alignItems: 'center' }}>
                         🚨 Active Fleet Alerts 
                         <span style={{ 
                            backgroundColor: '#B80000', 
                            color: 'white', 
                            padding: '4px 8px', 
                            borderRadius: '5px', 
                            fontSize: '0.9em', 
                            fontWeight: 'bold', 
                            marginLeft: '15px' 
                        }}>
                             {alerts.length}
                         </span>
                    </h3>
                    
                    <table style={{...tableStyle, marginTop: '10px'}}>
                        <thead>
                            <tr>
                                <th style={alertThStyle}>Time</th>
                                <th style={alertThStyle}>Plate</th>
                                <th style={alertThStyle}>Type</th>
                                <th style={alertThStyle}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Display up to 10 most recent alerts */}
                            {sortedAlerts.slice(0, 10).map((alert, index) => (
                                <tr key={index} style={getAlertRowStyle(alert.type)}>
                                    <td style={{...tdStyle, color: alertSeverityColors[alert.type]?.text || '#333'}}>{alert.timestamp}</td>
                                    <td style={{...tdStyle, color: alertSeverityColors[alert.type]?.text || '#333'}}><strong>{alert.plate}</strong></td>
                                    <td style={{...tdStyle, color: alertSeverityColors[alert.type]?.text || '#333'}}><strong>{alert.type}</strong></td>
                                    <td style={{...tdStyle, color: alertSeverityColors[alert.type]?.text || '#333'}}>{alert.details}</td>
                                </tr>
                            ))}
                            {sortedAlerts.length > 10 && (
                                <tr>
                                    <td colSpan="4" style={{...tdStyle, textAlign: 'center', backgroundColor: '#f0f0f0'}}>
                                        ... showing 10 of {sortedAlerts.length} alerts.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}

            {/* 2. FLEET INVENTORY TABLE */}
            <h3 style={{ color: '#0A387D', borderBottom: '2px solid #EBEFF3', paddingBottom: '10px', marginTop: '30px' }}>
                Fleet Inventory & Real-Time Status (Simulated)
            </h3>
            
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={{...thStyle, width: columnWidths.plate}}>Plate Number</th>
                        <th style={{...thStyle, width: columnWidths.type}}>Type</th> 
                        <th style={{...thStyle, width: columnWidths.makeModel}}>Make/Model</th>
                        <th style={{...thStyle, width: columnWidths.driverName}}>Driver Name</th> 
                        <th style={{...thStyle, width: columnWidths.distance}}>Total Distance (km)</th> 
                        <th style={{...thStyle, width: columnWidths.speed}}>Current Speed</th> 
                        <th style={{...thStyle, width: columnWidths.battery}}>Battery/Power</th> 
                        <th style={{...thStyle, width: columnWidths.status}}>Status</th>
                        <th style={{...thStyle, width: columnWidths.efficiency}}>Efficiency</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((vehicle) => (
                        <tr key={vehicle.id} style={{ ':hover': { backgroundColor: '#f9f9f9' } }}>
                            
                            <td style={{...numericDataStyle, width: columnWidths.plate}}>
                                <strong>{vehicle.plate}</strong>
                            </td>
                            
                            <td style={{...tdStyle, width: columnWidths.type}}>
                                {getFuelDisplay(vehicle.fuelType)}
                            </td>
                            
                            <td style={{...tdStyle, width: columnWidths.makeModel}}>
                                <strong>{vehicle.make} / {vehicle.model}</strong>
                            </td>
                            
                            <td style={{...tdStyle, width: columnWidths.driverName}}>
                                <strong>{vehicle.driverName}</strong>
                            </td>
                            
                            <td style={{...numericDataStyle, width: columnWidths.distance}}>
                                <strong>{vehicle.totalDistance.toLocaleString()}</strong>
                            </td>
                            
                            <td style={{...numericDataStyle, width: columnWidths.speed}}>
                                <span style={{ 
                                    color: vehicle.currentSpeed > 100 ? '#dc3545' : '#333', 
                                    fontWeight: 'bold' 
                                }}>
                                    {vehicle.currentSpeed} km/h
                                </span>
                            </td>
                            
                            <td style={{...tdStyle, width: columnWidths.battery}}>
                                {getBatteryIcon(vehicle.currentBattery)} 
                                <span style={{ 
                                    fontWeight: 'bold', 
                                    color: vehicle.currentBattery <= 10 ? '#dc3545' : (vehicle.currentBattery <= 40 ? '#ffc107' : '#28aa45'),
                                    display: 'inline-block' 
                                }}>
                                    {vehicle.currentBattery}%
                                </span>
                            </td>
                            
                            <td style={{...tdStyle, width: columnWidths.status}}>
                                <span style={{ 
                                    backgroundColor: statusColors[vehicle.status] || '#6c757d',
                                    color: 'white',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    fontWeight: 'bold',
                                    fontSize: '0.85em',
                                    display: 'inline-block', 
                                }}>
                                    {vehicle.status}
                                </span>
                            </td>
                            
                            <td style={{...numericDataStyle, width: columnWidths.efficiency}}>
                                <strong>{vehicle.efficiency}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleInventory;
