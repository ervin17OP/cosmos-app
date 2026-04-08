// Hook : profil utilisateur courant depuis Supabase
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data, error } = await supabase
        .from('users_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile({
        id: data.id,
        username: data.username,
        level: data.level,
        xp: data.xp,
        streakDays: data.streak_days,
        createdAt: data.created_at,
      });
    } catch (error) {
      console.warn('[useProfile] Erreur chargement profil:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();

    // Rafraîchir si la session change
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadProfile();
    });
    return () => subscription.unsubscribe();
  }, [loadProfile]);

  return { profile, loading, refresh: loadProfile };
}
