import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, Users, Calendar, BarChart3, ArrowRight, Cloud, CheckCircle2, Thermometer, AlertTriangle, ShieldCheck, Tablet } from 'lucide-react'
import { useAuth } from '../services/authContext'
import { listerPatients } from '../lib/patientsRepository'

const ACTIONS = [
  { label: 'Nouveau patient', desc: 'Enregistrer un nouveau patient', chemin: '/nouveau-patient', icone: UserPlus, iconBg: 'bg-blue-100', iconText: 'text-blue-600', arrowBg: 'bg-blue-600' },
  { label: 'Patients', desc: 'Consulter la liste des patients', chemin: '/patients', icone: Users, iconBg: 'bg-green-100', iconText: 'text-green-600', arrowBg: 'bg-green-600' },
  { label: 'Rendez-vous', desc: 'Gérer les rendez-vous et les suivis', chemin: '/rendez-vous', icone: Calendar, iconBg: 'bg-amber-100', iconText: 'text-amber-600', arrowBg: 'bg-amber-500' },
  { label: 'Santé publique', desc: 'Voir les statistiques et alertes sanitaires', chemin: '/sante-publique', icone: BarChart3, iconBg: 'bg-violet-100', iconText: 'text-violet-600', arrowBg: 'bg-violet-600' },
]

const KPIS = [
  { label: 'Patients vus aujourd\'hui', valeur: 18, color: 'blue', icone: Users, spark: [4, 8, 6, 12, 10, 14, 18] },
  { label: 'Rendez-vous prévus', valeur: 12, color: 'green', icone: Calendar, spark: [6, 8, 10, 9, 11, 10, 12] },
  { label: 'Cas fébriles aujourd\'hui', valeur: 5, color: 'orange', icone: Thermometer, spark: [1, 2, 3, 4, 3, 5, 5] },
  { label: 'Alerte sanitaire active', valeur: 1, color: 'red', icone: AlertTriangle, spark: [0, 0, 1, 0, 1, 1, 1] },
]

const KPI_COLORS = {
  blue: { iconBg: 'bg-blue-100', text: 'text-blue-600', spark: '#3b82f6' },
  green: { iconBg: 'bg-green-100', text: 'text-green-600', spark: '#22c55e' },
  orange: { iconBg: 'bg-orange-100', text: 'text-orange-600', spark: '#f59e0b' },
  red: { iconBg: 'bg-red-100', text: 'text-red-600', spark: '#ef4444' },
}

function formatDate() {
  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  const d = new Date()
  return `${jours[d.getDay()]} ${d.getDate()} ${mois[d.getMonth()]} ${d.getFullYear()}`
}

function Sparkline({ data, color }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 56
  const h = 20
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-60">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  )
}

function Dashboard() {
  const { profil } = useAuth()
  const [patients, setPatients] = useState([])

  useEffect(() => { listerPatients().then(setPatients) }, [])

  const prenom = profil?.prenom || 'Dr.'
  const nom = profil?.nom || 'Kaboré'

  return (
    <div>
      {/* Welcome Banner */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Bonjour {prenom} {nom} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">{formatDate()}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Cloud size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800">Synchronisation</p>
            <p className="text-[10px] text-slate-500">Dernière sync : {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <CheckCircle2 size={14} className="text-green-500" />
        </div>
      </header>

      {/* Welcome Illustration Card */}
      <section className="rounded-2xl bg-gradient-to-r from-green-600 to-green-500 p-6 text-white mb-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">Bienvenue sur <span className="text-green-200">AFRIMED</span></h2>
            <p className="text-sm text-green-100 max-w-md leading-relaxed">
              Votre tablette médicale intelligente pour des consultations efficaces et un suivi optimal des patients.
            </p>
          </div>
          <div className="relative w-36 h-28 shrink-0 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-2xl" />
            <div className="absolute inset-2 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Tablet size={44} className="text-green-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards - 4 columns */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {ACTIONS.map((a) => {
          const Icone = a.icone
          return (
            <Link key={a.chemin} to={a.chemin} className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-200">
              <div className={`w-11 h-11 rounded-xl ${a.iconBg} flex items-center justify-center mb-3`}>
                <Icone size={20} className={a.iconText} />
              </div>
              <p className="font-semibold text-slate-900 text-sm">{a.label}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{a.desc}</p>
              <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-lg ${a.arrowBg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                <ArrowRight size={14} className="text-white" />
              </div>
            </Link>
          )
        })}
      </section>

      {/* KPI Cards - 4 columns */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Vue d'ensemble aujourd'hui</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIS.map((kpi) => {
            const Icone = kpi.icone
            const c = KPI_COLORS[kpi.color]
            return (
              <div key={kpi.label} className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}>
                    <Icone size={18} className={c.text} />
                  </div>
                  <Sparkline data={kpi.spark} color={c.spark} />
                </div>
                <p className="text-3xl font-bold text-slate-900">{kpi.valeur}</p>
                <p className="text-xs text-slate-500 mt-1 leading-snug">{kpi.label}</p>
                {/* Background icon watermark */}
                <Icone size={48} className="absolute -bottom-2 -right-2 text-slate-100 opacity-40" />
              </div>
            )
          })}
        </div>
      </section>

      {/* Recent patients */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Patients vus récemment</h2>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {patients.slice(0, 5).map((p) => (
            <Link key={p.id} to={`/dossier/${p.id}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold shrink-0">
                  {p.nom?.[0]}{p.prenom?.[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{p.nom} {p.prenom}</p>
                  <p className="text-xs text-slate-500">{p.dernierMotif || 'Dossier créé'} — {p.derniereVisite || ''}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono shrink-0 ml-3">{p.codeUnique}</span>
            </Link>
          ))}
          {patients.length === 0 && (
            <p className="px-5 py-6 text-center text-slate-400 text-sm">Aucun patient enregistré.</p>
          )}
        </div>
      </section>

      {/* Security footer */}
      <footer className="text-center text-xs text-slate-400 mt-8 pb-4 flex items-center justify-center gap-1.5">
        <ShieldCheck size={12} />
        Vos données sont sécurisées et confidentielles
      </footer>
    </div>
  )
}

export default Dashboard
