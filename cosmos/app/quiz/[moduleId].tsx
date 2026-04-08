// Écran Quiz — questions adaptatives par niveau avec scoring et XP
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarField } from '@/components/ui/StarField';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { UserLevel } from '@/types';
import { supabase } from '@/lib/supabase';
import { useUserLevel } from '@/hooks/useUserLevel';
import { addXP } from '@/lib/supabase';

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const XP_PER_CORRECT = 50;

export default function QuizScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const router = useRouter();
  const { level } = useUserLevel();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [savingResult, setSavingResult] = useState(false);

  // Animation feedback réponse
  const feedbackOpacity = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadQuestions();
  }, [moduleId, level]);

  useEffect(() => {
    if (questions.length > 0) {
      Animated.timing(progressAnim, {
        toValue: (current + 1) / questions.length,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [current, questions.length]);

  async function loadQuestions() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('id, question, options, answer, explanation')
        .eq('module_id', moduleId)
        .eq('level', level as UserLevel)
        .order('order');

      if (error) throw error;

      if (data && data.length > 0) {
        setQuestions(data.map((q) => ({
          id: q.id,
          question: q.question,
          options: q.options as string[],
          answer: q.answer,
          explanation: q.explanation,
        })));
      }
    } catch {
      console.warn('[Quiz] Erreur chargement questions');
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(index: number) {
    if (confirmed) return;
    setSelected(index);
  }

  function handleConfirm() {
    if (selected === null) return;
    setConfirmed(true);

    const isCorrect = selected === questions[current].answer;
    if (isCorrect) setScore((s) => s + 1);

    // Animation feedback
    Animated.sequence([
      Animated.timing(feedbackOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
      feedbackOpacity.setValue(0);
    } else {
      finishQuiz();
    }
  }

  async function finishQuiz() {
    setFinished(true);
    setSavingResult(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const xpEarned = score * XP_PER_CORRECT;

      // Sauvegarder la progression
      await supabase.from('user_progress').upsert({
        user_id: user.id,
        module_id: moduleId,
        completed: score === questions.length,
        score,
        completed_at: new Date().toISOString(),
      }, { onConflict: 'user_id,module_id' });

      // Attribuer les XP
      if (xpEarned > 0) {
        await addXP(user.id, xpEarned);
      }
    } catch (error) {
      console.warn('[Quiz] Erreur sauvegarde:', error);
    } finally {
      setSavingResult(false);
    }
  }

  const q = questions[current];
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const xpEarned = score * XP_PER_CORRECT;

  // ── Résultats ──────────────────────────────────────────────
  if (finished) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <StarField />
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.resultContent} showsVerticalScrollIndicator={false}>
            {/* Médaille */}
            <View style={styles.medalWrapper}>
              <View style={[styles.medal, { borderColor: percentage >= 80 ? Colors.secondary : percentage >= 50 ? Colors.primary : Colors.error }]}>
                <Text style={styles.medalEmoji}>
                  {percentage === 100 ? '🏆' : percentage >= 80 ? '🥇' : percentage >= 50 ? '🥈' : '🥉'}
                </Text>
                <Text style={[styles.medalScore, { color: percentage >= 80 ? Colors.secondary : percentage >= 50 ? Colors.primary : Colors.error }]}>
                  {score}/{questions.length}
                </Text>
                <Text style={styles.medalLabel}>
                  {percentage === 100 ? 'Parfait !' : percentage >= 80 ? 'Excellent !' : percentage >= 50 ? 'Bien joué !' : 'Continue !'}
                </Text>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.resultStats}>
              <View style={styles.resultStat}>
                <Text style={styles.resultStatValue}>{percentage}%</Text>
                <Text style={styles.resultStatLabel}>Score</Text>
              </View>
              <View style={styles.resultStat}>
                <Text style={[styles.resultStatValue, { color: Colors.tertiary }]}>+{xpEarned}</Text>
                <Text style={styles.resultStatLabel}>XP gagnés</Text>
              </View>
              <View style={styles.resultStat}>
                <Text style={styles.resultStatValue}>{score}</Text>
                <Text style={styles.resultStatLabel}>Bonnes réponses</Text>
              </View>
            </View>

            {savingResult && (
              <ActivityIndicator color={Colors.primary} style={{ marginBottom: 16 }} />
            )}

            {/* Actions */}
            <View style={styles.resultActions}>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => {
                  setCurrent(0);
                  setSelected(null);
                  setConfirmed(false);
                  setScore(0);
                  setFinished(false);
                  feedbackOpacity.setValue(0);
                  progressAnim.setValue(0);
                }}
              >
                <Text style={styles.retryButtonText}>Recommencer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Text style={styles.backButtonText}>Retour au module</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  // ── Loading ────────────────────────────────────────────────
  if (loading || questions.length === 0) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <StarField />
        {loading ? (
          <ActivityIndicator color={Colors.primary} size="large" />
        ) : (
          <>
            <Text style={styles.noQuestionsText}>Pas encore de questions pour ce niveau.</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  // ── Question ───────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <StarField />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerLabel}>Question {current + 1}/{questions.length}</Text>
          <Text style={styles.headerScore}>⭐ {score * XP_PER_CORRECT} XP</Text>
        </View>

        {/* Barre de progression */}
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }]}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.questionContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Question */}
          <View style={styles.questionCard}>
            <Text style={styles.questionNumber}>Q{current + 1}</Text>
            <Text style={styles.questionText}>{q.question}</Text>
          </View>

          {/* Options */}
          <View style={styles.options}>
            {q.options.map((option, index) => {
              let optionStyle = styles.option;
              let textStyle = styles.optionText;

              if (confirmed) {
                if (index === q.answer) {
                  optionStyle = { ...styles.option, ...styles.optionCorrect } as any;
                  textStyle = { ...styles.optionText, color: Colors.background } as any;
                } else if (index === selected) {
                  optionStyle = { ...styles.option, ...styles.optionWrong } as any;
                  textStyle = { ...styles.optionText, color: Colors.background } as any;
                }
              } else if (selected === index) {
                optionStyle = { ...styles.option, ...styles.optionSelected } as any;
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={optionStyle}
                  onPress={() => handleSelect(index)}
                  activeOpacity={confirmed ? 1 : 0.7}
                >
                  <View style={styles.optionLetter}>
                    <Text style={styles.optionLetterText}>
                      {['A', 'B', 'C', 'D'][index]}
                    </Text>
                  </View>
                  <Text style={textStyle}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Feedback explication */}
          {confirmed && (
            <Animated.View style={[styles.explanation, { opacity: feedbackOpacity }]}>
              <Text style={styles.explanationIcon}>
                {selected === q.answer ? '✓' : '✗'}
              </Text>
              <Text style={styles.explanationText}>{q.explanation}</Text>
            </Animated.View>
          )}
        </ScrollView>

        {/* Footer CTA */}
        <View style={styles.footer}>
          {!confirmed ? (
            <TouchableOpacity
              style={[styles.confirmButton, selected === null && styles.confirmButtonDisabled]}
              onPress={handleConfirm}
              disabled={selected === null}
              activeOpacity={0.85}
            >
              <Text style={styles.confirmButtonText}>Valider</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
              <Text style={styles.nextButtonText}>
                {current < questions.length - 1 ? 'Question suivante →' : 'Voir mes résultats →'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  closeButton: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: Colors.glassBorder, alignItems: 'center', justifyContent: 'center' },
  closeIcon: { color: Colors.onSurfaceVariant, fontSize: 14 },
  headerLabel: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.xs, color: Colors.onSurfaceVariant, letterSpacing: 2, textTransform: 'uppercase' },
  headerScore: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.sm, color: Colors.tertiary },
  progressTrack: { height: 4, backgroundColor: Colors.surfaceContainerHighest, marginHorizontal: 20, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 2 },
  questionContent: { padding: 20, gap: 20, paddingBottom: 120 },
  questionCard: { backgroundColor: Colors.glass, borderWidth: 1, borderColor: Colors.glassBorder, borderRadius: 20, padding: 24, gap: 12 },
  questionNumber: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.xs, color: Colors.primary, letterSpacing: 2, textTransform: 'uppercase' },
  questionText: { fontFamily: Typography.fontFamily.headlineMedium, fontSize: Typography.fontSize.lg, color: Colors.onSurface, lineHeight: 28 },
  options: { gap: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: 16,
    padding: 16,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}15`,
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  optionCorrect: { backgroundColor: Colors.secondary, borderColor: Colors.secondary },
  optionWrong: { backgroundColor: Colors.error, borderColor: Colors.error },
  optionLetter: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center' },
  optionLetterText: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.xs, color: Colors.onSurface },
  optionText: { flex: 1, fontFamily: Typography.fontFamily.body, fontSize: Typography.fontSize.base, color: Colors.onSurface, lineHeight: 20 },
  explanation: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  explanationIcon: { fontSize: 20 },
  explanationText: { flex: 1, fontFamily: Typography.fontFamily.bodyLight, fontSize: Typography.fontSize.sm, color: Colors.onSurfaceVariant, lineHeight: 20 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: Colors.background },
  confirmButton: { height: 56, backgroundColor: Colors.primary, borderRadius: 18, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.primary, shadowOpacity: 0.35, shadowRadius: 20, elevation: 8 },
  confirmButtonDisabled: { opacity: 0.4 },
  confirmButtonText: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.md, color: Colors.onPrimary },
  nextButton: { height: 56, backgroundColor: Colors.secondary, borderRadius: 18, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.secondary, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6 },
  nextButtonText: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.md, color: Colors.background },
  // Résultats
  resultContent: { padding: 24, gap: 32, alignItems: 'center', paddingTop: 60 },
  medalWrapper: { alignItems: 'center' },
  medal: { width: 180, height: 180, borderRadius: 90, borderWidth: 3, backgroundColor: Colors.glass, alignItems: 'center', justifyContent: 'center', gap: 8, shadowColor: Colors.primary, shadowOpacity: 0.2, shadowRadius: 40, elevation: 10 },
  medalEmoji: { fontSize: 52 },
  medalScore: { fontFamily: Typography.fontFamily.cinzelBold, fontSize: Typography.fontSize['2xl'] },
  medalLabel: { fontFamily: Typography.fontFamily.label, fontSize: Typography.fontSize.xs, color: Colors.onSurfaceVariant, letterSpacing: 2, textTransform: 'uppercase' },
  resultStats: { flexDirection: 'row', gap: 16, width: '100%' },
  resultStat: { flex: 1, backgroundColor: Colors.surfaceContainerLow, borderRadius: 16, padding: 16, alignItems: 'center', gap: 6, borderWidth: 1, borderColor: Colors.glassBorder },
  resultStatValue: { fontFamily: Typography.fontFamily.cinzel, fontSize: Typography.fontSize['2xl'], color: Colors.onSurface },
  resultStatLabel: { fontFamily: Typography.fontFamily.label, fontSize: 9, color: Colors.onSurfaceVariant, textTransform: 'uppercase', textAlign: 'center' },
  resultActions: { width: '100%', gap: 12 },
  retryButton: { height: 56, backgroundColor: Colors.primary, borderRadius: 18, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.primary, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6 },
  retryButtonText: { fontFamily: Typography.fontFamily.headline, fontSize: Typography.fontSize.md, color: Colors.onPrimary },
  backButton: { height: 50, borderRadius: 16, borderWidth: 1, borderColor: `${Colors.primary}40`, alignItems: 'center', justifyContent: 'center' },
  backButtonText: { fontFamily: Typography.fontFamily.bodyMedium, fontSize: Typography.fontSize.base, color: Colors.primary },
  noQuestionsText: { fontFamily: Typography.fontFamily.body, fontSize: Typography.fontSize.base, color: Colors.onSurfaceVariant, textAlign: 'center', marginBottom: 24 },
});
