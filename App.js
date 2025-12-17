// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import RoleRouter from './RoleRouter'; 

function App() {
  const [userRole, setUserRole] = useState(null); 

  const handleAuthSuccess = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  // Define styles for the dashboard view
  const dashboardStyles = {
    textAlign: 'center', 
    padding: '0 20px 20px', // Only add padding when logged in
    backgroundColor: '#F7F9FC', // Professional light grey background for dashboards
    minHeight: '100vh',
    position: 'relative',
  };
  
  // Define styles for the logged out view (minimal wrapper)
  const loggedOutStyles = {
    minHeight: '100vh', 
    position: 'relative',
  };
  
  const currentWrapperStyle = userRole ? dashboardStyles : loggedOutStyles;

  return (
    <Router>
      <div style={currentWrapperStyle}>
        
        {/*
          App Title and Logout Button are ONLY rendered when the user is logged in
          (on a dashboard page) to prevent conflicts with the stylish LoginPage.
        */}
        {userRole && (
          <>
            {/* App Title */}
            <h1 style={{ color: '#0A387D', marginBottom: '40px', paddingTop: '20px' }}>NeuroFleetX</h1>
            
            {/* Logout Button (FIXED: Positioned at top: 60px) */}
            <button 
              onClick={handleLogout} 
              style={{ 
                position: 'absolute', 
                top: '60px', // Correct position to clear the title
                right: '20px', 
                padding: '10px 15px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                zIndex: 20, // Ensure it sits above all dashboard content
              }}
            >
              Logout
            </button>
          </>
        )}

        <Routes>
          {/* Renders the role-specific dashboard if authenticated */}
          {userRole ? (
            <Route path="*" element={<RoleRouter role={userRole} />} />
          ) : (
            <>
              {/* Authentication routes are now the default view */}
              <Route path="/" element={<LoginPage onAuthSuccess={handleAuthSuccess} />} />
              <Route path="/register" element={<RegisterPage onAuthSuccess={handleAuthSuccess} />} />
              
              {/* Fallback to login */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;