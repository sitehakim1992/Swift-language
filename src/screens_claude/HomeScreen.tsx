// Home Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { getRandomQuote, getRandomTip, challenges } from '../data/lessons';
import { MotivationalQuote } from '../types';
import Header from '../components/Header';

type TabParamList = {
  Home: undefined;
  Lessons: { level?: 'beginner' | 'intermediate' | 'advanced' } | undefined;
  Quiz: { lessonId?: string } | undefined;
  Statistics: undefined;
};

type HomeNavigationProp = BottomTabNavigationProp<TabParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { theme } = useTheme();
  const { progress, getTotalProgress, updateStreak } = useProgress();
  const [refreshing, setRefreshing] = useState(false);
  const [quote, setQuote] = useState<MotivationalQuote>(getRandomQuote());
  const [tip, setTip] = useState<string>(getRandomTip());

  useEffect(() => {
    updateStreak();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setQuote(getRandomQuote());
    setTip(getRandomTip());
    setTimeout(() => setRefreshing(false), 500);
  };

  const totalProgress = getTotalProgress();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="SwiftLearn"
        subtitle="Master Swift Programming"
        showThemeToggle
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={[styles.streakCard, { backgroundColor: theme.colors.primary + '15' }]}>
            <View style={styles.streakContent}>
              <Icon name="fire" size={32} color={theme.colors.primary} />
              <View style={styles.streakText}>
                <Text style={[styles.streakNumber, { color: theme.colors.primary }]}>
                  {progress.dailyStreakCount}
                </Text>
                <Text style={[styles.streakLabel, { color: theme.colors.textSecondary }]}>
                  Day Streak
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.pointsCard, { backgroundColor: theme.colors.secondary + '15' }]}>
            <View style={styles.streakContent}>
              <Icon name="star-circle" size={32} color={theme.colors.secondary} />
              <View style={styles.streakText}>
                <Text style={[styles.streakNumber, { color: theme.colors.secondary }]}>
                  {progress.totalPoints}
                </Text>
                <Text style={[styles.streakLabel, { color: theme.colors.textSecondary }]}>
                  Total Points
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Overall Progress */}
        <View style={[styles.overallCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <View style={styles.overallHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Overall Progress
            </Text>
            <Text style={[styles.progressPercent, { color: theme.colors.primary }]}>
              {totalProgress}%
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: theme.colors.primary,
                  width: `${totalProgress}%`,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressSubtext, { color: theme.colors.textSecondary }]}>
            {Math.round(totalProgress / 100 * 18)} of 18 lessons completed
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Actions
          </Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
              onPress={() => navigation.navigate('Lessons')}
            >
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.success + '20' }]}>
                <Icon name="book-open-variant" size={24} color={theme.colors.success} />
              </View>
              <Text style={[styles.actionTitle, { color: theme.colors.text }]}>Continue Learning</Text>
              <Text style={[styles.actionSubtitle, { color: theme.colors.textSecondary }]}>Start a lesson</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
              onPress={() => navigation.navigate('Quiz')}
            >
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.accent + '20' }]}>
                <Icon name="clipboard-check" size={24} color={theme.colors.accent} />
              </View>
              <Text style={[styles.actionTitle, { color: theme.colors.text }]}>Take a Quiz</Text>
              <Text style={[styles.actionSubtitle, { color: theme.colors.textSecondary }]}>Test your skills</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Tip */}
        <View style={[styles.tipCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <View style={styles.tipHeader}>
            <Icon name="lightbulb-on" size={24} color={theme.colors.warning} />
            <Text style={[styles.tipTitle, { color: theme.colors.text }]}>Daily Tip</Text>
          </View>
          <Text style={[styles.tipText, { color: theme.colors.textSecondary }]}>
            {tip}
          </Text>
        </View>

        {/* Motivation Card */}
        <View style={[styles.quoteCard, { backgroundColor: theme.colors.primary + '10' }]}>
          <Icon name="format-quote-open" size={28} color={theme.colors.primary} style={styles.quoteIcon} />
          <Text style={[styles.quoteText, { color: theme.colors.text }]}>
            "{quote.text}"
          </Text>
          <Text style={[styles.quoteAuthor, { color: theme.colors.textSecondary }]}>
            — {quote.author}
          </Text>
        </View>

        {/* Active Challenges */}
        <View style={styles.challengesSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Challenges</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Statistics')}>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          {challenges.filter(c => !progress.challengesCompleted.includes(c.id)).slice(0, 3).map((challenge) => (
            <View
              key={challenge.id}
              style={[styles.challengeCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
            >
              <View style={styles.challengeInfo}>
                <Text style={[styles.challengeTitle, { color: theme.colors.text }]}>{challenge.title}</Text>
                <Text style={[styles.challengeDesc, { color: theme.colors.textSecondary }]}>{challenge.description}</Text>
              </View>
              <View style={[styles.challengePoints, { backgroundColor: theme.colors.warning + '20' }]}>
                <Icon name="star" size={14} color={theme.colors.warning} />
                <Text style={[styles.challengePointsText, { color: theme.colors.warning }]}>{challenge.points}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  welcomeSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  streakCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  pointsCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    marginLeft: 12,
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: '700',
  },
  streakLabel: {
    fontSize: 12,
  },
  overallCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  overallHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressSubtext: {
    marginTop: 8,
    fontSize: 13,
  },
  actionsSection: {
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  tipCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  quoteCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  quoteIcon: {
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    textAlign: 'right',
  },
  challengesSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  challengeDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  challengePoints: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  challengePointsText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
});

export default HomeScreen;
