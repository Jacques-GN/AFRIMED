// Service d'appel au modèle Gemini pour les suggestions diagnostiques.
// Sans clé API configurée (VITE_GEMINI_API_KEY), une réponse de démonstration
// est retournée pour permettre de développer et présenter l'interface sans dépendance externe.

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

/**
 * Construit le contexte clinique structuré transmis à l'IA à partir des données
 * saisies pendant la consultation. Ne transmet que les données cliniques
 * pertinentes (pas d'identité patient) pour limiter l'exposition de données
 * personnelles au service tiers.
 */
function construireContexteClinique(consultation, patient) {
  return {
    age: patient.age,
    sexe: patient.sexe,
    motif: consultation.motif,
    histoireMaladie: consultation.histoireMaladie,
    symptomes: consultation.symptomes || [],
    constantes: consultation.constantes || {},
    revueSystemes: consultation.revueSystemes || {},
    examenPhysique: consultation.examenPhysique || '',
    antecedents: patient.antecedents || [],
    allergies: (patient.allergies || []).map((a) => a.substance),
  }
}

function construirePrompt(contexte) {
  return `Tu es un module d'aide au diagnostic pour un médecin généraliste au Burkina Faso.
Analyse les données cliniques suivantes et retourne UNIQUEMENT un JSON valide avec cette forme :
{"hypotheses": [{"nom": "...", "probabilite": "Élevée|Modérée|Faible", "pourcentage": 0-100, "arguments": "..."}], "examensSuggeres": [{"nom": "...", "priorite": "1|2|selon_evolution"}], "niveauUrgence": "Faible|Modéré|Élevé"}

Données cliniques :
${JSON.stringify(contexte, null, 2)}

Rappel : ce sont des suggestions pour aider le médecin, pas un diagnostic définitif. Réponds uniquement avec le JSON, sans texte autour.`
}

const REPONSE_DEMO = {
  hypotheses: [
    { nom: 'Paludisme simple', probabilite: 'Élevée', pourcentage: 78, arguments: 'Fièvre élevée, frissons, céphalées, contexte épidémiologique' },
    { nom: 'Fièvre typhoïde', probabilite: 'Modérée', pourcentage: 45, arguments: 'Fièvre prolongée, douleur abdominale' },
    { nom: 'Infection respiratoire aiguë', probabilite: 'Faible', pourcentage: 23, arguments: 'Présence de toux, mais sans détresse respiratoire' },
  ],
  examensSuggeres: [
    { nom: 'TDR Paludisme', priorite: '1' },
    { nom: 'Numération formule sanguine (NFS)', priorite: '1' },
    { nom: 'CRP', priorite: '2' },
  ],
  niveauUrgence: 'Modéré',
}

/**
 * Interroge Gemini avec le contexte clinique de la consultation en cours.
 * Retourne une réponse de démonstration si aucune clé API n'est configurée,
 * afin que l'interface reste fonctionnelle en développement et en démo hors-ligne.
 */
export async function obtenirSuggestionsDiagnostiques(consultation, patient) {
  if (!GEMINI_API_KEY) {
    return REPONSE_DEMO
  }

  const contexte = construireContexteClinique(consultation, patient)
  const prompt = construirePrompt(contexte)

  const reponse = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  })

  if (!reponse.ok) {
    throw new Error(`Erreur API Gemini : ${reponse.status}`)
  }

  const donnees = await reponse.json()
  const texteGenere = donnees.candidates?.[0]?.content?.parts?.[0]?.text || ''
  const texteJson = texteGenere.replace(/```json|```/g, '').trim()

  return JSON.parse(texteJson)
}
