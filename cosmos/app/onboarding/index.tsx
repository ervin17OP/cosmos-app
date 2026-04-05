// Écran Splash / Onboarding — point d'entrée de l'app
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  // Animations d'entrée
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const ringPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Séquence d'animation d'entrée
    Animated.sequence([
      // Logo apparaît
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Texte apparaît
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Boutons apparaissent
      Animated.timing(buttonsOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation pulse continue du logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(ringPulse, {
          toValue: 1.12,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(ringPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      {/* Halos d'ambiance */}
      <View style={styles.haloTop} />
      <View style={styles.haloBottom} />

      <SafeAreaView style={styles.safeArea}>
        {/* Zone logo */}
        <Animated.View
          style={[
            styles.logoWrapper,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
        >
          {/* Anneaux concentriques */}
          <Animated.View
            style={[styles.ring, styles.ringOuter, { transform: [{ scale: ringPulse }] }]}
          />
          <View style={[styles.ring, styles.ringMiddle]} />
          <View style={[styles.ring, styles.ringInner]} />

          {/* Noyau central */}
          <View style={styles.core}>
            <Text style={styles.coreEmoji}>🌌</Text>
          </View>
        </Animated.View>

        {/* Typographie */}
        <Animated.View style={[styles.textBlock, { opacity: textOpacity }]}>
          <Text style={styles.title}>COSMOS</Text>
          <Text style={styles.subtitle}>L'univers à portée de main</Text>
        </Animated.View>

        {/* CTA */}
        <Animated.View style={[styles.ctaBlock, { opacity: buttonsOpacity }]}>
          {/* Bouton principal */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/onboarding/level')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Commencer l'exploration →</Text>
          </TouchableOpacity>

          {/* Bouton secondaire (ghost) */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>J'ai déjà un compte</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  haloTop: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: Colors.primary,
    opacity: 0.07,
  },
  haloBottom: {
    position: 'absolute',
    bottom: '-10%',
    right: '-10%',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: Colors.secondary,
    opacity: 0.04,
  },
  logoWrapper: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1.5,
  },
  ringOuter: {
    width: 160,
    height: 160,
    borderColor: `${Colors.primary}50`,
  },
  ringMiddle: {
    width: 120,
    height: 120,
    borderColor: `${Colors.secondary}60`,
  },
  ringInner: {
    width: 80,
    height: 80,
    borderColor: `${Colors.primary}30`,
  },
  core: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${Colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  coreEmoji: {
    fontSize: 28,
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: 64,
    gap: 12,
  },
  title: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize.display,
    color: Colors.onSurface,
    letterSpacing: 12,
    marginLeft: 12,
    textShadowColor: `${Colors.primary}60`,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary,
    letterSpacing: 4,
    textTransform: 'uppercase',
    opacity: 0.9,
  },
  ctaBlock: {
    width: '100%',
    gap: 14,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  primaryButtonText: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize.md,
    color: Colors.onPrimary,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: `${Colors.outlineVariant}30`,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontFamily: Typography.fontFamily.headlineMedium,
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    letterSpacing: 0.3,
  },
});
