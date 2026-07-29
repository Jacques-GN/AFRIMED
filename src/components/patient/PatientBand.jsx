function PatientBand({ patient }) {
  if (!patient) return null

  return (
    <section className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 shadow-soft px-5 py-3.5 mb-6">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold text-sm shadow-soft shrink-0">
          {patient.prenom?.[0]}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 text-sm truncate">
            {patient.nom} {patient.prenom}
          </p>
          <p className="text-xs text-slate-500">
            {patient.age} ans · {patient.sexe} · {patient.poidsKg} kg · {patient.tailleCm / 100} m
          </p>
        </div>
      </div>
      <span className="text-xs font-medium bg-green-50 text-green-700 px-3 py-1.5 rounded-full shrink-0 ml-3">
        {patient.codeUnique}
      </span>
    </section>
  )
}

export default PatientBand
