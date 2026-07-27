import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, Activity, Clock, PlusCircle } from 'lucide-react';
import { mockPatients, mockLabRequests } from '../services/supabaseClient';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const pendingLabs = mockLabRequests.filter(r => r.status === 'Terminé').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-sky-600">AFRIMED - Espace Médecin</h1>
        <button onClick={() => navigate('/login')} className="flex items-center text-gray-600 hover:text-red-500">
          <LogOut className="w-5 h-5 mr-1" /> Déconnexion
        </button>
      </header>
      <main className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-sky-500">
            <div className="flex items-center justify-between">
              <div><p className="text-gray-500 text-sm">Consultations aujourd'hui</p><p className="text-3xl font-bold">8</p></div>
              <Users className="w-10 h-10 text-sky-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div><p className="text-gray-500 text-sm">Résultats labo reçus</p><p className="text-3xl font-bold">{pendingLabs}</p></div>
              <Activity className="w-10 h-10 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-400">
            <div className="flex items-center justify-between">
              <div><p className="text-gray-500 text-sm">Suivis en retard</p><p className="text-3xl font-bold">2</p></div>
              <Clock className="w-10 h-10 text-orange-400 opacity-50" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Patients récents</h2>
          <button onClick={() => navigate('/doctor/consultation/new')} className="bg-sky-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-sky-600 transition">
            <PlusCircle className="w-5 h-5 mr-2" /> Nouveau dossier
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr><th className="p-4">Code</th><th className="p-4">Nom du patient</th><th className="p-4">Dernière visite</th><th className="p-4">Action</th></tr>
            </thead>
            <tbody>
              {mockPatients.map(patient => (
                <tr key={patient.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm">{patient.code}</td>
                  <td className="p-4 font-medium">{patient.name}</td>
                  <td className="p-4 text-gray-500 text-sm">2026-07-20</td>
                  <td className="p-4">
                    <button onClick={() => navigate(`/doctor/consultation/${patient.id}`)} className="text-sky-600 hover:underline text-sm font-medium">Ouvrir le dossier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}