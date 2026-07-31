# AFRIMED — Guide de déploiement

## ✅ Étapes déjà complétées

1. **Dépôt cloné** : `https://github.com/Jacques-GN/AFRIMED`
2. **Variables d'environnement configurées** sur Vercel :
   - `VITE_SUPABASE_URL` = `https://dlpyyzhhnhspzgeihxhc.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = configurée
   - `VITE_GEMINI_API_KEY` = (vide pour le moment)
3. **Application déployée sur Vercel** : `https://afrimed-rho.vercel.app`

---

## 🔴 Étape obligatoire : Créer les tables dans Supabase

Les tables n'existent pas encore dans votre base Supabase. Vous devez les créer manuellement via le Dashboard Supabase.

### Méthode 1 : Via le Dashboard Supabase (recommandée)

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet AFRIMED
3. Cliquez sur **SQL Editor** dans le menu latéral
4. Cliquez sur **New Query**
5. Copiez-collez le contenu du fichier `supabase/schema.sql` (fourni ci-dessous)
6. Cliquez sur **Run** pour exécuter le SQL

### Méthode 2 : Via le CLI Supabase (si vous avez le token d'accès)

```bash
# 1. Installer le CLI Supabase
npm install -g supabase

# 2. Se connecter (nécessite un token personnel depuis https://supabase.com/dashboard/account/tokens)
supabase login

# 3. Lier le projet
cd AFRIMED
supabase link --project-ref dlpyyzhhnhspzgeihxhc

# 4. Pousser le schéma
supabase db push
```

### Méthode 3 : Via la connexion PostgreSQL directe

```bash
# Récupérez la connexion string depuis le Dashboard Supabase > Settings > Database
# Format: postgresql://postgres.dlpyyzhhnhspzgeihxhc:[VOTRE_MOT_DE_PASSE]@aws-0-[region].pooler.supabase.com:6543/postgres

psql "postgresql://postgres.dlpyyzhhnhspzgeihxhc:[MOT_DE_PASSE]@aws-0-[region].pooler.supabase.com:6543/postgres" -f supabase/schema.sql
```

---

## 📋 Schéma SQL à exécuter

Le fichier `supabase/schema.sql` crée :

| Table | Description |
|-------|-------------|
| `etablissements` | Établissement de santé (1 pour le prototype) |
| `utilisateurs` | Admin, médecin, laborantin |
| `patients` | Dossiers patients avec code unique |
| `antecedents` | Antécédents médicaux (personnel/familial) |
| `allergies` | Allergies avec gravité |
| `traitements_chroniques` | Traitements en cours |
| `consultations` | Cœur du flux médical |
| `examens` | Demandes d'examens complémentaires |
| `prescriptions` | Ordonnances avec alertes allergie |
| `suivis` | Suivi et prochains rendez-vous |
| `journal_audit` | Traçabilité des actions sensibles |

**Données de démonstration incluses** : Un établissement pilote et 3 utilisateurs (1 médecin, 1 laborantin, 1 administrateur).

---

## ⚠️ Configuration RLS (Row Level Security)

Après avoir créé les tables, vous devez configurer les politiques RLS pour que l'API REST fonctionne. Les tables avec RLS activé sont :

- `patients`
- `consultations`
- `examens`
- `prescriptions`

Pour le prototype, vous pouvez temporairement autoriser l'accès en ajoutant ces politiques dans le SQL Editor :

```sql
-- Politique temporaire pour le prototype (autoriser tout accès)
-- ⚠️ À remplacer par des politiques restrictives en production
CREATE POLICY "allow_all_patients" ON patients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_consultations" ON consultations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_examens" ON examens FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_prescriptions" ON prescriptions FOR ALL USING (true) WITH CHECK (true);

-- Aussi activer RLS sur les autres tables et autoriser l'accès
ALTER TABLE etablissements ENABLE ROW LEVEL SECURITY;
ALTER TABLE utilisateurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE antecedents ENABLE ROW LEVEL SECURITY;
ALTER TABLE allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE traitements_chroniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE suivis ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_etablissements" ON etablissements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_utilisateurs" ON utilisateurs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_antecedents" ON antecedents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_allergies" ON allergies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_traitements" ON traitements_chroniques FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_suivis" ON suivis FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_journal" ON journal_audit FOR ALL USING (true) WITH CHECK (true);
```

---

## 🔑 Clé API Gemini (optionnel)

Pour activer les suggestions diagnostiques par IA, ajoutez votre clé API Gemini :

1. Obtenez une clé depuis [Google AI Studio](https://aistudio.google.com/apikey)
2. Dans le Dashboard Vercel, ajoutez la variable `VITE_GEMINI_API_KEY` au projet AFRIMED
3. Redéployez : `vercel --prod`

---

## 🚀 URLs

- **Application en production** : `https://afrimed-rho.vercel.app`
- **Dashboard Supabase** : `https://supabase.com/dashboard/project/dlpyyzhhnhspzgeihxhc`
- **Dépôt GitHub** : `https://github.com/Jacques-GN/AFRIMED`

---

## 📝 Notes importantes

- **Sans les tables Supabase**, l'application fonctionne en mode démo avec des données en mémoire
- **Après avoir créé les tables**, l'application bascule automatiquement en mode Supabase réel
- **Sécurité** : Les tokens fournis (GitHub PAT, Vercel, Supabase) doivent être régénérés après utilisation
