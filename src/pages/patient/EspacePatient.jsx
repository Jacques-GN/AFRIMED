import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { obtenirPatientParId } from '../../lib/patientsRepository'

function EspacePatient() {
  const { patientId } = useParams()
  const [patient, setPatient] = useState(null)

  useEffect(() => {
    obtenirPatientParId(patientId).then(setPatient)
  }, [patientId])

  if (!patient) return <p className="p-8 text-sm text-slate-400">Chargement...</p>

  return (
    <div className="min-h-screen bg-slate-50 p-5 sm:p-8 max-w-2xl mx-auto">
      <header className="mb-6">
        <h1 className="text-lg font-bold text-slate-900">
          Bonjour {patient.prenom} {patient.nom}
        </h1>
        <p className="text-xs text-slate-500">Code : {patient.codeUnique}</p>
      </header>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-soft p-5 mb-4">
        <h2 className="text-sm font-semibold text-slate-800 mb-3">Mes informations</h2>
        <p className="text-xs text-slate-500 mb-1">
          Antécédents : {patient.antecedents?.length ? patient.antecedents.join(', ') : 'Aucun connu'}
        </p>
        <p className="text-xs text-slate-500">
          Allergies : {patient.allergies?.length
            ? patient.allergies.map((a) => a.substance).join(', ')
            : 'Aucune connue'}
        </p>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-soft p-5">
        <h2 className="text-sm font-semibold text-slate-800 mb-3">Mes consultations passées</h2>
        {(patient.historique || []).length === 0 && (
          <p className="text-xs text-slate-500">Aucune consultation enregistrée.</p>
        )}
        <div className="space-y-3">
          {(patient.historique || []).map((h) => (
            <div key={h.date} className="border border-slate-100 rounded-lg p-3">
              <p className="text-xs text-slate-400">{h.date}</p>
              <p className="text-sm font-medium text-slate-800">{h.motif}</p>
              <p className="text-xs text-slate-500">{h.diagnostic}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-[11px] text-slate-400 text-center mt-6">
        Vous ne voyez pas les notes cliniques internes de votre médecin ni les
        hypothèses diagnostiques intermédiaires.
      </p>
    </div>
  )
}

export default EspacePatient
