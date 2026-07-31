import { useState } from 'react'
import { Users, Thermometer, AlertTriangle, TrendingUp, Cloud, CheckCircle2, MapPin, BarChart3, Activity } from 'lucide-react'

const KPI_DATA = [
  { label: 'Cas de fièvre', valeur: 234, tendance: '+12%', icon: Thermometer, color: 'red' },
  { label: 'Consultations', valeur: 1847, tendance: '+5%', icon: Users, color: 'blue' },
  { label: 'Alertes actives', valeur: 3, tendance: '-2', icon: AlertTriangle, color: 'amber' },
]

const MALADIES_FREQUENTES = [
  { nom: 'Paludisme', cas: 89, couleur: '#2563EB' },
  { nom: 'IRA', cas: 67, couleur: '#F97316' },
  { nom: 'Diarrhée', cas: 45, couleur: '#10B981' },
  { nom: 'Hypertension', cas: 34, couleur: '#8B5CF6' },
  { nom: 'Diabète', cas: 23, couleur: '#EF4444' },
  { nom: 'Autres', cas: 18, couleur: '#9CA3AF' },
]

const ALERTES_TABLE = [
  { region: 'District Centre', maladie: 'Paludisme', cas: 45, seuil: 30, priorite: 'haute', statut: 'en_cours' },
  { region: 'District Nord', maladie: 'IRA', cas: 28, seuil: 25, priorite: 'moyenne', statut: 'en_cours' },
  { region: 'District Sud', maladie: 'Choléra', cas: 5, seuil: 10, priorite: 'basse', statut: 'surveillance' },
]

const REGIONS = [
  { nom: 'Centre', x: 50, y: 40, intensite: 0.8 },
  { nom: 'Nord', x: 50, y: 15, intensite: 0.5 },
  { nom: 'Sud', x: 50, y: 70, intensite: 0.3 },
  { nom: 'Est', x: 75, y: 45, intensite: 0.4 },
  { nom: 'Ouest', x: 25, y: 45, intensite: 0.2 },
]

function SantePublique() {
  const maxCas = Math.max(...MALADIES_FREQUENTES.map(m => m.cas))

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Statistiques de santé publique</h1>
          <p className="text-sm text-slate-500 mt-1">Surveillance épidémiologique et alertes sanitaires</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-1.5">
          <Cloud size={14} className="text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Données synchronisées</span>
          <CheckCircle2 size={12} className="text-green-500" />
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {KPI_DATA.map((kpi) => {
          const Icon = kpi.icon
          const colorMap = {
            red: { bg: 'bg-red-100', text: 'text-red-600', trend: 'text-red-600' },
            blue: { bg: 'bg-blue-100', text: 'text-blue-600', trend: 'text-green-600' },
            amber: { bg: 'bg-amber-100', text: 'text-amber-600', trend: 'text-green-600' },
          }
          const c = colorMap[kpi.color]
          return (
            <div key={kpi.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <Icon size={22} className={c.text} />
                </div>
                <span className={`text-xs font-semibold ${c.trend}`}>{kpi.tendance}</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">{kpi.valeur}</p>
              <p className="text-sm text-slate-500 mt-1">{kpi.label}</p>
            </div>
          )
        })}
      </section>

      {/* Map + Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Map visualization */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} className="text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Carte épidémiologique</h2>
          </div>
          <div className="relative bg-slate-50 rounded-xl h-64 overflow-hidden">
            <svg viewBox="0 0 100 80" className="w-full h-full">
              {/* Simplified country outline */}
              <path d="M 20,10 L 80,10 L 85,30 L 90,50 L 80,70 L 20,70 L 10,50 L 15,30 Z"
                fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.5" />
              {/* Heatmap dots */}
              {REGIONS.map((r) => (
                <g key={r.nom}>
                  <circle cx={r.x} cy={r.y} r={8 + r.intensite * 8}
                    fill={`rgba(239, 68, 68, ${r.intensite * 0.4})`} />
                  <circle cx={r.x} cy={r.y} r={3}
                    fill="#EF4444" opacity={0.8} />
                  <text x={r.x} y={r.y - 4} textAnchor="middle"
                    className="text-[3px]" fill="#374151" fontWeight="600">{r.nom}</text>
                </g>
              ))}
            </svg>
            {/* Legend */}
            <div className="absolute bottom-3 left-3 bg-white/90 rounded-lg p-2 shadow-sm">
              <p className="text-[10px] font-medium text-slate-600 mb-1">Intensité</p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="w-2 h-2 rounded-full bg-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-4">
          {/* Line chart placeholder */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Tendance des cas de fièvre</h3>
            </div>
            <div className="h-40">
              <svg viewBox="0 0 300 120" className="w-full h-full">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} x1="0" y1={i * 30} x2="300" y2={i * 30} stroke="#E5E7EB" strokeWidth="0.5" />
                ))}
                {/* Area fill */}
                <path d="M 0,100 L 25,90 50,85 75,70 100,75 125,60 150,50 175,55 200,40 225,30 250,35 275,25 300,20 L 300,120 L 0,120 Z"
                  fill="url(#areaGradient)" opacity="0.3" />
                {/* Line */}
                <path d="M 0,100 L 25,90 50,85 75,70 100,75 125,60 150,50 175,55 200,40 225,30 250,35 275,25 300,20"
                  fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-400">Jan</span>
              <span className="text-[10px] text-slate-400">Mar</span>
              <span className="text-[10px] text-slate-400">Mai</span>
              <span className="text-[10px] text-slate-400">Juil</span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={16} className="text-violet-600" />
              <h3 className="text-sm font-bold text-slate-900">Maladies les plus fréquentes</h3>
            </div>
            <div className="space-y-2.5">
              {MALADIES_FREQUENTES.map((m) => (
                <div key={m.nom} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-20 shrink-0">{m.nom}</span>
                  <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(m.cas / maxCas) * 100}%`, backgroundColor: m.couleur }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 w-8 text-right">{m.cas}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">Alertes sanitaires</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Région</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Maladie</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Cas</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Seuil</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Priorité</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody>
              {ALERTES_TABLE.map((a, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-800">{a.region}</td>
                  <td className="px-5 py-3 text-slate-600">{a.maladie}</td>
                  <td className="px-5 py-3 text-slate-600">{a.cas}</td>
                  <td className="px-5 py-3 text-slate-600">{a.seuil}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      a.priorite === 'haute' ? 'bg-red-100 text-red-800' : a.priorite === 'moyenne' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {a.priorite === 'haute' ? 'Haute' : a.priorite === 'moyenne' ? 'Moyenne' : 'Basse'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      a.statut === 'en_cours' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {a.statut === 'en_cours' ? 'En cours' : 'Surveillance'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SantePublique
