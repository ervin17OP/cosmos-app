// Écran de sélection du niveau — animations Reanimated v4 (UI thread)
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { UserLevel } from '@/types';
import { LEVEL_CONFIG } from '@/constants/themes';
import { useUserLevel } from '@/hooks/useUserLevel';

const LEVELS: UserLevel[] = ['curious', 'passionate', 'student'];

// Composant carte animée isolé pour un re-render optimal
function LevelCard({
  level,
  index,
  isSelected,
  onPress,
}: {
  level: UserLevel;
  index: number;
  isSelected: boolean;
  onPress: () => void;
}) {
  const config = LEVEL_CONFIG[level];

  // Animation d'entrée staggerée (montée + opacité)
  const entranceY   = useSharedValue(40);
  const entranceOp  = useSharedValue(0);

  // Démarrer dès le mount (effet similaire à useEffect avec stagger)
  entranceY.value  = withDelay(index * 120 + 200, withSpring(0, { damping: 18, stiffness: 80 }));
  entranceOp.value = withDelay(index * 120 + 200, withTiming(1, { duration: 350 }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity:   entranceOp.value,
    transform: [{ translateY: entranceY.value }],
  }));

  return (
    <Animated.View style={cardStyle}>
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && {
            borderColor: config.color,
            shadowColor: config.color,
            shadowOpacity: 0.35,
            shadowRadius: 20,
            elevation: 10,
            backgroundColor: `${config.color}0D`,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.cardTop}>
          <Text style={styles.cardEmoji}>{config.emoji}</Text>
          <View style={[styles.badge, { borderColor: `${config.color}40`, backgroundColor: `${config.color}1A` }]}>
            <Text style={[styles.badgeText, { color: config.color }]}>{config.badge}</Text>
          </View>
        </View>

        <View style={styles.cardTitleRow}>
          <Text style={styles.cardTitle}>{config.label}</Text>
          {isSelected && <Text style={[styles.checkIcon, { color: config.color }]}>✓</Text>}
        </View>

        <Text style={styles.cardDescription}>{config.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function LevelScreen() {
  const router = useRouter();
  const { saveLevel } = useUserLevel();
  const [selected, setSelected] = useState<UserLevel>('passionate');

  // Animation d'entrée du header
  const headerOp = useSharedValue(0);
  const headerY  = useSharedValue(20);
  headerOp.value = withTiming(1, { duration: 400 });
  headerY.value  = withSpring(0, { damping: 18, stiffness: 80 });

  const headerStyle = useAnimatedStyle(() => ({
    opacity:   headerOp.value,
    transform: [{ translateY: headerY.value }],
  }));

  async function handleContinue() {
    await saveLevel(selected);
    router.replace('/(tabs)');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea}>
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
          showsVerticalScrollIndicator={false}
        >
          {/* Titre animé */}
          <Animated.View style={[styles.header, headerStyle]}>
            <Text style={styles.overline}>Avant de commencer</Text>
            <Text style={styles.title}>Quel est ton{'\n'}niveau de départ ?</Text>
          </Animated.View>

          {/* Cartes de niveau */}
          <View style={styles.cards}>
            {LEVELS.map((level, index) => (
              <LevelCard
                key={level}
                level={level}
                index={index}
                isSelected={selected === level}
                onPress={() => setSelected(level)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Footer CTA */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue} activeOpacity={0.85}>
            <Text style={styles.continueText}>Continuer →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  logoText: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize.xl,
    color: Colors.primary,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 20 },
  header: { alignItems: 'center', marginBottom: 36 },
  overline: {
    fontFamily: Typography.fontFamily.cinzel,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  title: {
    fontFamily: Typography.fontFamily.cinzelBold,
    fontSize: Typography.fontSize['3xl'] - 2,
    color: Colors.onSurface,
    textAlign: 'center',
    lineHeight: 38,
  },
  cards: { gap: 20 },
  card: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: 16,
    padding: 24,
    shadowOffset: { width: 0, height: 0 },
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  cardEmoji: { fontSize: 32 },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, borderWidth: 1 },
  badgeText: {
    fontFamily: Typography.fontFamily.label,
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  cardTitle: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize.xl,
    color: Colors.onSurface,
  },
  checkIcon: { fontSize: 18 },
  cardDescription: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    backgroundColor: Colors.background,
  },
  continueButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  continueText: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize.md,
    color: Colors.onPrimary,
    letterSpacing: 0.5,
  },
});
