// Carte d'analogie (bloc pédagogique avec citation et icône ampoule)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface AnalogyCardProps {
  quote: string;
  icon?: string;
}

export function AnalogyCard({ quote, icon = '💡' }: AnalogyCardProps) {
  return (
    <View style={styles.container}>
      {/* Bordure gauche colorée */}
      <View style={styles.border} />
      <View style={styles.content}>
        {/* Icône */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        {/* Citation */}
        <Text style={styles.quote}>"{quote}"</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: Colors.tertiary,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  border: {
    width: 4,
    backgroundColor: Colors.tertiary,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    padding: 20,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 219, 143, 0.1)',
    borderRadius: 10,
    padding: 8,
  },
  icon: {
    fontSize: 20,
  },
  quote: {
    flex: 1,
    fontFamily: Typography.fontFamily.bodyLight,
    fontSize: Typography.fontSize.sm,
    color: Colors.tertiaryDim,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
