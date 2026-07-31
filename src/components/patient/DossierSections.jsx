import { User, Heart, AlertTriangle, Pill, Stethoscope, Shield, Building2, Phone, CalendarDays } from 'lucide-react'
import { SectionCard, EmptyState } from './DossierShared'

/* ── 1. Informations administratives ── */

export function InformationsAdmin({ patient }) {
  const lignes = [
    { icon: Phone, label: 'Personne à prévenir', value: patient.personneAPrevenir || patient.contact || '—' },
    { icon: Building2, label: 'Établissement', value: patient.etablissement || 'Centre de Santé de Kamsonghin' },
    { icon: CalendarDays, label: 'Date de création', value: patient.dateCreation || patient.derniereVisite || '—' },
  ]
  return (
    <SectionCard title="Informations administratives" icon={User}>
      <dl className="space-y-2">
        {lignes.map((l) => {
          const Icon = l.icon
          return (
            <div key={l.label} className="flex items-start gap-2">
              <Icon size={13} className="text-slate-400 mt-0.5 shrink-0" />
              <dt className="text-xs text-slate-500 w-40 shrink-0">{l.label}</dt>
              <dd className="text-xs text-slate-800 font-medium">{l.value}</dd>
            </div>
          )
        })}
      </dl>
    </SectionCard>
  )
}

/* ── 2a. Antécédents personnels ── */

export function AntecedentsPersonnels({ patient }) {
  const liste = patient.antecedents || []
  return (
    <SectionCard title="Antécédents personnels" icon={Heart}>
      {liste.length === 0 || (liste.length === 1 && liste[0] === 'Aucun antécédent connu') ? (
        <EmptyState message="Aucun antécédent personnel connu" />
      ) : (
        <ul className="space-y-1">
          {liste.map((a, i) => (
            <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}

/* ── 2b. Antécédents familiaux ── */

export function AntecedentsFamiliaux({ patient }) {
  const liste = patient.antecedentsFamiliaux || []
  return (
    <SectionCard title="Antécédents familiaux" icon={Shield}>
      {liste.length === 0 ? (
        <EmptyState message="Aucun antécédent familial renseigné" />
      ) : (
        <ul className="space-y-1">
          {liste.map((a, i) => (
            <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              {typeof a === 'string' ? a : a.description}
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}

/* ── 3. Allergies ── */

const GRAVITE_LABEL = { legere: 'Légère', moderee: 'Modérée', severe: 'Sévère' }
const GRAVITE_COLOR = { legere: 'bg-amber-100 text-amber-700', moderee: 'bg-orange-100 text-orange-700', severe: 'bg-red-100 text-red-700' }

export function Allergies({ patient }) {
  const liste = patient.allergies || []
  return (
    <SectionCard title="Allergies" icon={AlertTriangle}>
      {liste.length === 0 ? (
        <EmptyState message="Aucune allergie connue" />
      ) : (
        <ul className="space-y-1.5">
          {liste.map((a, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-800">{a.substance}</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${GRAVITE_COLOR[a.gravite] || 'bg-slate-100 text-slate-600'}`}>
                {GRAVITE_LABEL[a.gravite] || a.gravite}
              </span>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}

/* ── 6. Traitements chroniques ── */

export function TraitementsChroniques({ patient }) {
  const liste = patient.traitementsChroniques || []
  return (
    <SectionCard title="Traitements chroniques" icon={Pill}>
      {liste.length === 0 ? (
        <EmptyState message="Aucun traitement chronique en cours" />
      ) : (
        <ul className="space-y-2">
          {liste.map((t, i) => (
            <li key={i} className="flex items-center justify-between border border-slate-100 rounded-lg p-2.5">
              <div>
                <p className="text-xs font-medium text-slate-800">{t.medicament}</p>
                {t.posologie && <p className="text-[11px] text-slate-500">{t.posologie}</p>}
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.enCours !== false ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {t.enCours !== false ? 'En cours' : 'Arrêté'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}

/* ── 7. Historique des consultations ── */

export function HistoriqueConsultations({ patient }) {
  const liste = patient.historique || []
  return (
    <SectionCard title="Historique des consultations" icon={Stethoscope}>
      {liste.length === 0 ? (
        <EmptyState message="Aucune consultation enregistrée" />
      ) : (
        <div className="space-y-2.5 max-h-72 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          {liste.map((h, i) => (
            <div key={i} className="border border-slate-100 rounded-lg p-3">
              <p className="text-[11px] text-slate-400 mb-0.5">{h.date}</p>
              <p className="text-xs font-medium text-slate-800">{h.motif}</p>
              <p className="text-[11px] text-slate-500">{h.diagnostic}</p>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}
