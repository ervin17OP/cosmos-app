// Modal Premium — affiché quand un utilisateur tente d'accéder à un module payant
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

const { height } = Dimensions.get('window');

const PERKS = [
  { icon: '🔭', text: 'Accès illimité à tous les modules' },
  { icon: '⚛️', text: 'Niveau Étudiant débloqué entièrement' },
  { icon: '🏆', text: 'Badges exclusifs et classements' },
  { icon: '🌌', text: 'Nouveaux contenus chaque semaine' },
];

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
  moduleName?: string;
}

export function PremiumModal({ visible, onClose, moduleName }: PremiumModalProps) {
  const router = useRouter();

  const sheetY   = useSharedValue(height);
  const backdropOp = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      backdropOp.value = withTiming(1, { duration: 250 });
      sheetY.value     = withSpring(0, { damping: 20, stiffness: 140 });
    } else {
      backdropOp.value = withTiming(0, { duration: 200 });
      sheetY.value     = withTiming(height, { duration: 300 });
    }
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOp.value,
  }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Bottom sheet */}
      <Animated.View style={[styles.sheet, sheetStyle]}>
        {/* Handle */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.lockEmoji}>💎</Text>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Contenu Premium</Text>
            {moduleName && (
              <Text style={styles.headerSub}>{moduleName}</Text>
            )}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.pitch}>
          Débloquez l'accès complet à l'univers COSMOS et plongez dans les contenus les plus avancés.
        </Text>

        {/* Perks */}
        <View style={styles.perks}>
          {PERKS.map((perk, i) => (
            <View key={i} style={styles.perkRow}>
              <Text style={styles.perkIcon}>{perk.icon}</Text>
              <Text style={styles.perkText}>{perk.text}</Text>
            </View>
          ))}
        </View>

        {/* Prix */}
        <View style={styles.priceRow}>
          <Text style={styles.priceAmount}>4,99 €</Text>
          <Text style={styles.pricePer}> / mois</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>7 jours gratuits</Text>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.85}
          onPress={() => {
            onClose();
            // TODO : intégrer RevenueCat
          }}
        >
          <Text style={styles.ctaText}>Commencer l'essai gratuit →</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} style={styles.skipBtn}>
          <Text style={styles.skipText}>Pas maintenant</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1530',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: `${Colors.primary}30`,
    shadowColor: Colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: -8 },
    elevation: 20,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.glassBorder,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  lockEmoji: { fontSize: 36 },
  headerText: { flex: 1 },
  headerTitle: {
    fontFamily: Typography.fontFamily.cinzelBold,
    fontSize: Typography.fontSize.xl,
    color: Colors.onSurface,
  },
  headerSub: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
    letterSpacing: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { color: Colors.onSurfaceVariant, fontSize: 12 },
  pitch: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: 20,
  },
  perks: { gap: 12, marginBottom: 24 },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  perkIcon: { fontSize: 18, width: 28, textAlign: 'center' },
  perkText: {
    fontFamily: Typography.fontFamily.bodyMedium,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurface,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
    gap: 4,
  },
  priceAmount: {
    fontFamily: Typography.fontFamily.cinzelBold,
    fontSize: Typography.fontSize['3xl'],
    color: Colors.onSurface,
  },
  pricePer: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.base,
    color: Colors.onSurfaceVariant,
    flex: 1,
  },
  priceBadge: {
    backgroundColor: `${Colors.secondary}1A`,
    borderWidth: 1,
    borderColor: `${Colors.secondary}40`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  priceBadgeText: {
    fontFamily: Typography.fontFamily.label,
    fontSize: 9,
    color: Colors.secondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  ctaButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaText: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize.md,
    color: Colors.onPrimary,
    letterSpacing: 0.5,
  },
  skipBtn: { alignItems: 'center', paddingVertical: 8 },
  skipText: {
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurfaceVariant,
  },
});
