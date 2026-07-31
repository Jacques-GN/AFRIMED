import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Brain, Info, ArrowLeft, HelpCircle, Pencil, FileText, Save, CheckCircle2, AlertTriangle } from 'lucide-react'
import { obtenirSuggestionsDiagnostiques } from '../services/geminiService'
import { PATIENTS_DEMO } from '../data/demoData'
import PatientBandIA from '../components/ia/PatientBandIA'
import HypothesesDiagnostics from '../components/ia/HypothesesDiagnostics'
import ConduiteATenir from '../components/ia/ConduiteATenir'
import ExamensEtUrgence from '../components/ia/ExamensEtUrgence'

function RiskGauge({ value = 65 }) {
  const centerX = 120
  const centerY = 130
  const radius = 100
  const startAngle = Math.PI
  const endAngle = 0

  const getCoordinates = (angle) => ({
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  })

  const needleAngle = startAngle - (value / 100) * Math.PI
  const needleEnd = {
    x: centerX + (radius - 20) * Math.cos(needleAngle),
    y: centerY + (radius - 20) * Math.sin(needleAngle),
  }

  const arcPath = (start, end) => {
    const s = getCoordinates(start)
    const e = getCoordinates(end)
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 0 1 ${e.x} ${e.y}`
  }

  return (
    <svg width="240" height="140" viewBox="0 0 240 140">
      {/* Green zone */}
      <path d={arcPath(startAngle, startAngle - Math.PI / 3)} fill="none" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" />
      {/* Yellow zone */}
      <path d={arcPath(startAngle - Math.PI / 3, startAngle - 2 * Math.PI / 3)} fill="none" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" />
      {/* Red zone */}
      <path d={arcPath(startAngle - 2 * Math.PI / 3, endAngle)} fill="none" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
      {/* Needle */}
      <line x1={centerX} y1={centerY} x2={needleEnd.x} y2={needleEnd.y} stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={centerX} cy={centerY} r="5" fill="#1E293B" />
      {/* Labels */}
      <text x="30" y="135" className="text-[10px]" fill="#22C55E" fontWeight="600">Faible</text>
      <text x="95" y="135" className="text-[10px]" fill="#F59E0B" fontWeight="600">Modéré</text>
      <text x="175" y="135" className="text-[10px]" fill="#EF4444" fontWeight="600">Élevé</text>
    </svg>
  )
}

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
        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
          <Brain size={28} className="text-green-600 animate-pulse" />
        </div>
        <div className="w-8 h-8 border-3 border-green-100 border-t-green-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Analyse des données cliniques en cours...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Brain size={22} className="text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Analyse IA Clinique</h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">IA</span>
            </div>
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
            Retour
          </button>
        </div>
      </header>

      {/* Patient Info Card */}
      <PatientBandIA patient={patientActif} donnees={donneesActives} />

      {/* 2-column layout */}
      <div className="flex gap-6">
        {/* Left column - 65% */}
        <main className="flex-1 min-w-0" style={{ flex: '65%' }}>
          <div className="space-y-4">
            <HypothesesDiagnostics suggestions={suggestions} />
            <ConduiteATenir />
          </div>
        </main>

        {/* Right column - 35% */}
        <aside className="hidden lg:block" style={{ flex: '35%' }}>
          <div className="space-y-4">
            <ExamensEtUrgence suggestions={suggestions} />

            {/* Risk Gauge */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">Jauge de risque</h3>
              </div>
              <div className="flex justify-center">
                <RiskGauge value={65} />
              </div>
              <div className="text-center mt-2">
                <span className="text-sm font-bold text-amber-600">Risque modéré</span>
                <p className="text-xs text-slate-500 mt-1">Surveillance clinique recommandée</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Action buttons */}
      <footer className="flex items-center gap-3 mt-8 pt-4 border-t border-slate-200">
        <button
          onClick={() => navigate(-1)}
          className="text-sm border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <Pencil size={14} />
          Modifier les données
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
