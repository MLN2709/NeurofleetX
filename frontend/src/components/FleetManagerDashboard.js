// src/components/FleetManagerDashboard.js

import React from 'react';
import { Link } from 'react-router-dom';
import VehicleInventory from './VehicleInventory'; 
import MapView from './MapView'; 

// --- UPDATED PROFESSIONAL STYLES ---

const kpiContainerStyle = {
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    gap: '20px', 
    marginTop: '20px',
    marginBottom: '40px',
};

// Enhanced style for KPI cards
const kpiCardStyle = { 
    padding: '20px', // Slightly reduced padding
    backgroundColor: '#ffffff', 
    borderRadius: '12px', 
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)', // Deeper, softer shadow
    flex: '1 1 220px', 
    textAlign: 'left',
    transition: 'transform 0.2s', // Add hover effect
    cursor: 'default',
    minHeight: '100px', // Ensure cards are visually balanced
};

// Style for the metric numbers
const metricValueStyle = { 
    fontSize: '3em', // Larger font size for impact
    fontWeight: '700', 
    margin: '5px 0 0 0', 
    lineHeight: 1.1 
};

// Style for the card titles
const metricTitleStyle = { 
    margin: '0 0 10px 0', 
    color: '#6c757d', // Subtle grey for descriptive text
    fontSize: '0.9em', 
    fontWeight: '600' 
};

// --- END UPDATED STYLES ---

const FleetManagerDashboard = () => (
  // Main container to constrain width and center content
  <div style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
    
    {/* Action Buttons (top: 20px) */}
    <div 
        style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, display: 'flex', gap: '10px' }}
    > 
        {/* ADD VEHICLE BUTTON */}
        <Link to="/fleet/add-vehicle" style={{ 
            padding: '10px 15px', 
            backgroundColor: '#0A387D', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: 'bold'
        }}>
            Add Vehicle
        </Link>

        <Link to="/profile" style={{ 
            padding: '10px 15px', 
            backgroundColor: '#6c757d', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: 'bold',
        }}>
            View Profile
        </Link>
    </div>
    
    {/* Main Title */}
    <h2 style={{ color: '#0A387D', marginTop: '80px', marginBottom: '40px' }}>
        Fleet Operations Management
    </h2>

    {/* KPI Cards Section */}
    <div style={kpiContainerStyle}>
      
      {/* 1. Vehicles In-Service (GREEN Accent) */}
      <div style={{...kpiCardStyle, borderLeft: '5px solid #28a745', ':hover': { transform: 'translateY(-3px)' }}}>
        <h3 style={metricTitleStyle}>🚚 Vehicles In-Service</h3>
        <p style={{ ...metricValueStyle, color: '#28a745' }}>92 / 100</p>
      </div>
      
      {/* 2. Drivers On-Duty (BLUE Accent) */}
      <div style={{...kpiCardStyle, borderLeft: '5px solid #007bff', ':hover': { transform: 'translateY(-3px)' }}}>
        <h3 style={metricTitleStyle}>👨‍💼 Drivers On-Duty</h3>
        <p style={{ ...metricValueStyle, color: '#007bff' }}>78</p>
      </div>
      
      {/* 3. Maintenance Required (RED Accent) */}
      <div style={{...kpiCardStyle, borderLeft: '5px solid #dc3545', ':hover': { transform: 'translateY(-3px)' }}}>
        <h3 style={metricTitleStyle}>⚠️ Maintenance Required</h3>
        <p style={{ ...metricValueStyle, color: '#dc3545' }}>8</p>
      </div>
      
      {/* 4. Average Fuel Efficiency (DARK Accent) */}
      <div style={{...kpiCardStyle, borderLeft: '5px solid #333', ':hover': { transform: 'translateY(-3px)' }}}>
        <h3 style={metricTitleStyle}>⛽ Avg. Fuel Efficiency</h3>
        <p style={{ ...metricValueStyle, color: '#333' }}>7.2 MPG</p>
      </div>
    </div>
    
    {/* Real-time Map View */}
    <MapView /> 

    {/* Vehicle Inventory List */}
    <VehicleInventory />
  </div>
);

export default FleetManagerDashboard;
