// src/data/locationMockData.js

// Mock data for vehicle locations (used by MapView)
const vehicleLocations = [
    { id: '1', plate: 'TS 09 R 1234', lat: 17.4065, lng: 78.4772, status: 'Driving', driver: 'Arjun Reddy' },
    { id: '2', plate: 'KA 01 A 5678', lat: 12.9716, lng: 77.5946, status: 'Idling', driver: 'Priya Sharma' },
    { id: '3', plate: 'MH 02 Z 9012', lat: 19.0760, lng: 72.8777, status: 'Maintenance', driver: 'N/A' },
    { id: '4', plate: 'DL 05 S 3456', lat: 28.7041, lng: 77.1025, status: 'Driving', driver: 'Vikram Singh' },
    { id: '5', plate: 'TN 10 B 7890', lat: 13.0827, lng: 80.2707, status: 'Idling', driver: 'Kavita Nair' }
];

// Mock data for vehicle inventory list (used by VehicleInventory)
const inventoryList = [
    // Added totalDistance and currentSpeed for new simulation
    { id: 1, plate: 'TS 09 R 1234', make: 'Ashok Leyland', model: 'Dost', status: 'In Service', driverName: 'Arjun Reddy', efficiency: '7.5 MPG', fuelType: 'Diesel', currentBattery: 85, totalDistance: 950, currentSpeed: 0 },
    { id: 2, plate: 'KA 01 A 5678', make: 'Tata Motors', model: 'Ace', status: 'Idling', driverName: 'Priya Sharma', efficiency: '6.9 MPG', fuelType: 'Petrol', currentBattery: 95, totalDistance: 100, currentSpeed: 0 },
    { id: 3, plate: 'MH 02 Z 9012', make: 'Mahindra', model: 'Bolero', status: 'Maintenance', driverName: 'N/A', efficiency: 'N/A', fuelType: 'Diesel', currentBattery: 100, totalDistance: 1005, currentSpeed: 0 },
    { id: 4, plate: 'DL 05 S 3456', make: 'TATA', model: 'ACE EV', status: 'In Service', driverName: 'Vikram Singh', efficiency: 'N/A', fuelType: 'Electric', currentBattery: 45, totalDistance: 800, currentSpeed: 0 },
    { id: 5, plate: 'TN 10 B 7890', make: 'BharatBenz', model: '914', status: 'In Service', driverName: 'Kavita Nair', efficiency: '7.1 MPG', fuelType: 'Diesel', currentBattery: 78, totalDistance: 1500, currentSpeed: 0 },
    { id: 6, plate: 'GJ 06 H 0011', make: 'Volvo', model: 'Eicher', status: 'Off-Road', driverName: 'Rohan Deshmukh', efficiency: '5.5 MPG', fuelType: 'Electric', currentBattery: 100, totalDistance: 20, currentSpeed: 0 },
];

export const getVehicleLocations = () => vehicleLocations;
export const getInventoryList = () => inventoryList;

// Mock function to simulate creating an alert (database record)
export const createAlert = (plate, type, details) => {
    const timestamp = new Date().toLocaleTimeString();
    console.warn(`[ALERT SERVICE] - Vehicle ${plate} triggered ALERT: ${type} at ${timestamp}. Details: ${details}`);
    return { plate, type, details, timestamp };
};
