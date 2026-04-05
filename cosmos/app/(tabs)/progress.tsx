// Écran Progrès & Badges — gamification
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface Badge {
  id: string;
  icon: string;
  label: string;
  color: string;
  unlocked: boolean;
}

const BADGES: Badge[] = [
  { id: '1', icon: '⭐', label: 'Premier Pas', color: Colors.primary, unlocked: true },
  { id: '2', icon: '⏱', label: 'Relativiste', color: Colors.secondary, unlocked: true },
  { id: '3', icon: '🔒', label: 'Singularité', color: Colors.onSurfaceVariant, unlocked: false },
  { id: '4', icon: '🌍', label: 'Géologue', color: Colors.tertiary, unlocked: true },
  { id: '5', icon: '🔒', label: 'Pulsar', color: Colors.onSurfaceVariant, unlocked: false },
  { id: '6', icon: '🔒', label: 'Andromède', color: Colors.onSurfaceVariant, unlocked: false },
];

const THEME_PROGRESS = [
  { title: 'Système Solaire', percentage: 85 },
  { title: 'Relativité & Temps', percentage: 42 },
  { title: 'Vie Extraterrestre', percentage: 10 },
];

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Ma Progression</Text>
          <Text style={styles.subtitle}>Voyageur Interstellaire</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Badge de niveau circulaire */}
          <View style={styles.levelBadgeSection}>
            <View style={styles.levelBadgeWrapper}>
              {/* Halo externe */}
              <View style={styles.levelBadgeGlow} />
              <View style={styles.levelBadge}>
                {/* Indicator de niveau */}
                <View style={styles.levelPill}>
                  <Text style={styles.levelPillText}>Niveau 12</Text>
                </View>
                <Text style={styles.levelBadgeLabel}>Niveau{'\n'}Curieux</Text>
                <View style={styles.xpBlock}>
                  <Text style={styles.xpHint}>Points d'XP</Text>
                  <Text style={styles.xpBig}>2,840</Text>
                </View>
                {/* Anneau orbital */}
                <View style={styles.orbitalRing} />
              </View>
            </View>
          </View>

          {/* Stats bento */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🚀</Text>
              <Text style={styles.statValue}>14</Text>
              <Text style={styles.statLabel}>Modules{'\n'}Terminés</Text>
            </View>
            <View style={[styles.statCard, styles.statCardCyan]}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statValue}>07</Text>
              <Text style={styles.statLabel}>Jours{'\n'}Série</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🎖️</Text>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Badges{'\n'}Gagnés</Text>
            </View>
          </View>

          {/* Thèmes explorés */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Thèmes explorés</Text>
            </View>
            <View style={styles.progressList}>
              {THEME_PROGRESS.map((item, index) => (
                <View key={index} style={styles.progressItem}>
                  <View style={styles.progressLabelRow}>
                    <Text style={styles.progressLabel}>{item.title}</Text>
                    <Text style={styles.progressPercent}>{item.percentage}%</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${item.percentage}%` }]}>
                      <View style={styles.progressGlowHead} />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Badges */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionAccent, { backgroundColor: Colors.tertiary }]} />
              <Text style={styles.sectionTitle}>Badges</Text>
              <Text style={styles.viewAll}>Voir tout</Text>
            </View>
            <View style={styles.badgesGrid}>
              {BADGES.map((badge) => (
                <View key={badge.id} style={[styles.badgeItem, !badge.unlocked && styles.badgeLocked]}>
                  <View
                    style={[
                      styles.badgeIcon,
                      badge.unlocked
                        ? {
                            borderColor: `${badge.color}30`,
                            backgroundColor: Colors.surfaceContainerHigh,
                          }
                        : {
                            borderColor: Colors.glassBorder,
                            backgroundColor: Colors.surfaceContainerLowest,
                          },
                    ]}
                  >
                    <Text style={[styles.badgeEmoji, !badge.unlocked && { opacity: 0.3 }]}>
                      {badge.unlocked ? badge.icon : '🔒'}
                    </Text>
                  </View>
                  <Text style={styles.badgeLabel}>{badge.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Décorations */}
      <View style={styles.decoPurple} />
      <View style={styles.decoCyan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 8 },
  title: { fontFamily: Typography.fontFamily.cinzelBold, fontSize: Typography.fontSize['3xl'], color: Colors.onSurface },
  subtitle: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.sm, color: Colors.onSurfaceVariant, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 120, gap: 32 },
  levelBadgeSection: { alignItems: 'center', paddingVertical: 16 },
  levelBadgeWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  levelBadgeGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.primary,
    opacity: 0.08,
  },
  levelBadge: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 2,
    borderColor: `${Colors.primary}50`,
    backgroundColor: Colors.glass,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  levelPill: {
    position: 'absolute',
    top: -14,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 999,
  },
  levelPillText: { fontFamily: Typography.fontFamily.label, fontSize: 9, color: Colors.onPrimary, letterSpacing: 1 },
  levelBadgeLabel: {
    fontFamily: Typography.fontFamily.cinzel,
    fontSize: Typography.fontSize.xl - 2,
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: 26,
  },
  xpBlock: { alignItems: 'center', marginTop: 8 },
  xpHint: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.xs, color: Colors.onSurfaceVariant, letterSpacing: 1, textTransform: 'uppercase' },
  xpBig: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize['2xl'], color: Colors.secondary },
  orbitalRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  statsGrid: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.glass,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  statCardCyan: { shadowColor: Colors.secondary, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  statIcon: { fontSize: 22 },
  statValue: { fontFamily: Typography.fontFamily.cinzel, fontSize: Typography.fontSize['2xl'], color: Colors.onSurface },
  statLabel: { fontFamily: Typography.fontFamily.label, fontSize: 9, color: Colors.onSurfaceVariant, textTransform: 'uppercase', textAlign: 'center', lineHeight: 13 },
  section: { gap: 16 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sectionAccent: { width: 3, height: 20, backgroundColor: Colors.primary, borderRadius: 2 },
  sectionTitle: { fontFamily: Typography.fontFamily.headlineMedium, fontSize: Typography.fontSize.lg, color: Colors.onSurface, flex: 1 },
  viewAll: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.xs, color: Colors.primaryDim, letterSpacing: 2, textTransform: 'uppercase' },
  progressList: { gap: 18 },
  progressItem: { gap: 8 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  progressLabel: { fontFamily: Typography.fontFamily.bodyMedium, fontSize: Typography.fontSize.sm, color: Colors.onSurface },
  progressPercent: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.xs, color: Colors.secondary },
  progressTrack: { height: 6, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 999, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  progressGlowHead: { width: 8, height: '100%', backgroundColor: Colors.onSurface, opacity: 0.5, borderRadius: 4 },
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  badgeItem: { alignItems: 'center', gap: 8, width: '28%' },
  badgeLocked: { opacity: 0.4 },
  badgeIcon: { width: 72, height: 72, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  badgeEmoji: { fontSize: 32 },
  badgeLabel: { fontFamily: Typography.fontFamily.label, fontSize: 9, color: Colors.onSurface, textTransform: 'uppercase', textAlign: 'center', letterSpacing: 0.5 },
  decoPurple: { position: 'absolute', top: '25%', right: -80, width: 200, height: 200, borderRadius: 100, backgroundColor: Colors.primary, opacity: 0.05 },
  decoCyan: { position: 'absolute', bottom: '25%', left: -80, width: 160, height: 160, borderRadius: 80, backgroundColor: Colors.secondary, opacity: 0.04 },
});
