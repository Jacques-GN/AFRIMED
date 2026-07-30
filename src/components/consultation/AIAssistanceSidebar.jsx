import { HelpCircle, Lightbulb, FileText, ChevronDown } from 'lucide-react'

const QUESTIONS_SUGGEREES = [
  'Le patient a-t-il pris un traitement avant de venir ?',
  'Avez-vous voyagé récemment ?',
  "Y a-t-il d'autres personnes malades à la maison ?",
  'Avez-vous des antécédents médicaux particuliers ?',
]

const RAPPELS_CLINIQUES = [
  'Paludisme',
  'Fièvre typhoïde',
  'Infections bactériennes',
  'Autres causes (dengue, VIH, etc.)',
]

function AIAssistanceSidebar({ patient }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">IA</span>
          <h3 className="text-sm font-semibold text-slate-800">Questions suggérées par AFRIMED</h3>
        </div>
        <div className="space-y-1">
          {QUESTIONS_SUGGEREES.map((q, i) => (
            <details key={i} className="group">
              <summary className="flex items-center justify-between text-sm text-slate-700 py-2 cursor-pointer hover:bg-slate-50 px-2 rounded-lg">
                <span className="flex-1">{q}</span>
                <ChevronDown size={14} className="text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-xs text-slate-500 pl-2 pb-2">Poser cette question au patient pour affiner le diagnostic.</p>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={16} className="text-orange-500" />
          <h3 className="text-sm font-semibold text-orange-800">Rappels cliniques</h3>
        </div>
        <p className="text-xs text-orange-600 mb-2">Pour ce cas spécifique (fièvre &gt;72h) :</p>
        <ul className="space-y-1">
          {RAPPELS_CLINIQUES.map((r, i) => (
            <li key={i} className="text-sm text-orange-900 flex items-center gap-1.5">
              <span className="text-orange-500">✓</span> {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={16} className="text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-800">Résumé rapide du patient</h3>
        </div>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Âge</span>
            <span className="text-slate-800 font-medium">{patient?.age || '23'} ans</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Sexe</span>
            <span className="text-slate-800 font-medium">{patient?.sexe || 'Masculin'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Poids</span>
            <span className="text-slate-800 font-medium">{patient?.poids || '70'} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Taille</span>
            <span className="text-slate-800 font-medium">{patient?.taille || '1,75'} m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Antécédents</span>
            <span className="text-slate-800 font-medium">Aucun antécédent connu</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistanceSidebar
