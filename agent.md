# Agent Instructions for AFRIMED

## Project Overview
AFRIMED is a Progressive Web App (PWA) designed to streamline medical consultations in Africa. It connects administrators, doctors, lab technicians, and patients. 
This is a prototype focusing on the core consultation flow: patient record creation, guided consultation, AI diagnostic suggestions (Gemini), lab test requests, and prescription generation.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS
- Backend/Database: Supabase (Auth, Database, Real-time)
- AI: Google Gemini API
- Hosting: Vercel (PWA capabilities)

## Core Profiles & Features
1. Administrator: Manages clinic accounts (doctors, lab techs), views clinic dashboard.
2. Doctor: Dashboard, patient search/creation (generates unique short alphanumeric code), guided consultation, AI diagnostic suggestions, lab requests, prescription generation.
3. Lab Technician: Dashboard of pending requests, result entry.
4. Patient: Access via unique code, view read-only records, prescriptions, and follow-up instructions.

## Out of Scope for Prototype (V2)
- Offline mode with deferred sync
- Nurse profile
- Push notifications (Email/SMS)
- National anonymized dashboard
- Vaccination and medical imaging management
- Multi-clinic management

## Coding Rules for the Agent
1. Component Structure: Use functional components with React Hooks. Keep components small and modular.
2. Styling: Use Tailwind CSS exclusively for styling. Ensure responsive design.
3. State Management: Use Supabase for all persistent data.
4. AI Integration: The geminiService.js should format the consultation context into a structured prompt for Gemini.
5. Security: Use .env for API keys. Row Level Security (RLS) must be considered.
6. Error Handling: Gracefully handle API failures.
7. PWA: Ensure manifest.json is set up for installability.
