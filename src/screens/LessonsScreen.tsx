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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

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
    paddingBottom: 110,
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
});

export default LessonsScreen;
// // Lessons Screen
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useTheme } from '../contexts/ThemeContext';
// import { useProgress } from '../contexts/ProgressContext';
// import { getLessonsByLevel } from '../data/lessons';
// import { Lesson } from '../types';
// import Header from '../components/Header';

// type RootStackParamList = {
//   MainTabs: undefined;
//   LessonDetail: { lessonId: string };
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const LessonsScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const { theme } = useTheme();
//   const { progress } = useProgress();
//   const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

//   const levels: Array<{ key: 'beginner' | 'intermediate' | 'advanced'; label: string; icon: string; color: string }> = [
//     { key: 'beginner', label: 'Beginner', icon: 'sprout', color: '#4CAF50' },
//     { key: 'intermediate', label: 'Intermediate', icon: 'tree', color: '#FF9800' },
//     { key: 'advanced', label: 'Advanced', icon: 'tree-of-knowledge', color: '#F44336' },
//   ];

//   const lessons = getLessonsByLevel(selectedLevel);

//   const isLessonCompleted = (lessonId: string): boolean => {
//     const level = lessonId.split('-')[0] as 'beginner' | 'intermediate' | 'advanced';
//     return progress[level].completedLessons.includes(lessonId);
//   };

//   const getLevelStats = (level: 'beginner' | 'intermediate' | 'advanced') => {
//     const levelProgress = progress[level];
//     const totalLessons = getLessonsByLevel(level).length;
//     return {
//       completed: levelProgress.completedLessons.length,
//       total: totalLessons,
//       percentage: Math.round((levelProgress.completedLessons.length / totalLessons) * 100),
//     };
//   };

//   const renderLessonItem = ({ item, index }: { item: Lesson; index: number }) => {
//     const completed = isLessonCompleted(item.id);
//     const levelColor = levels.find(l => l.key === selectedLevel)?.color || theme.colors.primary;

//     return (
//       <TouchableOpacity
//         style={[
//           styles.lessonCard,
//           { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border },
//         ]}
//         activeOpacity={0.7}
//         onPress={() => {
//           navigation.navigate('LessonDetail', { lessonId: item.id });
//         }}
//       >
//         <View style={[styles.lessonNumber, { backgroundColor: levelColor + '20' }]}>
//           <Text style={[styles.lessonNumberText, { color: levelColor }]}>
//             {index + 1}
//           </Text>
//         </View>
//         <View style={styles.lessonContent}>
//           <View style={styles.lessonHeader}>
//             <Text style={[styles.lessonTitle, { color: theme.colors.text }]} numberOfLines={1}>
//               {item.title}
//             </Text>
//             {completed && (
//               <View style={[styles.completedBadge, { backgroundColor: theme.colors.success + '20' }]}>
//                 <Icon name="check-circle" size={16} color={theme.colors.success} />
//               </View>
//             )}
//           </View>
//           <Text style={[styles.lessonDescription, { color: theme.colors.textSecondary }]} numberOfLines={2}>
//             {item.description}
//           </Text>
//           <View style={styles.lessonMeta}>
//             <View style={styles.metaItem}>
//               <Icon name="code-tags" size={14} color={theme.colors.textSecondary} />
//               <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
//                 {item.codeExample.split('\n').length} lines
//               </Text>
//             </View>
//             <View style={styles.metaItem}>
//               <Icon name="lightbulb-outline" size={14} color={theme.colors.textSecondary} />
//               <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
//                 {item.tips.length} tips
//               </Text>
//             </View>
//           </View>
//         </View>
//         <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
//       </TouchableOpacity>
//     );
//   };

//   const selectedLevelInfo = levels.find(l => l.key === selectedLevel);
//   const stats = getLevelStats(selectedLevel);

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <Header title="Lessons" subtitle="Learn Swift Programming" showThemeToggle />

