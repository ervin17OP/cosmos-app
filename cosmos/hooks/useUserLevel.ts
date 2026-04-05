// Hook : niveau actuel de l'utilisateur (AsyncStorage + Supabase)
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserLevel } from '@/types';
import { supabase } from '@/lib/supabase';

const LEVEL_STORAGE_KEY = '@cosmos/user_level';

export function useUserLevel() {
  const [level, setLevel] = useState<UserLevel>('curious');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLevel();
  }, []);

  async function loadLevel() {
    try {
      // Essayer d'abord le cache local
      const cached = await AsyncStorage.getItem(LEVEL_STORAGE_KEY);
      if (cached) {
        setLevel(cached as UserLevel);
      }

      // Synchroniser avec Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('users_profiles')
          .select('level')
          .eq('id', user.id)
          .single();
        if (data?.level) {
          setLevel(data.level);
          await AsyncStorage.setItem(LEVEL_STORAGE_KEY, data.level);
        }
      }
    } catch (error) {
      console.warn('[useUserLevel] Erreur chargement niveau:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveLevel(newLevel: UserLevel) {
    setLevel(newLevel);
    await AsyncStorage.setItem(LEVEL_STORAGE_KEY, newLevel);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('users_profiles')
        .update({ level: newLevel })
        .eq('id', user.id);
    }
  }

  return { level, loading, saveLevel };
}
