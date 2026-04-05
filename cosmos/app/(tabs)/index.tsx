// Écran Accueil (Dashboard) — onglet principal
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { XPBar } from '@/components/home/XPBar';
import { FeaturedModule } from '@/components/home/FeaturedModule';
import { ThemeChip } from '@/components/home/ThemeChip';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { THEMES, MODULES } from '@/constants/themes';
import { Theme } from '@/types';

export default function HomeScreen() {
  const [activeTheme, setActiveTheme] = useState<string>(THEMES[0].id);

  // Module mis en avant (premier module non premium)
  const featuredModule = MODULES[0];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header utilisateur */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour, Explorateur</Text>
            <Text style={styles.username}>Jean-Pierre</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👨‍🚀</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Barre XP */}
          <XPBar
            xp={380}
            xpToNext={120}
            rankLabel="Niveau Curieux"
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
              {THEMES.map((theme: Theme) => (
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
          <FeaturedModule module={{ ...featuredModule, emoji: '🪐' }} />

          {/* Stats rapides */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={styles.statValue}>14</Text>
              <Text style={styles.statLabel}>Modules terminés</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={styles.statValue}>08</Text>
              <Text style={styles.statLabel}>Badges acquis</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
  statsGrid: { flexDirection: 'row', gap: 14 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 20,
    padding: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  statIcon: { fontSize: 22 },
  statValue: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize['2xl'],
    color: Colors.onSurface,
  },
  statLabel: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
