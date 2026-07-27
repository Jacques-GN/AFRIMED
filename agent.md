# AFRIMED - Instructions pour l'Agent IA Développeur

## Contexte du projet
AFRIMED est un prototype d'application médicale pour l'Afrique (contexte burkinabè en priorité). L'objectif est de fluidifier la consultation médicale de bout en bout avec l'aide de l'IA.

## Stack Technique
- **Frontend** : React 18, Vite, Tailwind CSS, React Router DOM
- **Icônes** : Lucide React
- **Backend/Base de données** : Supabase (Auth, DB, Realtime)
- **IA** : Google Gemini API
- **Hébergement** : Vercel (PWA ready)

## Règles de développement strictes
1. **Composants fonctionnels** : Utiliser exclusivement des fonctions React et des Hooks (`useState`, `useEffect`).
2. **Styling** : Utiliser uniquement les classes utilitaires Tailwind CSS. Pas de fichiers CSS séparés sauf pour les directives Tailwind de base.
3. **Gestion d'état** : Pour le prototype, l'état local (`useState`) et les mocks dans `src/services/supabaseClient.js` sont privilégiés. Préparer les appels Supabase réels de manière modulaire.
4. **Sécurité** : Ne jamais exposer de clés API en dur. Utiliser `import.meta.env`.
5. **Accessibilité** : Utiliser des contrastes suffisants et des labels pour les formulaires.

## Périmètre du Prototype (MVP)
- **4 Profils** : Admin, Médecin, Laborantin, Patient.
- **Flux central** : Le médecin crée/ouvre un dossier -> saisit constantes et motif -> demande suggestion IA -> pose diagnostic -> prescrit (avec alerte allergie) -> envoie demande labo si besoin.
- **Patient** : Accès via code unique (pas de création de compte complexe).
- **Hors périmètre pour l'instant** : Mode hors-ligne (V2), Notifications SMS/Email (V2), Gestion multi-établissements (V2).

## Prochaines tâches attendues de l'agent
1. Remplacer les données mockées par de véritables appels `supabase.from('...').select()`.
2. Implémenter la logique de génération de PDF pour les ordonnances (ex: avec `jspdf`).
3. Affiner le prompt envoyé à l'API Gemini dans `geminiService.js` pour inclure les pathologies locales (paludisme, typhoïde, etc.).
4. Ajouter la validation des formulaires (ex: avec `react-hook-form` + `zod` si nécessaire).
