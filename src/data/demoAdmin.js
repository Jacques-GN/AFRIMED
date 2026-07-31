export const UTILISATEURS_DEMO = [
  { id: 'u1', nom: 'Kaboré', prenom: 'Dr.', email: 'dr.kabore@afrimed.demo', profil: 'medecin', actif: true },
  { id: 'u2', nom: 'Sawadogo', prenom: 'Awa', email: 'awa.sawadogo@afrimed.demo', profil: 'laborantin', actif: true },
]

export const STATS_ETABLISSEMENT_DEMO = {
  consultationsCeMois: 47,
  pathologiesFrequentes: [
    { nom: 'Paludisme', pourcentage: 42 },
    { nom: 'Infections respiratoires', pourcentage: 27 },
    { nom: 'Fièvre typhoïde', pourcentage: 14 },
    { nom: 'Autres', pourcentage: 17 },
  ],
  suivisEnRetard: 3,
}
