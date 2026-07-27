const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getDiagnosticSuggestions(consultationData) {
  console.log('Fetching AI suggestions for:', consultationData);
  return {
    hypotheses: [
      { name: 'Paludisme simple', justification: 'Fievre, cephalées, contexte endémique.', pertinence: 'Élevée' }
    ],
    suggestedTests: ['NFS', 'Goutte épaisse']
  };
}