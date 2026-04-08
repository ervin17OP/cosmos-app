// Écran d'inscription — email + password + username + niveau
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { UserLevel } from '@/types';
import { LEVEL_CONFIG } from '@/constants/themes';
import { supabase } from '@/lib/supabase';

const LEVELS: UserLevel[] = ['curious', 'passionate', 'student'];

const LEVEL_LABEL: Record<UserLevel, string> = {
  curious: 'Débutant',
  passionate: 'Amateur',
  student: 'Expert',
};

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>('curious');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Champs manquants', 'Merci de remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: username.trim(),
            level: selectedLevel,
          },
        },
      });

      if (error) throw error;

      router.replace('/(tabs)');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      Alert.alert('Erreur d\'inscription', message);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (field: string) => [
    styles.input,
    focusedField === field && styles.inputFocused,
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>COSMOS</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Titre */}
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>Commencez votre voyage à travers les galaxies.</Text>
          </View>

          {/* Formulaire */}
          <View style={styles.form}>
            {/* Username */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Nom d'utilisateur</Text>
              <TextInput
                style={inputStyle('username')}
                placeholder="Astronaute_42"
                placeholderTextColor={Colors.outlineVariant}
                value={username}
                onChangeText={setUsername}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
              />
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={inputStyle('email')}
                placeholder="voyageur@cosmos.io"
                placeholderTextColor={Colors.outlineVariant}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={inputStyle('password')}
                placeholder="••••••••••••"
                placeholderTextColor={Colors.outlineVariant}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                secureTextEntry
              />
            </View>

            {/* Niveau */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Niveau d'expertise</Text>
              <View style={styles.levelRow}>
                {LEVELS.map((level) => {
                  const isActive = selectedLevel === level;
                  return (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.levelChip,
                        isActive && {
                          borderColor: Colors.secondary,
                          backgroundColor: `${Colors.secondary}0D`,
                        },
                      ]}
                      onPress={() => setSelectedLevel(level)}
                    >
                      <Text style={[styles.levelChipText, isActive && { color: Colors.secondary }]}>
                        {LEVEL_LABEL[level]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* CTA */}
            <TouchableOpacity
              style={[styles.submitButton, loading && { opacity: 0.6 }]}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color={Colors.onPrimary} />
              ) : (
                <Text style={styles.submitText}>Créer mon compte</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Séparateur */}
          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>ou s'inscrire avec</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Boutons sociaux */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}></Text>
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Lien connexion */}
          <Text style={styles.loginLink}>
            Déjà un compte ?{' '}
            <Text style={styles.loginLinkAction} onPress={() => router.push('/(auth)/login')}>
              Se connecter
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>

      {/* Décorations d'ambiance */}
      <View style={styles.decoBottomRight} />
      <View style={styles.decoTopLeft} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: Colors.overlayLight,
  },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  backIcon: { color: `${Colors.primary}B0`, fontSize: 22 },
  logoText: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.xl, color: Colors.primary },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 },
  titleBlock: { marginBottom: 32 },
  title: { fontFamily: Typography.fontFamily.headlineMedium, fontSize: Typography.fontSize['4xl'] - 4, color: Colors.onSurface, marginBottom: 6 },
  subtitle: { fontFamily: Typography.fontFamily.body, fontSize: Typography.fontSize.sm, color: Colors.onSurfaceVariant },
  form: { gap: 20 },
  fieldGroup: { gap: 6 },
  label: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.xs, color: Colors.primary, letterSpacing: 2, textTransform: 'uppercase', marginLeft: 4 },
  input: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: `${Colors.outlineVariant}60`,
    color: Colors.onSurface,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.base,
  },
  inputFocused: {
    borderColor: Colors.secondary,
    shadowColor: Colors.secondary,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
    backgroundColor: `${Colors.glass}80`,
  },
  levelRow: { flexDirection: 'row', gap: 10 },
  levelChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    alignItems: 'center',
  },
  levelChipText: { fontFamily: Typography.fontFamily.bodyMedium, fontSize: Typography.fontSize.sm, color: Colors.onSurfaceVariant },
  submitButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  submitText: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.lg, color: Colors.onPrimary },
  separator: { flexDirection: 'row', alignItems: 'center', gap: 14, marginVertical: 28 },
  separatorLine: { flex: 1, height: 1, backgroundColor: `${Colors.outlineVariant}50` },
  separatorText: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.xs, color: Colors.outlineVariant, letterSpacing: 2, textTransform: 'uppercase' },
  socialRow: { flexDirection: 'row', gap: 14 },
  socialButton: {
    flex: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 14,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: `${Colors.outlineVariant}60`,
  },
  socialIcon: { fontSize: 18, color: Colors.onSurface, fontWeight: 'bold' },
  socialText: { fontFamily: Typography.fontFamily.bodyMedium, fontSize: Typography.fontSize.sm, color: Colors.onSurface },
  loginLink: { textAlign: 'center', fontFamily: Typography.fontFamily.body, fontSize: Typography.fontSize.sm, color: Colors.onSurfaceVariant, marginTop: 28 },
  loginLinkAction: { color: Colors.secondary, fontFamily: Typography.fontFamily.bodyMedium },
  decoBottomRight: { position: 'absolute', bottom: -80, right: -80, width: 256, height: 256, borderRadius: 128, backgroundColor: Colors.primary, opacity: 0.06 },
  decoTopLeft: { position: 'absolute', top: -40, left: -40, width: 192, height: 192, borderRadius: 96, backgroundColor: Colors.tertiary, opacity: 0.04 },
});
