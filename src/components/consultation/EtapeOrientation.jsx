const ORIENTATIONS = [
  { valeur: 'consultation', label: 'Consultation externe', description: 'Le patient peut être suivi en ambulatoire' },
  { valeur: 'hospitalisation', label: 'Hospitalisation', description: 'Nécessite une surveillance hospitalière' },
  { valeur: 'urgences', label: 'Transfert aux urgences', description: 'Prise en charge urgente nécessaire' },
  { valeur: 'specialiste', label: 'Avis spécialisé', description: 'Orientation vers un spécialiste' },
  { valeur: 'domicile', label: 'Soins à domicile', description: 'Suivi et traitement à domicile' },
]

function EtapeOrientation({ donnees, onChange, onSuivant, onPrecedent }) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-1">Orientation du patient</h3>
      <p className="text-xs text-slate-500 mb-4">
        Déterminez la prise en charge la plus adaptée
      </p>

      <div className="space-y-2 mb-4">
        {ORIENTATIONS.map((o) => (
          <label
            key={o.valeur}
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              donnees.orientation === o.valeur
                ? 'bg-green-50 border-green-300'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <input
              type="radio"
              name="orientation"
              value={o.valeur}
              checked={donnees.orientation === o.valeur}
              onChange={() => onChange({ ...donnees, orientation: o.valeur })}
              className="accent-green-600 mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-slate-800">{o.label}</p>
              <p className="text-xs text-slate-500">{o.description}</p>
            </div>
          </label>
        ))}
      </div>

      <label className="text-sm font-medium text-slate-700" htmlFor="motif-orientation">
        Justification de l'orientation
      </label>
      <textarea
        id="motif-orientation"
        value={donnees.motifOrientation || ''}
        onChange={(e) => onChange({ ...donnees, motifOrientation: e.target.value })}
        className="w-full mt-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
        rows={2}
        placeholder="Expliquez les raisons de cette orientation..."
      />

      <div className="flex justify-between mt-6">
        <button onClick={onPrecedent} className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
          ← Précédent
        </button>
        <button
          onClick={onSuivant}
          disabled={!donnees.orientation}
          className="text-sm bg-green-600 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Suivant : Synthèse →
        </button>
      </div>
    </article>
  )
}

export default EtapeOrientation
