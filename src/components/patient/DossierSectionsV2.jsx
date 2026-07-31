import { Syringe, Cigarette, BedDouble, Image, FileStack } from 'lucide-react'
import { SectionCard, ComingSoon } from './DossierShared'

/* ── 4. Vaccination (V2) ── */

export function Vaccination() {
  return (
    <SectionCard title="Vaccination" icon={Syringe} badge="V2" disabled>
      <ComingSoon message="Le module vaccination sera disponible dans une prochaine version" />
    </SectionCard>
  )
}

/* ── 5. Habitudes de vie (V2) ── */

export function HabitudesDeVie() {
  return (
    <SectionCard title="Habitudes de vie" icon={Cigarette} badge="V2" disabled>
      <ComingSoon message="Tabac, alcool, activité physique, alimentation" />
    </SectionCard>
  )
}

/* ── 8. Hospitalisations (V2) ── */

export function Hospitalisations() {
  return (
    <SectionCard title="Hospitalisations" icon={BedDouble} badge="V2" disabled>
      <ComingSoon message="Historique des hospitalisations — disponible en V2" />
    </SectionCard>
  )
}

/* ── 9. Imagerie (V2) ── */

export function Imagerie() {
  return (
    <SectionCard title="Imagerie" icon={Image} badge="V2" disabled>
      <ComingSoon message="Radiographies, échographies, scanners — disponible en V2" />
    </SectionCard>
  )
}

/* ── 10. Documents médicaux (V2) ── */

export function DocumentsMedicaux() {
  return (
    <SectionCard title="Documents médicaux" icon={FileStack} badge="V2" disabled>
      <ComingSoon message="Ordonnances, certificats, comptes rendus — disponible en V2" />
    </SectionCard>
  )
}
