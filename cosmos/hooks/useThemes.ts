// Hook : thèmes et modules depuis Supabase
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Theme, Module } from '@/types';
import { THEMES as FALLBACK_THEMES, MODULES as FALLBACK_MODULES } from '@/constants/themes';

interface UseThemesResult {
  themes: Theme[];
  modules: Module[];
  loading: boolean;
}

export function useThemes(): UseThemesResult {
  const [themes, setThemes] = useState<Theme[]>(FALLBACK_THEMES);
  const [modules, setModules] = useState<Module[]>(FALLBACK_MODULES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [{ data: themesData }, { data: modulesData }] = await Promise.all([
          supabase.from('themes').select('*').order('order'),
          supabase.from('modules').select('*').order('order'),
        ]);

        if (themesData && themesData.length > 0) {
          setThemes(themesData.map((t) => ({
            id: t.id,
            slug: t.slug,
            title: t.title,
            description: t.description,
            icon: t.icon,
            color: t.color,
            order: t.order,
          })));
        }

        if (modulesData && modulesData.length > 0) {
          setModules(modulesData.map((m) => ({
            id: m.id,
            themeId: m.theme_id,
            title: m.title,
            slug: m.slug,
            durationMinutes: m.duration_minutes,
            isPremium: m.is_premium,
            order: m.order,
            // Emoji par défaut selon le thème
            emoji: '🪐',
          })));
        }
      } catch (error) {
        console.warn('[useThemes] Fallback sur données locales:', error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { themes, modules, loading };
}
