import React from 'react';

const styles = {
    // Container uses the white card background and Navy Blue border
    container: {
        maxWidth: '500px',
        margin: '40px auto',
        padding: '30px',
        border: '1px solid #0A387D', 
        borderRadius: '10px',
        backgroundColor: '#FFFFF', 
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center', // Center content inside the card
    },
    title: {
        color: '#0A387D',
        marginBottom: '25px',
        fontSize: '28px',
        borderBottom: '2px solid #EBEFF3',
        paddingBottom: '10px'
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr', // Label (1 part) and Value (2 parts)
        gap: '15px 20px',
        textAlign: 'left',
        fontSize: '16px',
        marginBottom: '20px',
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        paddingRight: '10px',
    },
    value: {
        color: '#000',
        wordWrap: 'break-word', // Ensures long numbers wrap correctly
    },
    // Style for the back button
    button: {
        padding: '10px 20px',
        backgroundColor: '#6c757d', // Grey for secondary action
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    }
};

const UserProfile = () => {
    // Hardcoded dummy data for the profile page
    const userData = {
        name: 'Vignesh Kumar',
        age: 32,
        aadhaarNumber: 'xxxx xxxx xx12',
        panNumber: 'ABtE1234F',
        email: 'vignesh.kumar@neurofleetx.com',
        phoneNumber: '+91 98765 43210',
        role: 'Fleet Manager' // Displaying the associated role
    };

    // Function to simulate going back (using browser history)
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}> User Profile - ({userData.role})</h2>
            
            <div style={styles.infoGrid}>
                <span style={styles.label}>Full Name:</span>
                <span style={styles.value}>{userData.name}</span>

                <span style={styles.label}>Age:</span>
                <span style={styles.value}>{userData.age}</span>

                <span style={styles.label}>Email:</span>
                <span style={styles.value}>{userData.email}</span>

                <span style={styles.label}>Phone Number:</span>
                <span style={styles.value}>{userData.phoneNumber}</span>

                <span style={styles.label}>Aadhaar Number:</span>
                <span style={styles.value}>{userData.aadhaarNumber}</span>

                <span style={styles.label}>PAN Number:</span>
                <span style={styles.value}>{userData.panNumber}</span>
            </div>

            <button style={styles.button} onClick={handleGoBack}>
                ← Back to Dashboard
            </button>
        </div>
    );
};

export default UserProfile;
