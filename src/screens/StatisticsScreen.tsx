// Statistics Screen — Redesigned
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
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { getLessonsByLevel, challenges, motivationalQuotes } from '../data/lessons';
import Header from '../components/Header';
import Button from '../components/Button';

// ضع هنا Ad Unit ID الخاص بشاشة Statistics (منفصل عن Home و Lessons)
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6551659254419770/6001956007';

const D = {
  bg: '#0A0E1A',
  card: '#141B2D',
  cardBorder: '#1E2A45',
  indigo: '#6366F1',
  indigoDim: 'rgba(99,102,241,0.14)',
  gold: '#F59E0B',
  goldDim: 'rgba(245,158,11,0.13)',
  emerald: '#10B981',
  emeraldDim: 'rgba(16,185,129,0.13)',
  rose: '#F43F5E',
  roseDim: 'rgba(244,63,94,0.13)',
  orange: '#F97316',
  orangeDim: 'rgba(249,115,22,0.13)',
  violet: '#8B5CF6',
  violetDim: 'rgba(139,92,246,0.13)',
  sky: '#38BDF8',
  skyDim: 'rgba(56,189,248,0.13)',
  textPrimary: '#F1F5F9',
  textSecondary: '#64748B',
};

type TabKey = 'overview' | 'challenges' | 'achievements';

const TABS: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'overview',      label: 'Overview',      icon: 'chart-pie'   },
  { key: 'challenges',    label: 'Challenges',    icon: 'flag'        },
  { key: 'achievements',  label: 'Achievements',  icon: 'trophy'      },
];

const LEVEL_CONFIG = [
  { key: 'beginner',     label: 'Beginner',     color: D.emerald, dim: D.emeraldDim, icon: 'sprout'            },
  { key: 'intermediate', label: 'Intermediate', color: D.orange,  dim: D.orangeDim,  icon: 'tree'              },
  { key: 'advanced',     label: 'Advanced',     color: D.rose,    dim: D.roseDim,    icon: 'tree-of-knowledge' },
];

const StatisticsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { progress, getTotalProgress, resetProgress } = useProgress();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

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

  // ─── OVERVIEW TAB ─────────────────────────────────────────────────
  const renderOverview = () => (
    <View style={styles.tabContent}>

      {/* Stat Cards Grid */}
      <View style={styles.statsGrid}>
        {[
          { icon: 'fire',           color: D.gold,    dim: D.goldDim,    value: progress.dailyStreakCount, label: 'Day Streak'    },
          { icon: 'star-four-points', color: D.indigo, dim: D.indigoDim, value: progress.totalPoints,      label: 'Total Points'  },
          { icon: 'book-check',     color: D.emerald, dim: D.emeraldDim, value: completedLessons,          label: 'Lessons Done'  },
          { icon: 'clipboard-check',color: D.violet,  dim: D.violetDim,  value: totalQuizAttempts,         label: 'Quiz Attempts' },
        ].map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: D.card, borderColor: D.cardBorder }]}>
            <View style={[styles.statIconWrap, { backgroundColor: stat.dim }]}>
              <Icon name={stat.icon} size={22} color={stat.color} />
            </View>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overall arc */}
      <View style={[styles.overallCard, { backgroundColor: D.card, borderColor: D.cardBorder }]}>
        <View style={styles.overallTop}>
          <Text style={styles.overallTitle}>Overall Progress</Text>
          <Text style={[styles.overallPct, { color: D.indigo }]}>{totalProgress}%</Text>
        </View>
        <View style={styles.overallTrack}>
          <View style={[styles.overallFill, { width: `${totalProgress}%` }]} />
        </View>
        <Text style={styles.overallSub}>{completedLessons} of {totalLessons} lessons completed</Text>
      </View>

      {/* Level Breakdown */}
      <Text style={styles.sectionHeading}>Progress by Level</Text>
      {LEVEL_CONFIG.map((lvl) => {
        const lp = progress[lvl.key as keyof typeof progress] as any;
        const total = getLessonsByLevel(lvl.key as any).length;
        const completed = lp.completedLessons.length;
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

        return (
          <View key={lvl.key} style={[styles.levelRow, { backgroundColor: D.card, borderColor: D.cardBorder }]}>
            <View style={[styles.levelRowIcon, { backgroundColor: lvl.dim }]}>
              <Icon name={lvl.icon} size={18} color={lvl.color} />
            </View>
            <View style={styles.levelRowInfo}>
              <View style={styles.levelRowTop}>
                <Text style={styles.levelRowLabel}>{lvl.label}</Text>
                <Text style={[styles.levelRowPct, { color: lvl.color }]}>{pct}%</Text>
              </View>
              <View style={[styles.levelTrack, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                <View style={[styles.levelFill, { backgroundColor: lvl.color, width: `${pct}%` }]} />
              </View>
              <Text style={styles.levelRowSub}>{completed}/{total} lessons</Text>
            </View>
          </View>
        );
      })}

      {/* Quiz Performance */}
      <Text style={styles.sectionHeading}>Quiz Performance</Text>
      <View style={[styles.quizPerfCard, { backgroundColor: D.card, borderColor: D.cardBorder }]}>
        <View style={styles.quizPerfRow}>
          <View style={styles.quizPerfItem}>
            <Text style={[styles.quizPerfNum, { color: averageQuizScore >= 70 ? D.emerald : D.gold }]}>
              {averageQuizScore}%
            </Text>
            <Text style={styles.quizPerfLbl}>Average</Text>
          </View>
          <View style={[styles.quizPerfDivider]} />
          {[
            { label: 'Beginner',     score: progress.beginner.quizScore,     color: D.emerald },
            { label: 'Inter.',       score: progress.intermediate.quizScore, color: D.orange  },
            { label: 'Advanced',     score: progress.advanced.quizScore,     color: D.rose    },
          ].map((q, i) => (
            <React.Fragment key={i}>
              <View style={styles.quizPerfItem}>
                <Text style={[styles.quizPerfNum, { color: q.color }]}>
                  {q.score !== null ? Math.round(q.score) : 0}%
                </Text>
                <Text style={styles.quizPerfLbl}>{q.label}</Text>
              </View>
              {i < 2 && <View style={styles.quizPerfDivider} />}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );

  // ─── CHALLENGES TAB ───────────────────────────────────────────────
  const renderChallenges = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionHeading}>Active Challenges</Text>
      {challenges.map((challenge) => {
        const isCompleted = progress.challengesCompleted.includes(challenge.id);
        const typeColor =
          challenge.type === 'daily'   ? D.emerald :
          challenge.type === 'weekly'  ? D.gold    : D.indigo;

        return (
          <View
            key={challenge.id}
            style={[
              styles.challengeCard,
              { backgroundColor: D.card, borderColor: isCompleted ? typeColor + '50' : D.cardBorder },
              isCompleted && { opacity: 0.55 },
            ]}
          >
            <View style={[styles.challengeStripe, { backgroundColor: typeColor }]} />
            <View style={styles.challengeBody}>
              <View style={styles.challengeTopRow}>
                <View style={[styles.typePill, { backgroundColor: typeColor + '20', borderColor: typeColor + '40' }]}>
                  <Text style={[styles.typePillText, { color: typeColor }]}>
                    {challenge.type.toUpperCase()}
                  </Text>
                </View>
                {isCompleted && (
                  <View style={[styles.donePill, { backgroundColor: D.emeraldDim }]}>
                    <Icon name="check" size={10} color={D.emerald} />
                    <Text style={[styles.donePillText, { color: D.emerald }]}>Done</Text>
                  </View>
                )}
              </View>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDesc}>{challenge.description}</Text>
              <View style={styles.challengeFooter}>
                <Icon name="star" size={13} color={D.gold} />
                <Text style={[styles.challengePts, { color: D.gold }]}>{challenge.points} pts</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );

  // ─── ACHIEVEMENTS TAB ─────────────────────────────────────────────
  const renderAchievements = () => {
    const achievements = [
      { id: 'first_lesson',  title: 'First Steps',       description: 'Complete your first lesson',        icon: 'shoe-print',         unlocked: completedLessons >= 1,                                  points: 50  },
      { id: 'quiz_master',   title: 'Quiz Master',        description: 'Score 100% on a quiz',              icon: 'certificate',        unlocked: averageQuizScore === 100,                               points: 200 },
      { id: 'streak_7',      title: 'Week Warrior',       description: 'Maintain a 7-day streak',           icon: 'fire',               unlocked: progress.dailyStreakCount >= 7,                         points: 300 },
      { id: 'all_beginner',  title: 'Beginner Complete',  description: 'Complete all beginner lessons',     icon: 'sprout',             unlocked: progress.beginner.completedLessons.length >= 6,         points: 100 },
      { id: 'all_inter',     title: 'Rising Developer',   description: 'Complete all intermediate lessons', icon: 'tree',               unlocked: progress.intermediate.completedLessons.length >= 6,     points: 150 },
      { id: 'all_advanced',  title: 'Swift Expert',       description: 'Complete all advanced lessons',     icon: 'tree-of-knowledge',  unlocked: progress.advanced.completedLessons.length >= 6,         points: 200 },
      { id: 'points_500',    title: 'Point Collector',    description: 'Earn 500 total points',             icon: 'star-circle',        unlocked: progress.totalPoints >= 500,                            points: 100 },
      { id: 'perfect',       title: 'Perfect Score',      description: 'Get 100% on any quiz',              icon: 'trophy',             unlocked: averageQuizScore === 100,                               points: 150 },
    ];
    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
      <View style={styles.tabContent}>
        <View style={styles.achieveHeader}>
          <Text style={styles.sectionHeading}>Achievements</Text>
          <View style={[styles.achieveCountBadge, { backgroundColor: D.goldDim, borderColor: D.gold + '40' }]}>
            <Icon name="trophy" size={13} color={D.gold} />
            <Text style={[styles.achieveCountText, { color: D.gold }]}>
              {unlockedCount}/{achievements.length}
            </Text>
          </View>
        </View>

        <View style={styles.achieveGrid}>
          {achievements.map((a) => (
            <View
              key={a.id}
              style={[
                styles.achieveCard,
                { backgroundColor: D.card, borderColor: a.unlocked ? D.indigo + '45' : D.cardBorder },
                !a.unlocked && { opacity: 0.45 },
              ]}
            >
              <View style={[
                styles.achieveIconWrap,
                { backgroundColor: a.unlocked ? D.indigoDim : 'rgba(255,255,255,0.04)' },
              ]}>
                <Icon name={a.icon} size={24} color={a.unlocked ? D.indigo : D.textSecondary} />
              </View>
              <Text style={[styles.achieveTitle, { color: a.unlocked ? D.textPrimary : D.textSecondary }]} numberOfLines={1}>
                {a.title}
              </Text>
              <Text style={styles.achieveDesc} numberOfLines={2}>{a.description}</Text>
              <View style={styles.achieveFooter}>
                <Icon name="star" size={11} color={D.gold} />
                <Text style={[styles.achievePts, { color: D.gold }]}>{a.points}</Text>
                {a.unlocked
                  ? <Icon name="check-circle" size={14} color={D.emerald} style={{ marginLeft: 'auto' }} />
                  : <Icon name="lock" size={13} color={D.textSecondary} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                }
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
      <Header title="Statistics" subtitle="Track your progress" showThemeToggle />

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabBarBtn,
                isActive && { backgroundColor: D.indigoDim, borderColor: D.indigo + '55' },
                !isActive && { borderColor: 'transparent' },
              ]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.75}
            >
              <Icon name={tab.icon} size={17} color={isActive ? D.indigo : D.textSecondary} />
              <Text style={[styles.tabBarLabel, { color: isActive ? D.indigo : D.textSecondary }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview'     && renderOverview()}
        {activeTab === 'challenges'   && renderChallenges()}
        {activeTab === 'achievements' && renderAchievements()}

        {/* Reset Button */}
        <View style={styles.resetWrap}>
          <TouchableOpacity
            style={[styles.resetBtn, { borderColor: D.rose + '50' }]}
            onPress={handleResetProgress}
            activeOpacity={0.8}
          >
            <Icon name="refresh" size={16} color={D.rose} />
            <Text style={[styles.resetBtnText, { color: D.rose }]}>Reset All Progress</Text>
          </TouchableOpacity>
        </View>
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
  scroll: { flex: 1 },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  tabBarBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.1,
  },

  tabContent: {
    padding: 16,
    paddingBottom: 8,
  },

  // Section heading
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: D.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 12,
    marginTop: 4,
  },

  // Stats grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    width: '47.5%',
    alignItems: 'center',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    gap: 6,
  },
  statIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  statLabel: {
    fontSize: 11,
    color: D.textSecondary,
    fontWeight: '500',
  },

  // Overall card
  overallCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    marginBottom: 20,
  },
  overallTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overallTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: D.textPrimary,
  },
  overallPct: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  overallTrack: {
    height: 7,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  overallFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: D.indigo,
  },
  overallSub: {
    fontSize: 12,
    color: D.textSecondary,
  },

  // Level rows
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  levelRowIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelRowInfo: { flex: 1 },
  levelRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  levelRowLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: D.textPrimary,
  },
  levelRowPct: {
    fontSize: 15,
    fontWeight: '800',
  },
  levelTrack: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  levelFill: {
    height: '100%',
    borderRadius: 3,
  },
  levelRowSub: {
    fontSize: 11,
    color: D.textSecondary,
  },

  // Quiz perf
  quizPerfCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 10,
  },
  quizPerfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  quizPerfItem: { alignItems: 'center' },
  quizPerfNum: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  quizPerfLbl: {
    fontSize: 11,
    color: D.textSecondary,
    marginTop: 4,
  },
  quizPerfDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },

  // Challenges
  challengeCard: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  challengeStripe: {
    width: 4,
    alignSelf: 'stretch',
    opacity: 0.8,
  },
  challengeBody: { flex: 1, padding: 14 },
  challengeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  typePill: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  typePillText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  donePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
  },
  donePillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  challengeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: D.textPrimary,
    marginBottom: 3,
  },
  challengeDesc: {
    fontSize: 12,
    color: D.textSecondary,
    lineHeight: 17,
    marginBottom: 8,
  },
  challengeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  challengePts: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Achievements
  achieveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  achieveCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  achieveCountText: {
    fontSize: 13,
    fontWeight: '800',
  },
  achieveGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  achieveCard: {
    width: '47.5%',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    gap: 6,
  },
  achieveIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  achieveTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  achieveDesc: {
    fontSize: 11,
    color: D.textSecondary,
    lineHeight: 15,
  },
  achieveFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  achievePts: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Reset
  resetWrap: {
    padding: 16,
    paddingBottom: 24,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(244,63,94,0.07)',
  },
  resetBtnText: {
    fontSize: 14,
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

export default StatisticsScreen;