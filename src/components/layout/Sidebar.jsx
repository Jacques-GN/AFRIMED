import { NavLink } from 'react-router-dom'
import {
  Home, UserPlus, FolderOpen, Calendar, Stethoscope,
  FileText, Brain, BarChart3, Settings, LogOut,
  Heart, Activity,
} from 'lucide-react'
import { useAuth } from '../../services/authContext'

const LIENS_NAV = [
  { label: 'Accueil', chemin: '/', icone: Home },
  { label: 'Nouveau patient', chemin: '/nouveau-patient', icone: UserPlus },
  { label: 'Patients', chemin: '/patients', icone: FolderOpen },
  { label: 'Consultation', chemin: '/patients', icone: Stethoscope },
  { label: 'Rendez-vous', chemin: '/rendez-vous', icone: Calendar },
  { label: 'Dossier médical', chemin: '/patients', icone: FileText },
  { label: 'Santé publique', chemin: '/sante-publique', icone: BarChart3 },
  { label: 'Paramètres', chemin: '/parametres', icone: Settings },
]

function LogoIcon() {
  return (
    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
      <Heart size={18} className="text-white" fill="white" />
    </div>
  )
}

function Sidebar({ ouverte, onFermer }) {
  const { profil, signOut } = useAuth()

  return (
    <>
      {ouverte && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onFermer} aria-hidden="true" />
      )}

      <aside
        className={`w-[280px] shrink-0 bg-[#0F172A] text-white min-h-screen flex flex-col justify-between fixed lg:sticky top-0 z-40 transition-transform duration-300 ${
          ouverte ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <header>
          {/* Logo */}
          <div className="px-6 py-5 flex items-center gap-3">
            <LogoIcon />
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none">
                <span className="text-green-400">AFRI</span>
                <span className="text-blue-400">MED</span>
              </h1>
              <p className="text-[10px] text-slate-500 tracking-wide leading-tight">
                African Medical Intelligence
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-2 px-4 space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {LIENS_NAV.map((lien) => {
              const Icone = lien.icone
              return (
                <NavLink
                  key={lien.label}
                  to={lien.chemin}
                  end={lien.chemin === '/'}
                  onClick={onFermer}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-all ${
                      isActive
                        ? 'bg-green-600/15 text-green-400 border-l-[3px] border-green-500'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border-l-[3px] border-transparent'
                    }`
                  }
                >
                  <Icone size={20} strokeWidth={1.8} />
                  {lien.label}
                </NavLink>
              )
            })}
          </nav>
        </header>

        {/* Profile card */}
        <footer className="p-4 mx-4 mb-4 bg-white/5 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {profil?.prenom?.[0] || 'D'}{profil?.nom?.[0] || 'K'}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0F172A]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {profil?.prenom || 'Dr.'} {profil?.nom || 'Kaboré'}
              </p>
              <p className="text-[11px] text-slate-400 truncate">{profil?.specialite || 'Médecin généraliste'}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-green-400">En ligne</span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors"
              title="Déconnexion"
              aria-label="Se déconnecter"
            >
              <LogOut size={14} />
              Déconnexion
            </button>
          </div>
        </footer>
      </aside>
    </>
  )
}

export default Sidebar
