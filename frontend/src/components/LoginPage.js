// src/components/LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

// Define the available roles for the dropdown
const roles = ['Admin', 'FleetManager', 'Driver', 'Customer'];

// --- MODERN PROFESSIONAL STYLES WITH INCREASED WIDTH ---
const styles = {
    // Primary Navy Blue color for accents
    primaryColor: '#0A387D', 
    
    // 1. FULL SCREEN BACKGROUND CONTAINER
    fullScreenBackground: {
        // NOTE: Replace this URL with a static/stylish, high-resolution car or highway image hosted on your server
        backgroundImage: 'url("https://images.unsplash.com/photo-1549363074-f3a3f8a4e32d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODc3NDl8MHwxfHNlYXJjaHwxNXx8Zmx5aW5nJTIwaGlnaHdheXxlbnwwfHx8fDE3MDgzOTQ1MDJ8MA&ixlib=rb-4.0.3&q=80&w=1080")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'fixed', 
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        zIndex: 1,
    },
    
    // 2. DARK OVERLAY
    darkOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 2,
    },

    // 3. LOGIN CARD CONTAINER (FIXED: maxWidth increased to 550px)
    container: {
        maxWidth: '550px', 
        padding: '40px',
        backgroundColor: '#FFFFFF', 
        borderRadius: '15px', 
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.5)', 
        fontFamily: 'Arial, sans-serif',
        zIndex: 3, 
        position: 'relative', 
        width: '100%', // Ensure it respects max-width
    },
    
    // App Name Title
    appTitle: {
        color: '#0A387D',
        marginBottom: '30px',
        fontSize: '32px',
        fontWeight: '800',
        textAlign: 'center',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px', 
    },
    label: {
        fontWeight: '600',
        color: '#333',
        marginTop: '5px',
        textAlign: 'left',
    },
    input: {
        padding: '14px 12px',
        border: '1px solid #ccc',
        borderRadius: '8px', 
        fontSize: '16px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    select: {
        padding: '14px 12px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '16px',
        backgroundColor: '#fff',
    },
    button: {
        padding: '15px',
        backgroundColor: '#0A387D', 
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '25px',
        fontSize: '18px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    footerText: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#6c757d',
        textAlign: 'center',
    },
    link: {
        color: '#0A387D',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '5px',
    }
};
// --- END MODERN PROFESSIONAL STYLES ---


const LoginPage = ({ onAuthSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: roles[0], // Default to Admin
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.username && formData.password) {
            onAuthSuccess(formData.role);
        } else {
            alert('Please enter both username and password.');
        }
    };

    return (
        // Wrapper for the full-screen background effect
        <div style={styles.fullScreenBackground}>
            {/* The Dark Overlay */}
            <div style={styles.darkOverlay}></div>

            {/* The Login Card */}
            <div style={styles.container}>
                {/* App Name Title */}
                <h1 style={styles.appTitle}>NeuroFleetX</h1>
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    
                    <label style={styles.label} htmlFor="username">Username</label>
                    <input 
                        style={styles.input}
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username}
                        onChange={handleChange}
                        required 
                        placeholder="Enter your username"
                    />

                    <label style={styles.label} htmlFor="password">Password</label>
                    <input 
                        style={styles.input}
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                        placeholder="••••••••"
                    />
                    
                    {/* Role Selector Field */}
                    <label style={styles.label} htmlFor="role">Login As Role</label>
                    <select 
                        style={styles.select}
                        id="role" 
                        name="role" 
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>

                    <button style={styles.button} type="submit">Log In to Dashboard</button>
                </form>

                {/* Link to Registration Page */}
                <p style={styles.footerText}>
                    Don't have an account?
                    <Link to="/register" style={styles.link}>
                        Register Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
