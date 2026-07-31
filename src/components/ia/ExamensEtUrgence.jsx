import { TestTube, Heart, AlertTriangle } from 'lucide-react'

const EXAMENS_DEMO = [
  { nom: 'TDR Paludisme', priorite: 1, coche: true },
  { nom: 'Numération formule sanguine (NFS)', priorite: 1, coche: true },
  { nom: 'CRP', priorite: 2, coche: true },
  { nom: 'Hémoculture', priorite: null, coche: false, note: 'Selon évolution' },
  { nom: 'Sérologie typhoïde Widal', priorite: null, coche: false, note: 'Selon évolution' },
  { nom: 'Radiographie thoracique', priorite: null, coche: false, note: 'Si signes respiratoires' },
]

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

function ExamensEtUrgence({ suggestions }) {
  const examens = suggestions?.examens || EXAMENS_DEMO

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TestTube size={16} className="text-violet-500" />
          <h2 className="text-sm font-bold text-slate-900">Examens complémentaires recommandés</h2>
        </div>
        <div className="space-y-2">
          {examens.map((e, i) => (
            <div key={i} className="flex items-center justify-between py-1.5">
              <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={e.coche}
                  className="w-4 h-4 accent-green-600"
                />
                <span className={e.coche ? 'text-slate-800' : 'text-slate-500'}>{e.nom}</span>
              </label>
              {e.priorite ? (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  e.priorite === 1 ? 'bg-green-100 text-green-700' : 'bg-green-50 text-green-600'
                }`}>
                  Priorité {e.priorite}
                </span>
              ) : (
                <span className="text-[10px] text-slate-400">{e.note}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Heart size={16} className="text-red-500" />
          <h2 className="text-sm font-bold text-slate-900">Niveau d'urgence</h2>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={18} className="text-orange-500" />
          <span className="text-sm font-bold text-orange-700">Modérée</span>
        </div>
        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          Surveillance clinique recommandée. Réévaluation si aggravation ou persistance de la fièvre.
        </p>
        <div className="relative h-2.5 rounded-full bg-gradient-to-r from-green-400 via-orange-400 to-red-500 overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-orange-500 rounded-full shadow-sm" style={{ left: '50%' }} />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-green-600 font-medium">Faible</span>
          <span className="text-[10px] text-orange-600 font-bold">Modéré</span>
          <span className="text-[10px] text-red-600 font-medium">Élevé</span>
        </div>
      </div>
    </div>
  )
}

export default ExamensEtUrgence
