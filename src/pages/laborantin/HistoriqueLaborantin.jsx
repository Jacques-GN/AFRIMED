import { useState, useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { listerExamensTraites } from '../../lib/examensRepository'

function HistoriqueLaborantin() {
  const [examens, setExamens] = useState([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    listerExamensTraites()
      .then(setExamens)
      .finally(() => setChargement(false))
  }, [])

  return (
    <div>
      <h1 className="text-lg font-bold text-slate-900 mb-1">Historique des examens traités</h1>
      <p className="text-xs text-slate-500 mb-6">
        Résultats déjà saisis — non modifiables, pour garantir la traçabilité
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft divide-y divide-slate-100">
        {chargement && <p className="p-5 text-sm text-slate-400">Chargement...</p>}

        {!chargement && examens.map((e) => (
          <div key={e.id} className="p-5 flex items-center gap-3">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800">{e.typeExamen} — {e.patientNom}</p>
              <p className="text-xs text-slate-500">Résultat : {e.resultat}</p>
            </div>
          </div>
        ))}

        {!chargement && examens.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-400">Aucun examen traité pour le moment.</p>
        )}
      </div>
    </div>
  )
}

export default HistoriqueLaborantin
