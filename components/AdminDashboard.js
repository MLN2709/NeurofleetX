// src/components/AdminDashboard.js

import React, { useState } from 'react';
import MapView from './MapView';
import VehicleInventory from './VehicleInventory'; 

// --- MODERN PROFESSIONAL STYLES ---
const styles = {
    primaryColor: '#0A387D', // Dark Blue
    secondaryColor: '#28a745', // Green for accents/live data
    backgroundColor: '#F7F9FC', // Light background
    header: {
        backgroundColor: '#0A387D',
        color: 'white',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    title: {
        margin: 0,
        fontSize: '24px',
        fontWeight: '700',
    },
    logoutButton: {
        padding: '8px 15px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'background-color 0.3s',
    },
    mainContent: {
        padding: '20px',
        backgroundColor: '#F7F9FC',
        minHeight: '100vh',
    },
    // Dashboard grid structure
    dashboardGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr', // Single column layout for smaller views
        gap: '20px',
    },
    // Style for the map container to ensure it has height
    mapContainer: {
        height: '500px', // Fixed height for map visibility
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    sectionTitle: {
        color: '#0A387D',
        borderBottom: '2px solid #EBEFF3',
        paddingBottom: '10px',
        marginTop: '0',
    }
};

// --- COMPONENT ---

const AdminDashboard = ({ onLogout }) => {
    const [view, setView] = useState('dashboard'); // State to handle navigation, if needed

    const renderContent = () => {
        switch (view) {
            case 'dashboard':
            default:
                return (
                    <div style={styles.dashboardGrid}>
                        
                        {/* 1. REAL-TIME MAP VIEW */}
                        <div>
                            <h3 style={styles.sectionTitle}>🗺️ Real-Time Fleet Location</h3>
                            <div style={styles.mapContainer}>
                                <MapView />
                            </div>
                        </div>

                        {/* 2. VEHICLE INVENTORY & STATUS TABLE */}
                        {/* This component contains the simulated status, speed, distance, and alerts logic */}
                        <VehicleInventory /> 
                        
                    </div>
                );
        }
    };

    return (
        <div>
            {/* Header / Navigation Bar */}
            <header style={styles.header}>
                <h1 style={styles.title}>
                    <span style={{ color: styles.secondaryColor }}>Neuro</span>FleetX - Admin Dashboard
                </h1>
                <button 
                    style={styles.logoutButton} 
                    onClick={onLogout}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                >
                    Logout
                </button>
            </header>

            {/* Main Content Area */}
            <main style={styles.mainContent}>
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminDashboard;
