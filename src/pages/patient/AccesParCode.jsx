import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenirPatientParCode } from '../../lib/patientsRepository'

function AccesParCode() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [erreur, setErreur] = useState(null)
  const [recherche, setRecherche] = useState(false)

  const accederAuDossier = async (e) => {
    e.preventDefault()
    setRecherche(true)
    setErreur(null)
    const patient = await obtenirPatientParCode(code.trim().toUpperCase())
    setRecherche(false)

    if (!patient) {
      setErreur("Code introuvable. Vérifiez le code communiqué par votre médecin.")
      return
    }
    navigate(`/patient/espace/${patient.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1E3D] to-[#0A1830] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-elevated p-8 w-full max-w-sm text-center">
        <h1 className="text-xl font-extrabold mb-1">
          <span className="text-green-600">AFRI</span>
          <span className="text-blue-600">MED</span>
        </h1>
        <p className="text-xs text-slate-500 mb-6">Accédez à votre dossier médical</p>

        <form onSubmit={accederAuDossier}>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex : AFR-000125"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-center font-mono mb-3"
          />
          {erreur && <p className="text-xs text-red-600 mb-3">{erreur}</p>}
          <button
            type="submit"
            disabled={recherche || !code.trim()}
            className="w-full bg-green-600 disabled:bg-slate-300 text-white text-sm font-medium py-2.5 rounded-lg"
          >
            {recherche ? 'Recherche...' : 'Accéder à mon dossier'}
          </button>
        </form>

        <p className="text-[11px] text-slate-400 mt-5">
          Code perdu ? Contactez votre médecin ou l'établissement pour le récupérer.
        </p>
      </div>
    </div>
  )
}

export default AccesParCode
