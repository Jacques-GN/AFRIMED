import { NavLink } from 'react-router-dom'
import { Home, UserPlus, Users, Calendar } from 'lucide-react'
import { MEDECIN_CONNECTE } from '../../data/demoData'

const LIENS_NAV = [
  { label: 'Accueil', chemin: '/', icone: Home },
  { label: 'Nouveau patient', chemin: '/nouveau-patient', icone: UserPlus },
  { label: 'Patients', chemin: '/patients', icone: Users },
  { label: 'Rendez-vous', chemin: '/rendez-vous', icone: Calendar },
]

function Sidebar({ ouverte, onFermer }) {
  return (
    <>
      {ouverte && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden"
          onClick={onFermer}
          aria-hidden="true"
        />
      )}

      <aside
        className={`w-64 shrink-0 bg-gradient-to-b from-[#0B1E3D] to-[#0A1830] text-white min-h-screen flex flex-col justify-between fixed lg:sticky top-0 z-40 transition-transform duration-200 ${
          ouverte ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <header>
          <div className="p-6">
            <h1 className="text-xl font-extrabold tracking-tight">
              <span className="text-green-500">AFRI</span>
              <span className="text-blue-400">MED</span>
            </h1>
            <p className="text-[11px] text-slate-400 mt-1 tracking-wide">
              African Medical Intelligence
            </p>
          </div>

          <nav className="mt-2 px-3">
            {LIENS_NAV.map((lien) => {
              const Icone = lien.icone
              return (
                <NavLink
                  key={lien.chemin}
                  to={lien.chemin}
                  end={lien.chemin === '/'}
                  onClick={onFermer}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-green-600 text-white shadow-soft'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icone size={17} strokeWidth={2} />
                  {lien.label}
                </NavLink>
              )
            })}
          </nav>
        </header>

        <footer className="p-4 m-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/5">
          <p className="text-sm font-semibold">
            {MEDECIN_CONNECTE.prenom} {MEDECIN_CONNECTE.nom}
          </p>
          <p className="text-xs text-slate-400">{MEDECIN_CONNECTE.specialite}</p>
          <p className="text-xs text-slate-400">{MEDECIN_CONNECTE.etablissement}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
            <span className="text-xs text-green-400">En ligne</span>
          </div>
        </footer>
      </aside>
    </>
  )
}

export default Sidebar
