import { Info } from 'lucide-react'

const HYPOTHESES_DEMO = [
  {
    nom: 'Paludisme simple',
    probabilite: 78,
    arguments: 'Fièvre élevée, frissons, céphalées, contexte épidémiologique',
    couleur: 'green',
  },
  {
    nom: 'Fièvre typhoïde',
    probabilite: 45,
    arguments: 'Fièvre prolongée, douleur abdominale',
    couleur: 'orange',
  },
  {
    nom: 'Infection respiratoire aiguë',
    probabilite: 23,
    arguments: 'Présence de toux, mais sans détresse respiratoire',
    couleur: 'blue',
  },
]

const COULEURS = {
  green: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-500', text: 'text-green-700', probText: 'text-green-600' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-500', text: 'text-orange-700', probText: 'text-orange-600' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-500', text: 'text-blue-700', probText: 'text-blue-600' },
}

function HypothesesDiagnostics({ suggestions }) {
  const hypotheses = suggestions?.hypotheses || HYPOTHESES_DEMO

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-sm font-bold text-slate-900">Hypothèses diagnostiques</h2>
        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">IA</span>
      </div>

      <div className="space-y-3">
        {hypotheses.map((h, i) => {
          const c = COULEURS[h.couleur] || COULEURS.blue
          const prob = h.probabilite || h.probabilite
          return (
            <div key={i} className={`${c.bg} rounded-xl p-4 border ${c.border}`}>
              <div className="flex items-start gap-3">
                <span className={`w-7 h-7 rounded-full ${c.badge} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{h.nom}</h3>
                    <span className={`text-sm font-bold ${c.probText}`}>
                      {prob}%
                    </span>
                  </div>
                  <p className={`text-xs font-medium ${c.text} mt-0.5`}>
                    Probabilité {prob >= 70 ? 'élevée' : prob >= 40 ? 'modérée' : 'faible'}
                  </p>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {h.arguments}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-start gap-2 bg-blue-50 rounded-lg p-3">
        <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Les suggestions de l'IA ne remplacent pas le jugement clinique du professionnel de santé.
        </p>
      </div>
    </div>
  )
}

export default HypothesesDiagnostics
