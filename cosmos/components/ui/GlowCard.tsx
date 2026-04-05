// Carte avec effet lumineux (glassmorphisme + halo coloré)
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: string;
  style?: ViewStyle;
  selected?: boolean;
}

export function GlowCard({
  children,
  glowColor = Colors.primary,
  style,
  selected = false,
}: GlowCardProps) {
  return (
    <View
      style={[
        styles.card,
        selected && {
          borderColor: glowColor,
          shadowColor: glowColor,
          shadowOpacity: 0.45,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 0 },
          elevation: 12,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: 24,
    overflow: 'hidden',
  },
});
