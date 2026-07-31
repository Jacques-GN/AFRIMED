import { Info } from 'lucide-react'

const HYPOTHESES_DEMO = [
  {
    nom: 'Paludisme simple',
    probabilite: 78,
    arguments: 'Fièvre élevée, frissons, céphalées, contexte épidémiologique endémique en zone tropicale',
    couleur: 'green',
  },
  {
    nom: 'Fièvre typhoïde',
    probabilite: 45,
    arguments: 'Fièvre prolongée, douleur abdominale, troubles digestifs',
    couleur: 'amber',
  },
  {
    nom: 'Infection respiratoire aiguë',
    probabilite: 23,
    arguments: 'Présence de toux, mais sans détresse respiratoire notable',
    couleur: 'blue',
  },
]

const COULEURS = {
  green: { bg: 'bg-green-50', border: 'border-l-green-500', badge: 'bg-green-100 text-green-800', bar: 'bg-green-500', text: 'text-green-700' },
  amber: { bg: 'bg-amber-50', border: 'border-l-amber-500', badge: 'bg-amber-100 text-amber-800', bar: 'bg-amber-500', text: 'text-amber-700' },
  blue: { bg: 'bg-blue-50', border: 'border-l-blue-500', badge: 'bg-blue-100 text-blue-800', bar: 'bg-blue-500', text: 'text-blue-700' },
  orange: { bg: 'bg-amber-50', border: 'border-l-amber-500', badge: 'bg-amber-100 text-amber-800', bar: 'bg-amber-500', text: 'text-amber-700' },
}

function HypothesesDiagnostics({ suggestions }) {
  const hypotheses = suggestions?.hypotheses || HYPOTHESES_DEMO

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-base font-bold text-slate-900">Hypothèses diagnostiques</h2>
        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">IA</span>
      </div>

      <div className="space-y-3">
        {hypotheses.map((h, i) => {
          const c = COULEURS[h.couleur] || COULEURS.blue
          const prob = h.probabilite || 0
          return (
            <div key={i} className={`${c.bg} rounded-xl p-4 border-l-4 ${c.border}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-slate-900">{h.nom}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                  {prob}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 bg-slate-200 rounded-full mb-2 overflow-hidden">
                <div className={`h-full ${c.bar} rounded-full transition-all duration-500`} style={{ width: `${prob}%` }} />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{h.arguments}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-start gap-2 bg-blue-50 rounded-lg p-3">
        <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Les suggestions de l'IA ne remplacent pas le jugement clinique du professionnel de santé. Vérifiez toujours les résultats.
        </p>
      </div>
    </div>
  )
}

export default HypothesesDiagnostics
