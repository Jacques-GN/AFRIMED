import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, estConfigure } from './supabaseClient'
import { MEDECIN_CONNECTE } from '../data/demoData'

const AuthContext = createContext(null)

// ── Profils démo pour chaque rôle ──────────────────────────────────
const PROFILS_DEMO = {
  'dr.kabore@afrimed.demo': {
    id: 'u1',
    nom: 'Kaboré',
    prenom: 'Dr.',
    email: 'dr.kabore@afrimed.demo',
    profil: 'medecin',
    specialite: MEDECIN_CONNECTE.specialite,
    etablissement: MEDECIN_CONNECTE.etablissement,
    actif: true,
  },
  'awa.sawadogo@afrimed.demo': {
    id: 'u2',
    nom: 'Sawadogo',
    prenom: 'Awa',
    email: 'awa.sawadogo@afrimed.demo',
    profil: 'laborantin',
    actif: true,
  },
  'moussa.traore@afrimed.demo': {
    id: 'u3',
    nom: 'Traoré',
    prenom: 'Moussa',
    email: 'moussa.traore@afrimed.demo',
    profil: 'administrateur',
    actif: true,
  },
}

const MOT_DE_PASSE_DEMO = 'demo1234'

/**
 * Retourne le chemin d'accueil selon le profil utilisateur.
 */
export function getCheminAccueil(profil) {
  if (!profil) return '/'
  switch (profil.profil) {
    case 'laborantin':
      return '/laborantin'
    case 'administrateur':
      return '/admin'
    default:
      return '/'
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profil, setProfil] = useState(null)
  const [loading, setLoading] = useState(true)

  const chargerProfil = useCallback(async (userId) => {
    const { data } = await supabase
      .from('utilisateurs')
      .select('*, etablissements(nom)')
      .eq('id', userId)
      .single()
    return data
  }, [])

  useEffect(() => {
    if (!estConfigure) {
      // Mode démo : pas d'auto-connexion, l'utilisateur doit se connecter
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        chargerProfil(session.user.id).then((p) => {
          setProfil(p)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user)
          chargerProfil(session.user.id).then(setProfil)
        } else {
          setUser(null)
          setProfil(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [chargerProfil])

  const signIn = async (email, motDePasse) => {
    if (!estConfigure) {
      // Mode démo : vérifier les identifiants parmi tous les comptes démo
      const emailLower = email.toLowerCase().trim()
      const profilDemo = PROFILS_DEMO[emailLower]
      if (profilDemo && motDePasse === MOT_DE_PASSE_DEMO) {
        setUser({ email: profilDemo.email })
        setProfil(profilDemo)
        return { error: null, profil: profilDemo }
      }
      return { error: { message: 'Identifiants incorrects (mode démo)' }, profil: null }
    }

    // Mode Supabase : tentative de connexion réelle
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: motDePasse,
      })
      if (error) {
        // Fallback démo si Supabase échoue
        const emailLower = email.toLowerCase().trim()
        const profilDemo = PROFILS_DEMO[emailLower]
        if (profilDemo && motDePasse === MOT_DE_PASSE_DEMO) {
          setUser({ email: profilDemo.email })
          setProfil(profilDemo)
          return { error: null, profil: profilDemo }
        }
        return { error, profil: null }
      }
      return { error: null, profil: null }
    } catch (err) {
      // Si Supabase échoue (clé invalide, réseau, etc.), fallback démo
      const emailLower = email.toLowerCase().trim()
      const profilDemo = PROFILS_DEMO[emailLower]
      if (profilDemo && motDePasse === MOT_DE_PASSE_DEMO) {
        setUser({ email: profilDemo.email })
        setProfil(profilDemo)
        return { error: null, profil: profilDemo }
      }
      return { error: { message: 'Identifiants incorrects' }, profil: null }
    }
  }

  const signOut = async () => {
    if (!estConfigure) {
      setUser(null)
      setProfil(null)
      return
    }
    try {
      await supabase.auth.signOut()
    } catch {
      // Fallback silencieux
    }
    setUser(null)
    setProfil(null)
  }

  return (
    <AuthContext.Provider value={{ user, profil, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans un AuthProvider')
  return ctx
}

export { AuthProvider, useAuth }
