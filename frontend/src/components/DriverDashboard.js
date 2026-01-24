import React from 'react';
import { Link } from 'react-router-dom';

// NOTE: Duplicated styles for component independence
const cardStyle = { padding: '20px', margin: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', flex: '1 1 200px', textAlign: 'left' };
const dashboardStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px', maxWidth: '1200px', margin: '0 auto' };

const DriverDashboard = () => (
  <>
    {/* Profile Link (FIXED: Positioned at top 20px) */}
    <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
        <Link to="/profile" style={{ 
            padding: '10px 15px', 
            backgroundColor: '#6c757d', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: 'bold'
        }}>
            View Profile
        </Link>
    </div>
    
    {/* FIXED: Added marginTop to clear the button and create space */}
    <h2 style={{ color: '#17a2b8', marginTop: '80px' }}>Driver Dashboard</h2>
    <div style={dashboardStyle}>
      <div style={cardStyle}>
        <h3>Current Route</h3>
        <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#17a2b8' }}>#458-LAX to PHX</p>
      </div>
      <div style={cardStyle}>
        <h3>Estimated Time of Arrival (ETA)</h3>
        <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#28a745' }}>2 Hours</p>
      </div>
      <div style={cardStyle}>
        <h3>Remaining Load</h3>
        <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#ffc107' }}>1.5 Tons</p>
      </div>
      <div style={cardStyle}>
        <h3>Next Stop</h3>
        <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#dc3545' }}>Warehouse C</p>
      </div>
    </div>
  </>
);

export default DriverDashboard;
