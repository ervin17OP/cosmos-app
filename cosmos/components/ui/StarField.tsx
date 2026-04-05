// Composant d'arrière-plan avec champ d'étoiles animé
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: Animated.Value;
  delay: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 0.5,
    opacity: new Animated.Value(Math.random() * 0.6 + 0.1),
    delay: Math.random() * 3000,
  }));
}

const STARS = generateStars(80);

export function StarField() {
  const animations = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    // Animation de scintillement pour chaque étoile
    animations.current = STARS.map((star) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(star.delay),
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.3 + 0.05,
            duration: 1500 + Math.random() * 2000,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.6 + 0.2,
            duration: 1500 + Math.random() * 2000,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.current.forEach((anim) => anim.start());

    return () => {
      animations.current.forEach((anim) => anim.stop());
    };
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {STARS.map((star, i) => (
        <Animated.View
          key={i}
          style={[
            styles.star,
            {
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
      {/* Halos nébuleux d'ambiance */}
      <View style={styles.nebulaPurple} />
      <View style={styles.nebulaCyan} />
    </View>
  );
}

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    backgroundColor: Colors.onSurface,
  },
  nebulaPurple: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.primary,
    opacity: 0.04,
    // blur simulé via borderRadius large
  },
  nebulaCyan: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: Colors.secondary,
    opacity: 0.03,
  },
});
