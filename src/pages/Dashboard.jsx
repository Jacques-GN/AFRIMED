import { Link } from 'react-router-dom'
import { MEDECIN_CONNECTE, PATIENTS_DEMO } from '../data/demoData'

function Dashboard() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Bonjour {MEDECIN_CONNECTE.prenom} {MEDECIN_CONNECTE.nom} 👋
        </h1>
        <p className="text-sm text-slate-500">{MEDECIN_CONNECTE.etablissement}</p>
      </header>

      <section className="grid grid-cols-4 gap-4 mb-8">
        <Link to="/nouveau-patient" className="rounded-xl p-4 bg-blue-50 block">
          <p className="font-semibold text-slate-900 text-sm">Nouveau patient</p>
          <p className="text-xs text-slate-500 mt-1">Créer un dossier et générer un code unique</p>
        </Link>
        <Link to="/patients" className="rounded-xl p-4 bg-green-50 block">
          <p className="font-semibold text-slate-900 text-sm">Patients</p>
          <p className="text-xs text-slate-500 mt-1">Rechercher un dossier existant</p>
        </Link>
        <Link to="/rendez-vous" className="rounded-xl p-4 bg-amber-50 block">
          <p className="font-semibold text-slate-900 text-sm">Rendez-vous</p>
          <p className="text-xs text-slate-500 mt-1">Suivis programmés</p>
        </Link>
        <div className="rounded-xl p-4 bg-purple-50">
          <p className="font-semibold text-slate-900 text-sm">Alertes laboratoire</p>
          <p className="text-xs text-slate-500 mt-1">Aucun résultat en attente</p>
        </div>
      </section>

      <h2 className="text-sm font-semibold text-slate-700 mb-3">Patients vus récemment</h2>
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        {PATIENTS_DEMO.map((p) => (
          <Link
            key={p.id}
            to={`/dossier/${p.id}`}
            className="flex items-center justify-between px-5 py-3 hover:bg-slate-50"
          >
            <div>
              <p className="text-sm font-medium text-slate-800">{p.nom} {p.prenom}</p>
              <p className="text-xs text-slate-500">{p.dernierMotif} — {p.derniereVisite}</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">{p.codeUnique}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
