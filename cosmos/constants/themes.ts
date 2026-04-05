// Données des thèmes astronomiques
import { Colors } from './colors';

export type UserLevel = 'curious' | 'passionate' | 'student';

export interface Theme {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export interface Module {
  id: string;
  themeId: string;
  title: string;
  slug: string;
  durationMinutes: number;
  isPremium: boolean;
  order: number;
  emoji: string;
}

export const THEMES: Theme[] = [
  {
    id: 'theme-1',
    slug: 'mecanique-celeste',
    title: 'Mécanique Céleste',
    description: 'Les lois qui gouvernent les mouvements des corps célestes',
    icon: '🪐',
    color: Colors.primary,
    order: 1,
  },
  {
    id: 'theme-2',
    slug: 'relativite',
    title: 'Relativité & Temps',
    description: 'Einstein et la révolution de notre compréhension du temps',
    icon: '⚡',
    color: Colors.secondary,
    order: 2,
  },
  {
    id: 'theme-3',
    slug: 'trous-noirs',
    title: 'Trous Noirs',
    description: 'Les singularités les plus extrêmes de l\'univers',
    icon: '🌑',
    color: Colors.tertiary,
    order: 3,
  },
  {
    id: 'theme-4',
    slug: 'ondes-gravitationnelles',
    title: 'Ondes Gravi.',
    description: 'Les rides de l\'espace-temps',
    icon: '〰️',
    color: Colors.primaryDim,
    order: 4,
  },
  {
    id: 'theme-5',
    slug: 'exoplanetes',
    title: 'Exoplanètes',
    description: 'Mondes au-delà de notre système solaire',
    icon: '🌍',
    color: Colors.tertiaryDim,
    order: 5,
  },
  {
    id: 'theme-6',
    slug: 'big-bang',
    title: 'Big Bang',
    description: 'L\'origine et l\'évolution de l\'univers',
    icon: '💥',
    color: Colors.error,
    order: 6,
  },
];

export const MODULES: Module[] = [
  {
    id: 'mod-1',
    themeId: 'theme-2',
    title: 'La Relativité Restreinte',
    slug: 'relativite-restreinte',
    durationMinutes: 12,
    isPremium: false,
    order: 1,
    emoji: '🪐',
  },
  {
    id: 'mod-2',
    themeId: 'theme-2',
    title: 'La Relativité Générale',
    slug: 'relativite-generale',
    durationMinutes: 18,
    isPremium: false,
    order: 2,
    emoji: '🌌',
  },
  {
    id: 'mod-3',
    themeId: 'theme-1',
    title: 'Les Lois de Kepler',
    slug: 'lois-kepler',
    durationMinutes: 10,
    isPremium: false,
    order: 1,
    emoji: '☀️',
  },
  {
    id: 'mod-4',
    themeId: 'theme-1',
    title: 'La Gravitation Universelle',
    slug: 'gravitation-universelle',
    durationMinutes: 15,
    isPremium: true,
    order: 2,
    emoji: '🍎',
  },
  {
    id: 'mod-5',
    themeId: 'theme-3',
    title: 'Naissance d\'un Trou Noir',
    slug: 'naissance-trou-noir',
    durationMinutes: 14,
    isPremium: false,
    order: 1,
    emoji: '⭐',
  },
  {
    id: 'mod-6',
    themeId: 'theme-3',
    title: 'L\'Horizon des Événements',
    slug: 'horizon-evenements',
    durationMinutes: 20,
    isPremium: true,
    order: 2,
    emoji: '🌑',
  },
];

// Libellés des niveaux utilisateur
export const LEVEL_CONFIG: Record<UserLevel, {
  label: string;
  badge: string;
  emoji: string;
  color: string;
  description: string;
}> = {
  curious: {
    label: 'Curieux',
    badge: 'DÉBUTANT',
    emoji: '🔭',
    color: Colors.secondary,
    description: 'Je découvre les constellations et les bases de l\'astronomie.',
  },
  passionate: {
    label: 'Passionné',
    badge: 'INTERMÉDIAIRE',
    emoji: '⚡',
    color: Colors.primary,
    description: 'Je connais le système solaire et je veux approfondir mes connaissances.',
  },
  student: {
    label: 'Étudiant',
    badge: 'AVANCÉ',
    emoji: '⚛️',
    color: Colors.error,
    description: 'Je maîtrise la physique stellaire et je cherche des défis complexes.',
  },
};
