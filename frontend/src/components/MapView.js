// src/components/MapView.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getVehicleLocations } from '../data/locationMockData';
// Fix for default Leaflet icon not showing up in React
import L from 'leaflet';

// Fix for default marker icon missing
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});


const mapContainerStyle = {
    height: '600px', // Large map area
    width: '100%',
    margin: '30px auto',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};

const MapView = () => {
    const locations = getVehicleLocations();
    // Calculate the center of the map based on all pins (using a simple average, or fall back to Hyderabad)
    const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length || 17.4065;
    const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length || 78.4772;
    
    return (
        <div style={{ padding: '20px', backgroundColor: '#fff', margin: '20px auto', maxWidth: '1200px', borderRadius: '10px' }}>
            <h3 style={{ color: '#0A387D', borderBottom: '2px solid #EBEFF3', paddingBottom: '10px' }}>
                Real-time Vehicle Tracking Overview
            </h3>

            <MapContainer 
                center={[centerLat, centerLng]} 
                zoom={5} 
                scrollWheelZoom={false} 
                style={mapContainerStyle}
            >
                <TileLayer
                    // Using OpenStreetMap tiles
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map((loc) => (
                    <Marker 
                        key={loc.id} 
                        position={[loc.lat, loc.lng]}
                    >
                        <Popup>
                            <strong>{loc.plate}</strong><br />
                            Company: Toyota (Mock)<br />
                            Status: <span style={{ color: loc.status === 'Driving' ? 'green' : (loc.status === 'Idling' ? 'orange' : 'red') }}>
                                {loc.status}
                            </span><br />
                            Driver: {loc.driver}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;
