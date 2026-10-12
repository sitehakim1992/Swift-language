// Statistics Screen
import React, { useState } from 'react';
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
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { getLessonsByLevel, challenges, motivationalQuotes } from '../data/lessons';
import Header from '../components/Header';
import Button from '../components/Button';

const StatisticsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { progress, getTotalProgress, resetProgress } = useProgress();
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'achievements'>('overview');

  const totalLessons = 18;
  const completedLessons =
    progress.beginner.completedLessons.length +
    progress.intermediate.completedLessons.length +
    progress.advanced.completedLessons.length;

  const totalQuizAttempts =
    progress.beginner.quizAttempts +
    progress.intermediate.quizAttempts +
    progress.advanced.quizAttempts;

  const averageQuizScore = (() => {
    const scores = [
      progress.beginner.quizScore,
      progress.intermediate.quizScore,
      progress.advanced.quizScore,
    ].filter(s => s !== null) as number[];
    return scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
  })();

  const totalProgress = getTotalProgress();

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetProgress();
            Alert.alert('Success', 'Your progress has been reset.');
          },
        },
      ]
    );
  };

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <Icon name="fire" size={28} color={theme.colors.primary} />
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>{progress.dailyStreakCount}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Day Streak</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <Icon name="star-circle" size={28} color={theme.colors.secondary} />
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>{progress.totalPoints}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Total Points</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <Icon name="book-check" size={28} color={theme.colors.success} />
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>{completedLessons}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Lessons Done</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <Icon name="clipboard-check" size={28} color={theme.colors.accent} />
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>{totalQuizAttempts}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Quiz Attempts</Text>
        </View>
      </View>

      {/* Progress by Level */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Progress by Level</Text>
        {[
          { level: 'beginner', color: '#4CAF50', label: 'Beginner' },
          { level: 'intermediate', color: '#FF9800', label: 'Intermediate' },
          { level: 'advanced', color: '#F44336', label: 'Advanced' },
        ].map((item) => {
          const levelProgress = progress[item.level as keyof typeof progress];
          const total = getLessonsByLevel(item.level as any).length;
          const completed = levelProgress.completedLessons.length;
          const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <View key={item.level} style={[styles.levelCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
              <View style={styles.levelHeader}>
                <View style={[styles.levelIcon, { backgroundColor: item.color + '20' }]}>
                  <Text style={[styles.levelIconText, { color: item.color }]}>
                    {item.label[0]}
                  </Text>
                </View>
                <View style={styles.levelInfo}>
                  <Text style={[styles.levelTitle, { color: theme.colors.text }]}>{item.label}</Text>
                  <Text style={[styles.levelSubtitle, { color: theme.colors.textSecondary }]}>
                    {completed}/{total} lessons
                  </Text>
                </View>
                <Text style={[styles.levelPercent, { color: item.color }]}>{percentage}%</Text>
              </View>
              <View style={[styles.levelProgressBar, { backgroundColor: theme.colors.border }]}>
                <View
                  style={[
                    styles.levelProgressFill,
                    { backgroundColor: item.color, width: `${percentage}%` },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* Quiz Performance */}
      <View style={[styles.quizPerfCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Quiz Performance</Text>
        <View style={styles.quizStats}>
          <View style={styles.quizStatItem}>
            <Text style={[styles.quizStatNumber, { color: averageQuizScore >= 70 ? theme.colors.success : theme.colors.warning }]}>
              {averageQuizScore}%
            </Text>
            <Text style={[styles.quizStatLabel, { color: theme.colors.textSecondary }]}>Avg Score</Text>
          </View>
          <View style={styles.quizDivider} />
          <View style={styles.quizStatItem}>
            <Text style={[styles.quizStatNumber, { color: theme.colors.primary }]}>
              {progress.beginner.quizScore !== null ? Math.round(progress.beginner.quizScore) : 0}%
            </Text>
            <Text style={[styles.quizStatLabel, { color: theme.colors.textSecondary }]}>Beginner</Text>
          </View>
          <View style={styles.quizDivider} />
          <View style={styles.quizStatItem}>
            <Text style={[styles.quizStatNumber, { color: theme.colors.primary }]}>
              {progress.intermediate.quizScore !== null ? Math.round(progress.intermediate.quizScore) : 0}%
            </Text>
            <Text style={[styles.quizStatLabel, { color: theme.colors.textSecondary }]}>Inter.</Text>
          </View>
          <View style={styles.quizDivider} />
          <View style={styles.quizStatItem}>
            <Text style={[styles.quizStatNumber, { color: theme.colors.primary }]}>
              {progress.advanced.quizScore !== null ? Math.round(progress.advanced.quizScore) : 0}%
            </Text>
            <Text style={[styles.quizStatLabel, { color: theme.colors.textSecondary }]}>Advanced</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderChallengesTab = () => (
    <View style={styles.tabContent}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Active Challenges</Text>
      {challenges.map((challenge) => {
        const isCompleted = progress.challengesCompleted.includes(challenge.id);
        const challengeLevel = challenge.type === 'daily' ? theme.colors.success : challenge.type === 'weekly' ? theme.colors.warning : theme.colors.primary;

        return (
          <View
            key={challenge.id}
            style={[
              styles.challengeCard,
              { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border },
              isCompleted && { opacity: 0.6 },
            ]}
          >
            <View style={styles.challengeInfo}>
              <View style={styles.challengeHeader}>
                <View style={[styles.challengeTypeBadge, { backgroundColor: challengeLevel + '20' }]}>
                  <Text style={[styles.challengeTypeText, { color: challengeLevel }]}>
                    {challenge.type.toUpperCase()}
                  </Text>
                </View>
                {isCompleted && (
                  <View style={[styles.completedBadge, { backgroundColor: theme.colors.success + '20' }]}>
                    <Icon name="check" size={14} color={theme.colors.success} />
                    <Text style={[styles.completedText, { color: theme.colors.success }]}>Completed</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.challengeTitle, { color: theme.colors.text }]}>{challenge.title}</Text>
              <Text style={[styles.challengeDesc, { color: theme.colors.textSecondary }]}>
                {challenge.description}
              </Text>
              <View style={styles.challengeMeta}>
                <Icon name="star" size={16} color={theme.colors.warning} />
                <Text style={[styles.challengePoints, { color: theme.colors.warning }]}>
                  {challenge.points} points
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderAchievementsTab = () => {
    const achievements = [
      {
        id: 'first_lesson',
        title: 'First Steps',
        description: 'Complete your first lesson',
        icon: 'shoe-print',
        unlocked: completedLessons >= 1,
        points: 50,
      },
      {
        id: 'quiz_master',
        title: 'Quiz Master',
        description: 'Score 100% on a quiz',
        icon: 'certificate',
        unlocked: averageQuizScore === 100,
        points: 200,
      },
      {
        id: 'streak_7',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: 'fire',
        unlocked: progress.dailyStreakCount >= 7,
        points: 300,
      },
      {
        id: 'all_beginner',
        title: 'Beginner Complete',
        description: 'Complete all beginner lessons',
        icon: 'sprout',
        unlocked: progress.beginner.completedLessons.length >= 6,
        points: 100,
      },
      {
        id: 'all_intermediate',
        title: 'Rising Developer',
        description: 'Complete all intermediate lessons',
        icon: 'tree',
        unlocked: progress.intermediate.completedLessons.length >= 6,
        points: 150,
      },
      {
        id: 'all_advanced',
        title: 'Swift Expert',
        description: 'Complete all advanced lessons',
        icon: 'tree-of-knowledge',
        unlocked: progress.advanced.completedLessons.length >= 6,
        points: 200,
      },
      {
        id: 'points_500',
        title: 'Point Collector',
        description: 'Earn 500 total points',
        icon: 'star-circle',
        unlocked: progress.totalPoints >= 500,
        points: 100,
      },
      {
        id: 'perfect_streak',
        title: 'Perfect Score',
        description: 'Get 100% on any quiz',
        icon: 'trophy',
        unlocked: averageQuizScore === 100,
        points: 150,
      },
    ];

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
      <View style={styles.tabContent}>
        <View style={styles.achievementHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Achievements</Text>
          <Text style={[styles.achievementCount, { color: theme.colors.primary }]}>
            {unlockedCount}/{achievements.length}
          </Text>
        </View>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border },
                !achievement.unlocked && styles.achievementLocked,
              ]}
            >
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.unlocked ? theme.colors.primary + '20' : theme.colors.border + '30' },
                ]}
              >
                <Icon
                  name={achievement.icon}
                  size={24}
                  color={achievement.unlocked ? theme.colors.primary : theme.colors.textSecondary}
                />
              </View>
              <Text
                style={[
                  styles.achievementTitle,
                  { color: achievement.unlocked ? theme.colors.text : theme.colors.textSecondary },
                ]}
                numberOfLines={1}
              >
                {achievement.title}
              </Text>
              <Text
                style={[styles.achievementDesc, { color: theme.colors.textSecondary }]}
                numberOfLines={2}
              >
                {achievement.description}
              </Text>
              <View style={styles.achievementFooter}>
                <Icon name="star" size={12} color={theme.colors.warning} />
                <Text style={[styles.achievementPoints, { color: theme.colors.warning }]}>
                  {achievement.points}
                </Text>
                {achievement.unlocked ? (
                  <Icon name="check-circle" size={14} color={theme.colors.success} />
                ) : (
                  <Icon name="lock" size={14} color={theme.colors.textSecondary} />
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Statistics" subtitle="Track your progress" showThemeToggle />

      {/* Tab Selector */}
      <View style={[styles.tabSelector, { backgroundColor: theme.colors.surface }]}>
        {[
          { key: 'overview', label: 'Overview', icon: 'chart-pie' },
          { key: 'challenges', label: 'Challenges', icon: 'flag' },
          { key: 'achievements', label: 'Achievements', icon: 'trophy' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              activeTab === tab.key && { backgroundColor: theme.colors.primary + '20' },
            ]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Icon
              name={tab.icon}
              size={18}
              color={activeTab === tab.key ? theme.colors.primary : theme.colors.textSecondary}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: activeTab === tab.key ? theme.colors.primary : theme.colors.textSecondary },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'challenges' && renderChallengesTab()}
        {activeTab === 'achievements' && renderAchievementsTab()}

        {/* Reset Button */}
        <Button
          title="Reset All Progress"
          onPress={handleResetProgress}
          variant="outline"
          icon="refresh"
          fullWidth
          style={styles.resetButton}
          textStyle={{ color: theme.colors.error }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabSelector: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 6,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
    paddingBottom: 100,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '47%',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  levelCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelIconText: {
    fontSize: 18,
    fontWeight: '700',
  },
  levelInfo: {
    flex: 1,
    marginLeft: 12,
  },
  levelTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  levelSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  levelPercent: {
    fontSize: 20,
    fontWeight: '700',
  },
  levelProgressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  quizPerfCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  quizStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  quizStatItem: {
    alignItems: 'center',
  },
  quizStatNumber: {
    fontSize: 24,
    fontWeight: '700',
  },
  quizStatLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  quizDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  challengeCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  challengeInfo: {},
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  challengeTypeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  completedText: {
    fontSize: 10,
    fontWeight: '600',
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  challengeDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  challengeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  challengePoints: {
    fontSize: 13,
    fontWeight: '600',
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementCount: {
    fontSize: 18,
    fontWeight: '700',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  achievementFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  achievementPoints: {
    fontSize: 12,
    fontWeight: '600',
  },
  resetButton: {
    marginTop: 24,
    marginBottom: 40,
    borderColor: '#F44336',
  },
});

export default StatisticsScreen;
