# AGENTS.md — Instructions pour l'agent de développement AFRIMED

Ce fichier est la référence à suivre pour tout agent (humain ou IA) qui écrit du code sur ce dépôt.
Il fait autorité sur la portée du prototype. En cas de conflit avec le cahier des charges original
(`docs/cahier-des-charges.pdf`), **ce document prévaut** : le cahier des charges décrit la vision
long terme, ce fichier décrit ce qui doit réellement être construit pour le prototype de pitch.

## Contexte du projet

AFRIMED est une application de santé numérique qui structure la consultation médicale et
propose une aide au diagnostic par IA, pensée pour les centres de santé africains (contexte :
Burkina Faso). Ce prototype est destiné à un pitch devant investisseurs et jury (concours Prix
du Jeune Inventeur du Faso) — il doit être démontrable, fiable en démo live, et donner une
impression de produit professionnel achevé sur son périmètre.

## Stack technique imposée

| Couche | Techno | Rôle |
|---|---|---|
| Interface | React + Tailwind CSS | UI, composants |
| Format d'application | PWA (Progressive Web App) | Installable sur tablette/téléphone sans store |
| Backend / données | Supabase (Postgres + Auth + Realtime) | Base de données, authentification, temps réel |
| IA | Gemini (Google AI API) | Suggestions diagnostiques |
| Hébergement | Vercel | Déploiement, accessible par URL simple |

Ne pas dévier de cette stack sans validation explicite du porteur de projet.

## Les 4 profils utilisateurs et leur périmètre

1. **Administrateur d'établissement** — crée/désactive les comptes médecin et laborantin,
   consulte un tableau de bord d'activité agrégé (pas d'accès aux dossiers individuels).
2. **Médecin** — cœur de l'application. Recherche/création de dossier patient, consultation
   guidée en étapes, déclenchement des suggestions IA, diagnostic, demande d'examens,
   prescription, programmation du suivi.
3. **Laborantin** — reçoit les demandes d'examens, saisit les résultats (non modifiables après
   validation), consulte son historique de traitement. Aucun autre accès au dossier patient.
4. **Patient** — pas de compte classique : accès par **code unique alphanumérique** généré à
   la création du dossier par le médecin. Lecture seule sur son dossier (antécédents, allergies,
   traitements, ordonnances passées, historique de consultations, prochain rendez-vous).

## Flux central à implémenter en priorité absolue

C'est le parcours qui sera démontré en live devant le jury — il doit être irréprochable :

1. Médecin se connecte → tableau de bord
2. Recherche ou création d'un dossier patient (génération du code unique à la création)
3. Consultation guidée : motif → histoire de la maladie → constantes → revue des systèmes →
   examen physique
4. Déclenchement de l'analyse IA → panneau de suggestions (hypothèses classées, justification
   courte, examens complémentaires suggérés) → le médecin accepte/modifie/rejette chaque
   suggestion explicitement, rien ne s'applique automatiquement
5. Diagnostic retenu (obligatoire pour clôturer, sauf motif de report explicite)
6. Demande d'examen complémentaire au laborantin (optionnel dans le flux de démo, mais
   fonctionnel : le laborantin doit pouvoir la recevoir et y répondre dans un autre onglet/session)
7. Prescription : sélection médicament + posologie + durée, blocage automatique si allergie
   connue (le médecin peut passer outre, action tracée)
8. Génération de l'ordonnance en PDF téléchargeable
9. Programmation du suivi (date + consignes)

## Explicitement HORS PÉRIMÈTRE pour ce prototype

Ne pas développer, même partiellement, sauf demande explicite du porteur de projet :

