import { MoreVertical } from 'lucide-react'

function PatientBand({ patient }) {
  const initiales = `${(patient.prenom || 'O')[0]}${(patient.nom || 'I')[0]}`

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-700 font-bold text-sm">{initiales}</span>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">
            {patient.nom || 'OUEDRAOGO'} {patient.prenom || 'ISSA'}
          </p>
          <p className="text-xs text-slate-500">
            {patient.age || '23'} ans • {patient.sexe || 'Masculin'} • {patient.poids || '70'} kg • {patient.taille || '1,75'} m
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
          Dossier n° {patient.codeUnique || '000125'}
        </span>
        <button className="text-slate-400 hover:text-slate-600" aria-label="Options">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  )
}

export default PatientBand
