// src/components/RegisterPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Roles available for registration (Now includes Admin and FleetManager)
const roles = ['Admin', 'FleetManager', 'Driver', 'Customer'];

// --- MODERN PROFESSIONAL STYLES (Unchanged) ---
const styles = {
    primaryColor: '#0A387D', 

    fullScreenBackground: {
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
    
    darkOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2,
    },

    container: {
        maxWidth: '550px',
        padding: '40px',
        backgroundColor: '#FFFFFF',
        borderRadius: '15px',
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.5)',
        fontFamily: 'Arial, sans-serif',
        zIndex: 3,
        position: 'relative',
        width: '100%',
    },
    
    appTitle: {
        color: '#0A387D',
        marginBottom: '15px', 
        fontSize: '32px',
        fontWeight: '800',
        textAlign: 'center',
    },
    subtitle: {
        color: '#6c757d',
        marginBottom: '30px',
        fontSize: '18px',
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
        backgroundColor: '#28a745', 
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


const RegisterPage = ({ onAuthSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role: roles[3], // Default to Customer
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
            alert(`Account created for ${formData.username}. Logging you in as ${formData.role}.`);
            onAuthSuccess(formData.role);
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <div style={styles.fullScreenBackground}>
            <div style={styles.darkOverlay}></div>

            <div style={styles.container}>
                {/* App Name Title */}
                <h1 style={styles.appTitle}>NeuroFleetX</h1>
                <p style={styles.subtitle}>Create Your Account</p>
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    
                    <label style={styles.label} htmlFor="name">Full Name</label>
                    <input 
                        style={styles.input} type="text" id="name" name="name" 
                        value={formData.name} onChange={handleChange} required 
                        placeholder="Enter full name" 
                    />

                    <label style={styles.label} htmlFor="username">Username/Email</label>
                    <input 
                        style={styles.input} type="text" id="username" name="username" 
                        value={formData.username} onChange={handleChange} required 
                        placeholder="Enter email address" 
                    />

                    <label style={styles.label} htmlFor="password">Password</label>
                    <input 
                        style={styles.input} type="password" id="password" name="password" 
                        value={formData.password} onChange={handleChange} required 
                        placeholder="Min 8 characters" 
                    />
                    
                    {/* Role Selector Field (FIXED: Label changed to "Role") */}
                    <label style={styles.label} htmlFor="role">Role</label>
                    <select 
                        style={styles.select} id="role" name="role" 
                        value={formData.role} onChange={handleChange} required
                    >
                        {/* FIXED: All four roles are now included */}
                        {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>

                    <button style={styles.button} type="submit">Register</button>
                </form>

                {/* Link back to Login Page */}
                <p style={styles.footerText}>
                    Already have an account?
                    <Link to="/" style={styles.link}>
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
