// Écran Accueil (Dashboard) — onglet principal
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { XPBar } from '@/components/home/XPBar';
import { FeaturedModule } from '@/components/home/FeaturedModule';
import { ThemeChip } from '@/components/home/ThemeChip';
import { PremiumModal } from '@/components/ui/PremiumModal';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { THEMES } from '@/constants/themes';
import { Theme, Module } from '@/types';
import { useProfile } from '@/hooks/useProfile';
import { useProgress } from '@/hooks/useProgress';
import { useThemes } from '@/hooks/useThemes';

const LEVEL_LABELS: Record<string, string> = {
  curious: 'Curieux',
  passionate: 'Passionné',
  student: 'Étudiant',
};

const EMOJI_MAP: Record<string, string> = {
  'relativite-restreinte': '⚡',
  'relativite-generale': '🌌',
  'lois-kepler': '☀️',
  'gravitation-universelle': '🍎',
  'naissance-trou-noir': '⭐',
  'horizon-evenements': '🌑',
};

function greeting(): string {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return 'Bonjour';
  if (h >= 12 && h < 18) return 'Bon après-midi';
  if (h >= 18 && h < 22) return 'Bonsoir';
  return 'Bonne nuit';
}

export default function HomeScreen() {
  const router = useRouter();
  const [activeTheme, setActiveTheme] = useState<string>(THEMES[0].id);
  const [premiumModule, setPremiumModule] = useState<Module | null>(null);

  const { profile, loading: profileLoading } = useProfile();
  const { stats } = useProgress();
  const { themes, modules } = useThemes();

  // Module mis en avant : premier module non premium non encore complété
  const completedIds = new Set(stats.completedModuleIds ?? []);
  const featuredModule =
    modules.find((m) => !m.isPremium && !completedIds.has(m.id)) ??
    modules.find((m) => !m.isPremium) ??
    modules[0];

  // Modules "à continuer" : non-premium, non complétés, hors featured
  const continueModules = modules
    .filter((m) => !m.isPremium && !completedIds.has(m.id) && m.id !== featuredModule?.id)
    .slice(0, 4);

  // XP
  const XP_PER_LEVEL = 500;
  const xp = profile?.xp ?? 0;
  const xpToNext = XP_PER_LEVEL - (xp % XP_PER_LEVEL);
  const rankLabel = `Niveau ${LEVEL_LABELS[profile?.level ?? 'curious']}`;

  function handleModulePress(m: Module) {
    if (m.isPremium) {
      setPremiumModule(m);
    } else {
      router.push(`/module/${m.id}`);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header utilisateur */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting()}, Explorateur</Text>
            {profileLoading ? (
              <ActivityIndicator color={Colors.primary} size="small" />
            ) : (
              <Text style={styles.username}>{profile?.username ?? 'Astronaute'}</Text>
            )}
          </View>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👨‍���</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Barre XP */}
          <XPBar
            xp={xp % XP_PER_LEVEL}
            xpToNext={xpToNext}
            rankLabel={rankLabel}
            nextRank="OBSERVATEUR"
          />

          {/* Thèmes */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>✦ Thèmes</Text>
              <Text style={styles.sectionIcon}>✨</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.themesRow}
            >
              {themes.map((theme: Theme) => (
                <ThemeChip
                  key={theme.id}
                  theme={theme}
                  active={activeTheme === theme.id}
                  onPress={() => setActiveTheme(theme.id)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Module du jour */}
          {featuredModule && (
            <FeaturedModule
              module={{ ...featuredModule, emoji: EMOJI_MAP[featuredModule.slug] ?? '🪐' }}
            />
          )}

          {/* À continuer */}
          {continueModules.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>✦ À explorer</Text>
              </View>
              <View style={styles.continueList}>
                {continueModules.map((m) => (
                  <TouchableOpacity
                    key={m.id}
                    style={styles.continueCard}
                    onPress={() => handleModulePress(m)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.continueEmoji}>{EMOJI_MAP[m.slug] ?? '🪐'}</Text>
                    <View style={styles.continueInfo}>
                      <Text style={styles.continueTitle}>{m.title}</Text>
                      <Text style={styles.continueMeta}>⏱ {m.durationMinutes} min</Text>
                    </View>
                    <Text style={styles.continueArrow}>→</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Stats rapides */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={styles.statValue}>{String(stats.modulesCompleted).padStart(2, '0')}</Text>
              <Text style={styles.statLabel}>Modules terminés</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statValue}>{String(profile?.streakDays ?? 0).padStart(2, '0')}</Text>
              <Text style={styles.statLabel}>Jours de série</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={styles.statValue}>{String(stats.badgesEarned).padStart(2, '0')}</Text>
              <Text style={styles.statLabel}>Badges acquis</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <PremiumModal
        visible={!!premiumModule}
        onClose={() => setPremiumModule(null)}
        moduleName={premiumModule?.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.overlayLight,
  },
  greeting: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  username: {
    fontFamily: Typography.fontFamily.cinzel,
    fontSize: Typography.fontSize.xl,
    color: Colors.onSurface,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: `${Colors.primary}50`,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.primary}1A`,
  },
  avatarEmoji: { fontSize: 22 },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, gap: 24, paddingBottom: 100 },
  section: { gap: 12 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.cinzel,
    fontSize: Typography.fontSize.xs,
    color: `${Colors.secondaryFixed}CC`,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  sectionIcon: { fontSize: 14, color: Colors.primary },
  themesRow: { gap: 10, paddingVertical: 4 },
  // À explorer
  continueList: { gap: 10 },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  continueEmoji: { fontSize: 28, width: 36, textAlign: 'center' },
  continueInfo: { flex: 1 },
  continueTitle: {
    fontFamily: Typography.fontFamily.bodyMedium,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurface,
    marginBottom: 3,
  },
  continueMeta: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  continueArrow: { color: Colors.primary, fontSize: 16, marginLeft: 4 },
  // Stats
  statsGrid: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
  },
  statIcon: { fontSize: 20 },
  statValue: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize['2xl'],
    color: Colors.onSurface,
  },
  statLabel: {
    fontFamily: Typography.fontFamily.label,
    fontSize: 9,
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
});
