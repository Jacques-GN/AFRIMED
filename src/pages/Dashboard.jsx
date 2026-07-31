import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, Users, Calendar, BarChart3, ArrowRight, Cloud, CheckCircle2, Thermometer, AlertTriangle, ShieldCheck, Tablet } from 'lucide-react'
import { useAuth } from '../services/authContext'
import { listerPatients } from '../lib/patientsRepository'

const ACTIONS = [
  { label: 'Nouveau patient', desc: 'Enregistrer un nouveau patient', chemin: '/nouveau-patient', icone: UserPlus, iconBg: 'bg-blue-100', iconText: 'text-blue-600' },
  { label: 'Patients', desc: 'Consulter la liste des patients', chemin: '/patients', icone: Users, iconBg: 'bg-green-100', iconText: 'text-green-600' },
  { label: 'Rendez-vous', desc: 'Gérer les rendez-vous et les suivis', chemin: '/rendez-vous', icone: Calendar, iconBg: 'bg-orange-100', iconText: 'text-orange-600' },
  { label: 'Santé publique', desc: 'Voir les statistiques et alertes sanitaires', chemin: '/sante-publique', icone: BarChart3, iconBg: 'bg-violet-100', iconText: 'text-violet-600' },
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

function SyncWidget() {
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white border border-slate-200 px-3.5 py-2 shadow-sm">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
        <Cloud size={16} className="text-blue-600" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800">Synchronisation</p>
        <p className="text-[10px] text-slate-500">Dernière sync : {hh}:{mm}</p>
      </div>
      <CheckCircle2 size={14} className="text-green-500 shrink-0" />
    </div>
  )
}

function HeroIllustration() {
  return (
    <div className="relative w-36 h-28 shrink-0 hidden md:block">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-2xl" />
      <div className="absolute inset-2 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center">
        <Tablet size={44} className="text-green-600" />
      </div>
    </div>
  )
}

function WelcomeBanner({ visible, onDismiss }) {
  if (!visible) return null
  return (
    <section className="rounded-2xl bg-gradient-to-r from-green-600 to-green-500 p-5 text-white mb-6 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-white/5 rounded-full translate-y-1/2" />
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-1">Bienvenue sur <span className="text-green-200">AFRIMED</span></h2>
          <p className="text-sm text-green-100 max-w-md leading-relaxed">
            Votre tablette médicale intelligente pour des consultations efficaces et un suivi optimal des patients.
          </p>
          <button onClick={onDismiss} className="mt-2.5 text-xs font-medium text-green-200 hover:text-white underline transition-colors">
            Masquer
          </button>
        </div>
        <HeroIllustration />
      </div>
    </section>
  )
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
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-50">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  )
}

function Dashboard() {
  const { profil } = useAuth()
  const [patients, setPatients] = useState([])
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('afrimed_welcomed'))

  useEffect(() => { listerPatients().then(setPatients) }, [])

  const handleDismiss = () => {
    localStorage.setItem('afrimed_welcomed', '1')
    setShowWelcome(false)
  }

  const prenom = profil?.prenom || 'Dr.'
  const nom = profil?.nom || 'Kaboré'

  return (
    <div>
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Bonjour {prenom} {nom} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">{formatDate()}</p>
        </div>
        <SyncWidget />
      </header>

      <WelcomeBanner visible={showWelcome} onDismiss={handleDismiss} />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {ACTIONS.map((a) => {
          const Icone = a.icone
          return (
            <Link key={a.chemin} to={a.chemin} className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all">
              <div className={`w-11 h-11 rounded-xl ${a.iconBg} flex items-center justify-center mb-3`}>
                <Icone size={20} className={a.iconText} />
              </div>
              <p className="font-semibold text-slate-900 text-sm">{a.label}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{a.desc}</p>
              <div className="absolute bottom-4 right-4 w-7 h-7 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                <ArrowRight size={14} className="text-slate-400 group-hover:text-slate-600" />
              </div>
            </Link>
          )
        })}
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Vue d'ensemble aujourd'hui</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {KPIS.map((kpi) => {
            const Icone = kpi.icone
            const c = KPI_COLORS[kpi.color]
            return (
              <div key={kpi.label} className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg ${c.iconBg} flex items-center justify-center`}>
                    <Icone size={16} className={c.text} />
                  </div>
                  <Sparkline data={kpi.spark} color={c.spark} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{kpi.valeur}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{kpi.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Patients vus récemment</h2>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {patients.slice(0, 5).map((p) => (
            <Link key={p.id} to={`/dossier/${p.id}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{p.nom} {p.prenom}</p>
                <p className="text-xs text-slate-500">{p.dernierMotif || 'Dossier créé'} — {p.derniereVisite || ''}</p>
              </div>
              <span className="text-xs text-slate-400 font-mono shrink-0 ml-3">{p.codeUnique}</span>
            </Link>
          ))}
          {patients.length === 0 && (
            <p className="px-5 py-6 text-center text-slate-400 text-sm">Aucun patient enregistré.</p>
          )}
        </div>
      </section>

      <footer className="text-center text-xs text-slate-400 mt-8 pb-4 flex items-center justify-center gap-1.5">
        <ShieldCheck size={12} />
        Vos données sont sécurisées et confidentielles
      </footer>
    </div>
  )
}

export default Dashboard
