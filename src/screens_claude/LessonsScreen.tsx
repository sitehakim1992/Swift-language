// Lessons Screen
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

const LessonsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { progress } = useProgress();
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const levels: Array<{ key: 'beginner' | 'intermediate' | 'advanced'; label: string; icon: string; color: string }> = [
    { key: 'beginner', label: 'Beginner', icon: 'sprout', color: '#4CAF50' },
    { key: 'intermediate', label: 'Intermediate', icon: 'tree', color: '#FF9800' },
    { key: 'advanced', label: 'Advanced', icon: 'tree-of-knowledge', color: '#F44336' },
  ];

  const lessons = getLessonsByLevel(selectedLevel);

  const isLessonCompleted = (lessonId: string): boolean => {
    const level = lessonId.split('-')[0] as 'beginner' | 'intermediate' | 'advanced';
    return progress[level].completedLessons.includes(lessonId);
  };

  const getLevelStats = (level: 'beginner' | 'intermediate' | 'advanced') => {
    const levelProgress = progress[level];
    const totalLessons = getLessonsByLevel(level).length;
    return {
      completed: levelProgress.completedLessons.length,
      total: totalLessons,
      percentage: Math.round((levelProgress.completedLessons.length / totalLessons) * 100),
    };
  };

  const renderLessonItem = ({ item, index }: { item: Lesson; index: number }) => {
    const completed = isLessonCompleted(item.id);
    const levelColor = levels.find(l => l.key === selectedLevel)?.color || theme.colors.primary;

    return (
      <TouchableOpacity
        style={[
          styles.lessonCard,
          { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border },
        ]}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('LessonDetail', { lessonId: item.id });
        }}
      >
        <View style={[styles.lessonNumber, { backgroundColor: levelColor + '20' }]}>
          <Text style={[styles.lessonNumberText, { color: levelColor }]}>
            {index + 1}
          </Text>
        </View>
        <View style={styles.lessonContent}>
          <View style={styles.lessonHeader}>
            <Text style={[styles.lessonTitle, { color: theme.colors.text }]} numberOfLines={1}>
              {item.title}
            </Text>
            {completed && (
              <View style={[styles.completedBadge, { backgroundColor: theme.colors.success + '20' }]}>
                <Icon name="check-circle" size={16} color={theme.colors.success} />
              </View>
            )}
          </View>
          <Text style={[styles.lessonDescription, { color: theme.colors.textSecondary }]} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.lessonMeta}>
            <View style={styles.metaItem}>
              <Icon name="code-tags" size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {item.codeExample.split('\n').length} lines
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="lightbulb-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {item.tips.length} tips
              </Text>
            </View>
          </View>
        </View>
        <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    );
  };

  const selectedLevelInfo = levels.find(l => l.key === selectedLevel);
  const stats = getLevelStats(selectedLevel);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Lessons" subtitle="Learn Swift Programming" showThemeToggle />

      {/* Level Selector */}
      <View style={[styles.levelSelector, { backgroundColor: theme.colors.surface }]}>
        {levels.map((level) => {
          const isSelected = selectedLevel === level.key;
          const levelStats = getLevelStats(level.key);
          return (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.levelTab,
                isSelected && { backgroundColor: level.color + '20' },
              ]}
              onPress={() => setSelectedLevel(level.key)}
            >
              <Icon
                name={level.icon}
                size={20}
                color={isSelected ? level.color : theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.levelLabel,
                  { color: isSelected ? level.color : theme.colors.textSecondary },
                ]}
              >
                {level.label}
              </Text>
              <Text
                style={[
                  styles.levelProgress,
                  { color: isSelected ? level.color : theme.colors.textSecondary },
                ]}
              >
                {levelStats.completed}/{levelStats.total}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Level Progress */}
      <View style={[styles.progressSection, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
        <View style={styles.progressHeader}>
          <View style={[styles.levelIcon, { backgroundColor: selectedLevelInfo?.color + '20' }]}>
            <Icon name={selectedLevelInfo?.icon || 'school'} size={24} color={selectedLevelInfo?.color} />
          </View>
          <View style={styles.progressInfo}>
            <Text style={[styles.progressTitle, { color: theme.colors.text }]}>
              {selectedLevelInfo?.label} Level
            </Text>
            <Text style={[styles.progressSubtitle, { color: theme.colors.textSecondary }]}>
              {stats.completed} of {stats.total} lessons completed
            </Text>
          </View>
          <Text style={[styles.progressPercent, { color: selectedLevelInfo?.color }]}>
            {stats.percentage}%
          </Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: selectedLevelInfo?.color, width: `${stats.percentage}%` },
            ]}
          />
        </View>
      </View>

      {/* Lessons List */}
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLessonItem}
        contentContainerStyle={styles.lessonsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="book-open-variant" size={48} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No lessons available
            </Text>
          </View>
        }
      />
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
    borderRadius: 16,
    padding: 4,
  },
  levelTab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  levelLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  levelProgress: {
    fontSize: 10,
    marginTop: 2,
  },
  progressSection: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  progressPercent: {
    fontSize: 20,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  lessonsList: {
    padding: 16,
    paddingBottom: 100,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  lessonNumber: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonNumberText: {
    fontSize: 16,
    fontWeight: '700',
  },
  lessonContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  completedBadge: {
    padding: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  lessonDescription: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  lessonMeta: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default LessonsScreen;
