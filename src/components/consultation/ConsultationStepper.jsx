export const ETAPES_CONSULTATION = [
  'Interrogatoire',
  'Examen clinique',
  'Signes vitaux',
  'IA Clinique',
  'Synthèse',
]

function ConsultationStepper({ etapeActive }) {
  return (
    <nav className="flex items-center mb-6" aria-label="Étapes de la consultation">
      {ETAPES_CONSULTATION.map((etape, index) => (
        <div key={etape} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                index === etapeActive ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-[11px] mt-1 ${
                index === etapeActive ? 'text-green-700 font-medium' : 'text-slate-400'
              }`}
            >
              {etape}
            </span>
          </div>
          {index < ETAPES_CONSULTATION.length - 1 && (
            <div className="flex-1 h-px bg-slate-200 mx-2" />
          )}
        </div>
      ))}
    </nav>
  )
}

export default ConsultationStepper
