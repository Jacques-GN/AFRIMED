-- AFRIMED — Schéma de base de données du prototype
-- Périmètre : 1 établissement pilote, 4 profils (admin, médecin, laborantin, patient par code)
-- Voir AGENTS.md pour le périmètre fonctionnel complet.

create extension if not exists "uuid-ossp";

-- =========================================================
-- ÉTABLISSEMENT (un seul pour ce prototype, structure prête pour le multi-établissement en V2)
-- =========================================================
create table etablissements (
  id uuid primary key default uuid_generate_v4(),
  nom text not null,
  localisation text,
  created_at timestamptz not null default now()
);

-- =========================================================
-- UTILISATEURS INTERNES (administrateur, médecin, laborantin — comptes email/mot de passe)
-- Le patient n'a pas de compte ici : voir table patients (accès par code unique)
-- =========================================================
create table utilisateurs (
  id uuid primary key default uuid_generate_v4(),
  etablissement_id uuid not null references etablissements(id) on delete cascade,
  nom text not null,
  prenom text not null,
  email text unique not null,
  profil text not null check (profil in ('administrateur', 'medecin', 'laborantin')),
  specialite text,
  actif boolean not null default true,
  created_at timestamptz not null default now()
);

-- =========================================================
-- PATIENTS — identifiés par un code unique alphanumérique, pas de compte classique
-- =========================================================
create table patients (
  id uuid primary key default uuid_generate_v4(),
  code_unique text not null unique, -- généré à la création, communiqué au patient
  etablissement_id uuid not null references etablissements(id) on delete cascade,
  cree_par uuid references utilisateurs(id), -- médecin qui a créé le dossier
  nom text not null,
  prenom text not null,
  date_naissance date,
  contact text,
  personne_a_prevenir text,
  created_at timestamptz not null default now()
);

create table antecedents (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references patients(id) on delete cascade,
  type text not null check (type in ('personnel', 'familial')),
  description text not null,
  created_at timestamptz not null default now()
);

create table allergies (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references patients(id) on delete cascade,
  substance text not null,
  gravite text check (gravite in ('legere', 'moderee', 'severe')),
  created_at timestamptz not null default now()
);

create table traitements_chroniques (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references patients(id) on delete cascade,
  medicament text not null,
  posologie text,
  en_cours boolean not null default true
);

-- =========================================================
-- CONSULTATIONS — cœur du flux
-- =========================================================
create table consultations (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references patients(id) on delete cascade,
  medecin_id uuid not null references utilisateurs(id),
  motif text not null,
  histoire_maladie text,
  constantes jsonb, -- température, tension, pouls, poids, taille
  revue_systemes jsonb, -- structuré par appareil
  examen_physique jsonb, -- observations en texte libre par appareil
  suggestions_ia jsonb, -- réponse brute de Gemini : hypothèses, justifications, examens suggérés
  diagnostic_retenu text,
  motif_report text, -- si consultation reportée sans diagnostic
  statut text not null default 'en_cours' check (statut in ('en_cours', 'cloturee', 'reportee')),
  created_at timestamptz not null default now(),
  cloturee_at timestamptz
);

-- =========================================================
-- EXAMENS COMPLÉMENTAIRES — flux médecin -> laborantin
-- =========================================================
create table examens (
  id uuid primary key default uuid_generate_v4(),
  consultation_id uuid not null references consultations(id) on delete cascade,
  demande_par uuid not null references utilisateurs(id), -- médecin
  type_examen text not null,
  statut text not null default 'demande' check (statut in ('demande', 'resultat_saisi')),
  resultat text,
  saisi_par uuid references utilisateurs(id), -- laborantin
  resultat_verrouille boolean not null default false, -- un résultat validé n'est plus modifiable
  created_at timestamptz not null default now(),
  resultat_saisi_at timestamptz
);

-- =========================================================
-- PRESCRIPTIONS
-- =========================================================
create table prescriptions (
  id uuid primary key default uuid_generate_v4(),
  consultation_id uuid not null references consultations(id) on delete cascade,
  medicament text not null,
  posologie text,
  duree text,
  alerte_allergie_ignoree boolean not null default false,
  justification_passage_outre text,
  created_at timestamptz not null default now()
);

-- =========================================================
-- SUIVI
-- =========================================================
create table suivis (
  id uuid primary key default uuid_generate_v4(),
  consultation_id uuid not null references consultations(id) on delete cascade,
  prochain_rdv date,
  consignes text,
  honore boolean not null default false
);

-- =========================================================
-- JOURNAL D'AUDIT — traçabilité des actions sensibles
-- =========================================================
create table journal_audit (
  id uuid primary key default uuid_generate_v4(),
  utilisateur_id uuid references utilisateurs(id),
  action text not null, -- ex: 'dossier_cree', 'prescription_validee', 'alerte_allergie_ignoree'
  cible_type text,
  cible_id uuid,
  created_at timestamptz not null default now()
);

-- =========================================================
-- INDEX
-- =========================================================
create index idx_patients_code_unique on patients(code_unique);
create index idx_consultations_patient on consultations(patient_id);
create index idx_examens_statut on examens(statut);

-- =========================================================
-- ROW LEVEL SECURITY — à affiner selon la logique d'authentification Supabase retenue
-- Principe : un utilisateur interne ne voit que les données de son établissement ;
-- un laborantin ne voit que les examens ; un patient (accès par code, hors auth Supabase
-- classique) passe par une fonction dédiée plutôt que par RLS direct sur ces tables.
-- =========================================================
alter table patients enable row level security;
alter table consultations enable row level security;
alter table examens enable row level security;
alter table prescriptions enable row level security;

-- Exemple de politique à adapter une fois l'authentification Supabase branchée :
-- create policy "medecin_voit_son_etablissement" on patients
--   for select using (etablissement_id = (select etablissement_id from utilisateurs where id = auth.uid()));

-- =========================================================
-- Données de démonstration
-- =========================================================
insert into etablissements (nom, localisation)
values ('Centre de Santé de Kamsonghin', 'Ouagadougou, Burkina Faso');

insert into utilisateurs (etablissement_id, nom, prenom, email, profil, specialite)
select id, 'Kaboré', 'Dr.', 'dr.kabore@afrimed.demo', 'medecin', 'Médecin généraliste'
from etablissements where nom = 'Centre de Santé de Kamsonghin';

insert into utilisateurs (etablissement_id, nom, prenom, email, profil)
select id, 'Sawadogo', 'Awa', 'awa.sawadogo@afrimed.demo', 'laborantin'
from etablissements where nom = 'Centre de Santé de Kamsonghin';

insert into utilisateurs (etablissement_id, nom, prenom, email, profil)
select id, 'Traoré', 'Moussa', 'moussa.traore@afrimed.demo', 'administrateur'
from etablissements where nom = 'Centre de Santé de Kamsonghin';
