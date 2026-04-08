// Écran Explorer — carte des thèmes avec badges de complétion et recherche
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { PremiumModal } from '@/components/ui/PremiumModal';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Theme, Module } from '@/types';
import { useThemes } from '@/hooks/useThemes';
import { useProgress } from '@/hooks/useProgress';

export default function ExploreScreen() {
  const router = useRouter();
  const { themes, modules, loading: themesLoading } = useThemes();
  const { stats, loading: progressLoading } = useProgress();
  const [premiumModule, setPremiumModule] = useState<Module | null>(null);
  const [query, setQuery] = useState('');

  // Filtrage insensible à la casse sur titre module + titre thème
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { themes, modules };

    const matchingModules = modules.filter(
      (m) => m.title.toLowerCase().includes(q)
    );
    const matchingThemeIds = new Set([
      ...matchingModules.map((m) => m.themeId),
      ...themes.filter((t) => t.title.toLowerCase().includes(q)).map((t) => t.id),
    ]);
    const filteredThemes = themes.filter((t) => matchingThemeIds.has(t.id));
    // Pour un thème dont le titre matche, montrer tous ses modules
    const themesTitlesMatch = new Set(
      themes.filter((t) => t.title.toLowerCase().includes(q)).map((t) => t.id)
    );
    const filteredModules = modules.filter(
      (m) => m.title.toLowerCase().includes(q) || themesTitlesMatch.has(m.themeId)
    );
    return { themes: filteredThemes, modules: filteredModules };
  }, [query, themes, modules]);

  const loading = themesLoading || progressLoading;
  const completedIds = new Set(stats.completedModuleIds ?? []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Explorer</Text>
          <Text style={styles.subtitle}>Tous les thèmes astronomiques</Text>
        </View>

        {/* Barre de recherche */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un module ou un thème…"
              placeholderTextColor={Colors.onSurfaceVariant}
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {loading ? (
            <ActivityIndicator color={Colors.primary} size="large" style={{ marginTop: 60 }} />
          ) : null}

          {/* Aucun résultat */}
          {!loading && query.length > 0 && filtered.themes.length === 0 && (
            <View style={styles.emptySearch}>
              <Text style={styles.emptySearchEmoji}>🌌</Text>
              <Text style={styles.emptySearchText}>Aucun résultat pour « {query} »</Text>
            </View>
          )}

          {filtered.themes.map((theme: Theme) => {
            const themeModules = filtered.modules.filter((m) => m.themeId === theme.id);
            const completedCount = themeModules.filter((m) => completedIds.has(m.id)).length;
            const freeCount = themeModules.filter((m) => !m.isPremium).length;

            return (
              <View key={theme.id} style={styles.themeSection}>
                {/* En-tête thème */}
                <View style={styles.themeHeader}>
                  <Text style={styles.themeIcon}>{theme.icon}</Text>
                  <View style={styles.themeTitleBlock}>
                    <Text style={styles.themeTitle}>{theme.title}</Text>
                    <Text style={styles.themeDescription}>{theme.description}</Text>
                  </View>
                  {/* Compteur de progression du thème */}
                  <View style={[styles.themeProgress, { borderColor: `${theme.color}40` }]}>
                    <Text style={[styles.themeProgressText, { color: theme.color }]}>
                      {completedCount}/{freeCount}
                    </Text>
                  </View>
                </View>

                {themeModules.map((module: Module) => {
                  const isCompleted = completedIds.has(module.id);

                  return (
                    <TouchableOpacity
                      key={module.id}
                      style={[
                        styles.moduleCard,
                        module.isPremium && styles.moduleCardPremium,
                        isCompleted && styles.moduleCardCompleted,
                      ]}
                      onPress={() => {
                        if (module.isPremium) {
                          setPremiumModule(module);
                        } else {
                          router.push(`/module/${module.id}`);
                        }
                      }}
                      activeOpacity={0.8}
                    >
                      {/* Badge complétion */}
                      {isCompleted && (
                        <View style={styles.completedBadge}>
                          <Text style={styles.completedBadgeText}>✓</Text>
                        </View>
                      )}

                      <View style={styles.moduleInfo}>
                        <Text style={[styles.moduleTitle, isCompleted && styles.moduleTitleCompleted]}>
                          {module.title}
                        </Text>
                        <Text style={styles.moduleMeta}>
                          ⏱ {module.durationMinutes} min
                          {module.isPremium
                            ? '  💎 Premium'
                            : isCompleted
                            ? '  ✓ Terminé'
                            : '  ○ À faire'}
                        </Text>
                      </View>

                      {module.isPremium ? (
                        <Text style={styles.lockIcon}>🔒</Text>
                      ) : isCompleted ? (
                        <View style={styles.doneCircle}>
                          <Text style={styles.doneCircleText}>✓</Text>
                        </View>
                      ) : (
                        <Text style={styles.moduleArrow}>→</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
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
  header: { paddingHorizontal: 24, paddingVertical: 20 },
  title: {
    fontFamily: Typography.fontFamily.cinzelBold,
    fontSize: Typography.fontSize['3xl'],
    color: Colors.onSurface,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  searchRow: { paddingHorizontal: 20, paddingBottom: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.base,
    color: Colors.onSurface,
  },
  clearBtn: { padding: 4 },
  clearBtnText: { color: Colors.onSurfaceVariant, fontSize: 12 },
  emptySearch: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptySearchEmoji: { fontSize: 40 },
  emptySearchText: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100, gap: 28 },
  themeSection: { gap: 10 },
  themeHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 4 },
  themeIcon: { fontSize: 28 },
  themeTitleBlock: { flex: 1 },
  themeTitle: {
    fontFamily: Typography.fontFamily.headlineMedium,
    fontSize: Typography.fontSize.lg,
    color: Colors.onSurface,
  },
  themeDescription: {
    fontFamily: Typography.fontFamily.body,
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  themeProgress: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  themeProgressText: {
    fontFamily: Typography.fontFamily.label,
    fontSize: 10,
    letterSpacing: 1,
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  moduleCardPremium: {
    borderColor: `${Colors.tertiary}30`,
    backgroundColor: `${Colors.tertiary}05`,
  },
  moduleCardCompleted: {
    borderColor: `${Colors.secondary}25`,
    backgroundColor: `${Colors.secondary}06`,
  },
  completedBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderTopLeftRadius: 16,
    borderStyle: 'solid',
    borderTopWidth: 28,
    borderRightWidth: 28,
    borderTopColor: `${Colors.secondary}50`,
    borderRightColor: 'transparent',
  },
  completedBadgeText: {
    position: 'absolute',
    top: -26,
    left: 3,
    fontSize: 10,
    color: Colors.background,
    fontWeight: 'bold',
  },
  moduleInfo: { flex: 1 },
  moduleTitle: {
    fontFamily: Typography.fontFamily.bodyMedium,
    fontSize: Typography.fontSize.base,
    color: Colors.onSurface,
    marginBottom: 4,
  },
  moduleTitleCompleted: { color: Colors.onSurfaceVariant },
  moduleMeta: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  moduleArrow: { color: Colors.primary, fontSize: 18, marginLeft: 12 },
  lockIcon: { fontSize: 16, marginLeft: 12 },
  doneCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${Colors.secondary}20`,
    borderWidth: 1,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  doneCircleText: {
    color: Colors.secondary,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
