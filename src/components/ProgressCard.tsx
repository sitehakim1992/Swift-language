// Progress Card Component
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';

interface ProgressCardProps {
  level: 'beginner' | 'intermediate' | 'advanced';
  lessonsCount: number;
  completedLessons: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  level,
  lessonsCount,
  completedLessons,
}) => {
  const { theme } = useTheme();
  const { getLevelProgress } = useProgress();
  const levelProgress = getLevelProgress(level);

  const percentage = lessonsCount > 0 ? Math.round((completedLessons / lessonsCount) * 100) : 0;
  const isCompleted = completedLessons === lessonsCount;

  const getLevelIcon = () => {
    switch (level) {
      case 'beginner':
        return 'sprout';
      case 'intermediate':
        return 'tree';
      case 'advanced':
        return 'tree-of-knowledge';
      default:
        return 'school';
    }
  };

  const getLevelColor = () => {
    switch (level) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return theme.colors.primary;
    }
  };

  const getLevelTitle = () => {
    switch (level) {
      case 'beginner':
        return 'Beginner';
      case 'intermediate':
        return 'Intermediate';
      case 'advanced':
        return 'Advanced';
      default:
        return level;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: getLevelColor() + '20' }]}>
          <Icon name={getLevelIcon()} size={28} color={getLevelColor()} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {getLevelTitle()} Level
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {completedLessons}/{lessonsCount} Lessons
          </Text>
        </View>
        {isCompleted && (
          <View style={[styles.badge, { backgroundColor: theme.colors.success + '20' }]}>
            <Icon name="check-circle" size={20} color={theme.colors.success} />
          </View>
        )}
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: getLevelColor(),
                width: `${percentage}%`,
              },
            ]}
          />
        </View>
        <Text style={[styles.percentage, { color: getLevelColor() }]}>
          {percentage}%
        </Text>
      </View>

      {levelProgress.quizScore !== null && (
        <View style={styles.quizContainer}>
          <Icon name="clipboard-check" size={16} color={theme.colors.accent} />
          <Text style={[styles.quizText, { color: theme.colors.textSecondary }]}>
            Best Quiz Score: {Math.round(levelProgress.quizScore)}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  badge: {
    padding: 4,
    borderRadius: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  percentage: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  quizContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  quizText: {
    marginLeft: 8,
    fontSize: 13,
  },
});

export default ProgressCard;
