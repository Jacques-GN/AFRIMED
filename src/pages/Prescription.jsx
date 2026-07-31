import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Download } from 'lucide-react'
import { obtenirPatientParId } from '../lib/patientsRepository'
import { MEDICAMENTS_DEMO } from '../data/demoData'
import { genererOrdonnancePDF } from '../lib/genererOrdonnancePDF'
import PatientBand from '../components/patient/PatientBand'

function Prescription() {
  const { patientId } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  const [patient, setPatient] = useState(null)
  const [lignes, setLignes] = useState([{ medicament: '', posologie: '', duree: '' }])
  const [passageOutre, setPassageOutre] = useState({})
  const [enregistre, setEnregistre] = useState(false)

  useEffect(() => {
    obtenirPatientParId(patientId).then(setPatient)
  }, [patientId])

  if (!patient) return <p className="text-sm text-slate-400">Chargement...</p>

  const allergieDetectee = (nomMedicament) =>
    (patient.allergies || []).find((a) => nomMedicament.toLowerCase().includes(a.substance.toLowerCase()))

  const majLigne = (index, champ, valeur) => {
    const copie = [...lignes]
    copie[index] = { ...copie[index], [champ]: valeur }
    setLignes(copie)
  }

  const ajouterLigne = () => setLignes([...lignes, { medicament: '', posologie: '', duree: '' }])

  const peutValider = lignes.every((l) => {
    if (!l.medicament) return true
    const alerte = allergieDetectee(l.medicament)
    return !alerte || passageOutre[l.medicament]
  })

  const telechargerPDF = () => {
    genererOrdonnancePDF({ patient, diagnosticRetenu: state?.diagnosticRetenu, lignes })
  }

  if (enregistre) {
    return (
      <div className="max-w-lg">
        <h1 className="text-lg font-bold text-slate-900 mb-4">Ordonnance enregistrée</h1>
        <article className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
          <p className="text-sm font-semibold text-slate-800 mb-1">
            {patient.nom} {patient.prenom} — {patient.codeUnique}
          </p>
          <p className="text-xs text-slate-500 mb-4">Diagnostic : {state?.diagnosticRetenu}</p>
          <ul className="space-y-2 mb-4">
            {lignes.filter((l) => l.medicament).map((l, i) => (
              <li key={i} className="text-sm text-slate-700">
                {l.medicament} — {l.posologie} — {l.duree}
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <button
              onClick={telechargerPDF}
              className="flex items-center gap-2 text-sm bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              <Download size={15} /> Télécharger le PDF
            </button>
            <button
              onClick={() => navigate(`/dossier/${patient.id}`)}
              className="text-sm border border-slate-200 px-4 py-2 rounded-lg"
            >
              Retour au dossier
            </button>
          </div>
        </article>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-lg font-bold text-slate-900 mb-1">Prescription</h1>
      <p className="text-xs text-slate-500 mb-4">Diagnostic retenu : {state?.diagnosticRetenu || '—'}</p>

      <PatientBand patient={patient} />

      <article className="bg-white rounded-2xl border border-slate-200 shadow-soft p-5">
        {lignes.map((ligne, index) => {
          const alerte = ligne.medicament && allergieDetectee(ligne.medicament)
          return (
            <div key={index} className="border border-slate-100 rounded-lg p-3 mb-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select
                  value={ligne.medicament}
                  onChange={(e) => majLigne(index, 'medicament', e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Sélectionner un médicament</option>
                  {MEDICAMENTS_DEMO.map((m) => (
                    <option key={m.nom} value={m.nom}>{m.nom}</option>
                  ))}
                </select>
                <input placeholder="Posologie" value={ligne.posologie}
                  onChange={(e) => majLigne(index, 'posologie', e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                <input placeholder="Durée" value={ligne.duree}
                  onChange={(e) => majLigne(index, 'duree', e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              </div>

              {alerte && (
                <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-red-700">
                    ⚠ Allergie connue : {alerte.substance} (gravité {alerte.gravite})
                  </p>
                  <label className="flex items-center gap-2 text-xs text-red-700 mt-1">
                    <input type="checkbox" checked={!!passageOutre[ligne.medicament]}
                      onChange={(e) => setPassageOutre((prec) => ({ ...prec, [ligne.medicament]: e.target.checked }))} />
                    Prescrire malgré tout (action tracée dans le journal d'audit)
                  </label>
                </div>
              )}
            </div>
          )
        })}

        <button onClick={ajouterLigne} className="text-xs text-green-700 font-medium mb-4">
          + Ajouter un médicament
        </button>

        <div className="flex justify-end">
          <button
            onClick={() => setEnregistre(true)}
            disabled={!peutValider}
            className="text-sm bg-green-600 disabled:bg-slate-300 text-white px-5 py-2 rounded-lg font-medium"
          >
            Valider l'ordonnance
          </button>
        </div>
      </article>
    </div>
  )
}

export default Prescription
