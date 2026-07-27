import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Calendar, ArrowLeft } from 'lucide-react';
import { mockPatients } from '../services/supabaseClient';

export default function PatientView() {
  const { code } = useParams();
  const navigate = useNavigate();
  const patient = mockPatients.find(p => p.code === code);

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-red-500 mb-2">Code invalide</h2>
          <p className="text-gray-600 mb-6">Aucun dossier ne correspond au code "{code}". Veuillez vérifier le code fourni par votre médecin.</p>
          <button onClick={() => navigate('/login')} className="text-sky-600 hover:underline">Retour à l'accueil</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-sky-500 text-white p-4 flex items-center">
        <button onClick={() => navigate('/login')} className="mr-4"><ArrowLeft className="w-6 h-6" /></button>
        <h1 className="text-xl font-bold">Espace Patient AFRIMED</h1>
      </header>
      <main className="p-6 max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{patient.name}</h2>
          <p className="text-gray-500 text-sm">Code unique : <span className="font-mono bg-gray-100 px-2 py-1 rounded">{patient.code}</span></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-sky-500" /> Informations médicales</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500 block">Allergies</span><span className="font-medium text-red-600">{patient.allergies}</span></div>
              <div><span className="text-gray-500 block">Antécédents</span><span className="font-medium">{patient.history}</span></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center"><Calendar className="w-5 h-5 mr-2 text-sky-500" /> Dernières prescriptions</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-sky-500 pl-3 py-1">
                <p className="font-medium text-sm">Consultation du 20/07/2026</p>
                <p className="text-xs text-gray-500 mt-1">Paracétamol 1g, Artéméther-Luméfantrine</p>
                <button className="text-sky-600 text-xs mt-2 hover:underline">Télécharger l'ordonnance (PDF)</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}