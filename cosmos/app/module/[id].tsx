// Écran détail d'un module — contenu adaptatif par niveau
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { LevelSelector } from '@/components/module/LevelSelector';
import { FormulaBox } from '@/components/module/FormulaBox';
import { AnalogyCard } from '@/components/module/AnalogyCard';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { UserLevel, ContentBlock } from '@/types';
import { MODULES } from '@/constants/themes';
import { useUserLevel } from '@/hooks/useUserLevel';
import { supabase } from '@/lib/supabase';

// Contenu de démonstration (affiché si Supabase n'est pas connecté)
const DEMO_CONTENT: Record<UserLevel, ContentBlock[]> = {
  curious: [
    {
      type: 'text',
      title: 'Le Temps est Élastique',
      content:
        'Plus un objet se déplace vite, plus le temps s\'écoule lentement pour lui par rapport à un observateur immobile. C\'est ce qu\'on appelle la dilatation du temps.',
    },
    {
      type: 'analogy',
      quote:
        'Imaginez deux jumeaux. L\'un voyage vers les étoiles à une vitesse proche de la lumière tandis que l\'autre reste sur Terre. Au retour du voyageur, il sera bien plus jeune que son frère.',
      icon: '👨‍👦',
    },
    {
      type: 'formula',
      formula: 'E = mc²',
      label: 'Équivalence masse-énergie',
    },
    {
      type: 'text',
      title: 'La Limite Ultime',
      content:
        'Rien ne peut dépasser la vitesse de la lumière (c ≈ 300 000 km/s). À mesure qu\'un objet approche cette vitesse, sa masse apparente augmente vers l\'infini.',
    },
    { type: 'quiz_teaser', title: 'Prêt pour le test ?', subtitle: 'Tester ta compréhension' },
  ],
  passionate: [
    {
      type: 'text',
      title: 'La Dilatation du Temps',
      content:
        'La relativité restreinte prédit que le temps s\'écoule plus lentement pour un observateur en mouvement. Ce phénomène a été confirmé par des horloges atomiques à bord d\'avions.',
    },
    {
      type: 'formula',
      formula: "t' = t/√(1−v²/c²)",
      label: 'Facteur de Lorentz (γ)',
    },
    {
      type: 'analogy',
      quote:
        'Les muons créés à 10 km d\'altitude survivent jusqu\'au sol malgré leur durée de vie de 2,2 μs. Leur temps est dilaté par un facteur ~22.',
      icon: '⚛️',
    },
    { type: 'quiz_teaser', title: 'Prêt pour le test ?', subtitle: 'Valider ta compréhension' },
  ],
  student: [
    {
      type: 'text',
      title: 'Le Tenseur Métrique de Minkowski',
      content:
        'La relativité restreinte se formule dans l\'espace-temps de Minkowski, un espace pseudo-riemannien à 4 dimensions avec signature (−,+,+,+).',
    },
    {
      type: 'formula',
      formula: 'ds² = −c²dt² + dx² + dy² + dz²',
      label: 'Intervalle espace-temps',
    },
    {
      type: 'analogy',
      quote:
        'Le paradoxe des jumeaux se résout en reconnaissant l\'asymétrie : le jumeau voyageur subit une accélération lors du demi-tour, brisant la symétrie apparente.',
      icon: '⚛️',
    },
    { type: 'quiz_teaser', title: 'Défi Étudiant', subtitle: 'Démontrer ta maîtrise' },
  ],
};

