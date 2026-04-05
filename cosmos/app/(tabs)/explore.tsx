// Écran Explorer — carte des thèmes
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { THEMES, MODULES } from '@/constants/themes';
import { Theme, Module } from '@/types';

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Explorer</Text>
          <Text style={styles.subtitle}>Tous les thèmes astronomiques</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {THEMES.map((theme: Theme) => {
            const themeModules = MODULES.filter((m) => m.themeId === theme.id);
            return (
              <View key={theme.id} style={styles.themeSection}>
                <View style={styles.themeHeader}>
                  <Text style={styles.themeIcon}>{theme.icon}</Text>
                  <View style={styles.themeTitleBlock}>
                    <Text style={styles.themeTitle}>{theme.title}</Text>
                    <Text style={styles.themeDescription}>{theme.description}</Text>
                  </View>
                  <View style={[styles.themeDot, { backgroundColor: theme.color }]} />
                </View>

                {themeModules.map((module: Module) => (
                  <TouchableOpacity
                    key={module.id}
                    style={styles.moduleCard}
                    onPress={() => router.push(`/module/${module.id}`)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.moduleInfo}>
                      <Text style={styles.moduleTitle}>{module.title}</Text>
                      <Text style={styles.moduleMeta}>
                        ⏱ {module.durationMinutes} min
                        {module.isPremium ? '  🔒 Premium' : '  ✓ Gratuit'}
                      </Text>
                    </View>
                    <Text style={styles.moduleArrow}>→</Text>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 24, paddingVertical: 20 },
  title: { fontFamily: Typography.fontFamily.cinzelBold, fontSize: Typography.fontSize['3xl'], color: Colors.onSurface },
  subtitle: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.sm, color: Colors.onSurfaceVariant, marginTop: 4 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100, gap: 28 },
  themeSection: { gap: 10 },
  themeHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 4 },
  themeIcon: { fontSize: 28 },
  themeTitleBlock: { flex: 1 },
  themeTitle: { fontFamily: Typography.fontFamily.headlineMedium, fontSize: Typography.fontSize.lg, color: Colors.onSurface },
  themeDescription: { fontFamily: Typography.fontFamily.body, fontSize: 11, color: Colors.onSurfaceVariant, marginTop: 2 },
  themeDot: { width: 8, height: 8, borderRadius: 4 },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  moduleInfo: { flex: 1 },
  moduleTitle: { fontFamily: Typography.fontFamily.bodyMedium, fontSize: Typography.fontSize.base, color: Colors.onSurface, marginBottom: 4 },
  moduleMeta: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.xs, color: Colors.onSurfaceVariant, letterSpacing: 0.5 },
  moduleArrow: { color: Colors.primary, fontSize: 18, marginLeft: 12 },
});
