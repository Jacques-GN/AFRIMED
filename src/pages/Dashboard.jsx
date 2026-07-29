import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, Users, Calendar, FlaskConical, ArrowRight } from 'lucide-react'
import { MEDECIN_CONNECTE } from '../data/demoData'
import { listerPatients } from '../lib/patientsRepository'

const RACCOURCIS = [
  { label: 'Nouveau patient', description: 'Créer un dossier et générer un code unique', chemin: '/nouveau-patient', icone: UserPlus, accent: 'from-blue-500/10 to-blue-500/0 text-blue-600' },
  { label: 'Patients', description: 'Rechercher un dossier existant', chemin: '/patients', icone: Users, accent: 'from-green-500/10 to-green-500/0 text-green-600' },
  { label: 'Rendez-vous', description: 'Suivis programmés', chemin: '/rendez-vous', icone: Calendar, accent: 'from-amber-500/10 to-amber-500/0 text-amber-600' },
]

function Dashboard() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    listerPatients().then(setPatients)
  }, [])

  return (
    <div>
      <header className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Bonjour {MEDECIN_CONNECTE.prenom} {MEDECIN_CONNECTE.nom} 👋
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">{MEDECIN_CONNECTE.etablissement}</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {RACCOURCIS.map((r) => {
          const Icone = r.icone
          return (
            <Link key={r.chemin} to={r.chemin} className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-5 shadow-soft transition-lift">
              <div className={`absolute inset-0 bg-gradient-to-br ${r.accent} opacity-60`} />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white shadow-soft flex items-center justify-center mb-3">
                  <Icone size={18} className={r.accent.split(' ').pop()} />
                </div>
                <p className="font-semibold text-slate-900 text-sm">{r.label}</p>
                <p className="text-xs text-slate-500 mt-1">{r.description}</p>
                <ArrowRight size={16} className="absolute top-0 right-0 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          )
        })}

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-3">
            <FlaskConical size={18} className="text-purple-600" />
          </div>
          <p className="font-semibold text-slate-900 text-sm">Alertes laboratoire</p>
          <p className="text-xs text-slate-500 mt-1">Aucun résultat en attente</p>
        </div>
      </section>

      <h2 className="text-sm font-semibold text-slate-700 mb-3">Patients vus récemment</h2>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft divide-y divide-slate-100 overflow-hidden">
        {patients.slice(0, 5).map((p) => (
          <Link key={p.id} to={`/dossier/${p.id}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{p.nom} {p.prenom}</p>
              <p className="text-xs text-slate-500">{p.dernierMotif || 'Dossier créé'} — {p.derniereVisite || ''}</p>
            </div>
            <span className="text-xs text-slate-400 font-mono shrink-0 ml-3">{p.codeUnique}</span>
          </Link>
        ))}
        {patients.length === 0 && (
          <p className="px-5 py-6 text-center text-slate-400 text-sm">Aucun patient enregistré.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
