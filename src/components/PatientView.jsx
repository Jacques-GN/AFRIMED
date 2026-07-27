import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Pill, AlertTriangle } from 'lucide-react'
import { mockPatients } from '../services/supabaseClient'

export default function PatientView() {
  const { code } = useParams()
  const navigate = useNavigate()
  const patient = mockPatients.find(p => p.code === code)

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Code patient introuvable</h2>
          <p className="text-gray-600 mb-4">Veuillez vérifier le code unique fourni par votre médecin.</p>
          <button onClick={() => navigate('/')} className="text-blue-600 font-medium hover:underline">Retour à l'accueil</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
        <h1 className="text-xl font-bold text-gray-800">Mon Dossier Médical</h1>
      </header>
      <main className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold">{patient.prenom} {patient.nom}</h2>
          <p className="text-blue-100 mt-1">Code unique : {patient.code} - {patient.age} ans</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500" /> Allergies & Antécédents</h3>
          <div className="space-y-3">
            <div><span className="text-sm font-medium text-gray-500">Allergies connues</span><p className="text-gray-900">{patient.allergies.length > 0 ? patient.allergies.join(', ') : 'Aucune'}</p></div>
            <div><span className="text-sm font-medium text-gray-500">Antécédents médicaux</span><p className="text-gray-900">{patient.antecedents.length > 0 ? patient.antecedents.join(', ') : 'Aucun'}</p></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-blue-500" /> Dernières consultations</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <p className="font-medium text-gray-900">25 Octobre 2023</p>
              <p className="text-sm text-gray-600">Motif : Fièvre et maux de tête</p>
              <p className="text-sm text-gray-800 mt-1">Diagnostic : Paludisme simple</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><Pill className="w-5 h-5 text-purple-500" /> Ordonnances en cours</h3>
          <p className="text-sm text-gray-600 mb-2">Prescrite le 25/10/2023 par Dr. Koné</p>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Artéméther-Luméfantrine : 1 cp matin et soir x 3 jours</li>
            <li>Paracétamol 1000mg : 1 cp toutes les 8 heures en cas de fièvre</li>
          </ul>
        </div>
      </main>
    </div>
  )
}