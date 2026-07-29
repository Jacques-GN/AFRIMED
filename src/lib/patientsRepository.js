import { supabase, estConfigure } from '../services/supabaseClient'
import { PATIENTS_DEMO, genererCodeUnique } from '../data/demoData'

// Copie mutable en mémoire pour le mode démo, afin qu'un patient créé pendant
// la session apparaisse dans les listes sans nécessiter de vrai backend.
// Réinitialisée au rechargement de la page — comportement attendu en démo.
const patientsEnMemoire = [...PATIENTS_DEMO]

/**
 * Liste les patients de l'établissement du médecin connecté.
 * TODO (Supabase réel) : filtrer par etablissement_id via une politique RLS
 * plutôt que côté client, une fois l'authentification branchée.
 */
export async function listerPatients() {
  if (!estConfigure) {
    return patientsEnMemoire
  }

  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function obtenirPatientParId(id) {
  if (!estConfigure) {
    return patientsEnMemoire.find((p) => p.id === id) || null
  }

  const { data, error } = await supabase.from('patients').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function obtenirPatientParCode(codeUnique) {
  if (!estConfigure) {
    return patientsEnMemoire.find((p) => p.codeUnique === codeUnique) || null
  }

  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('code_unique', codeUnique)
    .single()

  if (error) return null
  return data
}

/**
 * Crée un dossier patient et retourne le patient créé avec son code unique.
 * En mode Supabase réel, le code unique devrait être généré côté base de
 * données (fonction SQL avec contrainte unique + retry) plutôt que côté
 * client, pour garantir l'unicité sous concurrence.
 */
export async function creerPatient({ nom, prenom, dateNaissance, contact }) {
  if (!estConfigure) {
    const nouveauPatient = {
      id: `p${Date.now()}`,
      codeUnique: genererCodeUnique(),
      nom,
      prenom,
      dateNaissance,
      contact,
      age: null,
      sexe: null,
      poidsKg: null,
      tailleCm: null,
      derniereVisite: null,
      dernierMotif: null,
      antecedents: [],
      allergies: [],
      historique: [],
    }
    patientsEnMemoire.unshift(nouveauPatient)
    return nouveauPatient
  }

  const { data, error } = await supabase
    .from('patients')
    .insert({ nom, prenom, date_naissance: dateNaissance, contact })
    .select()
    .single()

  if (error) throw error
  return data
}
