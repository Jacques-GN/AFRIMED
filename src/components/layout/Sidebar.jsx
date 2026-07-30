import { NavLink } from 'react-router-dom'
import {
  Home, UserPlus, Users, Calendar, Stethoscope,
  FileText, Brain, BarChart3, Settings, LogOut,
  Heart, Activity,
} from 'lucide-react'
import { useAuth } from '../../services/authContext'

const LIENS_NAV = [
  { label: 'Accueil', chemin: '/', icone: Home },
  { label: 'Nouveau patient', chemin: '/nouveau-patient', icone: UserPlus },
  { label: 'Patients', chemin: '/patients', icone: Users },
  { label: 'Consultation', chemin: '/consultation', icone: Stethoscope },
  { label: 'Dossier médical', chemin: '/patients', icone: FileText },
  { label: 'Rendez-vous', chemin: '/rendez-vous', icone: Calendar },
  { label: 'IA Clinique', chemin: '/ia-clinique', icone: Brain },
  { label: 'Santé publique', chemin: '/sante-publique', icone: BarChart3 },
  { label: 'Paramètres', chemin: '/parametres', icone: Settings },
]

function LogoIcon() {
  return (
    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
      <Heart size={18} className="text-white" fill="white" />
      <Activity size={10} className="text-white absolute -bottom-0.5 -right-0.5" />
    </div>
  )
}

function Sidebar({ ouverte, onFermer }) {
  const { profil, signOut } = useAuth()

  return (
    <>
      {ouverte && (
        <div className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden" onClick={onFermer} aria-hidden="true" />
      )}

      <aside
        className={`w-64 shrink-0 bg-gradient-to-b from-[#0B1E3D] to-[#0A1830] text-white min-h-screen flex flex-col justify-between fixed lg:sticky top-0 z-40 transition-transform duration-200 ${
          ouverte ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <header>
          <div className="p-5 flex items-center gap-3">
            <LogoIcon />
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none">
                <span className="text-green-400">AFRI</span>
                <span className="text-blue-400">MED</span>
              </h1>
              <p className="text-[10px] text-slate-400 tracking-wide leading-tight">
                African Medical Intelligence
              </p>
            </div>
          </div>

          <nav className="mt-1 px-3 max-h-[calc(100vh-240px)] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {LIENS_NAV.map((lien) => {
              const Icone = lien.icone
              return (
                <NavLink
                  key={lien.label}
                  to={lien.chemin}
                  end={lien.chemin === '/'}
                  onClick={onFermer}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 mb-0.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
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

        <footer className="p-3 m-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {profil?.prenom?.[0] || 'D'}{profil?.nom?.[0] || 'K'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">
                {profil?.prenom || 'Dr.'} {profil?.nom || 'Kaboré'}
              </p>
              <p className="text-[11px] text-slate-400 truncate">{profil?.specialite || 'Médecin généraliste'}</p>
              {profil?.etablissement && (
                <p className="text-[10px] text-slate-500 truncate">{profil.etablissement}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
              <span className="text-xs text-green-400">En ligne</span>
            </div>
            <button
              onClick={signOut}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              title="Déconnexion"
              aria-label="Se déconnecter"
            >
              <LogOut size={14} className="text-slate-400" />
            </button>
          </div>
        </footer>
      </aside>
    </>
  )
}

export default Sidebar
