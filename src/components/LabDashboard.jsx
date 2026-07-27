import { useNavigate } from 'react-router-dom'
import { LogOut, FlaskConical, CheckCircle } from 'lucide-react'

export default function LabDashboard({ user }) {
  const navigate = useNavigate()
  const demandes = [
    { id: 1, patient: 'Jean Kouassi', examen: 'NFS + TDR Palu', medecin: 'Dr. Koné', date: '26 Oct 2023', statut: 'En attente' },
    { id: 2, patient: 'Aminata Traoré', examen: 'Glycémie à jeun', medecin: 'Dr. Koné', date: '26 Oct 2023', statut: 'En attente' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-800 flex items-center gap-2"><FlaskConical className="w-6 h-6" /> AFRIMED - Laboratoire</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Bonjour, {user.name}</span>
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full"><LogOut className="w-5 h-5 text-gray-600" /></button>
        </div>
      </header>
      <main className="p-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100"><h2 className="text-lg font-bold text-gray-800">Demandes d'examens en attente</h2></div>
          <div className="divide-y divide-gray-100">
            {demandes.map(d => (
              <div key={d.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50">
                <div>
                  <h3 className="font-bold text-gray-900">{d.patient}</h3>
                  <p className="text-sm text-gray-600 mt-1">Examen : <span className="font-medium text-purple-700">{d.examen}</span></p>
                  <p className="text-xs text-gray-500 mt-1">Prescrit par {d.medecin} - {d.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">{d.statut}</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Saisir résultats</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}