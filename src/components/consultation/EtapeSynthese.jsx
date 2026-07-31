function EtapeSynthese({ donnees, patient, diagnosticRetenu, onDiagnosticChange, onCloturer, onPrecedent }) {
  const symptomes = donnees.symptomes || []
  const constantes = donnees.constantes || {}

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Synthèse de la consultation</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-500 mb-1">Motif</p>
          <p className="text-sm text-slate-800">{donnees.motif || '—'}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-500 mb-1">Symptômes</p>
          <p className="text-sm text-slate-800">
            {symptomes.length > 0 ? symptomes.join(', ') : '—'}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-500 mb-1">Constantes</p>
          <p className="text-sm text-slate-800">
            {constantes.temperature ? `${constantes.temperature}°C` : '—'}
            {constantes.tensionArterielle ? ` · ${constantes.tensionArterielle} mmHg` : ''}
            {constantes.pouls ? ` · ${constantes.pouls} bpm` : ''}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-500 mb-1">Orientation</p>
          <p className="text-sm text-slate-800 capitalize">{donnees.orientation || '—'}</p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 mb-4">
        <label className="text-sm font-medium text-slate-700" htmlFor="diagnostic-retenu">
          Diagnostic retenu *
        </label>
        <p className="text-xs text-slate-500 mb-2">
          La consultation ne peut pas être clôturée sans diagnostic retenu.
        </p>
        <input
          id="diagnostic-retenu"
          type="text"
          value={diagnosticRetenu}
          onChange={(e) => onDiagnosticChange(e.target.value)}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
          placeholder="Ex : Paludisme simple"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onPrecedent} className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
          ← Précédent
        </button>
        <button
          onClick={onCloturer}
          disabled={!diagnosticRetenu}
          className="text-sm bg-green-600 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Passer à la prescription →
        </button>
      </div>
    </article>
  )
}

export default EtapeSynthese
