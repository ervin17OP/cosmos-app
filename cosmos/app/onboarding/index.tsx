// Écran Splash / Onboarding — animations Reanimated v4 (UI thread)
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  // Shared values
  const logoScale    = useSharedValue(0.7);
  const logoOpacity  = useSharedValue(0);
  const textOpacity  = useSharedValue(0);
  const btnsOpacity  = useSharedValue(0);
  const ringScale    = useSharedValue(1);

  useEffect(() => {
    // Logo pop-in
    logoScale.value   = withSpring(1, { damping: 14, stiffness: 100 });
    logoOpacity.value = withTiming(1, { duration: 600 });

    // Texte légèrement après
    textOpacity.value = withDelay(500, withTiming(1, { duration: 500 }));

    // Boutons encore après
    btnsOpacity.value = withDelay(900, withTiming(1, { duration: 400 }));

    // Pulsation continue du ring extérieur
    ringScale.value = withRepeat(
      withSequence(
        withTiming(1.12, { duration: 2000 }),
        withTiming(1,    { duration: 2000 })
      ),
      -1,
      false
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity:   logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
  }));

  const textStyle  = useAnimatedStyle(() => ({ opacity: textOpacity.value }));
  const btnsStyle  = useAnimatedStyle(() => ({ opacity: btnsOpacity.value }));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      {/* Halos d'ambiance */}
      <View style={styles.haloTop} />
      <View style={styles.haloBottom} />

      <SafeAreaView style={styles.safeArea}>
        {/* Zone logo */}
        <Animated.View style={[styles.logoWrapper, logoStyle]}>
          {/* Anneaux concentriques */}
          <Animated.View style={[styles.ring, styles.ringOuter, ringStyle]} />
          <View style={[styles.ring, styles.ringMiddle]} />
          <View style={[styles.ring, styles.ringInner]} />

          {/* Noyau central */}
          <View style={styles.core}>
            <Text style={styles.coreEmoji}>🌌</Text>
          </View>
        </Animated.View>

        {/* Typographie */}
        <Animated.View style={[styles.textBlock, textStyle]}>
          <Text style={styles.title}>COSMOS</Text>
          <Text style={styles.subtitle}>L'univers à portée de main</Text>
        </Animated.View>

        {/* CTA */}
        <Animated.View style={[styles.ctaBlock, btnsStyle]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/onboarding/level')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Commencer l'exploration →</Text>
          </TouchableOpacity>

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
  container: { flex: 1, backgroundColor: Colors.background },
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
  ringOuter:  { width: 160, height: 160, borderColor: `${Colors.primary}50` },
  ringMiddle: { width: 120, height: 120, borderColor: `${Colors.secondary}60` },
  ringInner:  { width: 80,  height: 80,  borderColor: `${Colors.primary}30` },
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
  coreEmoji: { fontSize: 28 },
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
  ctaBlock: { width: '100%', gap: 14 },
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
  },
  secondaryButtonText: {
    fontFamily: Typography.fontFamily.headlineMedium,
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    letterSpacing: 0.3,
  },
});