- Mode hors-ligne et synchronisation différée
- Profil infirmier (le médecin saisit lui-même les constantes)
- Notifications push par email/SMS (les alertes restent visuelles, dans l'interface uniquement)
- Tableau de bord national anonymisé multi-établissements
- Modules vaccination et imagerie médicale (les afficher comme "disponible prochainement"
  dans l'UI du dossier patient suffit, sans logique fonctionnelle derrière)
- Gestion multi-établissements (un seul établissement pilote pour ce prototype)

Si une tâche demandée touche à l'un de ces points, le signaler avant de développer plutôt que
d'improviser une version partielle.

## Règles de code — non négociables

1. **Architecture modulaire stricte.** Un composant = une responsabilité. Aucun fichier de
   plus de 200 lignes. Découper en sous-composants dès que ce seuil approche.
2. **HTML sémantique.** Utiliser `main`, `header`, `nav`, `aside`, `section`, `article`, `footer`
   selon leur rôle réel. Ne pas empiler des `div` sans raison.
3. **Pas de commentaires scolaires** (`// ceci affiche la date`). Le code doit être auto-explicite
   par un nommage clair. Commenter uniquement les décisions non évidentes (pourquoi, pas quoi).
4. **Aucun code mort.** Pas de fonction, import, variable ou fichier inutilisé.
5. **Pas de dépendance lourde pour une fonction simple** (formatage de date, tri, calculs
   basiques) — écrire en TypeScript natif plutôt qu'importer une librairie entière.
6. **JavaScript (JSX)**, pas TypeScript — décision pragmatique pour rester cohérent avec le
   scaffold existant et éviter la friction de configuration sous contrainte de temps. Documenter
   les formes de données attendues en commentaire JSDoc au-dessus des fonctions clés plutôt
   qu'avec des types stricts.
7. **Accessibilité de base** : focus clavier visible, contrastes suffisants, `alt` sur les images.
8. **Responsive** : usage principal sur tablette, mais doit rester utilisable sur desktop (démo)
   et mobile (accès patient par téléphone).
9. **Structure de dossiers à respecter** :
   ```
   src/
     components/
       layout/       → structure commune (sidebar, header)
       patient/       → dossier patient, recherche, fiche
       consultation/  → formulaire de consultation guidée, étapes
       ai/            → panneau de suggestions IA
       lab/           → interface laborantin
       admin/         → interface administrateur d'établissement
     pages/           → routes principales par profil
     lib/             → logique métier, client Supabase, appels API Gemini
     types/           → types TypeScript des entités (Patient, Consultation, Prescription...)
   supabase/          → schéma SQL, migrations
   docs/              → cahier des charges, spécifications
   ```

## Sécurité et données sensibles

- Toute donnée médicale est sensible par défaut. RLS (Row Level Security) Supabase à activer
  sur toutes les tables dès la mise en place du schéma — un médecin ne doit voir que les
  dossiers de son établissement, un laborantin ne doit voir que les demandes d'examens.
- Journaliser les actions sensibles (accès dossier, prescription, passage outre une alerte
  allergie) dans une table d'audit — voir `supabase/schema.sql`.
- Ne jamais committer de clé API (Gemini, Supabase) en dur dans le code. Utiliser les variables
  d'environnement (`.env.local`, non versionné — voir `.gitignore`).

## Design

Respecter la charte graphique déjà validée par le porteur de projet (voir `docs/` pour les
maquettes de référence si présentes) :
- Bleu nuit foncé pour la sidebar (`#0B1E3D`)
- Vert comme couleur d'action principale (`#16A34A` / `#22C55E`)
- Orange/ambre réservé aux alertes (`#F59E0B`), rouge pour les alertes critiques
- Fond clair pour la zone de contenu principale
- Typographie sans-serif claire (Inter ou équivalent système)
- Éviter la palette générique "IA" (fond crème + terracotta dominant, ou fond noir + accent
  fluo) — utiliser précisément cette charte.

## Avant de committer

- Vérifier qu'aucun fichier ne dépasse 200 lignes
- Vérifier l'absence de code mort ou de console.log de debug oublié
- Un commit = un changement logique cohérent, message clair en français ou anglais (cohérent
  avec le reste de l'historique)
