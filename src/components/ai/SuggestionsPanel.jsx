const COULEURS_PROBABILITE = {
  Élevée: 'bg-green-100 text-green-700',
  Modérée: 'bg-amber-100 text-amber-700',
  Faible: 'bg-slate-100 text-slate-600',
}

const POSITION_URGENCE = { Faible: '20%', Modéré: '50%', Élevé: '85%' }

function SuggestionsPanel({ suggestions, chargement, decisions, onDecision }) {
  if (chargement) {
    return (
      <article className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Analyse des données cliniques en cours...</p>
      </article>
    )
  }

  if (!suggestions) return null

  return (
    <div className="grid grid-cols-2 gap-6">
      <article className="bg-white rounded-xl border border-slate-200 p-5">
        <p className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
          Hypothèses diagnostiques
          <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">IA</span>
        </p>

        {suggestions.hypotheses.map((h, index) => (
          <div key={h.nom} className="border border-slate-100 rounded-lg p-3 mb-2 last:mb-0">
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] flex items-center justify-center">
                  {index + 1}
                </span>
                {h.nom}
              </span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${COULEURS_PROBABILITE[h.probabilite]}`}>
                {h.probabilite} — {h.pourcentage}%
              </span>
            </div>
            <p className="text-xs text-slate-500 pl-7 mb-2">Arguments : {h.arguments}</p>

            <div className="flex gap-2 pl-7">
              {['accepte', 'modifie', 'rejete'].map((decision) => (
                <button
                  key={decision}
                  onClick={() => onDecision(h.nom, decision)}
                  className={`text-[11px] px-2 py-1 rounded border ${
                    decisions?.[h.nom] === decision
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {decision === 'accepte' ? 'Accepter' : decision === 'modifie' ? 'Modifier' : 'Rejeter'}
                </button>
              ))}
            </div>
          </div>
        ))}

        <p className="text-[11px] text-slate-400 mt-2">
          Les suggestions de l'IA ne remplacent pas le jugement clinique du professionnel de santé.
        </p>
      </article>

      <article className="bg-white rounded-xl border border-slate-200 p-5">
        <p className="text-sm font-semibold text-slate-800 mb-3">Examens complémentaires recommandés</p>
        {suggestions.examensSuggeres.map((e) => (
          <div key={e.nom} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-50 last:border-0">
            <label className="flex items-center gap-2 text-slate-700">
              <input type="checkbox" defaultChecked className="accent-green-600" />
              {e.nom}
            </label>
            <span className="text-[11px] text-slate-400">Priorité {e.priorite}</span>
          </div>
        ))}

        <div className="mt-4 bg-amber-50 rounded-lg p-3">
          <p className="text-xs font-semibold text-amber-800">
            Niveau d'urgence — {suggestions.niveauUrgence}
          </p>
          <div className="h-1.5 rounded-full bg-gradient-to-r from-green-400 via-amber-400 to-red-400 mt-2 relative">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-amber-500"
              style={{ left: POSITION_URGENCE[suggestions.niveauUrgence] }}
            />
          </div>
        </div>
      </article>
    </div>
  )
}

export default SuggestionsPanel