export default function ModuleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { level: userLevel } = useUserLevel();
  const [activeLevel, setActiveLevel] = useState<UserLevel>(userLevel);
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);

  const module = MODULES.find((m) => m.id === id) ?? MODULES[0];

  useEffect(() => {
    setActiveLevel(userLevel);
  }, [userLevel]);

  useEffect(() => {
    loadContent(activeLevel);
  }, [activeLevel, id]);

  async function loadContent(level: UserLevel) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('module_content')
        .select('content_json')
        .eq('module_id', id)
        .eq('level', level)
        .single();

      if (data?.content_json) {
        setContent(data.content_json as ContentBlock[]);
      } else {
        // Fallback démo
        setContent(DEMO_CONTENT[level]);
      }
    } catch {
      setContent(DEMO_CONTENT[level]);
    } finally {
      setLoading(false);
    }
  }

  function renderBlock(block: ContentBlock, index: number) {
    switch (block.type) {
      case 'text':
        return (
          <View key={index} style={styles.textCard}>
            {block.title && <Text style={styles.textCardTitle}>{block.title}</Text>}
            <Text style={styles.textCardBody}>{block.content}</Text>
          </View>
        );

      case 'formula':
        return <FormulaBox key={index} formula={block.formula} label={block.label} />;

      case 'analogy':
        return <AnalogyCard key={index} quote={block.quote} icon={block.icon} />;

      case 'quiz_teaser':
        return (
          <TouchableOpacity key={index} style={styles.quizTeaser} activeOpacity={0.85}>
            <View style={styles.quizDecor}>
              <Text style={styles.quizDecorText}>🧠</Text>
            </View>
            <View style={styles.quizContent}>
              <Text style={styles.quizTitle}>{block.title}</Text>
              <Text style={styles.quizSubtitle}>{block.subtitle}</Text>
            </View>
            <View style={styles.quizPlayButton}>
              <Text style={styles.quizPlayIcon}>▶</Text>
            </View>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header navigation */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>COSMOS</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroBg} />
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>🪐</Text>
            <Text style={styles.heroMeta}>✦ RELATIVITÉ · EINSTEIN · 1905</Text>
            <Text style={styles.heroTitle}>{module.title}</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Sélecteur de niveau */}
          <LevelSelector selectedLevel={activeLevel} onLevelChange={setActiveLevel} />

          {/* Contenu */}
          {loading ? (
            <ActivityIndicator color={Colors.primary} size="large" style={{ marginTop: 40 }} />
          ) : (
            <View style={styles.contentBlocks}>
              {content.map((block, index) => renderBlock(block, index))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Décorations */}
      <View style={styles.decoPurple} />
      <View style={styles.decoCyan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: Colors.overlayLight,
  },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  backIcon: { color: `${Colors.primary}B0`, fontSize: 22 },
  logoText: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.xl, color: Colors.primary },
  hero: {
    height: 220,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    overflow: 'hidden',
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(199, 153, 255, 0.04)',
  },
  heroContent: { alignItems: 'center', gap: 8 },
  heroEmoji: { fontSize: 64, marginBottom: 4 },
  heroMeta: {
    fontFamily: Typography.fontFamily.label,
    fontSize: Typography.fontSize.xs,
    color: Colors.secondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: Typography.fontFamily.headline,
    fontSize: Typography.fontSize['3xl'] - 2,
    color: Colors.onSurface,
    textAlign: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, gap: 20, paddingBottom: 60 },
  contentBlocks: { gap: 18, marginTop: 8 },
  textCard: {
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: 16,
    padding: 20,
    gap: 10,
  },
  textCardTitle: {
    fontFamily: Typography.fontFamily.headlineMedium,
    fontSize: Typography.fontSize.lg,
    color: Colors.primary,
  },
  textCardBody: {
    fontFamily: Typography.fontFamily.bodyLight,
    fontSize: Typography.fontSize.sm,
    color: Colors.onSurfaceVariant,
    lineHeight: 22,
  },
  quizTeaser: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}1A`,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
    borderRadius: 24,
    padding: 20,
    gap: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  quizDecor: { position: 'absolute', right: -10, bottom: -10, opacity: 0.1 },
  quizDecorText: { fontSize: 80 },
  quizContent: { flex: 1 },
  quizTitle: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.xl, color: Colors.onSurface },
  quizSubtitle: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.xs, color: Colors.primaryFixedDim, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 },
  quizPlayButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  quizPlayIcon: { color: Colors.onPrimary, fontSize: 18, marginLeft: 2 },
  decoPurple: { position: 'absolute', top: '25%', right: -80, width: 200, height: 200, borderRadius: 100, backgroundColor: Colors.primary, opacity: 0.05 },
  decoCyan: { position: 'absolute', bottom: '25%', left: -80, width: 160, height: 160, borderRadius: 80, backgroundColor: Colors.secondary, opacity: 0.04 },
});
