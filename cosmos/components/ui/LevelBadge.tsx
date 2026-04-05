// Badge de niveau utilisateur (Curieux / Passionné / Étudiant)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserLevel } from '@/types';
import { LEVEL_CONFIG } from '@/constants/themes';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface LevelBadgeProps {
  level: UserLevel;
  variant?: 'full' | 'compact';
}

export function LevelBadge({ level, variant = 'compact' }: LevelBadgeProps) {
  const config = LEVEL_CONFIG[level];

  if (variant === 'compact') {
    return (
      <View style={[styles.badge, { borderColor: config.color + '40', backgroundColor: config.color + '1A' }]}>
        <Text style={[styles.badgeText, { color: config.color }]}>
          {config.badge}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.fullBadge, { borderColor: config.color + '40', backgroundColor: config.color + '1A' }]}>
      <Text style={styles.emoji}>{config.emoji}</Text>
      <Text style={[styles.fullBadgeText, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  fullBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  emoji: {
    fontSize: 14,
  },
  fullBadgeText: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.sm,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
