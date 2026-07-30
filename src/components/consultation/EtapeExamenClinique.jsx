const APPAREILS = [
  { cle: 'cardioRespiratoire', label: 'Cardio-respiratoire' },
  { cle: 'digestif', label: 'Digestif' },
  { cle: 'neurologique', label: 'Neurologique' },
  { cle: 'orlAutres', label: 'ORL / autres' },
]

function EtapeExamenClinique({ donnees, onChange, onSuivant, onPrecedent }) {
  const revue = donnees.revueSystemes || {}

  const majAppareil = (cle, valeur) => {
    onChange({ ...donnees, revueSystemes: { ...revue, [cle]: valeur } })
  }

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-1">Revue des systèmes</h3>
      <p className="text-xs text-slate-500 mb-3">
        Passez en revue chaque appareil pour ne rien omettre lors de l'interrogatoire
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {APPAREILS.map((appareil) => (
          <div key={appareil.cle}>
            <label className="text-sm font-medium text-slate-700">{appareil.label}</label>
            <textarea
              value={revue[appareil.cle] || ''}
              onChange={(e) => majAppareil(appareil.cle, e.target.value)}
              className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
              rows={2}
            />
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-slate-800 mb-2 mt-4">
        Examen physique (observations)
      </h3>
      <textarea
        value={donnees.examenPhysique || ''}
        onChange={(e) => onChange({ ...donnees, examenPhysique: e.target.value })}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
        rows={3}
        placeholder="Ex : abdomen souple sensible en fosse iliaque, conjonctives légèrement pâles..."
      />

      <div className="flex justify-between mt-6">
        <button onClick={onPrecedent} className="text-sm text-slate-500">
          ← Précédent
        </button>
        <button
          onClick={onSuivant}
          className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          Suivant : Signes vitaux →
        </button>
      </div>
    </article>
  )
}

export default EtapeExamenClinique
