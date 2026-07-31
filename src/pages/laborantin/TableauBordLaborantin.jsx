import { useState, useEffect } from 'react'
import { Beaker } from 'lucide-react'
import { listerDemandesEnAttente, saisirResultat } from '../../lib/examensRepository'

function TableauBordLaborantin() {
  const [demandes, setDemandes] = useState([])
  const [chargement, setChargement] = useState(true)
  const [demandeOuverte, setDemandeOuverte] = useState(null)
  const [resultatSaisi, setResultatSaisi] = useState('')

  const rafraichir = () => listerDemandesEnAttente().then(setDemandes)

  useEffect(() => {
    rafraichir().finally(() => setChargement(false))
  }, [])

  const validerResultat = async () => {
    if (!resultatSaisi.trim()) return
    await saisirResultat(demandeOuverte.id, resultatSaisi)
    setDemandeOuverte(null)
    setResultatSaisi('')
    rafraichir()
  }

  return (
    <div>
      <h1 className="text-lg font-bold text-slate-900 mb-1">Demandes d'examens en attente</h1>
      <p className="text-xs text-slate-500 mb-6">Classées par ordre chronologique</p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft divide-y divide-slate-100">
        {chargement && <p className="p-5 text-sm text-slate-400">Chargement...</p>}

        {!chargement && demandes.map((d) => (
          <div key={d.id} className="p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                <Beaker size={16} className="text-purple-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{d.typeExamen}</p>
                <p className="text-xs text-slate-500">
                  {d.patientNom} · demandé par {d.demandePar} · {d.dateDemande}
                </p>
              </div>
            </div>
            <button
              onClick={() => setDemandeOuverte(d)}
              className="text-xs font-medium bg-green-600 text-white px-3 py-1.5 rounded-lg shrink-0"
            >
              Saisir le résultat
            </button>
          </div>
        ))}

        {!chargement && demandes.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-400">Aucune demande en attente.</p>
        )}
      </div>

      {demandeOuverte && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-elevated p-6 w-full max-w-md">
            <h2 className="text-sm font-semibold text-slate-800 mb-1">{demandeOuverte.typeExamen}</h2>
            <p className="text-xs text-slate-500 mb-4">Patient : {demandeOuverte.patientNom}</p>

            <label className="text-sm font-medium text-slate-700">Résultat</label>
            <textarea
              value={resultatSaisi}
              onChange={(e) => setResultatSaisi(e.target.value)}
              rows={3}
              className="w-full mt-1 mb-4 border border-slate-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Ex : Positif, densité parasitaire faible"
            />
            <p className="text-[11px] text-slate-400 mb-4">
              Une fois validé, ce résultat ne pourra plus être modifié.
            </p>

            <div className="flex justify-end gap-2">
              <button onClick={() => setDemandeOuverte(null)} className="text-sm px-4 py-2 rounded-lg border border-slate-200">
                Annuler
              </button>
              <button onClick={validerResultat} className="text-sm px-4 py-2 rounded-lg bg-green-600 text-white font-medium">
                Valider le résultat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableauBordLaborantin
