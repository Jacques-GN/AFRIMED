import { useNavigate } from 'react-router-dom'
import { Users, Activity, Clock, LogOut, Search, Plus } from 'lucide-react'
import { mockPatients } from '../services/supabaseClient'

export default function DoctorDashboard({ user }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-800">AFRIMED - Espace Médecin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Bienvenue, {user.name}</span>
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full"><LogOut className="w-5 h-5 text-gray-600" /></button>
        </div>
      </header>
      <main className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2"><div className="bg-blue-100 p-2 rounded-lg"><Activity className="w-6 h-6 text-blue-600" /></div><h3 className="font-semibold text-gray-700">Consultations du jour</h3></div>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2"><div className="bg-yellow-100 p-2 rounded-lg"><Clock className="w-6 h-6 text-yellow-600" /></div><h3 className="font-semibold text-gray-700">Résultats en attente</h3></div>
            <p className="text-3xl font-bold text-gray-900">3</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2"><div className="bg-green-100 p-2 rounded-lg"><Users className="w-6 h-6 text-green-600" /></div><h3 className="font-semibold text-gray-700">Patients enregistrés</h3></div>
            <p className="text-3xl font-bold text-gray-900">{mockPatients.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Patients récents</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Rechercher..." className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700"><Plus className="w-4 h-4" /> Nouveau</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr><th className="px-6 py-3 font-medium">Code</th><th className="px-6 py-3 font-medium">Nom & Prénom</th><th className="px-6 py-3 font-medium">Âge</th><th className="px-6 py-3 font-medium">Dernière visite</th><th className="px-6 py-3 font-medium">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockPatients.map(patient => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-blue-600">{patient.code}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{patient.nom} {patient.prenom}</td>
                    <td className="px-6 py-4 text-gray-600">{patient.age} ans</td>
                    <td className="px-6 py-4 text-gray-600">25 Oct 2023</td>
                    <td className="px-6 py-4"><button onClick={() => navigate(`/consultation/${patient.id}`)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Consulter</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}