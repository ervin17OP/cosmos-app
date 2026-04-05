// Barre de progression XP animée
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface XPBarProps {
  xp: number;
  xpToNext: number;
  rankLabel: string;
  nextRank: string;
}

export function XPBar({ xp, xpToNext, rankLabel, nextRank }: XPBarProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const percentage = Math.min(xp / (xp + xpToNext), 1);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.rankLabel}>Progression Stellaire</Text>
          <Text style={styles.rankName}>{rankLabel}</Text>
        </View>
        <Text style={styles.xpValue}>{xp} XP</Text>
      </View>

      {/* Barre de progression */}
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: widthInterpolated }]}>
          {/* Tête lumineuse */}
          <View style={styles.glowHead} />
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>PROCHAIN RANG: {nextRank}</Text>
        <Text style={styles.footerText}>{xpToNext} XP RESTANTS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  rankLabel: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.tertiaryFixed,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  rankName: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize.lg,
    color: Colors.onSurface,
  },
  xpValue: {
    fontFamily: Typography.fontFamily.mono,
    fontSize: Typography.fontSize.sm,
    color: Colors.secondaryFixed,
  },
  track: {
    height: 8,
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    // Dégradé simulé via une seule couleur (LinearGradient nécessite un wrapper séparé)
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  glowHead: {
    width: 8,
    height: '100%',
    backgroundColor: Colors.onSurface,
    opacity: 0.6,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerText: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
  },
});
