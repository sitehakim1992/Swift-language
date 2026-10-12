// Quiz Screen — Redesigned
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { getLessonsByLevel, getQuizQuestionsForLesson } from '../data/lessons';
import { QuizQuestion } from '../types';
import Header from '../components/Header';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

type RootTabParamList = {
  Home: undefined;
  Lessons: { level?: 'beginner' | 'intermediate' | 'advanced' } | undefined;
  Quiz: { lessonId?: string } | undefined;
  Statistics: undefined;
};

type NavigationProp = BottomTabNavigationProp<RootTabParamList>;

// ضع هنا Ad Unit ID الخاص بإعلان "إنهاء الكويز" (منفصل عن إعلان إكمال الدرس)
const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-6551659254419770/8105375162';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const D = {
  bg: '#0A0E1A',
  card: '#141B2D',
  cardBorder: '#1E2A45',
  indigo: '#6366F1',
  indigoDim: 'rgba(99,102,241,0.15)',
  gold: '#F59E0B',
  goldDim: 'rgba(245,158,11,0.13)',
  emerald: '#10B981',
  emeraldDim: 'rgba(16,185,129,0.15)',
  rose: '#F43F5E',
  roseDim: 'rgba(244,63,94,0.15)',
  orange: '#F97316',
  orangeDim: 'rgba(249,115,22,0.13)',
  violet: '#8B5CF6',
  violetDim: 'rgba(139,92,246,0.13)',
  textPrimary: '#F1F5F9',
  textSecondary: '#64748B',
};

