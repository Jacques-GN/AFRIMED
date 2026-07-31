import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Brain, Info, ArrowLeft, HelpCircle, Pencil, FileText, Save } from 'lucide-react'
import { obtenirSuggestionsDiagnostiques } from '../services/geminiService'
import { PATIENTS_DEMO } from '../data/demoData'
import PatientBandIA from '../components/ia/PatientBandIA'
import HypothesesDiagnostics from '../components/ia/HypothesesDiagnostics'
import ConduiteATenir from '../components/ia/ConduiteATenir'
import ExamensEtUrgence from '../components/ia/ExamensEtUrgence'

function IAClinique() {
  const location = useLocation()
  const navigate = useNavigate()
  const { patient, donnees } = location.state || {}

  const patientActif = patient || PATIENTS_DEMO[0]
  const donneesActives = donnees || { motif: 'Fièvre', symptomes: ['Frissons', 'Céphalées'], constantes: { temperature: '38.9' } }

  const [suggestions, setSuggestions] = useState(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    obtenirSuggestionsDiagnostiques(donneesActives, patientActif).then((resultat) => {
      setSuggestions(resultat)
      setChargement(false)
    })
  }, [])

  if (chargement) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
          <Brain size={24} className="text-green-600 animate-pulse" />
        </div>
        <div className="w-8 h-8 border-3 border-green-100 border-t-green-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Analyse des données cliniques en cours...</p>
      </div>
    )
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <Brain size={22} className="text-green-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">IA CLINIQUE AFRIMED</h1>
            <p className="text-xs text-slate-500">Analyse intelligente des données cliniques</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Aide"
          >
            <HelpCircle size={18} />
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-slate-600 hover:text-slate-800 font-medium flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={16} />
            Retour à la consultation
          </button>
        </div>
      </header>

      <PatientBandIA patient={patientActif} donnees={donneesActives} />

      <div className="flex gap-6">
        <main style={{ flex: '60%' }}>
          <div className="space-y-4">
            <HypothesesDiagnostics suggestions={suggestions} />
            <ConduiteATenir />
          </div>
        </main>
        <aside style={{ flex: '40%' }}>
          <ExamensEtUrgence suggestions={suggestions} />
        </aside>
      </div>

      <footer className="flex items-center gap-3 mt-8 pt-4 border-t border-slate-200">
        <button
          onClick={() => navigate(-1)}
          className="text-sm border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <Pencil size={14} />
          Modifier les données cliniques
        </button>
        <button
          onClick={() => navigate(`/dossier/${patientActif.id}`)}
          className="text-sm border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <FileText size={14} />
          Voir le dossier médical
        </button>
        <button
          className="text-sm bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 ml-auto"
        >
          <Save size={14} />
          Enregistrer dans le dossier
        </button>
      </footer>
    </div>
  )
}

export default IAClinique
