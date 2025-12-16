// src/data/mockData.js

// Initial data structure to simulate the database
let vehicleMaster = [
    { id: 'V001', plate: 'FLT-882', make: 'Tesla', model: 'Semi', VIN: 'ABC1234567890DEF', isElectric: true, maintenanceSchedule: '2025-05-10' },
    { id: 'V002', plate: 'FLT-01A', make: 'Ford', model: 'Transit', VIN: 'GHI9876543210JKL', isElectric: false, maintenanceSchedule: '2025-06-01' },
    { id: 'V003', plate: 'FLT-55Z', make: 'Volvo', model: 'VNL', VIN: 'MNO123PQR456STU', isElectric: false, maintenanceSchedule: '2025-03-20' },
    { id: 'V004', plate: 'FLT-33B', make: 'Tesla', model: 'Model Y', VIN: 'VWX789YZA012BCD', isElectric: true, maintenanceSchedule: '2025-07-15' },
    { id: 'V005', plate: 'FLT-20C', make: 'Nissan', model: 'NV200', VIN: 'EFG345HIJ678KLM', isElectric: false, maintenanceSchedule: '2025-04-25' },
];

// Initial real-time telemetry state
const initialTelemetry = {
    'V001': { status: 'In Use', battery: 85, fuel: null, speed: 65, lat: 34.0522, lng: -118.2437 },
    'V002': { status: 'Available', battery: null, fuel: 95, speed: 0, lat: 34.0000, lng: -118.0000 },
    'V003': { status: 'Needs Service', battery: null, fuel: 40, speed: 0, lat: 34.1000, lng: -118.3000 },
    'V004': { status: 'Idle', battery: 45, fuel: null, speed: 0, lat: 33.9500, lng: -118.1500 },
    'V005': { status: 'Available', battery: null, fuel: 70, speed: 0, lat: 34.0200, lng: -118.2000 },
};

// --- CRUD Helper Functions ---

const getVehicleById = (id) => {
    return vehicleMaster.find(v => v.id === id);
};

const addVehicle = (newVehicleData) => {
    // Generate new unique ID
    const newId = 'V' + (vehicleMaster.length + 1).toString().padStart(3, '0');
    const newVehicle = {
        id: newId,
        ...newVehicleData,
        maintenanceSchedule: 'N/A' // Default value
    };
    vehicleMaster.push(newVehicle);
    
    // Initialize dummy telemetry for the new vehicle
    initialTelemetry[newId] = { 
        status: 'Available', 
        battery: newVehicle.isElectric ? 100 : null, 
        fuel: newVehicle.isElectric ? null : 100, 
        speed: 0, 
        lat: 34.0000, 
        lng: -118.0000 
    };
    return newVehicle;
};

const updateVehicle = (id, updatedData) => {
    const index = vehicleMaster.findIndex(v => v.id === id);
    if (index !== -1) {
        // Only update the fields provided by the form
        vehicleMaster[index] = { ...vehicleMaster[index], ...updatedData }; 
        return true;
    }
    return false;
};

export { vehicleMaster, initialTelemetry, getVehicleById, addVehicle, updateVehicle };
