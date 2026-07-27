import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import DoctorDashboard from './components/DoctorDashboard'
import Consultation from './components/Consultation'
import LabDashboard from './components/LabDashboard'
import PatientView from './components/PatientView'

function App() {
  const [user, setUser] = useState(null)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/doctor" element={user?.role === 'medecin' || user?.role === 'admin' ? <DoctorDashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/consultation/:patientId" element={user?.role === 'medecin' ? <Consultation user={user} /> : <Navigate to="/" />} />
        <Route path="/lab" element={user?.role === 'laborantin' ? <LabDashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/patient/:code" element={<PatientView />} />
      </Routes>
    </Router>
  )
}
export default App