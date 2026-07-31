import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

function Layout() {
  const [sidebarOuverte, setSidebarOuverte] = useState(false)

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar ouverte={sidebarOuverte} onFermer={() => setSidebarOuverte(false)} />

      <div className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-20">
          <span className="font-extrabold text-sm">
            <span className="text-green-600">AFRI</span>
            <span className="text-blue-600">MED</span>
          </span>
          <button
            onClick={() => setSidebarOuverte(true)}
            className="p-2 rounded-lg hover:bg-slate-100"
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>
        </header>

        <main className="p-5 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
