// Écran Profil utilisateur
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { supabase } from '@/lib/supabase';
import { useProfile } from '@/hooks/useProfile';
import { PremiumModal } from '@/components/ui/PremiumModal';

const LEVEL_LABELS: Record<string, string> = {
  curious: 'Curieux',
  passionate: 'Passionné',
  student: 'Étudiant',
};

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, loading } = useProfile();
  const [premiumVisible, setPremiumVisible] = useState(false);

  // Écran "non connecté"
  if (!loading && !profile) {
    return (
      <View style={styles.container}>
        <StarField />
        <SafeAreaView style={[styles.safeArea, { alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 32 }]} edges={['top']}>
          <Text style={{ fontSize: 56 }}>🚀</Text>
          <Text style={[styles.title, { textAlign: 'center' }]}>Rejoignez{'\n'}l'aventure</Text>
          <Text style={{ fontFamily: Typography.fontFamily.body, fontSize: Typography.fontSize.sm, color: Colors.onSurfaceVariant, textAlign: 'center', marginBottom: 8 }}>
            Créez un compte pour sauvegarder votre progression et débloquer tous les modules.
          </Text>
          <TouchableOpacity
            style={{ width: '100%', height: 56, backgroundColor: Colors.primary, borderRadius: 18, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.primary, shadowOpacity: 0.35, shadowRadius: 20, elevation: 8 }}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={{ fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.md, color: Colors.onPrimary }}>Créer un compte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '100%', height: 50, borderRadius: 16, borderWidth: 1, borderColor: `${Colors.primary}40`, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={{ fontFamily: Typography.fontFamily.bodyMedium, fontSize: Typography.fontSize.base, color: Colors.primary }}>J'ai déjà un compte</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  async function handleLogout() {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            router.replace('/onboarding');
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
        </View>

        <View style={styles.content}>
          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarGlow} />
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>👨‍🚀</Text>
              </View>
            </View>
            {loading ? (
              <ActivityIndicator color={Colors.primary} style={{ marginTop: 8 }} />
            ) : (
              <>
                <Text style={styles.profileName}>{profile?.username ?? 'Astronaute'}</Text>
                <Text style={styles.profileLevel}>
                  Niveau {LEVEL_LABELS[profile?.level ?? 'curious']} · {profile?.xp ?? 0} XP
                </Text>
              </>
            )}
          </View>

          {/* Options */}
          <View style={styles.optionsList}>
            <TouchableOpacity style={styles.option} onPress={() => router.push('/onboarding/level')}>
              <Text style={styles.optionIcon}>🎯</Text>
              <Text style={styles.optionLabel}>Changer de niveau</Text>
              <Text style={styles.optionArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.option} onPress={() => router.push('/settings/notifications' as any)}>
              <Text style={styles.optionIcon}>🔔</Text>
              <Text style={styles.optionLabel}>Notifications</Text>
              <Text style={styles.optionArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.option} onPress={() => setPremiumVisible(true)}>
              <Text style={styles.optionIcon}>💎</Text>
              <Text style={styles.optionLabel}>Passer à Premium</Text>
              <Text style={[styles.optionArrow, { color: Colors.tertiary }]}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Déconnexion */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <PremiumModal visible={premiumVisible} onClose={() => setPremiumVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 8 },
  title: { fontFamily: Typography.fontFamily.cinzelBold, fontSize: Typography.fontSize['3xl'], color: Colors.onSurface },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 24, gap: 32 },
  avatarSection: { alignItems: 'center', gap: 10 },
  avatarWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  avatarGlow: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: Colors.primary,
    opacity: 0.1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${Colors.primary}1A`,
    borderWidth: 2,
    borderColor: `${Colors.primary}50`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 48 },
  profileName: { fontFamily: Typography.fontFamily.headlineMedium, fontSize: Typography.fontSize.xl, color: Colors.onSurface },
  profileLevel: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.sm, color: Colors.onSurfaceVariant, letterSpacing: 1 },
  optionsList: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 18,
  },
  optionIcon: { fontSize: 20 },
  optionLabel: { flex: 1, fontFamily: Typography.fontFamily.bodyMedium, fontSize: Typography.fontSize.base, color: Colors.onSurface },
  optionArrow: { color: Colors.onSurfaceVariant, fontSize: 18 },
  separator: { height: 1, backgroundColor: Colors.glassBorder, marginHorizontal: 18 },
  logoutButton: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${Colors.error}40`,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.error}0D`,
  },
  logoutText: { fontFamily: Typography.fontFamily.bodyMedium, fontSize: Typography.fontSize.base, color: Colors.error },
});
