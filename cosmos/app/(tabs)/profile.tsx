// Écran Profil utilisateur
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
  const router = useRouter();

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
            <Text style={styles.profileName}>Jean-Pierre</Text>
            <Text style={styles.profileLevel}>Niveau Curieux · 380 XP</Text>
          </View>

          {/* Options */}
          <View style={styles.optionsList}>
            <TouchableOpacity style={styles.option} onPress={() => router.push('/onboarding/level')}>
              <Text style={styles.optionIcon}>🎯</Text>
              <Text style={styles.optionLabel}>Changer de niveau</Text>
              <Text style={styles.optionArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.option} onPress={() => {}}>
              <Text style={styles.optionIcon}>🔔</Text>
              <Text style={styles.optionLabel}>Notifications</Text>
              <Text style={styles.optionArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.option} onPress={() => {}}>
              <Text style={styles.optionIcon}>💎</Text>
              <Text style={styles.optionLabel}>Passer à Premium</Text>
              <Text style={styles.optionArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Déconnexion */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
