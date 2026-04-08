// Écran de connexion — email + password
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetVisible, setResetVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Champs manquants', 'Merci de remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      router.replace('/(tabs)');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Identifiants incorrects';
      Alert.alert('Erreur de connexion', message);
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    if (!resetEmail.trim()) {
      Alert.alert('Email requis', 'Saisissez votre adresse email.');
      return;
    }
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
        redirectTo: 'cosmos://reset-password',
      });
      if (error) throw error;
      setResetSent(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      Alert.alert('Erreur', message);
    } finally {
      setResetLoading(false);
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.logoText}>COSMOS</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.content}>
            {/* Titre */}
            <View style={styles.titleBlock}>
              <Text style={styles.title}>Bon retour,{'\n'}Explorateur</Text>
              <Text style={styles.subtitle}>Connectez-vous pour reprendre votre voyage.</Text>
            </View>

            {/* Formulaire */}
            <View style={styles.form}>
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

              <TouchableOpacity
                style={[styles.loginButton, loading && { opacity: 0.6 }]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.onPrimary} />
                ) : (
                  <Text style={styles.loginButtonText}>Se connecter</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => { setResetVisible(true); setResetSent(false); setResetEmail(email); }}
                style={styles.forgotBtn}
              >
                <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>

            {/* Lien inscription */}
            <Text style={styles.registerLink}>
              Pas encore de compte ?{' '}
              <Text
                style={styles.registerLinkAction}
                onPress={() => router.push('/(auth)/register')}
              >
                Créer un compte
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <View style={styles.decoBottomRight} />

      {/* Modal reset mot de passe */}
      <Modal
        visible={resetVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setResetVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />

            {resetSent ? (
              /* Confirmation envoi */
              <View style={styles.modalBody}>
                <Text style={styles.modalEmoji}>📬</Text>
                <Text style={styles.modalTitle}>Email envoyé !</Text>
                <Text style={styles.modalDesc}>
                  Vérifiez votre boîte mail. Le lien de réinitialisation est valable 1 heure.
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setResetVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* Formulaire email */
              <View style={styles.modalBody}>
                <Text style={styles.modalEmoji}>🔑</Text>
                <Text style={styles.modalTitle}>Réinitialiser</Text>
                <Text style={styles.modalDesc}>
                  Saisissez votre email et nous vous enverrons un lien de réinitialisation.
                </Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="votre@email.com"
                  placeholderTextColor={Colors.onSurfaceVariant}
                  value={resetEmail}
                  onChangeText={setResetEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={[styles.modalButton, resetLoading && { opacity: 0.6 }]}
                  onPress={handleReset}
                  disabled={resetLoading}
                >
                  {resetLoading ? (
                    <ActivityIndicator color={Colors.onPrimary} />
                  ) : (
                    <Text style={styles.modalButtonText}>Envoyer le lien →</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setResetVisible(false)} style={styles.modalCancel}>
                  <Text style={styles.modalCancelText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 48, justifyContent: 'center' },
  titleBlock: { marginBottom: 40 },
  title: {
    fontFamily: Typography.fontFamily.headlineMedium,
    fontSize: Typography.fontSize['4xl'] - 4,
    color: Colors.onSurface,
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: { fontFamily: Typography.fontFamily.body, fontSize: Typography.fontSize.sm, color: Colors.onSurfaceVariant },
  form: { gap: 20 },
  fieldGroup: { gap: 6 },
  label: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginLeft: 4,
  },
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
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  loginButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  loginButtonText: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.lg, color: Colors.onPrimary },
  forgotBtn: { alignItems: 'center', paddingTop: 14 },
  forgotText: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    color: Colors.primaryDim,
  },
  // Modal reset
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#1a1530',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: `${Colors.primary}30`,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.glassBorder,
    alignSelf: 'center',
    marginBottom: 24,
  },
  modalBody: { alignItems: 'center', gap: 14 },
  modalEmoji: { fontSize: 44 },
  modalTitle: {
    fontFamily: Typography.fontFamily.cinzelBold,
    fontSize: Typography.fontSize['2xl'],
    color: Colors.onSurface,
  },
  modalDesc: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 4,
  },
  modalInput: {
    width: '100%',
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: `${Colors.outlineVariant}60`,
    color: Colors.onSurface,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.base,
  },
  modalButton: {
    width: '100%',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
  },
  modalButtonText: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize.md,
    color: Colors.onPrimary,
  },
  modalCancel: { paddingVertical: 8 },
  modalCancelText: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurfaceVariant,
  },
  registerLink: {
    textAlign: 'center',
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurfaceVariant,
    marginTop: 36,
  },
  registerLinkAction: { color: Colors.secondary, fontFamily: Typography.fontFamily.bodyMedium },
  decoBottomRight: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: Colors.primary,
    opacity: 0.06,
  },
});
