import { MoreVertical } from 'lucide-react'

function PatientBandIA({ patient, donnees }) {
  const initiales = `${(patient?.prenom || 'O')[0]}${(patient?.nom || 'I')[0]}`

  const symptomes = [
    { label: 'Motif', valeur: donnees?.motif || 'Fièvre' },
    { label: 'Durée', valeur: donnees?.dureeSymptomes === 'plus72h' ? 'Plus de 72h' : donnees?.dureeSymptomes || 'Plus de 72h' },
    { label: 'Température', valeur: donnees?.constantes?.temperature ? `${donnees.constantes.temperature} °C` : '39,1 °C' },
    { label: 'Frissons', valeur: (donnees?.symptomes || []).includes('Frissons') ? 'Oui' : 'Non' },
    { label: 'Céphalées', valeur: (donnees?.symptomes || []).includes('Céphalées') ? 'Oui' : 'Non' },
    { label: 'Autres', valeur: donnees?.autreSymptome || 'Douleur abdominale' },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-700 font-bold text-sm">{initiales}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              {patient?.nom || 'OUEDRAOGO'} {patient?.prenom || 'ISSA'}
            </p>
            <p className="text-xs text-slate-500">
              {patient?.age || '23'} ans • {patient?.sexe || 'Masculin'} • {patient?.poids || '70'} kg • {patient?.taille || '1,75'} m
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
            Dossier n° {patient?.codeUnique || '000125'}
          </span>
          <button className="text-slate-400 hover:text-slate-600" aria-label="Options">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {symptomes.map((s) => (
          <div key={s.label} className="bg-slate-50 rounded-lg px-2.5 py-2 text-center">
            <p className="text-[10px] text-slate-500 font-medium">{s.label}</p>
            <p className="text-xs text-slate-800 font-semibold mt-0.5">{s.valeur}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PatientBandIA