//       {/* Level Selector */}
//       <View style={[styles.levelSelector, { backgroundColor: theme.colors.surface }]}>
//         {levels.map((level) => {
//           const isSelected = selectedLevel === level.key;
//           const levelStats = getLevelStats(level.key);
//           return (
//             <TouchableOpacity
//               key={level.key}
//               style={[
//                 styles.levelTab,
//                 isSelected && { backgroundColor: level.color + '20' },
//               ]}
//               onPress={() => setSelectedLevel(level.key)}
//             >
//               <Icon
//                 name={level.icon}
//                 size={20}
//                 color={isSelected ? level.color : theme.colors.textSecondary}
//               />
//               <Text
//                 style={[
//                   styles.levelLabel,
//                   { color: isSelected ? level.color : theme.colors.textSecondary },
//                 ]}
//               >
//                 {level.label}
//               </Text>
//               <Text
//                 style={[
//                   styles.levelProgress,
//                   { color: isSelected ? level.color : theme.colors.textSecondary },
//                 ]}
//               >
//                 {levelStats.completed}/{levelStats.total}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* Level Progress */}
//       <View style={[styles.progressSection, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
//         <View style={styles.progressHeader}>
//           <View style={[styles.levelIcon, { backgroundColor: selectedLevelInfo?.color + '20' }]}>
//             <Icon name={selectedLevelInfo?.icon || 'school'} size={24} color={selectedLevelInfo?.color} />
//           </View>
//           <View style={styles.progressInfo}>
//             <Text style={[styles.progressTitle, { color: theme.colors.text }]}>
//               {selectedLevelInfo?.label} Level
//             </Text>
//             <Text style={[styles.progressSubtitle, { color: theme.colors.textSecondary }]}>
//               {stats.completed} of {stats.total} lessons completed
//             </Text>
//           </View>
//           <Text style={[styles.progressPercent, { color: selectedLevelInfo?.color }]}>
//             {stats.percentage}%
//           </Text>
//         </View>
//         <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
//           <View
//             style={[
//               styles.progressFill,
//               { backgroundColor: selectedLevelInfo?.color, width: `${stats.percentage}%` },
//             ]}
//           />
//         </View>
//       </View>

//       {/* Lessons List */}
//       <FlatList
//         data={lessons}
//         keyExtractor={(item) => item.id}
//         renderItem={renderLessonItem}
//         contentContainerStyle={styles.lessonsList}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View style={styles.emptyState}>
//             <Icon name="book-open-variant" size={48} color={theme.colors.textSecondary} />
//             <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
//               No lessons available
//             </Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   levelSelector: {
//     flexDirection: 'row',
//     marginHorizontal: 16,
//     marginVertical: 8,
//     borderRadius: 16,
//     padding: 4,
//   },
//   levelTab: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//   },
//   levelLabel: {
//     fontSize: 11,
//     fontWeight: '600',
//     marginTop: 4,
//   },
//   levelProgress: {
//     fontSize: 10,
//     marginTop: 2,
//   },
//   progressSection: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//     padding: 16,
//     borderRadius: 16,
//     borderWidth: 1,
//   },
//   progressHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   levelIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   progressInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   progressTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   progressSubtitle: {
//     fontSize: 13,
//     marginTop: 2,
//   },
//   progressPercent: {
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   progressBar: {
//     height: 8,
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 4,
//   },
//   lessonsList: {
//     padding: 16,
//     paddingBottom: 100,
//   },
//   lessonCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 16,
//     padding: 16,
//     borderWidth: 1,
//     marginBottom: 12,
//   },
//   lessonNumber: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   lessonNumberText: {
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   lessonContent: {
//     flex: 1,
//     marginLeft: 12,
//     marginRight: 8,
//   },
//   lessonHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   lessonTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     flex: 1,
//   },
//   completedBadge: {
//     padding: 2,
//     borderRadius: 10,
//     marginLeft: 8,
//   },
//   lessonDescription: {
//     fontSize: 13,
//     marginTop: 4,
//     lineHeight: 18,
//   },
//   lessonMeta: {
//     flexDirection: 'row',
//     marginTop: 8,
//     gap: 16,
//   },
//   metaItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   metaText: {
//     fontSize: 12,
//     marginLeft: 4,
//   },
//   emptyState: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 48,
//   },
//   emptyText: {
//     marginTop: 16,
//     fontSize: 16,
//   },
// });

// export default LessonsScreen;
