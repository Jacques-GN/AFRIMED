import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Brain, AlertTriangle, FileText, Save } from 'lucide-react'
import { mockPatients } from '../services/supabaseClient'
import { getDiagnosticSuggestions } from '../services/geminiService'

export default function Consultation({ user }) {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0]
  const [motif, setMotif] = useState('')
  const [symptomes, setSymptomes] = useState('')
  const [constantes, setConstantes] = useState({ temp: '', ta: '', pouls: '', poids: '' })
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [diagnostic, setDiagnostic] = useState('')

  const handleAiSuggestion = async () => {
    setAiLoading(true)
    const response = await getDiagnosticSuggestions(constantes, symptomes, patient.antecedents, patient.allergies)
    setAiResponse(response)
    setAiLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/doctor')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Consultation</h1>
            <p className="text-sm text-gray-500">Patient: {patient.nom} {patient.prenom} (Code: {patient.code})</p>
          </div>
        </div>
        <div className="flex gap-2">
          {patient.allergies.length > 0 && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-red-100">
              <AlertTriangle className="w-4 h-4" /> Allergie: {patient.allergies.join(', ')}
            </div>
          )}
        </div>
      </header>
      <main className="p-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-blue-600" /> Détails de la consultation</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motif de consultation</label>
                <input type="text" value={motif} onChange={e => setMotif(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Fièvre et maux de tête depuis 3 jours" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Histoire de la maladie & Symptômes</label>
                <textarea value={symptomes} onChange={e => setSymptomes(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24" placeholder="Décrire la chronologie et l'évolution..." />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Temp. (°C)</label><input type="number" step="0.1" value={constantes.temp} onChange={e => setConstantes({...constantes, temp: e.target.value})} className="w-full p-2 border rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Tension (mmHg)</label><input type="text" value={constantes.ta} onChange={e => setConstantes({...constantes, ta: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="120/80" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Pouls (bpm)</label><input type="number" value={constantes.pouls} onChange={e => setConstantes({...constantes, pouls: e.target.value})} className="w-full p-2 border rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label><input type="number" value={constantes.poids} onChange={e => setConstantes({...constantes, poids: e.target.value})} className="w-full p-2 border rounded-lg" /></div>
              </div>
            </div>
          </section>
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Diagnostic & Prescription</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnostic retenu</label>
                <input type="text" value={diagnostic} onChange={e => setDiagnostic(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Diagnostic final" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prescription (Médicaments)</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32" placeholder="Ex: Artéméther-Luméfantrine : 1 comprimé matin et soir pendant 3 jours..." />
              </div>
            </div>
          </section>
        </div>
        <div className="space-y-6">
          <section className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
            <h2 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2"><Brain className="w-5 h-5" /> Assistant IA</h2>
            <p className="text-sm text-indigo-700 mb-4">Obtenez des hypothèses diagnostiques basées sur les données saisies.</p>
            <button onClick={handleAiSuggestion} disabled={aiLoading || !motif} className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
              {aiLoading ? 'Analyse en cours...' : 'Générer des suggestions'}
            </button>
            {aiResponse && (<div className="mt-4 bg-white p-4 rounded-lg border border-indigo-100 text-sm text-gray-700 whitespace-pre-line shadow-sm">{aiResponse}</div>)}
          </section>
          <div className="flex flex-col gap-3">
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 flex justify-center items-center gap-2 shadow-sm"><Save className="w-5 h-5" /> Clôturer et Générer Ordonnance</button>
            <button className="w-full bg-white text-gray-700 border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50">Demander un examen labo</button>
          </div>
        </div>
      </main>
    </div>
  )
}