// Lessons Screen — Redesigned
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { getLessonsByLevel } from '../data/lessons';
import { Lesson } from '../types';
import Header from '../components/Header';

type RootStackParamList = {
  MainTabs: undefined;
  LessonDetail: { lessonId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ضع هنا Ad Unit ID الخاص بشاشة Lessons في هذا التطبيق (منفصل عن Home)
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6551659254419770/6001956007';

const D = {
  bg: '#0A0E1A',
  card: '#141B2D',
  cardBorder: '#1E2A45',
  indigo: '#6366F1',
  indigoDim: 'rgba(99,102,241,0.13)',
  gold: '#F59E0B',
  goldDim: 'rgba(245,158,11,0.13)',
  emerald: '#10B981',
  emeraldDim: 'rgba(16,185,129,0.13)',
  rose: '#F43F5E',
  roseDim: 'rgba(244,63,94,0.13)',
  orange: '#F97316',
  orangeDim: 'rgba(249,115,22,0.13)',
  textPrimary: '#F1F5F9',
  textSecondary: '#64748B',
};

const LEVELS = [
  { key: 'beginner' as const,     label: 'Beginner',     icon: 'sprout',            color: D.emerald, dim: D.emeraldDim },
  { key: 'intermediate' as const, label: 'Intermediate', icon: 'tree',              color: D.orange,  dim: D.orangeDim  },
  { key: 'advanced' as const,     label: 'Advanced',     icon: 'tree-of-knowledge', color: D.rose,    dim: D.roseDim    },
];

const LessonsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { progress } = useProgress();
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const lessons = getLessonsByLevel(selectedLevel);

  const isLessonCompleted = (lessonId: string): boolean => {
    const level = lessonId.split('-')[0] as 'beginner' | 'intermediate' | 'advanced';
    return progress[level].completedLessons.includes(lessonId);
  };

  const getLevelStats = (level: 'beginner' | 'intermediate' | 'advanced') => {
    const lp = progress[level];
    const total = getLessonsByLevel(level).length;
    return {
      completed: lp.completedLessons.length,
      total,
      percentage: Math.round((lp.completedLessons.length / total) * 100),
    };
  };

  const selectedLevelInfo = LEVELS.find(l => l.key === selectedLevel)!;
  const stats = getLevelStats(selectedLevel);

  const renderLessonItem = ({ item, index }: { item: Lesson; index: number }) => {
    const completed = isLessonCompleted(item.id);
    const { color, dim } = selectedLevelInfo;
    const codeLines = item.codeExample.split('\n').length;

    return (
      <TouchableOpacity
        style={[styles.lessonCard, { backgroundColor: D.card, borderColor: completed ? color + '50' : D.cardBorder }]}
        activeOpacity={0.75}
        onPress={() => navigation.navigate('LessonDetail', { lessonId: item.id })}
      >
        {/* Left accent stripe */}
        <View style={[styles.cardStripe, { backgroundColor: completed ? color : D.cardBorder }]} />

        {/* Number badge */}
        <View style={[styles.numberBadge, { backgroundColor: completed ? color + '25' : 'rgba(255,255,255,0.05)' }]}>
          {completed
            ? <Icon name="check" size={16} color={color} />
            : <Text style={[styles.numberText, { color }]}>{index + 1}</Text>
          }
        </View>

        {/* Content */}
        <View style={styles.lessonContent}>
          <Text style={styles.lessonTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.lessonDesc} numberOfLines={2}>{item.description}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Icon name="code-tags" size={12} color={D.textSecondary} />
              <Text style={styles.metaChipText}>{codeLines} lines</Text>
            </View>
            <View style={styles.metaChip}>
              <Icon name="lightbulb-outline" size={12} color={D.textSecondary} />
              <Text style={styles.metaChipText}>{item.tips.length} tips</Text>
            </View>
            {completed && (
              <View style={[styles.metaChip, { backgroundColor: color + '18', borderColor: color + '40' }]}>
                <Text style={[styles.metaChipText, { color }]}>Done</Text>
              </View>
            )}
          </View>
        </View>

        <Icon name="chevron-right" size={20} color={D.textSecondary} style={{ opacity: 0.5 }} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
      <Header title="Lessons" subtitle="Learn Swift Programming" showThemeToggle />

      {/* Level Tabs */}
      <View style={styles.levelTabsWrapper}>
        {LEVELS.map((level) => {
          const isSelected = selectedLevel === level.key;
          const ls = getLevelStats(level.key);
          return (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.levelTab,
                isSelected && { backgroundColor: level.dim, borderColor: level.color + '50' },
                !isSelected && { borderColor: 'transparent' },
              ]}
              onPress={() => setSelectedLevel(level.key)}
              activeOpacity={0.75}
            >
              <Icon name={level.icon} size={18} color={isSelected ? level.color : D.textSecondary} />
              <Text style={[styles.levelTabLabel, { color: isSelected ? level.color : D.textSecondary }]}>
                {level.label}
              </Text>
              <View style={[styles.levelTabBadge, { backgroundColor: isSelected ? level.color + '25' : 'rgba(255,255,255,0.05)' }]}>
                <Text style={[styles.levelTabBadgeText, { color: isSelected ? level.color : D.textSecondary }]}>
                  {ls.completed}/{ls.total}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Level Progress Banner */}
      <View style={[styles.progressBanner, { backgroundColor: D.card, borderColor: D.cardBorder }]}>
        <View style={[styles.progressBannerIcon, { backgroundColor: selectedLevelInfo.color + '20' }]}>
          <Icon name={selectedLevelInfo.icon} size={22} color={selectedLevelInfo.color} />
        </View>
        <View style={styles.progressBannerInfo}>
          <Text style={styles.progressBannerTitle}>{selectedLevelInfo.label} Level</Text>
          <View style={styles.progressTrackWrap}>
            <View style={[styles.progressTrack, { backgroundColor: 'rgba(255,255,255,0.06)' }]}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: selectedLevelInfo.color, width: `${stats.percentage}%` },
                ]}
              />
            </View>
          </View>
          <Text style={styles.progressBannerSub}>
            {stats.completed} of {stats.total} completed
          </Text>
        </View>
        <Text style={[styles.progressBannerPercent, { color: selectedLevelInfo.color }]}>
          {stats.percentage}%
        </Text>
      </View>

      {/* Lessons List */}
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLessonItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="book-open-variant" size={48} color={D.textSecondary} style={{ opacity: 0.4 }} />
            <Text style={styles.emptyText}>No lessons available</Text>
          </View>
        }
      />

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

  // Level tabs
  levelTabsWrapper: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    gap: 8,
  },
  levelTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 14,
    borderWidth: 1,
    gap: 4,
  },
  levelTabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  levelTabBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  levelTabBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },

  // Progress Banner
  progressBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    gap: 12,
  },
  progressBannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBannerInfo: { flex: 1 },
  progressBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: D.textPrimary,
    marginBottom: 6,
  },
  progressTrackWrap: { marginBottom: 4 },
  progressTrack: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressBannerSub: {
    fontSize: 11,
    color: D.textSecondary,
  },
  progressBannerPercent: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  // Lesson Cards
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardStripe: {
    width: 3,
    alignSelf: 'stretch',
    opacity: 0.7,
  },
  numberBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  numberText: {
    fontSize: 15,
    fontWeight: '800',
  },
  lessonContent: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 12,
    paddingRight: 6,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: D.textPrimary,
    marginBottom: 3,
    letterSpacing: -0.2,
  },
  lessonDesc: {
    fontSize: 12,
    color: D.textSecondary,
    lineHeight: 17,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 6,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  metaChipText: {
    fontSize: 11,
    color: D.textSecondary,
    fontWeight: '500',
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: D.textSecondary,
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

export default LessonsScreen;