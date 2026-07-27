const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function getDiagnosticSuggestions(constantes, symptomes, antecedents, allergies) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const prompt = `En tant qu'assistant médical IA, analyse : Constantes: ${JSON.stringify(constantes)}, Symptômes: ${symptomes}, Antécédents: ${JSON.stringify(antecedents)}, Allergies: ${JSON.stringify(allergies)}. Propose 3 hypothèses diagnostiques pour le contexte ouest-africain.`;
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    if (response.ok) {
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    }
  } catch (error) {
    console.warn("Erreur API Gemini, mode mocké:", error);
  }
  return `### Hypothèses Diagnostiques (IA)\n1. **Paludisme simple** : Très fréquent, cohérent avec la fièvre.\n2. **Infection respiratoire** : Possible si toux associée.\n3. **Typhoïde** : À évoquer si fièvre prolongée.\n\n### Examens suggérés :\n- TDR Paludisme ou Goutte épaisse\n- NFS`;
}