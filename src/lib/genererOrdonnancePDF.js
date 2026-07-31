import { MEDECIN_CONNECTE } from '../data/demoData'

/**
 * Génère l'ordonnance en PDF et déclenche le téléchargement.
 * jsPDF est importé dynamiquement pour ne pas alourdir le bundle initial de
 * l'application — pertinent vu les contraintes de connectivité limitée visées
 * par AFRIMED (voir cahier des charges, section contraintes du contexte africain).
 */
export async function genererOrdonnancePDF({ patient, diagnosticRetenu, lignes }) {
  const { default: jsPDF } = await import('jspdf')
  const document_ = new jsPDF()
  const dateAujourdhui = new Date().toLocaleDateString('fr-FR')

  document_.setFontSize(16)
  document_.setFont(undefined, 'bold')
  document_.text('AFRIMED', 20, 20)
  document_.setFontSize(10)
  document_.setFont(undefined, 'normal')
  document_.text(MEDECIN_CONNECTE.etablissement, 20, 27)

  document_.setFontSize(11)
  document_.text(`${MEDECIN_CONNECTE.prenom} ${MEDECIN_CONNECTE.nom} — ${MEDECIN_CONNECTE.specialite}`, 20, 38)
  document_.text(`Date : ${dateAujourdhui}`, 150, 38)

  document_.setDrawColor(200)
  document_.line(20, 43, 190, 43)

  document_.setFontSize(12)
  document_.setFont(undefined, 'bold')
  document_.text('Patient', 20, 52)
  document_.setFont(undefined, 'normal')
  document_.setFontSize(10)
  document_.text(`${patient.nom} ${patient.prenom} — Code : ${patient.codeUnique}`, 20, 58)

  if (diagnosticRetenu) {
    document_.text(`Diagnostic : ${diagnosticRetenu}`, 20, 64)
  }

  document_.setFontSize(12)
  document_.setFont(undefined, 'bold')
  document_.text('Ordonnance', 20, 76)
  document_.setFont(undefined, 'normal')
  document_.setFontSize(10)

  let positionY = 84
  lignes
    .filter((l) => l.medicament)
    .forEach((l, index) => {
      document_.text(`${index + 1}. ${l.medicament}`, 20, positionY)
      document_.text(`${l.posologie || '—'} — ${l.duree || '—'}`, 30, positionY + 5)
      positionY += 14
    })

  document_.setFontSize(8)
  document_.setTextColor(150)
  document_.text(
    "Document généré par AFRIMED — prototype de démonstration.",
    20,
    285,
  )

  document_.save(`ordonnance-${patient.codeUnique}.pdf`)
}
