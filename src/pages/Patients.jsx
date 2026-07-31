import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, UserPlus, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react'
import { listerPatients } from '../lib/patientsRepository'

const STATUTS = [
  { value: 'all', label: 'Tous' },
  { value: 'actif', label: 'Actif' },
  { value: 'en_attente', label: 'En attente' },
  { value: 'hospitalise', label: 'Hospitalisé' },
]

const STATUT_BADGE = {
  actif: { bg: 'bg-green-100', text: 'text-green-800', label: 'Actif' },
  en_attente: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En attente' },
  hospitalise: { bg: 'bg-red-100', text: 'text-red-800', label: 'Hospitalisé' },
}

function Patients() {
  const [patients, setPatients] = useState([])
  const [chargement, setChargement] = useState(true)
  const [recherche, setRecherche] = useState('')
  const [statutFiltre, setStatutFiltre] = useState('all')
  const [page, setPage] = useState(1)
  const parPage = 10

  useEffect(() => {
    listerPatients()
      .then(setPatients)
      .finally(() => setChargement(false))
  }, [])

  const patientsFiltres = patients.filter((p) => {
    const texte = `${p.nom} ${p.prenom} ${p.codeUnique}`.toLowerCase()
    const matchRecherche = texte.includes(recherche.toLowerCase())
    const matchStatut = statutFiltre === 'all' || p.statut === statutFiltre
    return matchRecherche && matchStatut
  })

  const total = patientsFiltres.length
  const debut = (page - 1) * parPage
  const patientsPage = patientsFiltres.slice(debut, debut + parPage)
  const totalPages = Math.ceil(total / parPage)

  return (
    <div>
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Liste des patients</h1>
          <p className="text-sm text-slate-500 mt-1">{total} patient{total !== 1 ? 's' : ''} enregistré{total !== 1 ? 's' : ''}</p>
        </div>
        <Link
          to="/nouveau-patient"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <UserPlus size={16} />
          Ajouter un nouveau patient
        </Link>
      </header>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={recherche}
            onChange={(e) => { setRecherche(e.target.value); setPage(1) }}
            placeholder="Rechercher un patient..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          {STATUTS.map((s) => (
            <button
              key={s.value}
              onClick={() => { setStatutFiltre(s.value); setPage(1) }}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                statutFiltre === s.value
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Âge / Sexe</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Dernière visite</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {chargement && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-slate-200 border-t-green-600 rounded-full animate-spin" />
                      Chargement...
                    </div>
                  </td>
                </tr>
              )}
              {!chargement && patientsPage.map((p, i) => {
                const badge = STATUT_BADGE[p.statut] || STATUT_BADGE.actif
                return (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold shrink-0">
                          {p.nom?.[0]}{p.prenom?.[0]}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{p.nom} {p.prenom}</p>
                          <p className="text-xs text-slate-500 font-mono">{p.codeUnique}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{p.age ? `${p.age} ans` : '—'} · {p.sexe || '—'}</td>
                    <td className="px-6 py-4 text-slate-600">{p.derniereVisite || 'Aucune consultation'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/dossier/${p.id}`}
                          className="text-xs font-medium text-green-600 hover:text-green-800 transition-colors"
                        >
                          Dossier
                        </Link>
                        <Link
                          to={`/consultation/${p.id}`}
                          className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Consultation
                        </Link>
                        <button className="p-1 rounded hover:bg-slate-100 transition-colors">
                          <MoreVertical size={14} className="text-slate-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {!chargement && patientsPage.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">
                    Aucun patient ne correspond à la recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > parPage && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-500">
              {debut + 1}-{Math.min(debut + parPage, total)} de {total} patients
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Patients
