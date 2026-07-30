import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, getCheminAccueil } from '../services/authContext'
import { ShieldCheck, Stethoscope, Heart, Activity } from 'lucide-react'

const COMPTES_DEMO = [
  { label: 'Dr. Kaboré — Médecin', email: 'dr.kabore@afrimed.demo' },
  { label: 'Awa Sawadogo — Laborantin', email: 'awa.sawadogo@afrimed.demo' },
  { label: 'Moussa Traoré — Admin', email: 'moussa.traore@afrimed.demo' },
]

function Login() {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const [envoiEnCours, setEnvoiEnCours] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur('')
    setEnvoiEnCours(true)
    const { error, profil: profilConnecte } = await signIn(email, motDePasse)
    setEnvoiEnCours(false)
    if (error) {
      setErreur(error.message || 'Échec de connexion')
    } else {
      // Redirection vers le bon espace selon le rôle
      const chemin = getCheminAccueil(profilConnecte)
      navigate(chemin, { replace: true })
    }
  }

  const remplirDemo = (emailDemo) => {
    setEmail(emailDemo)
    setMotDePasse('demo1234')
    setErreur('')
  }

  return (
    <div className="min-h-screen flex">
      {/* Panneau gauche — branding */}
      <aside className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0B1E3D] to-[#0A1830] text-white flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-500 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-500 blur-3xl" />
        </div>

        <header className="relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="text-green-500">AFRI</span>MED
          </h1>
          <p className="text-slate-300 mt-2 text-lg">African Medical Intelligence</p>
        </header>

        <section className="relative z-10 space-y-6">
          <p className="text-xl font-light leading-relaxed text-slate-200">
            La plateforme médicale intelligente conçue pour les centres de santé africains.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Stethoscope, text: 'Consultation guidée' },
              { icon: Activity, text: 'Aide au diagnostic IA' },
              { icon: Heart, text: 'Suivi patient' },
              { icon: ShieldCheck, text: 'Données sécurisées' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                <Icon size={20} className="text-green-400 shrink-0" />
                <span className="text-sm text-slate-200">{text}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="relative z-10 text-xs text-slate-500">
          © 2026 AFRIMED — Prototype de démonstration
        </footer>
      </aside>

      {/* Panneau droit — formulaire */}
      <main className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className="text-green-600">AFRI</span>
              <span className="text-[#0B1E3D]">MED</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">African Medical Intelligence</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <header className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Connexion</h2>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-green-600" />
                Connexion sécurisée
              </p>
            </header>

            {erreur && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700" role="alert">
                {erreur}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="prenom@etablisme.fr"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={envoiEnCours}
                className="w-full py-2.5 bg-[#16A34A] hover:bg-green-700 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {envoiEnCours ? 'Connexion…' : 'Se connecter'}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-2">Comptes de démonstration :</p>
              <div className="space-y-1.5">
                {COMPTES_DEMO.map((c) => (
                  <button
                    key={c.email}
                    type="button"
                    onClick={() => remplirDemo(c.email)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-600 hover:bg-slate-50 hover:text-green-700 transition-colors"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
