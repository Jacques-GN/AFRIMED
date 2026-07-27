import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';
import Consultation from './pages/Consultation';
import LabDashboard from './pages/LabDashboard';
import PatientView from './pages/PatientView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/consultation/:patientId?" element={<Consultation />} />
        <Route path="/lab" element={<LabDashboard />} />
        <Route path="/patient/:code" element={<PatientView />} />
      </Routes>
    </Router>
  );
}

export default App;