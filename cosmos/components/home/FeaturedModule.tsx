// Carte "Module du jour" mise en avant sur l'accueil
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Module } from '@/types';

interface FeaturedModuleProps {
  module: Module & { emoji: string };
}

export function FeaturedModule({ module }: FeaturedModuleProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/module/${module.id}`)}
      activeOpacity={0.85}
    >
      {/* Fond dégradé */}
      <View style={styles.background} />

      {/* Planète flottante */}
      <View style={styles.planetContainer}>
        <Text style={styles.planet}>{module.emoji}</Text>
      </View>

      {/* Contenu */}
      <View style={styles.content}>
        {/* Badge module du jour */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Module du jour</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{module.title}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>⏱ {module.durationMinutes} Min</Text>
            <Text style={styles.metaText}>📶 Intermédiaire</Text>
          </View>
        </View>
      </View>

      {/* Bouton Play */}
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => router.push(`/module/${module.id}`)}
      >
        <Text style={styles.playIcon}>▶</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a1231',
  },
  planetContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 28,
    zIndex: 10,
  },
  planet: {
    fontSize: 64,
  },
  content: {
    position: 'absolute',
    inset: 0,
    padding: 20,
    justifyContent: 'space-between',
    zIndex: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(38, 254, 220, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(38, 254, 220, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: 9,
    color: Colors.secondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  info: {
    gap: 6,
  },
  title: {
    fontFamily: Typography.fontFamily.cinzel,
    fontSize: Typography.fontSize['2xl'],
    color: Colors.onSurface,
    maxWidth: 200,
    lineHeight: 30,
  },
  meta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaText: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  playButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
    shadowColor: Colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  playIcon: {
    color: Colors.onPrimary,
    fontSize: 18,
    marginLeft: 2,
  },
});
