import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { User, Heart, Pill, Stethoscope, FileStack, AlertTriangle, ShieldCheck, Cloud, CheckCircle2 } from 'lucide-react'
import { obtenirPatientParId } from '../lib/patientsRepository'
import {
  InformationsAdmin, AntecedentsPersonnels, AntecedentsFamiliaux,
  Allergies, TraitementsChroniques, HistoriqueConsultations,
} from '../components/patient/DossierSections'
import {
  Vaccination, HabitudesDeVie, Hospitalisations, Imagerie, DocumentsMedicaux,
} from '../components/patient/DossierSectionsV2'

const ONGLETS = [
  { id: 'synthese', label: 'Synthèse', icon: User },
  { id: 'historique', label: 'Historique médical', icon: Stethoscope },
  { id: 'allergies', label: 'Allergies', icon: AlertTriangle },
  { id: 'rapports', label: 'Rapports et résultats', icon: FileStack },
  { id: 'traitements', label: 'Traitements en cours', icon: Pill },
]

const PROBLEMES_ACTIFS = [
  { nom: 'Hypertension artérielle', status: 'stable', depuis: 'Jan 2025' },
  { nom: 'Diabète type 2', status: 'attention', depuis: 'Mars 2024' },
]

const ALERTES = [
  { texte: 'Allergie à la pénicilline confirmée', niveau: 'danger' },
  { texte: 'Tension artérielle élevée au dernier contrôle', niveau: 'warning' },
]

const CHRONOLOGIE = [
  { date: '28 Juil 2026', evenement: 'Consultation — Fièvre et céphalées', type: 'consultation' },
  { date: '15 Juil 2026', evenement: 'Analyse de sang — NFS, Glycémie', type: 'analyse' },
  { date: '02 Juil 2026', evenement: 'Consultation de suivi — HTA', type: 'consultation' },
  { date: '20 Juin 2026', evenement: 'Radiographie thoracique', type: 'imagerie' },
  { date: '05 Juin 2026', evenement: 'Prescription — Metformine 500mg', type: 'prescription' },
]

function DossierMedical() {
  const { patientId } = useParams()
  const [patient, setPatient] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [ongletActif, setOngletActif] = useState('synthese')

  useEffect(() => {
    obtenirPatientParId(patientId).then((p) => {
      setPatient(p)
      setChargement(false)
    })
  }, [patientId])

  if (chargement) return <p className="text-sm text-slate-400">Chargement...</p>
  if (!patient) return <p className="text-sm text-red-600">Patient introuvable.</p>

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Dossier médical</h1>
        <Link
          to={`/consultation/${patient.id}`}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          Nouvelle consultation
        </Link>
      </header>

      {/* Patient Identity Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-lg font-bold">
            {patient.nom?.[0]}{patient.prenom?.[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{patient.nom} {patient.prenom}</h2>
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                Dossier actif
              </span>
            </div>
            <p className="text-sm text-slate-500">{patient.age ? `${patient.age} ans` : ''} {patient.sexe ? `· ${patient.sexe}` : ''} · Code : {patient.codeUnique}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-1.5">
          <Cloud size={14} className="text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Synchronisé</span>
          <CheckCircle2 size={12} className="text-green-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main content */}
        <div className="lg:col-span-2">
          {/* Tab Navigation */}
          <nav className="flex gap-6 border-b border-slate-200 mb-6 overflow-x-auto">
            {ONGLETS.map((o) => {
              const Icon = o.icon
              const actif = ongletActif === o.id
              return (
                <button
                  key={o.id}
                  onClick={() => setOngletActif(o.id)}
                  className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    actif
                      ? 'border-green-500 text-green-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon size={16} />
                  {o.label}
                </button>
              )
            })}
          </nav>

          {/* Tab Content */}
          {ongletActif === 'synthese' && (
            <div className="space-y-6">
              <InformationsAdmin patient={patient} />
              <AntecedentsPersonnels patient={patient} />
              <AntecedentsFamiliaux patient={patient} />
            </div>
          )}
          {ongletActif === 'historique' && (
            <div className="space-y-4">
              <HistoriqueConsultations patient={patient} />
              <Hospitalisations />
            </div>
          )}
          {ongletActif === 'allergies' && (
            <Allergies patient={patient} />
          )}
          {ongletActif === 'rapports' && (
            <div className="space-y-4">
              <Imagerie />
              <DocumentsMedicaux />
            </div>
          )}
          {ongletActif === 'traitements' && (
            <div className="space-y-4">
              <TraitementsChroniques patient={patient} />
              <Vaccination />
              <HabitudesDeVie />
            </div>
          )}
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-4">
          {/* Active Problems */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Problèmes actifs</h3>
            <div className="space-y-3">
              {PROBLEMES_ACTIFS.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${p.status === 'stable' ? 'bg-green-500' : 'bg-orange-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{p.nom}</p>
                    <p className="text-xs text-slate-500">Depuis {p.depuis}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Alerts */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Alertes médicales</h3>
            <div className="space-y-3">
              {ALERTES.map((a, i) => (
                <div key={i} className={`flex items-start gap-2 p-2.5 rounded-lg ${a.niveau === 'danger' ? 'bg-red-50' : 'bg-amber-50'}`}>
                  <AlertTriangle size={14} className={a.niveau === 'danger' ? 'text-red-600' : 'text-amber-600'} />
                  <p className={`text-xs font-medium ${a.niveau === 'danger' ? 'text-red-700' : 'text-amber-700'}`}>{a.texte}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Chronologie récente</h3>
            <div className="relative pl-5">
              {/* Vertical line */}
              <div className="absolute left-1.5 top-1 bottom-1 w-0.5 bg-slate-200" />
              {CHRONOLOGIE.map((evt, i) => (
                <div key={i} className="relative mb-4 last:mb-0">
                  <span className="absolute -left-3.5 top-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300" />
                  <p className="text-xs font-medium text-slate-500">{evt.date}</p>
                  <p className="text-sm font-medium text-slate-800">{evt.evenement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Security footer */}
      <footer className="mt-8 flex items-center justify-center gap-1.5 text-xs text-slate-400 pb-4">
        <ShieldCheck size={12} />
        Dossier médical sécurisé — Accès réservé aux professionnels de santé
      </footer>
    </div>
  )
}

export default DossierMedical
