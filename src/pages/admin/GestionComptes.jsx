import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { UTILISATEURS_DEMO } from '../../data/demoAdmin'

function GestionComptes() {
  const [utilisateurs, setUtilisateurs] = useState(UTILISATEURS_DEMO)
  const [formulaireOuvert, setFormulaireOuvert] = useState(false)
  const [nouveauCompte, setNouveauCompte] = useState({ nom: '', prenom: '', email: '', profil: 'medecin' })

  const basculerActif = (id) => {
    setUtilisateurs((prec) =>
      prec.map((u) => (u.id === id ? { ...u, actif: !u.actif } : u))
    )
  }

  const creerCompte = (e) => {
    e.preventDefault()
    // En production : Supabase Auth invite (email d'invitation automatique)
    // plutôt qu'une création directe côté client.
    setUtilisateurs((prec) => [...prec, { id: `u${Date.now()}`, ...nouveauCompte, actif: true }])
    setNouveauCompte({ nom: '', prenom: '', email: '', profil: 'medecin' })
    setFormulaireOuvert(false)
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-slate-900">Comptes utilisateurs</h1>
        <button
          onClick={() => setFormulaireOuvert(true)}
          className="flex items-center gap-2 text-sm bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          <UserPlus size={16} /> Créer un compte
        </button>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft divide-y divide-slate-100">
        {utilisateurs.map((u) => (
          <div key={u.id} className="flex items-center justify-between px-5 py-3.5">
            <div>
              <p className="text-sm font-medium text-slate-800">{u.prenom} {u.nom}</p>
              <p className="text-xs text-slate-500">{u.email} · {u.profil}</p>
            </div>
            <button
              onClick={() => basculerActif(u.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                u.actif ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {u.actif ? 'Actif' : 'Désactivé'}
            </button>
          </div>
        ))}
      </div>

      {formulaireOuvert && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
          <form onSubmit={creerCompte} className="bg-white rounded-2xl shadow-elevated p-6 w-full max-w-md">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Nouveau compte</h2>

            <div className="space-y-3 mb-4">
              <input required placeholder="Nom" value={nouveauCompte.nom}
                onChange={(e) => setNouveauCompte({ ...nouveauCompte, nom: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              <input required placeholder="Prénom" value={nouveauCompte.prenom}
                onChange={(e) => setNouveauCompte({ ...nouveauCompte, prenom: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              <input required type="email" placeholder="Email" value={nouveauCompte.email}
                onChange={(e) => setNouveauCompte({ ...nouveauCompte, email: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              <select value={nouveauCompte.profil}
                onChange={(e) => setNouveauCompte({ ...nouveauCompte, profil: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option value="medecin">Médecin</option>
                <option value="laborantin">Laborantin</option>
              </select>
            </div>

            <p className="text-[11px] text-slate-400 mb-4">
              Un email d'invitation sera envoyé pour que la personne définisse son mot de passe.
            </p>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setFormulaireOuvert(false)} className="text-sm px-4 py-2 rounded-lg border border-slate-200">
                Annuler
              </button>
              <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-green-600 text-white font-medium">
                Créer le compte
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default GestionComptes
