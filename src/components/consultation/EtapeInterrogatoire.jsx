import { X } from 'lucide-react'

const SYMPTOMES_DISPONIBLES = [
  'Frissons', 'Céphalées', 'Douleur musculaire',
  'Toux', 'Mal de gorge', 'Difficulté respiratoire',
  'Douleur abdominale', 'Nausées/Vomissements', 'Diarrhée',
]

const DUREES = [
  { valeur: 'moins24h', label: 'Moins de 24h' },
  { valeur: '24-48h', label: '24 à 48h' },
  { valeur: '48-72h', label: '48 à 72h' },
  { valeur: 'plus72h', label: 'Plus de 72h' },
]

const MODES_DEBUT = [
  { valeur: 'brutal', label: 'Brutalement' },
  { valeur: 'progressif', label: 'Progressivement' },
  { valeur: 'non_precise', label: 'Non précisé' },
]

function EtapeInterrogatoire({ donnees, onChange, onSuivant }) {
  const toggleSymptome = (symptome) => {
    const actuels = donnees.symptomes || []
    const misAJour = actuels.includes(symptome)
      ? actuels.filter((s) => s !== symptome)
      : [...actuels, symptome]
    onChange({ ...donnees, symptomes: misAJour })
  }

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="mb-5">
        <label className="text-sm font-medium text-slate-700" htmlFor="motif">
          Motif de consultation <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1.5">
          <input
            id="motif"
            type="text"
            value={donnees.motif || ''}
            onChange={(e) => onChange({ ...donnees, motif: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none pr-8"
            placeholder="Ex : Fièvre"
          />
          {donnees.motif && (
            <button
              onClick={() => onChange({ ...donnees, motif: '' })}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Effacer"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <fieldset className="mb-5">
        <legend className="text-sm font-medium text-slate-700 mb-2">
          Depuis combien de temps la fièvre dure-t-elle ?
        </legend>
        <div className="space-y-1.5">
          {DUREES.map((d) => (
            <label key={d.valeur} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <input
                type="radio"
                name="duree"
                value={d.valeur}
                checked={donnees.dureeSymptomes === d.valeur}
                onChange={() => onChange({ ...donnees, dureeSymptomes: d.valeur })}
                className="w-4 h-4 accent-green-600"
              />
              <span className={donnees.dureeSymptomes === d.valeur ? 'text-green-700 font-medium' : 'text-slate-700'}>
                {d.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-5">
        <legend className="text-sm font-medium text-slate-700 mb-2">
          Comment a débuté la fièvre ?
        </legend>
        <div className="flex flex-wrap gap-2">
          {MODES_DEBUT.map((m) => {
            const selectionne = donnees.modeDebut === m.valeur
            return (
              <button
                key={m.valeur}
                type="button"
                onClick={() => onChange({ ...donnees, modeDebut: m.valeur })}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  selectionne
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {m.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="mb-5">
        <legend className="text-sm font-medium text-slate-700 mb-1">
          Symptômes associés
        </legend>
        <p className="text-xs text-slate-500 mb-2">Sélectionner tout ce qui s'applique</p>
        <div className="grid grid-cols-3 gap-2">
          {SYMPTOMES_DISPONIBLES.map((symptome) => {
            const selectionne = (donnees.symptomes || []).includes(symptome)
            return (
              <label
                key={symptome}
                className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                  selectionne
                    ? 'bg-green-50 border-green-300 text-green-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectionne}
                  onChange={() => toggleSymptome(symptome)}
                  className="accent-green-600"
                />
                {symptome}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mb-5">
        <label className="text-sm font-medium text-slate-700" htmlFor="autre-symptome">
          Autre symptôme
        </label>
        <input
          id="autre-symptome"
          type="text"
          value={donnees.autreSymptome || ''}
          onChange={(e) => onChange({ ...donnees, autreSymptome: e.target.value })}
          className="w-full mt-1.5 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
          placeholder="Précisez un autre symptôme..."
        />
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button
          onClick={onSuivant}
          disabled={!donnees.motif}
          className="text-sm bg-green-600 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          Suivant : Examen clinique →
        </button>
      </div>
    </article>
  )
}

export default EtapeInterrogatoire
