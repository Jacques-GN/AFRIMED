import { Check } from 'lucide-react'

const ETAPES = [
  { label: 'Interrogatoire', numero: 1 },
  { label: 'Examen clinique', numero: 2 },
  { label: 'Signes vitaux', numero: 3 },
  { label: 'Orientation', numero: 4 },
  { label: 'Synthèse', numero: 5 },
]

function ConsultationStepper({ etapeActive }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
      <div className="flex items-center">
        {ETAPES.map((etape, i) => {
          const estComplete = i < etapeActive
          const estActive = i === etapeActive
          return (
            <div key={etape.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shrink-0 ${
                    estComplete
                      ? 'bg-green-500 text-white'
                      : estActive
                        ? 'bg-green-500 text-white ring-4 ring-green-100'
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {estComplete ? <Check size={18} strokeWidth={3} /> : etape.numero}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    estActive ? 'text-green-700 font-semibold' : estComplete ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {etape.label}
                </span>
              </div>
              {i < ETAPES.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-3 rounded-full ${
                    i < etapeActive ? 'bg-green-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ConsultationStepper
