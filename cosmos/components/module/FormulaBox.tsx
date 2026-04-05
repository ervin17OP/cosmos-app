// Boîte d'affichage de formule scientifique (style terminal)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface FormulaBoxProps {
  formula: string;
  label: string;
}

export function FormulaBox({ formula, label }: FormulaBoxProps) {
  return (
    <View style={styles.wrapper}>
      {/* Halo d'arrière-plan */}
      <View style={styles.glow} />
      <View style={styles.container}>
        <Text style={styles.formula}>{formula}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    inset: -2,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    opacity: 0.08,
  },
  container: {
    backgroundColor: 'rgba(0, 107, 91, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(38, 254, 220, 0.3)',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  formula: {
    fontFamily: Typography.fontFamily.mono,
    fontSize: Typography.fontSize['3xl'],
    color: Colors.secondary,
    letterSpacing: 4,
    textShadowColor: Colors.secondary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  label: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: 'rgba(38, 254, 220, 0.7)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 8,
  },
});
