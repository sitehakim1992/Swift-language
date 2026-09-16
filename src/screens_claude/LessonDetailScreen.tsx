// Lesson Detail Screen
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
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { swiftLessons, getLessonsByLevel } from '../data/lessons';
import { Lesson } from '../types';
import CodeBlock from '../components/CodeBlock';
import Button from '../components/Button';
import Header from '../components/Header';
import TipCard from '../components/TipCard';

type RootStackParamList = {
  LessonDetail: { lessonId: string };
};

type LessonDetailRouteProp = RouteProp<RootStackParamList, 'LessonDetail'>;

const LessonDetailScreen: React.FC = () => {
  const route = useRoute<LessonDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { markLessonComplete, progress } = useProgress();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('code');

  useEffect(() => {
    const foundLesson = swiftLessons.find(l => l.id === route.params.lessonId);
    setLesson(foundLesson || null);
  }, [route.params.lessonId]);

  if (!lesson) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header title="Lesson" showBack onBack={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
            Lesson not found
          </Text>
        </View>
      </View>
    );
  }

  const level = lesson.level;
  const isCompleted = progress[level].completedLessons.includes(lesson.id);
  const allLessons = getLessonsByLevel(level);
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleMarkComplete = async () => {
    await markLessonComplete(lesson.id);
    Alert.alert(
      '🎉 Lesson Completed!',
      'You\'ve completed this lesson. Keep going!',
      [
        { text: 'Next Lesson', onPress: () => nextLesson && (navigation as any).push('LessonDetail', { lessonId: nextLesson.id }) },
        { text: 'Back to Lessons', onPress: () => navigation.goBack() },
      ]
    );
  };

  const getLevelColor = () => {
    switch (level) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return theme.colors.primary;
    }
  };

  const getLevelIcon = () => {
    switch (level) {
      case 'beginner': return 'sprout';
      case 'intermediate': return 'tree';
      case 'advanced': return 'tree-of-knowledge';
      default: return 'school';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title={lesson.title}
        showBack
        onBack={() => navigation.goBack()}
        rightAction={{
          icon: isCompleted ? 'check-circle' : 'circle-outline',
          onPress: handleMarkComplete,
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Lesson Header */}
        <View style={[styles.headerCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <View style={styles.headerTop}>
            <View style={[styles.levelBadge, { backgroundColor: getLevelColor() + '20' }]}>
              <Icon name={getLevelIcon()} size={16} color={getLevelColor()} />
              <Text style={[styles.levelText, { color: getLevelColor() }]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </View>
            <Text style={[styles.lessonOrder, { color: theme.colors.textSecondary }]}>
              Lesson {lesson.order}
            </Text>
          </View>
          <Text style={[styles.title, { color: theme.colors.text }]}>{lesson.title}</Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            {lesson.description}
          </Text>
        </View>

        {/* Content Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.sectionHeader, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
            onPress={() => setExpandedSection(expandedSection === 'content' ? null : 'content')}
          >
            <View style={styles.sectionTitleRow}>
              <Icon name="text-box-outline" size={22} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Theory</Text>
            </View>
            <Icon
              name={expandedSection === 'content' ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
          {expandedSection === 'content' && (
            <View style={[styles.sectionContent, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
              <Text style={[styles.contentText, { color: theme.colors.text }]}>
                {lesson.content}
              </Text>
            </View>
          )}
        </View>

        {/* Code Example Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.sectionHeader, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
            onPress={() => setExpandedSection(expandedSection === 'code' ? null : 'code')}
          >
            <View style={styles.sectionTitleRow}>
              <Icon name="code-tags" size={22} color={theme.colors.accent} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Code Example</Text>
            </View>
            <Icon
              name={expandedSection === 'code' ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
          {expandedSection === 'code' && (
            <View style={[styles.sectionContent, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
              <CodeBlock code={lesson.codeExample} />
            </View>
          )}
        </View>

        {/* Explanation Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.sectionHeader, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
            onPress={() => setExpandedSection(expandedSection === 'explanation' ? null : 'explanation')}
          >
            <View style={styles.sectionTitleRow}>
              <Icon name="lightbulb-outline" size={22} color={theme.colors.warning} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Explanation</Text>
            </View>
            <Icon
              name={expandedSection === 'explanation' ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
          {expandedSection === 'explanation' && (
            <View style={[styles.sectionContent, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
              <Text style={[styles.contentText, { color: theme.colors.text }]}>
                {lesson.explanation}
              </Text>
            </View>
          )}
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.sectionHeader, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
            onPress={() => setExpandedSection(expandedSection === 'tips' ? null : 'tips')}
          >
            <View style={styles.sectionTitleRow}>
              <Icon name="star-outline" size={22} color={theme.colors.success} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Pro Tips</Text>
            </View>
            <View style={styles.tipsBadge}>
              <Text style={[styles.tipsCount, { color: theme.colors.success }]}>{lesson.tips.length}</Text>
            </View>
            <Icon
              name={expandedSection === 'tips' ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
          {expandedSection === 'tips' && (
            <View style={styles.tipsContainer}>
              {lesson.tips.map((tip, index) => (
                <TipCard key={index} tip={tip} index={index} />
              ))}
            </View>
          )}
        </View>

        {/* Navigation */}
        <View style={styles.navigationSection}>
          <View style={styles.navButtons}>
            {prevLesson && (
              <TouchableOpacity
                style={[styles.navButton, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
                onPress={() => (navigation as any).push('LessonDetail', { lessonId: prevLesson.id })}
              >
                <Icon name="chevron-left" size={24} color={theme.colors.textSecondary} />
                <View style={styles.navTextContainer}>
                  <Text style={[styles.navLabel, { color: theme.colors.textSecondary }]}>Previous</Text>
                  <Text style={[styles.navTitle, { color: theme.colors.text }]} numberOfLines={1}>
                    {prevLesson.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {nextLesson && (
              <TouchableOpacity
                style={[
                  styles.navButton,
                  styles.navButtonRight,
                  { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border },
                ]}
                onPress={() => (navigation as any).push('LessonDetail', { lessonId: nextLesson.id })}
              >
                <View style={styles.navTextContainer}>
                  <Text style={[styles.navLabel, { color: theme.colors.textSecondary }]}>Next</Text>
                  <Text style={[styles.navTitle, { color: theme.colors.text }]} numberOfLines={1}>
                    {nextLesson.title}
                  </Text>
                </View>
                <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {!isCompleted && (
            <Button
              title="Mark as Complete"
              onPress={handleMarkComplete}
              icon="check-circle"
              fullWidth
              style={styles.completeButton}
            />
          )}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  headerCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  lessonOrder: {
    fontSize: 13,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  tipsBadge: {
    marginRight: 8,
  },
  tipsCount: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionContent: {
    marginTop: 4,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 24,
  },
  tipsContainer: {
    marginTop: 4,
  },
  navigationSection: {
    margin: 16,
    marginTop: 24,
  },
  navButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  navButtonRight: {
    justifyContent: 'flex-end',
  },
  navTextContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  navLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
  },
  navTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  completeButton: {
    marginTop: 8,
  },
});

export default LessonDetailScreen;
