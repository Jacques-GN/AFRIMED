import { STATS_ETABLISSEMENT_DEMO } from '../../data/demoAdmin'
import { AlertTriangle } from 'lucide-react'

function TableauBordAdmin() {
  const stats = STATS_ETABLISSEMENT_DEMO

  return (
    <div>
      <h1 className="text-lg font-bold text-slate-900 mb-1">Vue d'ensemble de l'établissement</h1>
      <p className="text-xs text-slate-500 mb-6">
        Activité agrégée — aucun accès aux dossiers individuels des patients
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-5">
          <p className="text-2xl font-bold text-slate-800">{stats.consultationsCeMois}</p>
          <p className="text-xs text-slate-500 mt-1">Consultations ce mois</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-2xl shadow-soft p-5">
          <p className="text-2xl font-bold text-red-600 flex items-center gap-1.5">
            <AlertTriangle size={18} /> {stats.suivisEnRetard}
          </p>
          <p className="text-xs text-red-600 mt-1">Suivis en retard non honorés</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-5">
          <p className="text-2xl font-bold text-slate-800">2</p>
          <p className="text-xs text-slate-500 mt-1">Comptes actifs (médecin, laborantin)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-5">
        <p className="text-sm font-semibold text-slate-800 mb-4">Pathologies les plus fréquentes ce mois</p>
        {stats.pathologiesFrequentes.map((p) => (
          <div key={p.nom} className="mb-3 last:mb-0">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>{p.nom}</span>
              <span>{p.pourcentage}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-green-500" style={{ width: `${p.pourcentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableauBordAdmin
