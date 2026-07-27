# AFRIMED

Application médicale intelligente pour la modernisation de la consultation dans les centres de
santé africains — prototype développé pour le Prix du Jeune Inventeur du Faso.

## Aperçu

AFRIMED structure la consultation médicale de bout en bout (dossier patient → consultation
guidée → aide au diagnostic par IA → prescription → suivi) et introduit un identifiant patient
unique permettant de retrouver son dossier dans n'importe quel établissement affilié.

## Stack technique

- **Frontend** : React + Tailwind CSS, format PWA (installable sur tablette/téléphone sans store)
- **Backend / données** : Supabase (Postgres, authentification, temps réel)
- **IA** : Gemini (Google AI) pour les suggestions diagnostiques
- **Hébergement** : Vercel

## Documentation

- [`AGENTS.md`](./AGENTS.md) — **à lire avant tout développement.** Périmètre exact du
  prototype, règles de code, structure de dossiers, ce qui est explicitement hors scope.
- `docs/cahier-des-charges.pdf` — vision complète du projet (long terme, au-delà du prototype)
- `supabase/schema.sql` — schéma de base de données

## Démarrage (à compléter une fois le projet initialisé)

```bash
npm install
npm run dev
```

Variables d'environnement nécessaires (`.env.local`, non versionné) :
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GEMINI_API_KEY=
```

## Statut

Prototype en cours de développement — périmètre défini dans `AGENTS.md`.
