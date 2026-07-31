import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Info, HelpCircle } from 'lucide-react'
import { obtenirPatientParId } from '../lib/patientsRepository'
import PatientBand from '../components/patient/PatientBand'
import ConsultationStepper from '../components/consultation/ConsultationStepper'
import EtapeInterrogatoire from '../components/consultation/EtapeInterrogatoire'
import EtapeExamenClinique from '../components/consultation/EtapeExamenClinique'
import EtapeSignesVitaux from '../components/consultation/EtapeSignesVitaux'
import EtapeOrientation from '../components/consultation/EtapeOrientation'
import EtapeSynthese from '../components/consultation/EtapeSynthese'
import AIAssistanceSidebar from '../components/consultation/AIAssistanceSidebar'

function Consultation() {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [chargementPatient, setChargementPatient] = useState(true)
  const [etapeActive, setEtapeActive] = useState(0)
  const [donnees, setDonnees] = useState({})
  const [diagnosticRetenu, setDiagnosticRetenu] = useState('')
  const [aideVisible, setAideVisible] = useState(true)

  useEffect(() => {
    obtenirPatientParId(patientId).then((p) => {
      setPatient(p)
      setChargementPatient(false)
    })
  }, [patientId])

  if (chargementPatient) return <p className="text-sm text-slate-400">Chargement...</p>
  if (!patient) return <p className="text-sm text-red-600">Patient introuvable.</p>

  const cloturerConsultation = () => {
    if (!diagnosticRetenu) return
    navigate(`/prescription/${patient.id}`, {
      state: { donnees, diagnosticRetenu },
    })
  }

  const rendreEtape = () => {
    const props = { donnees, onChange: setDonnees }
    switch (etapeActive) {
      case 0:
        return <EtapeInterrogatoire {...props} onSuivant={() => setEtapeActive(1)} />
      case 1:
        return (
          <EtapeExamenClinique
            {...props}
            onSuivant={() => setEtapeActive(2)}
            onPrecedent={() => setEtapeActive(0)}
          />
        )
      case 2:
        return (
          <EtapeSignesVitaux
            {...props}
            onSuivant={() => setEtapeActive(3)}
            onPrecedent={() => setEtapeActive(1)}
          />
        )
      case 3:
        return (
          <EtapeOrientation
            {...props}
            onSuivant={() => setEtapeActive(4)}
            onPrecedent={() => setEtapeActive(2)}
          />
        )
      case 4:
        return (
          <EtapeSynthese
            {...props}
            patient={patient}
            diagnosticRetenu={diagnosticRetenu}
            onDiagnosticChange={setDiagnosticRetenu}
            onCloturer={cloturerConsultation}
            onPrecedent={() => setEtapeActive(3)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Consultation guidée</h1>
            <p className="text-xs text-slate-500">Suivi pas à pas pour une consultation complète</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAideVisible(!aideVisible)}
            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Aide"
          >
            <HelpCircle size={18} />
          </button>
          <button
            onClick={() => navigate('/ia-clinique', { state: { patient, donnees } })}
            className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Terminer la consultation
          </button>
        </div>
      </header>

      <PatientBand patient={patient} />
      <ConsultationStepper etapeActive={etapeActive} />

      <div className="flex gap-6">
        <main className="flex-1 min-w-0" style={{ flex: '65%' }}>
          {rendreEtape()}
        </main>
        {aideVisible && (
          <aside className="hidden lg:block" style={{ flex: '35%' }}>
            <AIAssistanceSidebar patient={patient} />
          </aside>
        )}
      </div>
    </div>
  )
}

export default Consultation
