import { Outlet, NavLink } from 'react-router-dom'
import { FlaskConical, History } from 'lucide-react'

const LIENS_NAV = [
  { label: 'Demandes en attente', chemin: '/laborantin', icone: FlaskConical },
  { label: 'Historique', chemin: '/laborantin/historique', icone: History },
]

function LayoutLaborantin() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <aside className="w-64 shrink-0 bg-gradient-to-b from-[#0B1E3D] to-[#0A1830] text-white min-h-screen flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-extrabold tracking-tight">
            <span className="text-green-500">AFRI</span>
            <span className="text-blue-400">MED</span>
          </h1>
          <p className="text-[11px] text-slate-400 mt-1">Espace laborantin</p>
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
          <p className="text-sm font-semibold">Awa Sawadogo</p>
          <p className="text-xs text-slate-400">Laborantine</p>
        </footer>
      </aside>

      <main className="flex-1 p-6 sm:p-8 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutLaborantin
