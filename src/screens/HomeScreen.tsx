// Home Screen — Redesigned
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
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
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

// ضع هنا Ad Unit ID الخاص بشاشة Home في هذا التطبيق (منفصل عن أي تطبيق آخر)
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6551659254419770/6001956007';

// Design tokens
const D = {
  bg: '#0A0E1A',
  surface: '#111827',
  card: '#141B2D',
  cardBorder: '#1E2A45',
  indigo: '#6366F1',
  indigoDim: 'rgba(99,102,241,0.15)',
  gold: '#F59E0B',
  goldDim: 'rgba(245,158,11,0.15)',
  emerald: '#10B981',
  emeraldDim: 'rgba(16,185,129,0.12)',
  violet: '#8B5CF6',
  violetDim: 'rgba(139,92,246,0.12)',
  rose: '#F43F5E',
  textPrimary: '#F1F5F9',
  textSecondary: '#64748B',
  textMuted: '#334155',
  radius: 20,
  radiusSm: 12,
};

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
    <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
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
            tintColor={D.indigo}
          />
        }
      >
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statPill, { backgroundColor: D.indigoDim, borderColor: D.indigo + '40' }]}>
            <View style={styles.statPillIcon}>
              <Icon name="fire" size={18} color={D.gold} />
            </View>
            <View>
              <Text style={styles.statPillNumber}>{progress.dailyStreakCount}</Text>
              <Text style={styles.statPillLabel}>Day Streak</Text>
            </View>
          </View>

          <View style={[styles.statPill, { backgroundColor: D.goldDim, borderColor: D.gold + '40' }]}>
            <View style={[styles.statPillIcon, { backgroundColor: D.gold + '20' }]}>
              <Icon name="star-four-points" size={18} color={D.gold} />
            </View>
            <View>
              <Text style={[styles.statPillNumber, { color: D.gold }]}>{progress.totalPoints}</Text>
              <Text style={styles.statPillLabel}>Total Points</Text>
            </View>
          </View>
        </View>

        {/* Overall Progress Card */}
        <View style={[styles.progressCard, { backgroundColor: D.card, borderColor: D.cardBorder }]}>
          <View style={styles.progressCardHeader}>
            <View>
              <Text style={styles.progressCardTitle}>Overall Progress</Text>
              <Text style={styles.progressCardSub}>
                {Math.round(totalProgress / 100 * 18)} of 18 lessons
              </Text>
            </View>
            <View style={styles.progressRing}>
              <Text style={[styles.progressRingNum, { color: D.indigo }]}>{totalProgress}%</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${totalProgress}%` },
              ]}
            />
          </View>
          <View style={styles.levelDots}>
            {['Beginner', 'Intermediate', 'Advanced'].map((lvl, i) => (
              <View key={lvl} style={styles.levelDot}>
                <View style={[styles.dotCircle, { backgroundColor: i === 0 ? D.emerald : i === 1 ? D.gold : D.rose }]} />
                <Text style={styles.dotLabel}>{lvl}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionLabel}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: D.emeraldDim, borderColor: D.emerald + '30' }]}
            onPress={() => navigation.navigate('Lessons')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrap, { backgroundColor: D.emerald + '25' }]}>
              <Icon name="book-open-variant" size={22} color={D.emerald} />
            </View>
            <Text style={[styles.actionCardTitle, { color: D.emerald }]}>Continue</Text>
            <Text style={styles.actionCardSub}>Learning</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: D.violetDim, borderColor: D.violet + '30' }]}
            onPress={() => navigation.navigate('Quiz')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrap, { backgroundColor: D.violet + '25' }]}>
              <Icon name="clipboard-check" size={22} color={D.violet} />
            </View>
            <Text style={[styles.actionCardTitle, { color: D.violet }]}>Take a</Text>
            <Text style={styles.actionCardSub}>Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: D.goldDim, borderColor: D.gold + '30' }]}
            onPress={() => navigation.navigate('Statistics')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrap, { backgroundColor: D.gold + '25' }]}>
              <Icon name="chart-line" size={22} color={D.gold} />
            </View>
            <Text style={[styles.actionCardTitle, { color: D.gold }]}>My</Text>
            <Text style={styles.actionCardSub}>Statistics</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Tip */}
        <View style={[styles.tipCard, { backgroundColor: D.card, borderColor: D.cardBorder }]}>
          <View style={styles.tipHeader}>
            <View style={[styles.tipIconWrap, { backgroundColor: D.gold + '20' }]}>
              <Icon name="lightbulb-on" size={18} color={D.gold} />
            </View>
            <Text style={styles.tipTitle}>Daily Tip</Text>
            <View style={[styles.tipBadge, { backgroundColor: D.gold + '20' }]}>
              <Text style={[styles.tipBadgeText, { color: D.gold }]}>TODAY</Text>
            </View>
          </View>
          <Text style={styles.tipText}>{tip}</Text>
        </View>

        {/* Quote Card */}
        <View style={[styles.quoteCard, { backgroundColor: D.indigoDim, borderColor: D.indigo + '30' }]}>
          <Icon name="format-quote-open" size={32} color={D.indigo} style={{ marginBottom: 10 }} />
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <View style={styles.quoteDivider} />
          <Text style={styles.quoteAuthor}>— {quote.author}</Text>
        </View>

        {/* Active Challenges */}
        <View style={styles.challengesHeader}>
          <Text style={styles.sectionLabel}>Active Challenges</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Statistics')}>
            <Text style={[styles.seeAllText, { color: D.indigo }]}>See All →</Text>
          </TouchableOpacity>
        </View>

        {challenges
          .filter(c => !progress.challengesCompleted.includes(c.id))
          .slice(0, 3)
          .map((challenge) => (
            <View
              key={challenge.id}
              style={[styles.challengeCard, { backgroundColor: D.card, borderColor: D.cardBorder }]}
            >
              <View style={[styles.challengeAccent, { backgroundColor: D.gold }]} />
              <View style={styles.challengeBody}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDesc}>{challenge.description}</Text>
              </View>
              <View style={[styles.pointsBadge, { backgroundColor: D.goldDim, borderColor: D.gold + '40' }]}>
                <Icon name="star" size={12} color={D.gold} />
                <Text style={[styles.pointsBadgeText, { color: D.gold }]}>{challenge.points}</Text>
              </View>
            </View>
          ))}
      </ScrollView>

      {/* Banner Ad */}
      <View style={styles.adContainer}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  scrollView: { flex: 1 },
  content: { padding: 16, paddingBottom: 110 },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  statPillIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(245,158,11,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statPillNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: D.indigo,
    letterSpacing: -0.5,
  },
  statPillLabel: {
    fontSize: 11,
    color: D.textSecondary,
    marginTop: 1,
  },

  // Progress Card
  progressCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  progressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  progressCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: D.textPrimary,
    letterSpacing: -0.3,
  },
  progressCardSub: {
    fontSize: 12,
    color: D.textSecondary,
    marginTop: 4,
  },
  progressRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: D.indigoDim,
    borderWidth: 2,
    borderColor: D.indigo + '60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRingNum: {
    fontSize: 14,
    fontWeight: '800',
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: D.indigo,
  },
  levelDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dotCircle: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  dotLabel: {
    fontSize: 11,
    color: D.textSecondary,
  },

  // Section Label
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: D.textPrimary,
    letterSpacing: -0.2,
    marginBottom: 12,
  },

  // Quick Actions
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  actionCardSub: {
    fontSize: 11,
    color: D.textSecondary,
    textAlign: 'center',
    marginTop: 1,
  },

  // Tip Card
  tipCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    marginBottom: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  tipIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: D.textPrimary,
    flex: 1,
  },
  tipBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tipBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 22,
    color: D.textSecondary,
  },

  // Quote Card
  quoteCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  quoteText: {
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 24,
    color: D.textPrimary,
    marginBottom: 14,
  },
  quoteDivider: {
    height: 1,
    backgroundColor: D.indigo + '30',
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 13,
    color: D.textSecondary,
    textAlign: 'right',
  },

  // Challenges
  challengesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  challengeAccent: {
    width: 4,
    alignSelf: 'stretch',
    opacity: 0.8,
  },
  challengeBody: {
    flex: 1,
    padding: 14,
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: D.textPrimary,
    marginBottom: 2,
  },
  challengeDesc: {
    fontSize: 12,
    color: D.textSecondary,
    lineHeight: 17,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    margin: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  pointsBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Banner Ad
  adContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    paddingTop: 12,
    paddingBottom: 12,
  },
});

export default HomeScreen;