// Type definitions for SwiftLearn App

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample: string;
  explanation: string;
  tips: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  order: number;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  lessonId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface LevelProgress {
  level: 'beginner' | 'intermediate' | 'advanced';
  completedLessons: string[];
  quizScore: number | null;
  quizAttempts: number;
}

export interface UserProgress {
  beginner: LevelProgress;
  intermediate: LevelProgress;
  advanced: LevelProgress;
  streak: number;
  lastActiveDate: string;
  totalPoints: number;
  challengesCompleted: string[];
  dailyStreakCount: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  points: number;
  completed: boolean;
  deadline?: string;
}

export interface MotivationalQuote {
  text: string;
  author: string;
}

export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  codeBackground: string;
  codeKeyword: string;
  codeString: string;
  codeComment: string;
  codeFunction: string;
  codeNumber: string;
  border: string;
  cardBackground: string;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
}
