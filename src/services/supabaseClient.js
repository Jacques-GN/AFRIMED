import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// `estConfigure` permet au reste de l'application de savoir si un vrai projet
// Supabase est branché, pour basculer proprement sur les données de démonstration
// sinon (voir src/lib/patientsRepository.js). createClient() plante si les
// variables sont vides, donc on ne l'appelle que si elles sont réellement définies.
export const estConfigure = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = estConfigure ? createClient(supabaseUrl, supabaseAnonKey) : null
