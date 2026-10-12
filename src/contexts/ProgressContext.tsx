// Progress Context for SwiftLearn App
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, LevelProgress, QuizResult, Challenge } from '../types';
import { challenges } from '../data/lessons';

interface ProgressContextType {
  progress: UserProgress;
  isLoading: boolean;
  markLessonComplete: (lessonId: string) => Promise<void>;
  saveQuizResult: (result: QuizResult) => Promise<void>;
  updateStreak: () => Promise<void>;
  completeChallenge: (challengeId: string) => Promise<void>;
  addPoints: (points: number) => Promise<void>;
  resetProgress: () => Promise<void>;
  getLevelProgress: (level: 'beginner' | 'intermediate' | 'advanced') => LevelProgress;
  getTotalProgress: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const PROGRESS_STORAGE_KEY = '@SwiftLearn:progress';

const initialProgress: UserProgress = {
  beginner: {
    level: 'beginner',
    completedLessons: [],
    quizScore: null,
    quizAttempts: 0,
  },
  intermediate: {
    level: 'intermediate',
    completedLessons: [],
    quizScore: null,
    quizAttempts: 0,
  },
  advanced: {
    level: 'advanced',
    completedLessons: [],
    quizScore: null,
    quizAttempts: 0,
  },
  streak: 0,
  lastActiveDate: '',
  totalPoints: 0,
  challengesCompleted: [],
  dailyStreakCount: 0,
};

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setProgress(parsed);

        // Check if it's a new day for streak
        const today = new Date().toDateString();
        const lastActive = parsed.lastActiveDate;

        if (lastActive !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toDateString();

          if (lastActive === yesterdayStr) {
            // Continue streak
            setProgress(prev => ({
              ...prev,
              dailyStreakCount: prev.dailyStreakCount + 1,
              streak: prev.streak + 1,
              lastActiveDate: today,
            }));
          } else if (lastActive !== today) {
            // Reset streak
            setProgress(prev => ({
              ...prev,
              dailyStreakCount: 1,
              streak: 1,
              lastActiveDate: today,
            }));
          }
        }
      } else {
        const today = new Date().toDateString();
        setProgress(prev => ({
          ...prev,
          lastActiveDate: today,
          dailyStreakCount: 1,
          streak: 1,
        }));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (newProgress: UserProgress) => {
    try {
      await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(newProgress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const markLessonComplete = useCallback(async (lessonId: string) => {
    const level = lessonId.split('-')[0] as 'beginner' | 'intermediate' | 'advanced';

    setProgress(prev => {
      const levelProgress = prev[level];
      if (levelProgress.completedLessons.includes(lessonId)) {
        return prev;
      }

      const newProgress = {
        ...prev,
        [level]: {
          ...levelProgress,
          completedLessons: [...levelProgress.completedLessons, lessonId],
        },
        totalPoints: prev.totalPoints + 10, // 10 points per lesson
      };

      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  const saveQuizResult = useCallback(async (result: QuizResult) => {
    const level = result.lessonId.split('-')[0] as 'beginner' | 'intermediate' | 'advanced';
    const percentage = (result.score / result.totalQuestions) * 100;

    setProgress(prev => {
      const levelProgress = prev[level];
      const newScore = levelProgress.quizScore === null
        ? percentage
        : Math.max(levelProgress.quizScore, percentage);

      const pointsEarned = Math.round(percentage / 10); // Points based on score

      const newProgress = {
        ...prev,
        [level]: {
          ...levelProgress,
          quizScore: newScore,
          quizAttempts: levelProgress.quizAttempts + 1,
        },
        totalPoints: prev.totalPoints + pointsEarned,
      };

      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  const updateStreak = useCallback(async () => {
    const today = new Date().toDateString();

    setProgress(prev => {
      if (prev.lastActiveDate === today) {
        return prev;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      let newStreak = 1;
      if (prev.lastActiveDate === yesterdayStr) {
        newStreak = prev.dailyStreakCount + 1;
      }

      const newProgress = {
        ...prev,
        dailyStreakCount: newStreak,
        streak: prev.streak + 1,
        lastActiveDate: today,
      };

      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  const completeChallenge = useCallback(async (challengeId: string) => {
    setProgress(prev => {
      if (prev.challengesCompleted.includes(challengeId)) {
        return prev;
      }

      const challenge = challenges.find(c => c.id === challengeId);
      const points = challenge?.points || 0;

      const newProgress = {
        ...prev,
        challengesCompleted: [...prev.challengesCompleted, challengeId],
        totalPoints: prev.totalPoints + points,
      };

      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  const addPoints = useCallback(async (points: number) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        totalPoints: prev.totalPoints + points,
      };

      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  const resetProgress = useCallback(async () => {
    const today = new Date().toDateString();
    setProgress({
      ...initialProgress,
      lastActiveDate: today,
      dailyStreakCount: 1,
      streak: 1,
    });
    await AsyncStorage.removeItem(PROGRESS_STORAGE_KEY);
  }, []);

  const getLevelProgress = useCallback((level: 'beginner' | 'intermediate' | 'advanced'): LevelProgress => {
    return progress[level];
  }, [progress]);

  const getTotalProgress = useCallback((): number => {
    const beginnerCount = progress.beginner.completedLessons.length;
    const intermediateCount = progress.intermediate.completedLessons.length;
    const advancedCount = progress.advanced.completedLessons.length;
    const total = beginnerCount + intermediateCount + advancedCount;
    const totalLessons = 18; // 6 lessons per level
    return Math.round((total / totalLessons) * 100);
  }, [progress]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isLoading,
        markLessonComplete,
        saveQuizResult,
        updateStreak,
        completeChallenge,
        addPoints,
        resetProgress,
        getLevelProgress,
        getTotalProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
