import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './services/authContext'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Login from './pages/Login'
import Layout from './components/layout/Layout'
import LayoutLaborantin from './components/layout/LayoutLaborantin'
import LayoutAdmin from './components/layout/LayoutAdmin'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import NouveauPatient from './pages/NouveauPatient'
import DossierMedical from './pages/DossierMedical'
import Consultation from './pages/Consultation'
import Prescription from './pages/Prescription'
import RendezVous from './pages/RendezVous'
import IAClinique from './pages/IAClinique'
import TableauBordLaborantin from './pages/laborantin/TableauBordLaborantin'
import HistoriqueLaborantin from './pages/laborantin/HistoriqueLaborantin'
import TableauBordAdmin from './pages/admin/TableauBordAdmin'
import GestionComptes from './pages/admin/GestionComptes'
import AccesParCode from './pages/patient/AccesParCode'
import EspacePatient from './pages/patient/EspacePatient'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Profil médecin */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nouveau-patient" element={<NouveauPatient />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/dossier/:patientId" element={<DossierMedical />} />
            <Route path="/consultation/:patientId" element={<Consultation />} />
            <Route path="/prescription/:patientId" element={<Prescription />} />
            <Route path="/rendez-vous" element={<RendezVous />} />
            <Route path="/ia-clinique" element={<IAClinique />} />
          </Route>

          {/* Profil laborantin */}
          <Route element={<ProtectedRoute><LayoutLaborantin /></ProtectedRoute>}>
            <Route path="/laborantin" element={<TableauBordLaborantin />} />
            <Route path="/laborantin/historique" element={<HistoriqueLaborantin />} />
          </Route>

          {/* Profil administrateur */}
          <Route element={<ProtectedRoute><LayoutAdmin /></ProtectedRoute>}>
            <Route path="/admin" element={<TableauBordAdmin />} />
            <Route path="/admin/comptes" element={<GestionComptes />} />
          </Route>

          {/* Accès patient (sans compte, par code unique) */}
          <Route path="/patient" element={<AccesParCode />} />
          <Route path="/patient/espace/:patientId" element={<EspacePatient />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
