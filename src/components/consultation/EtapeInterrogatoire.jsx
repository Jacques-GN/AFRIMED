const SYMPTOMES_DISPONIBLES = [
  'Frissons', 'Céphalées', 'Douleur musculaire', 'Toux',
  'Mal de gorge', 'Difficulté respiratoire', 'Douleur abdominale',
  'Nausées / Vomissements', 'Diarrhée',
]

function EtapeInterrogatoire({ donnees, onChange, onSuivant }) {
  const toggleSymptome = (symptome) => {
    const symptomesActuels = donnees.symptomes || []
    const misAJour = symptomesActuels.includes(symptome)
      ? symptomesActuels.filter((s) => s !== symptome)
      : [...symptomesActuels, symptome]
    onChange({ ...donnees, symptomes: misAJour })
  }

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5">
      <label className="text-sm font-medium text-slate-700" htmlFor="motif">
        Motif de consultation *
      </label>
      <input
        id="motif"
        type="text"
        value={donnees.motif || ''}
        onChange={(e) => onChange({ ...donnees, motif: e.target.value })}
        className="w-full mt-1.5 mb-4 border border-slate-200 rounded-lg px-3 py-2 text-sm"
        placeholder="Ex : Fièvre"
      />

      <label className="text-sm font-medium text-slate-700" htmlFor="histoire">
        Histoire de la maladie actuelle *
      </label>
      <textarea
        id="histoire"
        value={donnees.histoireMaladie || ''}
        onChange={(e) => onChange({ ...donnees, histoireMaladie: e.target.value })}
        className="w-full mt-1.5 mb-4 border border-slate-200 rounded-lg px-3 py-2 text-sm"
        rows={3}
        placeholder="Chronologie des symptômes, évolution, facteurs déclenchants..."
      />

      <p className="text-sm font-medium text-slate-700 mb-2">
        Symptômes associés (sélectionner tout ce qui s'applique)
      </p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {SYMPTOMES_DISPONIBLES.map((symptome) => (
          <label key={symptome} className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={(donnees.symptomes || []).includes(symptome)}
              onChange={() => toggleSymptome(symptome)}
              className="accent-green-600"
            />
            {symptome}
          </label>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onSuivant}
          disabled={!donnees.motif}
          className="text-sm bg-green-600 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg font-medium"
        >
          Suivant : Examen clinique →
        </button>
      </div>
    </article>
  )
}

export default EtapeInterrogatoire
