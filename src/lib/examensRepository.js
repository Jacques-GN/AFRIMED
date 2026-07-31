import { supabase, estConfigure } from '../services/supabaseClient'
import { DEMANDES_EXAMENS_DEMO } from '../data/demoExamens'

const demandesEnMemoire = [...DEMANDES_EXAMENS_DEMO]

/** Liste les demandes d'examens en attente, classées par ordre chronologique. */
export async function listerDemandesEnAttente() {
  if (!estConfigure) {
    return demandesEnMemoire
      .filter((d) => d.statut === 'demande')
      .sort((a, b) => a.dateDemande.localeCompare(b.dateDemande))
  }

  const { data, error } = await supabase
    .from('examens')
    .select('*')
    .eq('statut', 'demande')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

/** Liste les examens déjà traités par le laborantin. */
export async function listerExamensTraites() {
  if (!estConfigure) {
    return demandesEnMemoire.filter((d) => d.statut === 'resultat_saisi')
  }

  const { data, error } = await supabase
    .from('examens')
    .select('*')
    .eq('statut', 'resultat_saisi')
    .order('resultat_saisi_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Saisit le résultat d'un examen. Une fois validé, le résultat est verrouillé
 * (non modifiable) pour garantir la traçabilité — voir AGENTS.md et
 * supabase/schema.sql (colonne resultat_verrouille).
 */
export async function saisirResultat(demandeId, resultat) {
  if (!estConfigure) {
    const demande = demandesEnMemoire.find((d) => d.id === demandeId)
    if (demande) {
      demande.statut = 'resultat_saisi'
      demande.resultat = resultat
    }
    return demande
  }

  const { data, error } = await supabase
    .from('examens')
    .update({ statut: 'resultat_saisi', resultat, resultat_verrouille: true })
    .eq('id', demandeId)
    .select()
    .single()

  if (error) throw error
  return data
}
