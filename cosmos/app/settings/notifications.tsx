// Écran Paramètres — Notifications
import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

const STORAGE_KEY = '@cosmos/notifications';

interface NotifSettings {
  dailyReminder: boolean;
  streakAlert: boolean;
  newContent: boolean;
  quizResults: boolean;
}

const DEFAULT: NotifSettings = {
  dailyReminder: true,
  streakAlert: true,
  newContent: false,
  quizResults: true,
};

const SETTINGS: { key: keyof NotifSettings; icon: string; title: string; desc: string }[] = [
  {
    key: 'dailyReminder',
    icon: '🌅',
    title: 'Rappel quotidien',
    desc: 'Une notification chaque jour pour maintenir votre série.',
  },
  {
    key: 'streakAlert',
    icon: '🔥',
    title: 'Alerte streak',
    desc: 'Prévenu si vous êtes sur le point de perdre votre série.',
  },
  {
    key: 'newContent',
    icon: '🌌',
    title: 'Nouveau contenu',
    desc: 'Quand de nouveaux modules ou thèmes sont disponibles.',
  },
  {
    key: 'quizResults',
    icon: '🏆',
    title: 'Résultats quiz',
    desc: 'Rappels pour consulter vos derniers scores.',
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState<NotifSettings>(DEFAULT);

  async function toggle(key: keyof NotifSettings) {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // silencieux
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionLabel}>Préférences</Text>

          <View style={styles.card}>
            {SETTINGS.map(({ key, icon, title, desc }, i) => (
              <View key={key}>
                {i > 0 && <View style={styles.divider} />}
                <View style={styles.row}>
                  <Text style={styles.rowIcon}>{icon}</Text>
                  <View style={styles.rowText}>
                    <Text style={styles.rowTitle}>{title}</Text>
                    <Text style={styles.rowDesc}>{desc}</Text>
                  </View>
                  <Switch
                    value={settings[key]}
                    onValueChange={() => toggle(key)}
                    trackColor={{
                      false: Colors.surfaceContainerHighest,
                      true: `${Colors.secondary}60`,
                    }}
                    thumbColor={settings[key] ? Colors.secondary : Colors.onSurfaceVariant}
                  />
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.hint}>
            Les notifications nécessitent l'autorisation du système. Vous pouvez les gérer dans les Réglages de votre appareil.
          </Text>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.decoPurple} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: Colors.overlayLight,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { color: `${Colors.primary}B0`, fontSize: 22 },
  headerTitle: {
    fontFamily: Typography.fontFamily.cinzel,
    fontSize: Typography.fontSize.xl,
    color: Colors.onSurface,
  },
  content: { padding: 24, paddingBottom: 60, gap: 16 },
  sectionLabel: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  divider: { height: 1, backgroundColor: Colors.glassBorder, marginHorizontal: 18 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 18,
  },
  rowIcon: { fontSize: 22, width: 32, textAlign: 'center' },
  rowText: { flex: 1 },
  rowTitle: {
    fontFamily: Typography.fontFamily.bodyMedium,
    fontSize: Typography.fontSize.base,
    color: Colors.onSurface,
    marginBottom: 3,
  },
  rowDesc: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },
  hint: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
    textAlign: 'center',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  decoPurple: {
    position: 'absolute',
    top: '30%',
    right: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.primary,
    opacity: 0.04,
  },
});
