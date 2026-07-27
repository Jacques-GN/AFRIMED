# AFRIMED

Application médicale intelligente (Progressive Web App) pour la modernisation de la
consultation dans les centres de santé africains — prototype développé pour le Prix du Jeune
Inventeur du Faso.

## Aperçu

AFRIMED structure la consultation médicale de bout en bout (dossier patient → consultation
guidée → aide au diagnostic par IA → prescription → suivi) et introduit un code patient unique
permettant de retrouver son dossier dans n'importe quel établissement affilié.

## Stack technique

- **Frontend** : React (Vite) + Tailwind CSS, format PWA (installable sur tablette/téléphone
  sans passer par un store)
- **Backend / données** : Supabase (Postgres, authentification, temps réel)
- **IA** : Gemini (Google AI) pour les suggestions diagnostiques
- **Hébergement** : Vercel

## Documentation

- [`AGENTS.md`](./AGENTS.md) — référence détaillée et faisant autorité sur le périmètre exact
  du prototype, les règles de code et la structure de dossiers (version française complète)
- [`agent.md`](./agent.md) — résumé court des mêmes instructions (référence rapide)
- `docs/proposition-perimetre-prototype.pdf` — document de cadrage validé avec le porteur
  de projet
- `supabase/schema.sql` — schéma de base de données

## Installation

```bash
npm install
npm run dev
```

Variables d'environnement nécessaires (`.env.local`, non versionné — voir `.env.example`) :
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GEMINI_API_KEY=
```

## Statut

Prototype en cours de développement — périmètre défini dans `AGENTS.md`.
