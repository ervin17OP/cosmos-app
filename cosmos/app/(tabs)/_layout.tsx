// Layout des onglets principaux — tab bar avec animations Reanimated
import React from 'react';
import { Tabs } from 'expo-router';
import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface TabIconProps {
  focused: boolean;
  label: string;
  emoji: string;
}

function TabIcon({ focused, label, emoji }: TabIconProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => { scale.value = withSpring(0.82, { damping: 12, stiffness: 200 }); }}
      onPressOut={() => { scale.value = withSpring(1,    { damping: 12, stiffness: 200 }); }}
      style={styles.pressable}
    >
      <Animated.View style={[styles.tabItem, animStyle]}>
        {/* Indicateur actif */}
        {focused && <View style={styles.activeDot} />}
        <Text style={[styles.tabEmoji, focused && styles.tabEmojiFocused]}>{emoji}</Text>
        <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(15, 13, 24, 0.92)',
          borderTopWidth: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          position: 'absolute',
          shadowColor: Colors.primary,
          shadowOpacity: 0.18,
          shadowRadius: 28,
          shadowOffset: { width: 0, height: -8 },
          elevation: 20,
        },
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: `${Colors.primary}60`,
        tabBarShowLabel: false,
        tabBarButton: (props) => <Pressable {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Accueil" emoji="🏠" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Explorer" emoji="🔭" />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Progrès" emoji="📈" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Profil" emoji="👤" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  pressable: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingTop: 4,
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    top: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.secondary,
  },
  tabEmoji: {
    fontSize: 22,
    opacity: 0.4,
  },
  tabEmojiFocused: {
    opacity: 1,
  },
  tabLabel: {
    fontFamily: Typography.fontFamily.label,
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: `${Colors.primary}60`,
  },
  tabLabelFocused: {
    color: Colors.secondary,
  },
});
