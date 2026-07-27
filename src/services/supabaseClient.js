import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for prototype demonstration
export const mockPatients = [
  { id: '1', code: 'AFR-8X9', name: 'Koffi Amadou', dob: '1985-04-12', phone: '70 00 00 00', allergies: 'Pénicilline', history: 'Hypertension' },
  { id: '2', code: 'AFR-2Y4', name: 'Traoré Amina', dob: '1990-08-22', phone: '71 11 11 11', allergies: 'Aucune', history: 'Rien de notable' }
];

export const mockLabRequests = [
  { id: '101', patientName: 'Koffi Amadou', type: 'NFS + Frottis', doctor: 'Dr. Ouédraogo', date: '2026-07-27', status: 'En attente', results: null },
  { id: '102', patientName: 'Traoré Amina', type: 'Glycémie à jeun', doctor: 'Dr. Ouédraogo', date: '2026-07-26', status: 'Terminé', results: '0.95 g/L' }
];