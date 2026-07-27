export async function getDiagnosticSuggestions(constantes, symptomes, antecedents) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    hypotheses: [
      {
        diagnostic: "Paludisme simple à Plasmodium falciparum",
        pertinence: "Élevée",
        justification: "Fièvre (39.2°C), céphalées et contexte endémique. Les constantes montrent une tachycardie réactionnelle.",
        examens_suggeres: ["Frottis sanguin goutte épaisse", "TDR Paludisme"]
      },
      {
        diagnostic: "Infection respiratoire aiguë",
        pertinence: "Moyenne",
        justification: "Présence de toux et de fièvre, mais absence de signes de lutte respiratoire notés à l'examen.",
        examens_suggeres: ["NFS", "Radiographie thoracique (si persistance)"]
      }
    ],
    alertes: ["Vérifier l'observance du traitement antihypertenseur vu les antécédents."]
  };
}