// Données de démonstration pour le prototype AFRIMED.
// À remplacer par de vrais appels Supabase une fois src/lib/supabaseClient.js connecté
// à un projet réel (voir .env.example).

export const MEDECIN_CONNECTE = {
  nom: 'Kaboré',
  prenom: 'Dr.',
  specialite: 'Médecin généraliste',
  etablissement: 'Centre de Santé de Kamsonghin',
}

export const PATIENTS_DEMO = [
  {
    id: 'p1',
    codeUnique: 'AFR-000125',
    nom: 'OUEDRAOGO',
    prenom: 'Issa',
    age: 23,
    sexe: 'Masculin',
    poidsKg: 70,
    tailleCm: 175,
    derniereVisite: '02/06/2026',
    dernierMotif: 'Fièvre',
    antecedents: ['Aucun antécédent connu'],
    allergies: [],
    historique: [
      { date: '02/06/2026', motif: 'Fièvre', diagnostic: 'Paludisme simple (confirmé TDR)' },
      { date: '15/03/2026', motif: 'Douleur abdominale', diagnostic: 'Gastro-entérite aiguë' },
      { date: '02/01/2026', motif: 'Contrôle vaccinal', diagnostic: 'Aucun — RAS' },
    ],
  },
  {
    id: 'p2',
    codeUnique: 'AFR-000098',
    nom: 'SAWADOGO',
    prenom: 'Aminata',
    age: 41,
    sexe: 'Féminin',
    poidsKg: 68,
    tailleCm: 162,
    derniereVisite: '29/05/2026',
    dernierMotif: 'Suivi diabète',
    antecedents: ['Diabète de type 2 diagnostiqué en 2021'],
    allergies: [{ substance: 'Pénicilline', gravite: 'sévère' }],
    historique: [
      { date: '29/05/2026', motif: 'Suivi diabète', diagnostic: 'Équilibre glycémique satisfaisant' },
    ],
  },
  {
    id: 'p3',
    codeUnique: 'AFR-000141',
    nom: 'KABORÉ',
    prenom: 'Boukary',
    age: 6,
    sexe: 'Masculin',
    poidsKg: 20,
    tailleCm: 112,
    derniereVisite: '27/05/2026',
    dernierMotif: 'Toux persistante',
    antecedents: [],
    allergies: [],
    historique: [
      { date: '27/05/2026', motif: 'Toux persistante', diagnostic: 'Bronchite aiguë' },
    ],
  },
]

export const EXAMENS_DISPONIBLES = [
  'TDR Paludisme',
  'Numération formule sanguine (NFS)',
  'CRP',
  'Hémoculture',
  'Sérologie typhoïde (Widal)',
  'Radiographie thoracique',
  'Glycémie',
  'Créatininémie',
]

export const MEDICAMENTS_DEMO = [
  { nom: 'Paracétamol', formes: ['comprimé 500mg', 'sirop'] },
  { nom: 'Artésunate-Amodiaquine', formes: ['comprimé'] },
  { nom: 'Amoxicilline', formes: ['comprimé 500mg', 'sirop'] },
  { nom: 'Ibuprofène', formes: ['comprimé 400mg'] },
  { nom: 'Métronidazole', formes: ['comprimé 500mg'] },
]

/**
 * Génère un code patient unique alphanumérique court.
 * En production, la génération et l'unicité doivent être garanties côté base
 * de données (contrainte unique + retry), ceci est une version de démonstration.
 */
export function genererCodeUnique() {
  const suffixe = Math.floor(100000 + Math.random() * 900000)
  return `AFR-${suffixe}`
}
