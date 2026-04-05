// Client Supabase configuré pour COSMOS
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

const SUPABASE_CONFIGURED = !!(supabaseUrl && supabaseAnonKey);

if (!SUPABASE_CONFIGURED) {
  console.warn('[Supabase] Variables d\'environnement manquantes — mode démo actif, auth désactivée.');
}

// Fallback URL valide pour éviter le crash de createClient quand non configuré
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: SUPABASE_CONFIGURED,
      persistSession: SUPABASE_CONFIGURED,
      detectSessionInUrl: false,
    },
  }
);

// Helper : récupérer le profil utilisateur courant
export async function getCurrentProfile() {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { profile: null, error: authError };

  const { data, error } = await supabase
    .from('users_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return { profile: data, error };
}

// Helper : mettre à jour le niveau utilisateur
export async function updateUserLevel(userId: string, level: 'curious' | 'passionate' | 'student') {
  return supabase
    .from('users_profiles')
    .update({ level })
    .eq('id', userId);
}

// Helper : ajouter des XP à l'utilisateur
export async function addXP(userId: string, amount: number) {
  const { data: profile } = await supabase
    .from('users_profiles')
    .select('xp')
    .eq('id', userId)
    .single();

  if (!profile) return;

  return supabase
    .from('users_profiles')
    .update({ xp: (profile.xp ?? 0) + amount })
    .eq('id', userId);
}
