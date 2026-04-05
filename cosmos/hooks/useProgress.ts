// Hook : XP et progression de l'utilisateur
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ProgressStats } from '@/types';

const DEFAULT_STATS: ProgressStats = {
  modulesCompleted: 0,
  streakDays: 0,
  badgesEarned: 0,
  xp: 0,
  themeProgress: [],
};

export function useProgress() {
  const [stats, setStats] = useState<ProgressStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Profil utilisateur
      const { data: profile } = await supabase
        .from('users_profiles')
        .select('xp, streak_days')
        .eq('id', user.id)
        .single();

      // Progression par module
      const { data: progress } = await supabase
        .from('user_progress')
        .select('completed, module_id, modules(theme_id, themes(title))')
        .eq('user_id', user.id);

      const completed = progress?.filter((p) => p.completed) ?? [];

      // Calcul de la progression par thème
      const themeMap: Record<string, { completed: number; total: number; title: string }> = {};
      progress?.forEach((p) => {
        // @ts-ignore — types Supabase générés dynamiquement
        const themeId = p.modules?.theme_id;
        // @ts-ignore
        const themeTitle = p.modules?.themes?.title ?? 'Inconnu';
        if (!themeId) return;
        if (!themeMap[themeId]) {
          themeMap[themeId] = { completed: 0, total: 0, title: themeTitle };
        }
        themeMap[themeId].total += 1;
        if (p.completed) themeMap[themeId].completed += 1;
      });

      const themeProgress = Object.entries(themeMap).map(([themeId, data]) => ({
        themeId,
        themeTitle: data.title,
        percentage: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
      }));

      setStats({
        modulesCompleted: completed.length,
        streakDays: profile?.streak_days ?? 0,
        badgesEarned: Math.floor(completed.length / 2), // 1 badge tous les 2 modules
        xp: profile?.xp ?? 0,
        themeProgress,
      });
    } catch (error) {
      console.warn('[useProgress] Erreur chargement progression:', error);
    } finally {
      setLoading(false);
    }
  }

  return { stats, loading, refresh: loadProgress };
}
