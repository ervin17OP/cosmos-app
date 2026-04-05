// Types TypeScript globaux pour COSMOS

export type UserLevel = 'curious' | 'passionate' | 'student';

// Profil utilisateur (Supabase: users_profiles)
export interface UserProfile {
  id: string;
  username: string;
  level: UserLevel;
  xp: number;
  streakDays: number;
  createdAt: string;
}

// Thème astronomique (Supabase: themes)
export interface Theme {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

// Module de cours (Supabase: modules)
export interface Module {
  id: string;
  themeId: string;
  title: string;
  slug: string;
  durationMinutes: number;
  isPremium: boolean;
  order: number;
}

// Bloc de contenu dans module_content.content_json
export type ContentBlockType = 'text' | 'analogy' | 'formula' | 'quiz_teaser' | 'image';

export interface TextBlock {
  type: 'text';
  title?: string;
  content: string;
  highlight?: string; // mot à mettre en valeur
}

export interface AnalogyBlock {
  type: 'analogy';
  quote: string;
  icon?: string;
}

export interface FormulaBlock {
  type: 'formula';
  formula: string;
  label: string;
}

export interface QuizTeaserBlock {
  type: 'quiz_teaser';
  title: string;
  subtitle: string;
}

export interface ImageBlock {
  type: 'image';
  url: string;
  caption?: string;
}

export type ContentBlock = TextBlock | AnalogyBlock | FormulaBlock | QuizTeaserBlock | ImageBlock;

// Contenu d'un module pour un niveau donné (Supabase: module_content)
export interface ModuleContent {
  id: string;
  moduleId: string;
  level: UserLevel;
  contentJson: ContentBlock[];
}

// Progression utilisateur (Supabase: user_progress)
export interface UserProgress {
  id: string;
  userId: string;
  moduleId: string;
  completed: boolean;
  score: number;
  completedAt: string | null;
}

// Badge de progression
export interface Badge {
  id: string;
  slug: string;
  title: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

// Statistiques de progression
export interface ProgressStats {
  modulesCompleted: number;
  streakDays: number;
  badgesEarned: number;
  xp: number;
  themeProgress: ThemeProgress[];
}

export interface ThemeProgress {
  themeId: string;
  themeTitle: string;
  percentage: number;
}

// Réponse Auth Supabase
export interface AuthResponse {
  user: UserProfile | null;
  error: string | null;
}

// Navigation params
export type RootStackParamList = {
  '(tabs)': undefined;
  '(auth)/login': undefined;
  '(auth)/register': undefined;
  'onboarding/index': undefined;
  'onboarding/level': undefined;
  'module/[id]': { id: string };
};
