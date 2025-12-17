import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVehicleById, updateVehicle, addVehicle } from '../data/mockData'; 

const styles = {
    container: {
        maxWidth: '550px',
        margin: '40px auto',
        padding: '30px',
        border: '1px solid #0A387D', 
        borderRadius: '10px',
        backgroundColor: '#FFFFF', 
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    form: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr', 
        gap: '15px 20px',
        textAlign: 'left',
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        alignSelf: 'center',
    },
    input: {
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
    },
    checkboxContainer: {
        gridColumn: '1 / 3', 
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
    },
    checkbox: {
        marginRight: '10px',
        transform: 'scale(1.5)',
    },
    button: {
        gridColumn: '1 / 3',
        padding: '12px 15px',
        backgroundColor: '#0A387D', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    title: {
        color: '#0A387D',
        marginBottom: '25px',
        fontSize: '28px',
        borderBottom: '2px solid #EBEFF3',
        paddingBottom: '10px'
    }
};

const VehicleForm = () => {
    const { vehicleId } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!vehicleId;

    const initialFormData = {
        plate: '',
        make: '',
        model: '',
        VIN: '',
        isElectric: false,
    };
    
    const [formData, setFormData] = useState(initialFormData);

    // Load data if in Edit mode
    useEffect(() => {
        if (isEditMode) {
            const vehicleData = getVehicleById(vehicleId); 
            if (vehicleData) {
                const { plate, make, model, VIN, isElectric } = vehicleData;
                setFormData({ plate, make, model, VIN, isElectric });
            } else {
                alert('Vehicle not found! Returning to dashboard.');
                // Navigate back to the main dashboard (route "/")
                navigate('/', { replace: true }); 
            }
        }
    }, [isEditMode, vehicleId, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            updateVehicle(vehicleId, formData);
            alert(`Vehicle ${formData.plate} updated successfully!`);
        } else {
            addVehicle(formData); 
            alert(`New vehicle ${formData.plate} added successfully!`);
        }

        // Navigate back to the main dashboard
        navigate('/', { replace: true }); 
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>
                {isEditMode ? 'Update Vehicle Details' : 'Add New Vehicle to Fleet'}
            </h2>
            
            <form onSubmit={handleSubmit} style={styles.form}>
                
                {/* 1. NUMBER PLATE FIELD (Corrected label) */}
                <label style={styles.label} htmlFor="plate">Number Plate</label>
                <input 
                    style={styles.input} type="text" id="plate" name="plate" 
                    value={formData.plate} onChange={handleChange} required 
                />

                {/* 2. COMPANY FIELD (Corrected label) */}
                <label style={styles.label} htmlFor="make">Company</label>
                <input 
                    style={styles.input} type="text" id="make" name="make" 
                    value={formData.make} onChange={handleChange} required 
                />

                <label style={styles.label} htmlFor="model">Model</label>
                <input 
                    style={styles.input} type="text" id="model" name="model" 
                    value={formData.model} onChange={handleChange} required 
                />

                <label style={styles.label} htmlFor="VIN">VIN (Optional)</label>
                <input 
                    style={styles.input} type="text" id="VIN" name="VIN" 
                    value={formData.VIN} onChange={handleChange} minLength="17" maxLength="17"
                />
                
                <div style={styles.checkboxContainer}>
                    <input 
                        style={styles.checkbox} type="checkbox" id="isElectric" 
                        name="isElectric" checked={formData.isElectric} onChange={handleChange}
                    />
                    <label htmlFor="isElectric" style={{ ...styles.label, margin: 0 }}>Is Electric Vehicle?</label>
                </div>

                <button style={styles.button} type="submit">
                    {isEditMode ? 'Save Vehicle Changes' : 'Add Vehicle to Fleet'}
                </button>
            </form>
        </div>
    );
};

export default VehicleForm;
