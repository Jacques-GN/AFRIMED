import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Plus, Clock, User, MapPin } from 'lucide-react'

const RENDEZ_VOUS_DEMO = [
  { id: 1, patient: 'SAWADOGO Aminata', type: 'Consultation de suivi', heure: '08:00', date: '2026-07-31', lieu: 'Salle 2', couleur: 'blue' },
  { id: 2, patient: 'OUEDRAOGO Issa', type: 'Contrôle fièvre', heure: '09:30', date: '2026-07-31', lieu: 'Salle 1', couleur: 'green' },
  { id: 3, patient: 'TRAORE Fatoumata', type: 'Analyse de sang', heure: '10:00', date: '2026-07-31', lieu: 'Laboratoire', couleur: 'purple' },
  { id: 4, patient: 'KABORE Moussa', type: 'Première consultation', heure: '11:30', date: '2026-07-31', lieu: 'Salle 3', couleur: 'amber' },
  { id: 5, patient: 'DIALLO Awa', type: 'Suivi grossesse', heure: '14:00', date: '2026-07-31', lieu: 'Salle 2', couleur: 'blue' },
  { id: 6, patient: 'SANOU Ibrahim', type: 'Contrôle tension', heure: '15:30', date: '2026-07-31', lieu: 'Salle 1', couleur: 'green' },
  { id: 7, patient: 'OUEDRAOGO Issa', type: 'Contrôle si fièvre persiste', heure: '09:00', date: '2026-08-01', lieu: 'Salle 1', couleur: 'green' },
  { id: 8, patient: 'SAWADOGO Aminata', type: 'Contrôle glycémie à jeun', heure: '08:00', date: '2026-08-05', lieu: 'Laboratoire', couleur: 'purple' },
]

const COULEURS_ACCENT = {
  blue: { bar: 'bg-blue-500', circle: 'bg-blue-500', text: 'text-blue-700' },
  green: { bar: 'bg-green-500', circle: 'bg-green-500', text: 'text-green-700' },
  purple: { bar: 'bg-purple-500', circle: 'bg-purple-500', text: 'text-purple-700' },
  amber: { bar: 'bg-amber-500', circle: 'bg-amber-500', text: 'text-amber-700' },
}

const JOURS_SEMAINE = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

function getJoursDuMois(annee, mois) {
  const premierJour = new Date(annee, mois, 1).getDay()
  const decalage = premierJour === 0 ? 6 : premierJour - 1
  const nbJours = new Date(annee, mois + 1, 0).getDate()
  const jours = []
  for (let i = 0; i < decalage; i++) jours.push(null)
  for (let j = 1; j <= nbJours; j++) jours.push(j)
  return jours
}

function RendezVous() {
  const [dateSelectionnee, setDateSelectionnee] = useState(new Date())
  const [moisCalendrier, setMoisCalendrier] = useState(new Date().getMonth())
  const [anneeCalendrier, setAnneeCalendrier] = useState(new Date().getFullYear())

  const jours = getJoursDuMois(anneeCalendrier, moisCalendrier)
  const dateStr = `${anneeCalendrier}-${String(moisCalendrier + 1).padStart(2, '0')}-${String(dateSelectionnee.getDate()).padStart(2, '0')}`

  const rendezVousJour = RENDEZ_VOUS_DEMO.filter(r => r.date === dateStr)
  const joursAvecRDV = RENDEZ_VOUS_DEMO.reduce((acc, r) => {
    acc[r.date] = true
    return acc
  }, {})

  const moisPrecedent = () => {
    if (moisCalendrier === 0) { setMoisCalendrier(11); setAnneeCalendrier(a => a - 1) }
    else setMoisCalendrier(m => m - 1)
  }
  const moisSuivant = () => {
    if (moisCalendrier === 11) { setMoisCalendrier(0); setAnneeCalendrier(a => a + 1) }
    else setMoisCalendrier(m => m + 1)
  }

  const aujourdHui = new Date()
  const estAujourdhui = (jour) => {
    return jour === aujourdHui.getDate() && moisCalendrier === aujourdHui.getMonth() && anneeCalendrier === aujourdHui.getFullYear()
  }

  return (
    <div>
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des rendez-vous</h1>
          <p className="text-sm text-slate-500 mt-1">Planifiez et suivez vos consultations</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} />
          Nouveau rendez-vous
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Calendar - Left side */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={moisPrecedent} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <ChevronLeft size={18} className="text-slate-600" />
            </button>
            <h2 className="text-base font-semibold text-slate-900">
              {MOIS[moisCalendrier]} {anneeCalendrier}
            </h2>
            <button onClick={moisSuivant} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <ChevronRight size={18} className="text-slate-600" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {JOURS_SEMAINE.map(j => (
              <div key={j} className="text-center text-xs font-medium text-slate-500 py-1">{j}</div>
            ))}
          </div>

          {/* Day numbers */}
          <div className="grid grid-cols-7 gap-1">
            {jours.map((jour, i) => {
              if (jour === null) return <div key={`empty-${i}`} />
              const dateJour = `${anneeCalendrier}-${String(moisCalendrier + 1).padStart(2, '0')}-${String(jour).padStart(2, '0')}`
              const aRDV = joursAvecRDV[dateJour]
              const selectionne = dateSelectionnee.getDate() === jour && dateSelectionnee.getMonth() === moisCalendrier && dateSelectionnee.getFullYear() === anneeCalendrier
              return (
                <button
                  key={jour}
                  onClick={() => setDateSelectionnee(new Date(anneeCalendrier, moisCalendrier, jour))}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    selectionne
                      ? 'bg-green-600 text-white'
                      : estAujourdhui(jour)
                        ? 'bg-green-100 text-green-700'
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {jour}
                  {aRDV && !selectionne && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-green-500" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Appointment List - Right side */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              Rendez-vous du {dateSelectionnee.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h2>
            <span className="text-xs text-slate-500">{rendezVousJour.length} rendez-vous</span>
          </div>

          {rendezVousJour.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
              <Calendar size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-sm text-slate-500">Aucun rendez-vous prévu ce jour</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rendezVousJour.map((rdv) => {
                const c = COULEURS_ACCENT[rdv.couleur] || COULEURS_ACCENT.blue
                return (
                  <div key={rdv.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex">
                    {/* Left accent bar */}
                    <div className={`w-1 ${c.bar}`} />
                    <div className="flex-1 p-4 flex items-center gap-4">
                      {/* Time badge */}
                      <div className={`w-12 h-12 rounded-full ${c.circle} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {rdv.heure}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{rdv.patient}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{rdv.type}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin size={12} className="text-slate-400" />
                          <span className="text-xs text-slate-500">{rdv.lieu}</span>
                        </div>
                      </div>
                      {/* Status */}
                      <span className={`text-xs font-medium ${c.text} bg-opacity-10 px-2 py-1 rounded-full`}>
                        Confirmé
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RendezVous
