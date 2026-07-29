import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import NouveauPatient from './pages/NouveauPatient'
import DossierMedical from './pages/DossierMedical'
import Consultation from './pages/Consultation'
import Prescription from './pages/Prescription'
import RendezVous from './pages/RendezVous'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nouveau-patient" element={<NouveauPatient />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/dossier/:patientId" element={<DossierMedical />} />
          <Route path="/consultation/:patientId" element={<Consultation />} />
          <Route path="/prescription/:patientId" element={<Prescription />} />
          <Route path="/rendez-vous" element={<RendezVous />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
