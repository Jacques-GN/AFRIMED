import { GitBranch, ClipboardList } from 'lucide-react'

const DIAGNOSTICS_DIFF = [
  'Dengue fébrile',
  'Infection virale aiguë',
  'Leptospirose',
  'Méningite débutante',
]

const CONDUITE_DEMO = [
  { texte: 'Confirmer par TDR Paludisme', fait: true },
  { texte: 'Hydrater le patient', fait: true },
  { texte: 'Traitement antipaludique si TDR positif', fait: true },
  { texte: 'Réévaluer dans 48 à 72h', fait: false, bleu: true },
]

function ConduiteATenir() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch size={16} className="text-violet-500" />
          <h3 className="text-sm font-bold text-slate-900">Diagnostics différentiels</h3>
        </div>
        <ul className="space-y-1.5">
          {DIAGNOSTICS_DIFF.map((d, i) => (
            <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <ClipboardList size={16} className="text-blue-500" />
          <h3 className="text-sm font-bold text-slate-900">Conduite à tenir suggérée</h3>
        </div>
        <ul className="space-y-1.5">
          {CONDUITE_DEMO.map((c, i) => (
            <li key={i} className="text-sm flex items-center gap-2">
              <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                c.bleu
                  ? 'bg-blue-100 text-blue-600'
                  : c.fait
                    ? 'bg-green-100 text-green-600'
                    : 'bg-slate-100 text-slate-400'
              }`}>
                {c.fait ? '✓' : '○'}
              </span>
              <span className={c.fait ? 'text-slate-700' : 'text-slate-600'}>{c.texte}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ConduiteATenir
