import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// Nouveau format de clé Supabase ("publishable key", préfixe sb_publishable_...),
// qui remplace progressivement l'ancienne "anon key" au format JWT.
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// `estConfigure` permet au reste de l'application de savoir si un vrai projet
// Supabase est branché, pour basculer proprement sur les données de démonstration
// sinon (voir src/lib/patientsRepository.js). createClient() plante si les
// variables sont vides, donc on ne l'appelle que si elles sont réellement définies.
export const estConfigure = Boolean(supabaseUrl && supabasePublishableKey)

export const supabase = estConfigure ? createClient(supabaseUrl, supabasePublishableKey) : null
