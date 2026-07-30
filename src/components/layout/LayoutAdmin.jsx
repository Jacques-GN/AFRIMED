import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, LogOut } from 'lucide-react'
import { useAuth } from '../../services/authContext'

const LIENS_NAV = [
  { label: "Vue d'ensemble", chemin: '/admin', icone: LayoutDashboard },
  { label: 'Comptes utilisateurs', chemin: '/admin/comptes', icone: Users },
]

function LayoutAdmin() {
  const { profil, signOut } = useAuth()

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <aside className="w-64 shrink-0 bg-gradient-to-b from-[#0B1E3D] to-[#0A1830] text-white min-h-screen flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-extrabold tracking-tight">
            <span className="text-green-500">AFRI</span>
            <span className="text-blue-400">MED</span>
          </h1>
          <p className="text-[11px] text-slate-400 mt-1">Espace administrateur</p>
        </div>

        <nav className="mt-2 px-3">
          {LIENS_NAV.map((lien) => {
            const Icone = lien.icone
            return (
              <NavLink
                key={lien.chemin}
                to={lien.chemin}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-green-600 text-white shadow-soft' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icone size={17} />
                {lien.label}
              </NavLink>
            )
          })}
        </nav>

        <footer className="p-4 m-4 mt-auto bg-white/5 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {profil?.prenom?.[0] || 'M'}{profil?.nom?.[0] || 'T'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">
                {profil?.prenom || 'Moussa'} {profil?.nom || 'Traoré'}
              </p>
              <p className="text-xs text-slate-400">Administrateur d'établissement</p>
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

      <main className="flex-1 p-6 sm:p-8 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutAdmin
