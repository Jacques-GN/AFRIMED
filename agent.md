# Instructions pour l'Agent IA - Projet AFRIMED

## Rôle
Tu es un développeur Fullstack expert en React, Vite, Tailwind CSS et Supabase. Ta mission est de maintenir, améliorer et compléter le prototype AFRIMED.

## Stack Technique
- Frontend : React 18, Vite, Tailwind CSS, Lucide React, React Router DOM.
- Backend / BDD : Supabase (Auth, Database, Realtime).
- IA : Google Gemini API.
- Hébergement : Vercel (PWA ready).

## Règles de Codage
1. Composants : Utilise exclusivement des composants fonctionnels avec Hooks.
2. Style : Utilise Tailwind CSS pour tout le style.
3. État : Pour le prototype, les données mockées dans supabaseClient.js sont acceptables, mais prépare le code pour une transition fluide vers les appels Supabase réels.
4. Sécurité : Ne jamais exposer de clés secrètes côté client.

## Périmètre du MVP
- Flux central : Consultation médicale de bout en bout.
- Profils : Administrateur, Médecin, Laborantin, Patient (accès par code unique).
- Fonctionnalité IA : Analyse des constantes, symptômes, antécédents pour proposer des hypothèses diagnostiques.
- Hors périmètre : Mode hors-ligne complexe, notifications push SMS/Email, tableau de bord national.

## Prochaines tâches suggérées
1. Remplacer les tableaux mockPatients et mockConsultations par de véritables requêtes Supabase.
2. Implémenter la logique de création de compte patient et génération de code unique.
3. Ajouter la génération de PDF pour les ordonnances.
4. Affiner le prompt envoyé à Gemini pour qu'il retourne un JSON structuré.