import { useState } from 'react'
import { creerPatient } from '../lib/patientsRepository'

function NouveauPatient() {
  const [formulaire, setFormulaire] = useState({ nom: '', prenom: '', dateNaissance: '', contact: '' })
  const [patientCree, setPatientCree] = useState(null)
  const [enCours, setEnCours] = useState(false)
  const [erreur, setErreur] = useState(null)

  const majChamp = (champ, valeur) => setFormulaire((prec) => ({ ...prec, [champ]: valeur }))

  const creerDossier = async (e) => {
    e.preventDefault()
    setEnCours(true)
    setErreur(null)
    try {
      const patient = await creerPatient(formulaire)
      setPatientCree(patient)
    } catch (err) {
      setErreur("Impossible de créer le dossier. Vérifiez la connexion à la base de données.")
    } finally {
      setEnCours(false)
    }
  }

  if (patientCree) {
    return (
      <div className="max-w-lg">
        <h1 className="text-lg font-bold text-slate-900 mb-4">Dossier créé</h1>
        <article className="bg-green-50 rounded-xl p-6 text-center">
          <p className="text-sm text-green-800 mb-2">Code médical unique du patient</p>
          <p className="text-3xl font-bold text-green-700 font-mono mb-2">{patientCree.codeUnique}</p>
          <p className="text-xs text-green-700">
            Communiquez ce code à {patientCree.prenom} {patientCree.nom}. Il lui permettra d'accéder
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
          <button type="submit" disabled={enCours} className="bg-green-600 disabled:bg-slate-300 text-white text-sm font-medium px-5 py-2 rounded-lg mt-2">
            {enCours ? 'Création en cours...' : 'Créer le dossier patient'}
          </button>
          {erreur && <p className="text-xs text-red-600 mt-2">{erreur}</p>}
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
