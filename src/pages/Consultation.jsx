import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PATIENTS_DEMO } from '../data/demoData'
import { obtenirSuggestionsDiagnostiques } from '../services/geminiService'
import PatientBand from '../components/patient/PatientBand'
import ConsultationStepper from '../components/consultation/ConsultationStepper'
import EtapeInterrogatoire from '../components/consultation/EtapeInterrogatoire'
import EtapeExamenClinique from '../components/consultation/EtapeExamenClinique'
import EtapeSignesVitaux from '../components/consultation/EtapeSignesVitaux'
import SuggestionsPanel from '../components/ai/SuggestionsPanel'

function Consultation() {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const patient = PATIENTS_DEMO.find((p) => p.id === patientId)

  const [etapeActive, setEtapeActive] = useState(0)
  const [donnees, setDonnees] = useState({})
  const [suggestions, setSuggestions] = useState(null)
  const [chargementIA, setChargementIA] = useState(false)
  const [decisionsIA, setDecisionsIA] = useState({})
  const [diagnosticRetenu, setDiagnosticRetenu] = useState('')

  if (!patient) {
    return <p className="text-sm text-red-600">Patient introuvable.</p>
  }

  const lancerAnalyseIA = async () => {
    setEtapeActive(3)
    setChargementIA(true)
    try {
      const resultat = await obtenirSuggestionsDiagnostiques(donnees, patient)
      setSuggestions(resultat)
    } finally {
      setChargementIA(false)
    }
  }

  const enregistrerDecision = (nomHypothese, decision) => {
    setDecisionsIA((prec) => ({ ...prec, [nomHypothese]: decision }))
  }

  const cloturerConsultation = () => {
    if (!diagnosticRetenu) return
    navigate(`/prescription/${patient.id}`, {
      state: { donnees, diagnosticRetenu, decisionsIA },
    })
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Consultation guidée</h1>
          <p className="text-xs text-slate-500">Suivi pas à pas pour une consultation complète</p>
        </div>
      </header>

      <PatientBand patient={patient} />
      <ConsultationStepper etapeActive={etapeActive} />

      {etapeActive === 0 && (
        <EtapeInterrogatoire
          donnees={donnees}
          onChange={setDonnees}
          onSuivant={() => setEtapeActive(1)}
        />
      )}

      {etapeActive === 1 && (
        <EtapeExamenClinique
          donnees={donnees}
          onChange={setDonnees}
          onSuivant={() => setEtapeActive(2)}
          onPrecedent={() => setEtapeActive(0)}
        />
      )}

      {etapeActive === 2 && (
        <EtapeSignesVitaux
          donnees={donnees}
          onChange={setDonnees}
          onSuivant={lancerAnalyseIA}
          onPrecedent={() => setEtapeActive(1)}
        />
      )}

      {etapeActive === 3 && (
        <div>
          <SuggestionsPanel
            suggestions={suggestions}
            chargement={chargementIA}
            decisions={decisionsIA}
            onDecision={enregistrerDecision}
          />
          {!chargementIA && suggestions && (
            <div className="flex justify-between mt-6">
              <button onClick={() => setEtapeActive(2)} className="text-sm text-slate-500">
                ← Précédent
              </button>
              <button
                onClick={() => setEtapeActive(4)}
                className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Suivant : Synthèse →
              </button>
            </div>
          )}
        </div>
      )}

      {etapeActive === 4 && (
        <article className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Diagnostic retenu</h3>
          <p className="text-xs text-slate-500 mb-2">
            La consultation ne peut pas être clôturée sans diagnostic retenu.
          </p>
          <input
            type="text"
            value={diagnosticRetenu}
            onChange={(e) => setDiagnosticRetenu(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm mb-4"
            placeholder="Ex : Paludisme simple"
          />
          <div className="flex justify-between">
            <button onClick={() => setEtapeActive(3)} className="text-sm text-slate-500">
              ← Précédent
            </button>
            <button
              onClick={cloturerConsultation}
              disabled={!diagnosticRetenu}
              className="text-sm bg-green-600 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg font-medium"
            >
              Passer à la prescription →
            </button>
          </div>
        </article>
      )}
    </div>
  )
}

export default Consultation
