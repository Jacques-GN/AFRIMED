import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listerPatients } from '../lib/patientsRepository'

function Patients() {
  const [patients, setPatients] = useState([])
  const [chargement, setChargement] = useState(true)
  const [recherche, setRecherche] = useState('')

  useEffect(() => {
    listerPatients()
      .then(setPatients)
      .finally(() => setChargement(false))
  }, [])

  const patientsFiltres = patients.filter((p) => {
    const texte = `${p.nom} ${p.prenom} ${p.codeUnique}`.toLowerCase()
    return texte.includes(recherche.toLowerCase())
  })

  return (
    <div>
      <header className="flex items-center justify-between mb-4 gap-3">
        <h1 className="text-lg font-bold text-slate-900">Patients</h1>
        <input
          type="text"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher par nom ou code unique..."
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full max-w-xs"
        />
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs text-slate-500">
              <th className="px-4 py-3 font-medium">Patient</th>
              <th className="px-4 py-3 font-medium">Code unique</th>
              <th className="px-4 py-3 font-medium">Âge / Sexe</th>
              <th className="px-4 py-3 font-medium">Dernière visite</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {chargement && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-400 text-sm">Chargement...</td></tr>
            )}
            {!chargement && patientsFiltres.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-800">{p.nom} {p.prenom}</td>
                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{p.codeUnique}</td>
                <td className="px-4 py-3 text-slate-500">{p.age ? `${p.age} ans · ${p.sexe}` : '—'}</td>
                <td className="px-4 py-3 text-slate-500">{p.derniereVisite || 'Aucune consultation'}</td>
                <td className="px-4 py-3 flex gap-3 whitespace-nowrap">
                  <Link to={`/dossier/${p.id}`} className="text-green-600 text-xs font-medium hover:underline">
                    Dossier
                  </Link>
                  <Link to={`/consultation/${p.id}`} className="text-blue-600 text-xs font-medium hover:underline">
                    Nouvelle consultation
                  </Link>
                </td>
              </tr>
            ))}
            {!chargement && patientsFiltres.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400 text-sm">
                  Aucun patient ne correspond à la recherche.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Patients
