import { useState } from 'react'
import { genererCodeUnique } from '../data/demoData'

function NouveauPatient() {
  const [formulaire, setFormulaire] = useState({ nom: '', prenom: '', dateNaissance: '', contact: '' })
  const [codeGenere, setCodeGenere] = useState(null)

  const majChamp = (champ, valeur) => setFormulaire((prec) => ({ ...prec, [champ]: valeur }))

  const creerDossier = (e) => {
    e.preventDefault()
    // En production : insertion dans la table `patients` (Supabase) avec l'établissement
    // du médecin connecté, puis récupération du code_unique généré côté base de données.
    setCodeGenere(genererCodeUnique())
  }

  if (codeGenere) {
    return (
      <div className="max-w-lg">
        <h1 className="text-lg font-bold text-slate-900 mb-4">Dossier créé</h1>
        <article className="bg-green-50 rounded-xl p-6 text-center">
          <p className="text-sm text-green-800 mb-2">Code médical unique du patient</p>
          <p className="text-3xl font-bold text-green-700 font-mono mb-2">{codeGenere}</p>
          <p className="text-xs text-green-700">
            Communiquez ce code à {formulaire.prenom} {formulaire.nom}. Il lui permettra d'accéder
            à son dossier depuis n'importe quel établissement affilié ou depuis son téléphone.
          </p>
        </article>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-lg font-bold text-slate-900 mb-1">Nouveau patient</h1>
      <p className="text-xs text-slate-500 mb-6">
        Créer un dossier patient — un code médical unique sera généré automatiquement
      </p>

      <form onSubmit={creerDossier} className="grid grid-cols-3 gap-6">
        <fieldset className="col-span-2 bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <legend className="text-sm font-semibold text-slate-800 mb-2">Identité</legend>
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Nom" value={formulaire.nom}
              onChange={(e) => majChamp('nom', e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            <input required placeholder="Prénom" value={formulaire.prenom}
              onChange={(e) => majChamp('prenom', e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            <input placeholder="Date de naissance" value={formulaire.dateNaissance}
              onChange={(e) => majChamp('dateNaissance', e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            <input placeholder="Contact / téléphone" value={formulaire.contact}
              onChange={(e) => majChamp('contact', e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <button type="submit" className="bg-green-600 text-white text-sm font-medium px-5 py-2 rounded-lg mt-2">
            Créer le dossier patient
          </button>
        </fieldset>

        <aside className="bg-blue-50 rounded-xl p-4 h-fit">
          <p className="text-sm font-semibold text-blue-800 mb-2">Code médical unique</p>
          <p className="text-xs text-blue-700">
            Généré à la création, ce code est le seul identifiant dont le patient aura besoin
            pour accéder à son dossier dans n'importe quel établissement affilié.
          </p>
        </aside>
      </form>
    </div>
  )
}

export default NouveauPatient
