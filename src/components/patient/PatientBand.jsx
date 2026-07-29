function PatientBand({ patient }) {
  if (!patient) return null

  return (
    <section className="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-5 py-3 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm">
          {patient.prenom?.[0]}
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">
            {patient.nom} {patient.prenom}
          </p>
          <p className="text-xs text-slate-500">
            {patient.age} ans · {patient.sexe} · {patient.poidsKg} kg · {patient.tailleCm / 100} m
          </p>
        </div>
      </div>
      <span className="text-xs font-medium bg-green-50 text-green-700 px-3 py-1 rounded-full">
        {patient.codeUnique}
      </span>
    </section>
  )
}

export default PatientBand
