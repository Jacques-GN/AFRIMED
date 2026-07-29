import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenirPatientParId } from '../lib/patientsRepository'
import PatientBand from '../components/patient/PatientBand'

function DossierMedical() {
  const { patientId } = useParams()
  const [patient, setPatient] = useState(null)
  const [chargement, setChargement] = useState(true)

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
        <Link to={`/consultation/${patient.id}`} className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
          Nouvelle consultation
        </Link>
      </header>
      <p className="text-xs text-slate-500 mb-4">
        Historique complet, centralisé, accessible avec le code médical du patient
      </p>

      <PatientBand patient={patient} />

      <div className="grid grid-cols-3 gap-6">
        <article className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm font-semibold text-slate-800 mb-3">Historique des consultations</p>
          <div className="space-y-3">
            {patient.historique.map((h) => (
              <div key={h.date} className="border border-slate-100 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">{h.date}</p>
                <p className="text-sm font-medium text-slate-800">{h.motif}</p>
                <p className="text-xs text-slate-500">{h.diagnostic}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-800 mb-2">Antécédents</p>
            {patient.antecedents.length === 0 ? (
              <p className="text-xs text-slate-500">Aucun antécédent connu</p>
            ) : (
              patient.antecedents.map((a) => <p key={a} className="text-xs text-slate-500">{a}</p>)
            )}
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-800 mb-2">Allergies</p>
            {patient.allergies.length === 0 ? (
              <p className="text-xs text-slate-500">Aucune allergie connue</p>
            ) : (
              patient.allergies.map((a) => (
                <p key={a.substance} className="text-xs text-red-600">
                  {a.substance} — gravité {a.gravite}
                </p>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default DossierMedical
