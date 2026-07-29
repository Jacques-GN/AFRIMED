import { NavLink } from 'react-router-dom'
import { MEDECIN_CONNECTE } from '../../data/demoData'

const LIENS_NAV = [
  { label: 'Accueil', chemin: '/' },
  { label: 'Nouveau patient', chemin: '/nouveau-patient' },
  { label: 'Patients', chemin: '/patients' },
  { label: 'Rendez-vous', chemin: '/rendez-vous' },
]

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-[#0B1E3D] text-white min-h-screen flex flex-col justify-between">
      <header>
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-green-500">AFRI</span>
            <span className="text-blue-400">MED</span>
          </h1>
          <p className="text-[11px] text-slate-400 mt-1">African Medical Intelligence</p>
        </div>

        <nav className="mt-2">
          {LIENS_NAV.map((lien) => (
            <NavLink
              key={lien.chemin}
              to={lien.chemin}
              end={lien.chemin === '/'}
              className={({ isActive }) =>
                `block px-6 py-3 text-sm font-medium transition-colors ${
                  isActive ? 'bg-green-600 text-white' : 'text-slate-300 hover:bg-slate-800/60'
                }`
              }
            >
              {lien.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <footer className="p-4 m-4 bg-[#0F2340] rounded-lg">
        <p className="text-sm font-semibold">
          {MEDECIN_CONNECTE.prenom} {MEDECIN_CONNECTE.nom}
        </p>
        <p className="text-xs text-slate-400">{MEDECIN_CONNECTE.specialite}</p>
        <p className="text-xs text-slate-400">{MEDECIN_CONNECTE.etablissement}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-green-400">En ligne</span>
        </div>
      </footer>
    </aside>
  )
}

export default Sidebar
