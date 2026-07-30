import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { User, Heart, Pill, Stethoscope, FileStack } from 'lucide-react'
import { obtenirPatientParId } from '../lib/patientsRepository'
import PatientBand from '../components/patient/PatientBand'
import {
  InformationsAdmin, AntecedentsPersonnels, AntecedentsFamiliaux,
  Allergies, TraitementsChroniques, HistoriqueConsultations,
} from '../components/patient/DossierSections'
import {
  Vaccination, HabitudesDeVie, Hospitalisations, Imagerie, DocumentsMedicaux,
} from '../components/patient/DossierSectionsV2'

const ONGLETS = [
  { id: 'dossier', label: 'Dossier', icon: User },
  { id: 'sante', label: 'Santé', icon: Heart },
  { id: 'traitements', label: 'Traitements', icon: Pill },
  { id: 'historique', label: 'Historique', icon: Stethoscope },
  { id: 'documents', label: 'Documents', icon: FileStack },
]

function OngletBouton({ onglet, actif, onClick }) {
  const Icon = onglet.icon
  return (
    <button
      onClick={() => onClick(onglet.id)}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
        actif
          ? 'bg-green-600 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={14} />
      {onglet.label}
    </button>
  )
}

function ContenuOnglet({ id, patient }) {
  switch (id) {
    case 'dossier':
      return <InformationsAdmin patient={patient} />
    case 'sante':
      return (
        <div className="space-y-4">
          <AntecedentsPersonnels patient={patient} />
          <AntecedentsFamiliaux patient={patient} />
          <Allergies patient={patient} />
        </div>
      )
    case 'traitements':
      return (
        <div className="space-y-4">
          <TraitementsChroniques patient={patient} />
          <Vaccination />
          <HabitudesDeVie />
        </div>
      )
    case 'historique':
      return (
        <div className="space-y-4">
          <HistoriqueConsultations patient={patient} />
          <Hospitalisations />
        </div>
      )
    case 'documents':
      return (
        <div className="space-y-4">
          <Imagerie />
          <DocumentsMedicaux />
        </div>
      )
    default:
      return null
  }
}

function DossierMedical() {
  const { patientId } = useParams()
  const [patient, setPatient] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [ongletActif, setOngletActif] = useState('dossier')

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
      <header className="flex items-center justify-between mb-1">
        <h1 className="text-lg font-bold text-slate-900">Dossier médical</h1>
        <Link
          to={`/consultation/${patient.id}`}
          className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Nouvelle consultation
        </Link>
      </header>
      <p className="text-xs text-slate-500 mb-4">
        Historique complet, centralisé, accessible avec le code médical du patient
      </p>

      <PatientBand patient={patient} />

      <nav className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
        {ONGLETS.map((o) => (
          <OngletBouton key={o.id} onglet={o} actif={ongletActif === o.id} onClick={setOngletActif} />
        ))}
      </nav>

      <ContenuOnglet id={ongletActif} patient={patient} />
    </div>
  )
}

export default DossierMedical