const LEVELS = [
  { key: 'beginner' as const,     label: 'Beginner',     color: D.emerald, dim: D.emeraldDim },
  { key: 'intermediate' as const, label: 'Intermediate', color: D.orange,  dim: D.orangeDim  },
  { key: 'advanced' as const,     label: 'Advanced',     color: D.rose,    dim: D.roseDim    },
];

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const QuizScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { progress, saveQuizResult } = useProgress();
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [adLoaded, setAdLoaded] = useState(false);

  const lessons = getLessonsByLevel(selectedLevel);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
      },
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setAdLoaded(false);
        interstitial.load(); // إعادة تحضير إعلان جديد
      },
    );

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const handleStartQuiz = (lessonId: string) => {
    const qs = getQuizQuestionsForLesson(lessonId);
    if (qs.length === 0) {
      Alert.alert('No Quiz', 'No quiz questions available for this lesson yet.');
      return;
    }
    setSelectedLesson(lessonId);
    setQuestions(qs);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    setAnsweredQuestions(prev => [...prev, currentQuestion]);
  };

  const isCorrectAnswer = (qIdx: number): boolean => {
    if (selectedAnswer === null) return false;
    return selectedAnswer === questions[qIdx].correctAnswer;
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const finalScore = isCorrectAnswer(currentQuestion) ? score : score;
      Alert.alert(
        '🎉 Quiz Completed!',
        `You scored ${finalScore} out of ${questions.length}!`,
        [
          {
            text: 'Try Again',
            onPress: () => {
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setScore(0);
              setAnsweredQuestions([]);
            },
          },
          {
            text: 'Back to Quizzes',
            onPress: () => { setQuizStarted(false); setSelectedLesson(null); },
          },
        ]
      );
    }
  };

  const handleFinishQuiz = async () => {
    if (selectedLesson) {
      await saveQuizResult({
        lessonId: selectedLesson,
        score,
        totalQuestions: questions.length,
        completedAt: new Date().toISOString(),
      });
    }
    // الإعلان يظهر بعد انتهاء المستخدم من الكويز، أي بعد نقطة انتقال طبيعية
    if (adLoaded) {
      interstitial.show();
    }
    setQuizStarted(false);
    setSelectedLesson(null);
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? { bg: D.indigoDim, border: D.indigo }
        : { bg: D.card, border: D.cardBorder };
    }
    if (index === questions[currentQuestion].correctAnswer) {
      return { bg: D.emeraldDim, border: D.emerald };
    }
    if (selectedAnswer === index) {
      return { bg: D.roseDim, border: D.rose };
    }
    return { bg: D.card, border: D.cardBorder };
  };

  // ─── Quiz Selection View ───────────────────────────────────────────
  if (!quizStarted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header title="Quizzes" subtitle="Test your knowledge" showThemeToggle />

        {/* Level Tabs */}
        <View style={styles.levelTabs}>
          {LEVELS.map((lvl) => {
            const isSelected = selectedLevel === lvl.key;
            return (
              <TouchableOpacity
                key={lvl.key}
                style={[
                  styles.levelTab,
                  { borderColor: isSelected ? lvl.color + '60' : 'transparent' },
                  isSelected && { backgroundColor: lvl.dim },
                ]}
                onPress={() => setSelectedLevel(lvl.key)}
                activeOpacity={0.75}
              >
                <Text style={[styles.levelTabText, { color: isSelected ? lvl.color : D.textSecondary }]}>
                  {lvl.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView style={styles.lessonList} showsVerticalScrollIndicator={false}>
          <Text style={styles.listHeading}>Select a lesson to quiz:</Text>

          {lessons.map((lesson) => {
            const qs = getQuizQuestionsForLesson(lesson.id);
            const hasQuestions = qs.length > 0;
            const isCompleted = progress[selectedLevel].completedLessons.includes(lesson.id);
            const levelConf = LEVELS.find(l => l.key === selectedLevel)!;

            return (
              <TouchableOpacity
                key={lesson.id}
                style={[
                  styles.lessonCard,
                  { backgroundColor: D.card, borderColor: D.cardBorder },
                  !hasQuestions && { opacity: 0.5 },
                ]}
                onPress={() => hasQuestions && handleStartQuiz(lesson.id)}
                activeOpacity={hasQuestions ? 0.75 : 1}
              >
                <View style={[styles.lessonCardStripe, { backgroundColor: hasQuestions ? levelConf.color : D.cardBorder }]} />
                <View style={styles.lessonCardBody}>
                  <View style={styles.lessonCardTop}>
                    <Text style={styles.lessonCardTitle}>{lesson.title}</Text>
                    {isCompleted && (
                      <View style={[styles.doneBadge, { backgroundColor: D.emeraldDim }]}>
                        <Icon name="check" size={10} color={D.emerald} />
                      </View>
                    )}
                  </View>
                  <Text style={styles.lessonCardSub}>
                    {hasQuestions ? `${qs.length} questions` : 'No quiz available'}
                  </Text>
                </View>
                {hasQuestions && (
                  <View style={[styles.playBtn, { backgroundColor: levelConf.color + '20', borderColor: levelConf.color + '50' }]}>
                    <Icon name="play" size={16} color={levelConf.color} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  // ─── Active Quiz View ─────────────────────────────────────────────
  const question = questions[currentQuestion];
  const progressPct = ((currentQuestion + 1) / questions.length) * 100;
  const isLast = currentQuestion === questions.length - 1;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="Quiz"
        subtitle={`Question ${currentQuestion + 1} of ${questions.length}`}
        showBack
        onBack={() => {
          Alert.alert('Exit Quiz?', 'Your progress will be lost.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => setQuizStarted(false), style: 'destructive' },
          ]);
        }}
      />

      {/* Progress Bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressDots}>
          {questions.map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressDot,
                i < currentQuestion && { backgroundColor: D.emerald, width: 8, height: 8 },
                i === currentQuestion && { backgroundColor: D.indigo, width: 24 },
                i > currentQuestion && { backgroundColor: 'rgba(255,255,255,0.1)' },
              ]}
            />
          ))}
        </View>
        <Text style={styles.progressPct}>{Math.round(progressPct)}%</Text>
      </View>

      {/* Score chip */}
      <View style={styles.scoreChipRow}>
        <View style={[styles.scoreChip, { backgroundColor: D.goldDim, borderColor: D.gold + '40' }]}>
          <Icon name="star" size={13} color={D.gold} />
          <Text style={[styles.scoreChipText, { color: D.gold }]}>{score} correct</Text>
        </View>
      </View>

      <ScrollView style={styles.quizScroll} showsVerticalScrollIndicator={false}>

        {/* Question Card */}
        <View style={[styles.questionCard, { backgroundColor: D.card, borderColor: D.cardBorder }]}>
          <View style={[styles.questionNumBadge, { backgroundColor: D.indigoDim }]}>
            <Text style={[styles.questionNumText, { color: D.indigo }]}>Q{currentQuestion + 1}</Text>
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsWrap}>
          {question.options.map((option, index) => {
            const optStyle = getOptionStyle(index);
            const isCorrect = showResult && index === question.correctAnswer;
            const isWrong = showResult && selectedAnswer === index && index !== question.correctAnswer;

            return (
              <TouchableOpacity
                key={index}
                style={[styles.optionCard, { backgroundColor: optStyle.bg, borderColor: optStyle.border }]}
                onPress={() => handleAnswerSelect(index)}
                disabled={showResult}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.optionLetter,
                  { backgroundColor: isCorrect ? D.emerald + '30' : isWrong ? D.rose + '30' : 'rgba(255,255,255,0.06)' },
                ]}>
                  <Text style={[
                    styles.optionLetterText,
                    { color: isCorrect ? D.emerald : isWrong ? D.rose : D.textSecondary },
                  ]}>
                    {OPTION_LETTERS[index]}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: isCorrect ? D.emerald : isWrong ? D.rose : D.textPrimary }]}>
                  {option}
                </Text>
                {isCorrect && <Icon name="check-circle" size={20} color={D.emerald} />}
                {isWrong && <Icon name="close-circle" size={20} color={D.rose} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation */}
        {showResult && (
          <View style={[styles.explanationCard, { backgroundColor: D.goldDim, borderColor: D.gold + '40' }]}>
            <View style={styles.explanationHeader}>
              <View style={[styles.explanationIcon, { backgroundColor: D.gold + '25' }]}>
                <Icon name="lightbulb-on" size={16} color={D.gold} />
              </View>
              <Text style={[styles.explanationTitle, { color: D.gold }]}>Explanation</Text>
            </View>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}

        {/* Next / Finish */}
        {showResult && (
          <TouchableOpacity
            style={[styles.nextBtn, { backgroundColor: isLast ? D.emerald : D.indigo }]}
            onPress={isLast ? handleFinishQuiz : handleNextQuestion}
            activeOpacity={0.85}
          >
            <Text style={styles.nextBtnText}>{isLast ? 'Finish Quiz' : 'Next Question'}</Text>
            <Icon name={isLast ? 'check' : 'arrow-right'} size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Level tabs
  levelTabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  levelTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  levelTabText: {
    fontSize: 13,
    fontWeight: '700',
  },

  // Lesson list
  lessonList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  listHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: D.textSecondary,
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  lessonCardStripe: {
    width: 3,
    alignSelf: 'stretch',
  },
  lessonCardBody: {
    flex: 1,
    padding: 14,
  },
  lessonCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  lessonCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: D.textPrimary,
    flex: 1,
  },
  doneBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonCardSub: {
    fontSize: 12,
    color: D.textSecondary,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
  },

  // Quiz progress
  progressWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
    gap: 12,
  },
  progressDots: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
    width: 8,
  },
  progressPct: {
    fontSize: 13,
    fontWeight: '700',
    color: D.textSecondary,
  },
  scoreChipRow: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  scoreChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  scoreChipText: {
    fontSize: 13,
    fontWeight: '700',
  },

  // Question
  quizScroll: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  questionNumBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  questionNumText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '700',
    color: D.textPrimary,
    lineHeight: 26,
    letterSpacing: -0.3,
  },

  // Options
  optionsWrap: { gap: 10, marginBottom: 16 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 14,
    borderWidth: 2,
    gap: 12,
  },
  optionLetter: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: '800',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },

  // Explanation
  explanationCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  explanationIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  explanationText: {
    fontSize: 13,
    lineHeight: 21,
    color: D.textSecondary,
  },

  // Next / Finish button
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 18,
    marginBottom: 48,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.2,
  },
});

export default QuizScreen;