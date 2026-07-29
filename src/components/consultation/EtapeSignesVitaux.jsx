const CHAMPS_CONSTANTES = [
  { cle: 'temperature', label: 'Température (°C)' },
  { cle: 'tensionArterielle', label: 'Tension artérielle (mmHg)' },
  { cle: 'pouls', label: 'Pouls (bpm)' },
  { cle: 'frequenceRespiratoire', label: 'Fréquence respiratoire (/min)' },
  { cle: 'saturationO2', label: 'Saturation en oxygène (%)' },
]

function EtapeSignesVitaux({ donnees, onChange, onSuivant, onPrecedent }) {
  const constantes = donnees.constantes || {}

  const majConstante = (cle, valeur) => {
    onChange({ ...donnees, constantes: { ...constantes, [cle]: valeur } })
  }

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-3">Constantes</h3>

      <div className="grid grid-cols-2 gap-3">
        {CHAMPS_CONSTANTES.map((champ) => (
          <div key={champ.cle}>
            <label className="text-sm font-medium text-slate-700">{champ.label}</label>
            <input
              type="text"
              value={constantes[champ.cle] || ''}
              onChange={(e) => majConstante(champ.cle, e.target.value)}
              className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onPrecedent} className="text-sm text-slate-500">
          ← Précédent
        </button>
        <button
          onClick={onSuivant}
          className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          Suivant : Analyse IA Clinique →
        </button>
      </div>
    </article>
  )
}

export default EtapeSignesVitaux
