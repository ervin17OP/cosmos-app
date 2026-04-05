// Sélecteur d'onglets de niveau dans la page module
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserLevel } from '@/types';
import { LEVEL_CONFIG } from '@/constants/themes';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface LevelSelectorProps {
  selectedLevel: UserLevel;
  onLevelChange: (level: UserLevel) => void;
}

const LEVELS: UserLevel[] = ['curious', 'passionate', 'student'];

export function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  return (
    <View style={styles.container}>
      {LEVELS.map((level) => {
        const config = LEVEL_CONFIG[level];
        const isActive = selectedLevel === level;
        return (
          <TouchableOpacity
            key={level}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onLevelChange(level)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{config.emoji}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: 999,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 999,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  emoji: {
    fontSize: 12,
  },
  label: {
    fontFamily: Typography.fontFamily.label,
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  labelActive: {
    color: Colors.onPrimaryContainer,
  },
});
