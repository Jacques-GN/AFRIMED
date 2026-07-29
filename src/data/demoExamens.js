// Demandes d'examens de démonstration, utilisées par le repository en l'absence
// de connexion Supabase réelle. Représentent le flux médecin -> laborantin.

export const DEMANDES_EXAMENS_DEMO = [
  {
    id: 'ex1',
    patientId: 'p1',
    patientNom: 'OUEDRAOGO Issa',
    typeExamen: 'TDR Paludisme',
    demandePar: 'Dr. Kaboré',
    statut: 'demande',
    resultat: null,
    dateDemande: '02/06/2026 08:14',
  },
  {
    id: 'ex2',
    patientId: 'p1',
    patientNom: 'OUEDRAOGO Issa',
    typeExamen: 'Numération formule sanguine (NFS)',
    demandePar: 'Dr. Kaboré',
    statut: 'demande',
    resultat: null,
    dateDemande: '02/06/2026 08:14',
  },
  {
    id: 'ex3',
    patientId: 'p2',
    patientNom: 'SAWADOGO Aminata',
    typeExamen: 'Glycémie',
    demandePar: 'Dr. Kaboré',
    statut: 'resultat_saisi',
    resultat: '1,08 g/L',
    dateDemande: '29/05/2026 09:02',
  },
]
