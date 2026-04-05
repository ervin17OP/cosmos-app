// Puce de thème dans la liste horizontale de l'accueil
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Theme } from '@/types';

interface ThemeChipProps {
  theme: Theme;
  active?: boolean;
  onPress?: () => void;
}

export function ThemeChip({ theme, active = false, onPress }: ThemeChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Indicateur coloré */}
      <View
        style={[
          styles.dot,
          {
            backgroundColor: theme.color,
            shadowColor: theme.color,
          },
        ]}
      />
      <Text style={[styles.label, !active && styles.labelMuted]}>
        {theme.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    opacity: 0.6,
  },
  chipActive: {
    opacity: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  label: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurface,
    letterSpacing: 0.5,
  },
  labelMuted: {
    color: Colors.onSurfaceVariant,
  },
});
