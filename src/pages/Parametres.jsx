import { useState } from 'react'
import { User, Building2, Camera, Save, HelpCircle, Lock, ShieldCheck } from 'lucide-react'
import { useAuth } from '../services/authContext'

const ONGLETS = [
  { id: 'profil', label: 'Mon profil', icon: User },
  { id: 'clinique', label: 'Ma clinique', icon: Building2 },
  { id: 'securite', label: 'Sécurité', icon: Lock },
]

function Parametres() {
  const { profil } = useAuth()
  const [ongletActif, setOngletActif] = useState('profil')
  const [formulaire, setFormulaire] = useState({
    titre: 'Dr.',
    nom: profil?.nom || 'Kaboré',
    prenom: profil?.prenom || 'Moussa',
    email: profil?.email || 'dr.kabore@afrimed.demo',
    telephone: '+226 70 12 34 56',
    specialite: profil?.specialite || 'Médecin généraliste',
    etablissement: profil?.etablissement || 'Centre de santé de Ouagadougou',
    adresse: 'Avenue Kwame Nkrumah, Ouagadougou',
    ville: 'Ouagadougou',
    pays: 'Burkina Faso',
  })
  const [sauvegarde, setSauvegarde] = useState(false)

  const majChamp = (champ, valeur) => {
    setFormulaire(prev => ({ ...prev, [champ]: valeur }))
    setSauvegarde(false)
  }

  const sauvegarder = (e) => {
    e.preventDefault()
    setSauvegarde(true)
    setTimeout(() => setSauvegarde(false), 3000)
  }

  return (
    <div>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Paramètres du compte</h1>
        <p className="text-sm text-slate-500 mt-1">Gérez vos informations personnelles et professionnelles</p>
      </header>

      {/* Tabs */}
      <nav className="flex gap-6 border-b border-slate-200 mb-6">
        {ONGLETS.map((o) => {
          const Icon = o.icon
          const actif = ongletActif === o.id
          return (
            <button
              key={o.id}
              onClick={() => setOngletActif(o.id)}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                actif
                  ? 'border-green-500 text-green-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon size={16} />
              {o.label}
            </button>
          )
        })}
      </nav>

      {/* Profile Tab */}
      {ongletActif === 'profil' && (
        <form onSubmit={sauvegarder} className="space-y-6">
          {/* Avatar section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Photo de profil</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  {formulaire.prenom?.[0]}{formulaire.nom?.[0]}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
                  <Camera size={14} className="text-slate-600" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Modifier la photo</p>
                <p className="text-xs text-slate-500 mt-1">JPG, PNG ou GIF. Max 2 Mo.</p>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Titre</label>
                <select
                  value={formulaire.titre}
                  onChange={(e) => majChamp('titre', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option>Dr.</option>
                  <option>Pr.</option>
                  <option>M.</option>
                  <option>Mme</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Prénom et Nom</label>
                <input
                  type="text"
                  value={`${formulaire.prenom} ${formulaire.nom}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(' ')
                    majChamp('prenom', parts[0] || '')
                    majChamp('nom', parts.slice(1).join(' ') || '')
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Adresse e-mail</label>
                <input
                  type="email"
                  value={formulaire.email}
                  onChange={(e) => majChamp('email', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Téléphone</label>
                <input
                  type="tel"
                  value={formulaire.telephone}
                  onChange={(e) => majChamp('telephone', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Spécialité</label>
                <input
                  type="text"
                  value={formulaire.specialite}
                  onChange={(e) => majChamp('specialite', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <Save size={16} />
              Sauvegarder
            </button>
            {sauvegarde && (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <ShieldCheck size={14} />
                Modifications enregistrées
              </span>
            )}
            <button
              type="button"
              className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <HelpCircle size={16} />
              Aide
            </button>
          </div>
        </form>
      )}

      {/* Clinique Tab */}
      {ongletActif === 'clinique' && (
        <form onSubmit={sauvegarder} className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Informations de la clinique</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Nom de l'établissement</label>
                <input
                  type="text"
                  value={formulaire.etablissement}
                  onChange={(e) => majChamp('etablissement', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Adresse</label>
                <input
                  type="text"
                  value={formulaire.adresse}
                  onChange={(e) => majChamp('adresse', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Ville</label>
                <input
                  type="text"
                  value={formulaire.ville}
                  onChange={(e) => majChamp('ville', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Pays</label>
                <input
                  type="text"
                  value={formulaire.pays}
                  onChange={(e) => majChamp('pays', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <Save size={16} />
              Sauvegarder
            </button>
            {sauvegarde && (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <ShieldCheck size={14} />
                Modifications enregistrées
              </span>
            )}
          </div>
        </form>
      )}

      {/* Security Tab */}
      {ongletActif === 'securite' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Changer le mot de passe</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Mot de passe actuel</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Nouveau mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Confirmer le mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 border border-slate-200 text-slate-600 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
              <Lock size={16} />
              Changer le mot de passe
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Sécurité du compte</h2>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-800">Authentification à deux facteurs</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Activée</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2">
                <User size={16} className="text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Dernière connexion</span>
              </div>
              <span className="text-xs text-slate-500">Aujourd'hui à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Parametres
