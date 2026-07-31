import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Search, Bell, Cloud, CheckCircle2 } from 'lucide-react'
import Sidebar from './Sidebar'
import { useAuth } from '../../services/authContext'

function Layout() {
  const [sidebarOuverte, setSidebarOuverte] = useState(false)
  const { profil } = useAuth()

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar ouverte={sidebarOuverte} onFermer={() => setSidebarOuverte(false)} />

      <div className="flex-1 min-w-0">
        {/* Top header bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOuverte(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                aria-label="Ouvrir le menu"
              >
                <Menu size={20} className="text-slate-600" />
              </button>
              <div className="hidden lg:flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 w-72">
                <Search size={16} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Sync status */}
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-1.5">
                <Cloud size={14} className="text-blue-600" />
                <span className="text-xs font-medium text-blue-700">Synchronisé</span>
                <CheckCircle2 size={12} className="text-green-500" />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Bell size={18} className="text-slate-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>

              {/* User avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {profil?.prenom?.[0] || 'D'}{profil?.nom?.[0] || 'K'}
              </div>
            </div>
          </div>
        </header>

        <main className="p-5 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
