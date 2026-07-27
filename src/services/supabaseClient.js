import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const mockPatients = [
  { id: '1', code: 'AFR-8821', nom: 'Kouassi', prenom: 'Jean', age: 34, allergies: ['Pénicilline'], antecedents: ['Hypertension'] },
  { id: '2', code: 'AFR-9932', nom: 'Traoré', prenom: 'Aminata', age: 28, allergies: [], antecedents: [] }
]

export const mockConsultations = [
  { id: '101', patientId: '1', date: '2023-10-25', motif: 'Fièvre et maux de tête', diagnostic: 'Paludisme simple', statut: 'Terminée' }
]