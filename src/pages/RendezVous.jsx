const SUIVIS_DEMO = [
  { date: '30/07/2026', patient: 'SAWADOGO Aminata', consigne: 'Contrôle glycémie à jeun' },
  { date: '05/08/2026', patient: 'OUEDRAOGO Issa', consigne: 'Contrôle si fièvre persiste' },
]

function RendezVous() {
  return (
    <div>
      <h1 className="text-lg font-bold text-slate-900 mb-4">Suivis programmés</h1>
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        {SUIVIS_DEMO.map((s) => (
          <div key={s.patient + s.date} className="flex items-center justify-between px-5 py-3">
            <div>
              <p className="text-sm font-medium text-slate-800">{s.patient}</p>
              <p className="text-xs text-slate-500">{s.consigne}</p>
            </div>
            <span className="text-xs font-medium bg-green-50 text-green-700 px-3 py-1 rounded-full">
              {s.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RendezVous
