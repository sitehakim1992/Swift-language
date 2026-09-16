// Quiz Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { getLessonsByLevel, quizQuestions, getQuizQuestionsForLesson } from '../data/lessons';
import { QuizQuestion } from '../types';
import Header from '../components/Header';
import Button from '../components/Button';

type RootTabParamList = {
  Home: undefined;
  Lessons: { level?: 'beginner' | 'intermediate' | 'advanced' } | undefined;
  Quiz: { lessonId?: string } | undefined;
  Statistics: undefined;
};

type NavigationProp = BottomTabNavigationProp<RootTabParamList>;

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
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const levels = [
    { key: 'beginner' as const, label: 'Beginner', color: '#4CAF50' },
    { key: 'intermediate' as const, label: 'Intermediate', color: '#FF9800' },
    { key: 'advanced' as const, label: 'Advanced', color: '#F44336' },
  ];

  const lessons = getLessonsByLevel(selectedLevel);

  const handleStartQuiz = (lessonId: string) => {
    const questions = getQuizQuestionsForLesson(lessonId);
    if (questions.length === 0) {
      Alert.alert('No Quiz', 'No quiz questions available for this lesson yet.');
      return;
    }
    setSelectedLesson(lessonId);
    setQuizQuestions(questions);
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

    const question = quizQuestions[currentQuestion];
    const isCorrect = index === question.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnsweredQuestions(prev => [...prev, currentQuestion]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      const finalScore = isCorrectAnswer(currentQuestion) ? score + 1 : score;
      Alert.alert(
        '🎉 Quiz Completed!',
        `You scored ${finalScore} out of ${quizQuestions.length}!`,
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
            onPress: () => {
              setQuizStarted(false);
              setSelectedLesson(null);
            },
          },
        ]
      );
    }
  };

  const isCorrectAnswer = (questionIndex: number): boolean => {
    if (selectedAnswer === null) return false;
    return selectedAnswer === quizQuestions[questionIndex].correctAnswer;
  };

  const handleFinishQuiz = async () => {
    if (selectedLesson) {
      await saveQuizResult({
        lessonId: selectedLesson,
        score: score,
        totalQuestions: quizQuestions.length,
        completedAt: new Date().toISOString(),
      });
    }
    setQuizStarted(false);
    setSelectedLesson(null);
  };

  const getAnswerStyle = (index: number) => {
    if (!showResult) {
      return {
        backgroundColor: selectedAnswer === index ? theme.colors.primary + '20' : theme.colors.cardBackground,
        borderColor: selectedAnswer === index ? theme.colors.primary : theme.colors.border,
      };
    }

    if (index === quizQuestions[currentQuestion].correctAnswer) {
      return {
        backgroundColor: theme.colors.success + '20',
        borderColor: theme.colors.success,
      };
    }

    if (selectedAnswer === index && index !== quizQuestions[currentQuestion].correctAnswer) {
      return {
        backgroundColor: theme.colors.error + '20',
        borderColor: theme.colors.error,
      };
    }

    return {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.border,
    };
  };

  // Quiz Selection View
  if (!quizStarted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header title="Quizzes" subtitle="Test your knowledge" showThemeToggle />

        {/* Level Selector */}
        <View style={[styles.levelSelector, { backgroundColor: theme.colors.surface }]}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.levelTab,
                selectedLevel === level.key && { backgroundColor: level.color + '20' },
              ]}
              onPress={() => setSelectedLevel(level.key)}
            >
              <Text
                style={[
                  styles.levelLabel,
                  { color: selectedLevel === level.key ? level.color : theme.colors.textSecondary },
                ]}
              >
                {level.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lessons for Quiz */}
        <ScrollView style={styles.lessonsList} showsVerticalScrollIndicator={false}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Select a lesson to start quiz:
          </Text>
          {lessons.map((lesson) => {
            const questions = getQuizQuestionsForLesson(lesson.id);
            const hasQuestions = questions.length > 0;
            const isCompleted = progress[selectedLevel].completedLessons.includes(lesson.id);

            return (
              <TouchableOpacity
                key={lesson.id}
                style={[
                  styles.lessonCard,
                  { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border },
                ]}
                onPress={() => hasQuestions && handleStartQuiz(lesson.id)}
                activeOpacity={hasQuestions ? 0.7 : 1}
              >
                <View style={styles.lessonInfo}>
                  <View style={styles.lessonHeader}>
                    <Text style={[styles.lessonTitle, { color: theme.colors.text }]}>
                      {lesson.title}
                    </Text>
                    {isCompleted && (
                      <View style={[styles.completedBadge, { backgroundColor: theme.colors.success + '20' }]}>
                        <Icon name="check" size={12} color={theme.colors.success} />
                      </View>
                    )}
                  </View>
                  <Text style={[styles.lessonDesc, { color: theme.colors.textSecondary }]}>
                    {hasQuestions ? `${questions.length} questions` : 'No quiz available'}
                  </Text>
                </View>
                {hasQuestions && (
                  <Icon name="play-circle" size={28} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  // Quiz Active View
  const question = quizQuestions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="Quiz"
        subtitle={`Question ${currentQuestion + 1} of ${quizQuestions.length}`}
        showBack
        onBack={() => {
          Alert.alert(
            'Exit Quiz?',
            'Your progress will be lost.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Exit', onPress: () => setQuizStarted(false), style: 'destructive' },
            ]
          );
        }}
      />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: theme.colors.primary, width: `${progressPercent}%` },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>
          {Math.round(progressPercent)}%
        </Text>
      </View>

      <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <View style={[styles.questionCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <Text style={[styles.questionText, { color: theme.colors.text }]}>
            {question.question}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionCard, getAnswerStyle(index)]}
              onPress={() => handleAnswerSelect(index)}
              disabled={showResult}
              activeOpacity={0.7}
            >
              <View style={[styles.optionLetter, { backgroundColor: theme.colors.border + '50' }]}>
                <Text style={[styles.optionLetterText, { color: theme.colors.text }]}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                {option}
              </Text>
              {showResult && index === question.correctAnswer && (
                <Icon name="check-circle" size={24} color={theme.colors.success} />
              )}
              {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                <Icon name="close-circle" size={24} color={theme.colors.error} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Explanation */}
        {showResult && (
          <View style={[styles.explanationCard, { backgroundColor: theme.colors.accent + '10', borderColor: theme.colors.accent }]}>
            <View style={styles.explanationHeader}>
              <Icon name="lightbulb-outline" size={20} color={theme.colors.accent} />
              <Text style={[styles.explanationTitle, { color: theme.colors.accent }]}>Explanation</Text>
            </View>
            <Text style={[styles.explanationText, { color: theme.colors.text }]}>
              {question.explanation}
            </Text>
          </View>
        )}

        {/* Next Button */}
        {showResult && (
          <Button
            title={currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            onPress={currentQuestion < quizQuestions.length - 1 ? handleNextQuestion : handleFinishQuiz}
            icon={currentQuestion < quizQuestions.length - 1 ? 'arrow-right' : 'check'}
            fullWidth
            style={styles.nextButton}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  levelSelector: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 4,
  },
  levelTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  levelLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  lessonsList: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  completedBadge: {
    marginLeft: 8,
    padding: 2,
    borderRadius: 10,
  },
  lessonDesc: {
    fontSize: 13,
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  questionContainer: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
  },
  optionLetter: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontSize: 16,
    fontWeight: '700',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  explanationCard: {
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  nextButton: {
    marginTop: 24,
    marginBottom: 40,
  },
});

export default QuizScreen;
