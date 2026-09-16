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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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
});

export default HomeScreen;
// // HomeScreen.tsx - النسخة المطورة لهوية Swift
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   RefreshControl,
//   Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import { useTheme } from '../contexts/ThemeContext';
// import { useProgress } from '../contexts/ProgressContext';
// import { getRandomQuote, getRandomTip, challenges } from '../data/lessons';
// import { MotivationalQuote } from '../types';
// import Header from '../components/Header';

// const { width } = Dimensions.get('window');

// type TabParamList = {
//   Home: undefined;
//   Lessons: { level?: 'beginner' | 'intermediate' | 'advanced' } | undefined;
//   Quiz: { lessonId?: string } | undefined;
//   Statistics: undefined;
// };

// type HomeNavigationProp = BottomTabNavigationProp<TabParamList>;

// const HomeScreen: React.FC = () => {
//   const navigation = useNavigation<HomeNavigationProp>();
//   const { theme } = useTheme();
//   const { progress, getTotalProgress, updateStreak } = useProgress();
//   const [refreshing, setRefreshing] = useState(false);
//   const [quote, setQuote] = useState<MotivationalQuote>(getRandomQuote());
//   const [tip, setTip] = useState<string>(getRandomTip());

//   const SWIFT_ORANGE = '#FF5235'; // لون سويفت الرسمي

//   useEffect(() => {
//     updateStreak();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     setQuote(getRandomQuote());
//     setTip(getRandomTip());
//     setTimeout(() => setRefreshing(false), 1000);
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <Header title="Swift Hero" showProfile={true} />
      
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={SWIFT_ORANGE} />
//         }
//       >
//         {/* قسم الترحيب والإحصائيات السريعة */}
//         <View style={styles.welcomeSection}>
//           <Text style={[styles.welcomeText, { color: theme.text }]}>مرحباً بك مجدداً!</Text>
//           <Text style={[styles.progressSubtitle, { color: theme.secondaryText }]}>
//             لقد أنجزت {Math.round(getTotalProgress() * 100)}% من مسار الاحتراف
//           </Text>
//         </View>

//         {/* بطاقة الاقتباس - تصميم متميز */}
//         <View style={[styles.quoteCard, { backgroundColor: theme.card, borderColor: SWIFT_ORANGE }]}>
//           <View style={styles.quoteIconBadge}>
//             <Icon name="format-quote-close" size={24} color="#FFF" />
//           </View>
//           <Text style={[styles.quoteText, { color: theme.text }]}>"{quote.text}"</Text>
//           <Text style={[styles.quoteAuthor, { color: SWIFT_ORANGE }]}>— {quote.author}</Text>
//         </View>

//         {/* التحديات اليومية - تصميم عرضي (Horizontal) لتمييزه عن النسخ السابقة */}
//         <View style={styles.sectionHeader}>
//           <Text style={[styles.sectionTitle, { color: theme.text }]}>التحديات البرمجية</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Lessons')}>
//             <Text style={[styles.seeAll, { color: SWIFT_ORANGE }]}>عرض الكل</Text>
//           </TouchableOpacity>
//         </View>

//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
//           {challenges.map((challenge, index) => (
//             <TouchableOpacity 
//               key={index} 
//               style={[styles.challengeCard, { backgroundColor: theme.card }]}
//               onPress={() => navigation.navigate('Quiz', { lessonId: challenge.id })}
//             >
//               <View style={[styles.challengeIconContainer, { backgroundColor: SWIFT_ORANGE + '20' }]}>
//                 <Icon name="lightning-bolt" size={28} color={SWIFT_ORANGE} />
//               </View>
//               <Text style={[styles.challengeTitle, { color: theme.text }]} numberOfLines={1}>
//                 {challenge.title}
//               </Text>
//               <Text style={[styles.challengePoints, { color: theme.secondaryText }]}>
//                 +{challenge.points} نقطة
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* نصيحة اليوم - تصميم Glassmorphism بسيط */}
//         <View style={[styles.tipCard, { backgroundColor: theme.card }]}>
//           <View style={styles.tipHeader}>
//             <Icon name="lightbulb-on-outline" size={22} color="#FFD700" />
//             <Text style={[styles.tipTitle, { color: theme.text }]}>نصيحة سويفت</Text>
//           </View>
//           <Text style={[styles.tipText, { color: theme.secondaryText }]}>{tip}</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   welcomeSection: {
//     marginBottom: 25,
//   },
//   welcomeText: {
//     fontSize: 28,
//     fontWeight: '800',
//     letterSpacing: -0.5,
//   },
//   progressSubtitle: {
//     fontSize: 15,
//     marginTop: 5,
//   },
//   quoteCard: {
//     borderRadius: 24,
//     padding: 25,
//     marginBottom: 30,
//     borderLeftWidth: 8,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 15,
//   },
//   quoteIconBadge: {
//     position: 'absolute',
//     top: -15,
//     right: 20,
//     backgroundColor: '#FF5235',
//     padding: 8,
//     borderRadius: 12,
//   },
//   quoteText: {
//     fontSize: 18,
//     lineHeight: 28,
//     fontStyle: 'italic',
//     marginBottom: 10,
//     fontWeight: '500',
//   },
//   quoteAuthor: {
//     fontSize: 14,
//     fontWeight: '700',
//     textAlign: 'right',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   seeAll: {
//     fontWeight: '600',
//   },
//   horizontalScroll: {
//     marginHorizontal: -20,
//     paddingLeft: 20,
//     marginBottom: 30,
//   },
//   challengeCard: {
//     width: width * 0.45,
//     borderRadius: 22,
//     padding: 20,
//     marginRight: 15,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 82, 53, 0.1)',
//   },
//   challengeIconContainer: {
//     padding: 15,
//     borderRadius: 18,
//     marginBottom: 12,
//   },
//   challengeTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 5,
//   },
//   challengePoints: {
//     fontSize: 13,
//   },
//   tipCard: {
//     borderRadius: 20,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.05)',
//   },
//   tipHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   tipTitle: {
//     fontSize: 17,
//     fontWeight: '700',
//     marginLeft: 10,
//   },
//   tipText: {
//     fontSize: 15,
//     lineHeight: 22,
//   },
// });

// export default HomeScreen;
// // // Home Screen
// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   RefreshControl,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// // import { useNavigation } from '@react-navigation/native';
// // import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// // import { useTheme } from '../contexts/ThemeContext';
// // import { useProgress } from '../contexts/ProgressContext';
// // import { getRandomQuote, getRandomTip, challenges } from '../data/lessons';
// // import { MotivationalQuote } from '../types';
// // import Header from '../components/Header';

// // type TabParamList = {
// //   Home: undefined;
// //   Lessons: { level?: 'beginner' | 'intermediate' | 'advanced' } | undefined;
// //   Quiz: { lessonId?: string } | undefined;
// //   Statistics: undefined;
// // };

// // type HomeNavigationProp = BottomTabNavigationProp<TabParamList>;

// // const HomeScreen: React.FC = () => {
// //   const navigation = useNavigation<HomeNavigationProp>();
// //   const { theme } = useTheme();
// //   const { progress, getTotalProgress, updateStreak } = useProgress();
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [quote, setQuote] = useState<MotivationalQuote>(getRandomQuote());
// //   const [tip, setTip] = useState<string>(getRandomTip());

// //   useEffect(() => {
// //     updateStreak();
// //   }, []);

// //   const onRefresh = () => {
// //     setRefreshing(true);
// //     setQuote(getRandomQuote());
// //     setTip(getRandomTip());
// //     setTimeout(() => setRefreshing(false), 500);
// //   };

// //   const totalProgress = getTotalProgress();

// //   return (
// //     <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
// //       <Header
// //         title="SwiftLearn"
// //         subtitle="Master Swift Programming"
// //         showThemeToggle
// //       />

// //       <ScrollView
// //         style={styles.scrollView}
// //         contentContainerStyle={styles.content}
// //         showsVerticalScrollIndicator={false}
// //         refreshControl={
// //           <RefreshControl
// //             refreshing={refreshing}
// //             onRefresh={onRefresh}
// //             tintColor={theme.colors.primary}
// //           />
// //         }
// //       >
// //         {/* Welcome Section */}
// //         <View style={styles.welcomeSection}>
// //           <View style={[styles.streakCard, { backgroundColor: theme.colors.primary + '15' }]}>
// //             <View style={styles.streakContent}>
// //               <Icon name="fire" size={32} color={theme.colors.primary} />
// //               <View style={styles.streakText}>
// //                 <Text style={[styles.streakNumber, { color: theme.colors.primary }]}>
// //                   {progress.dailyStreakCount}
// //                 </Text>
// //                 <Text style={[styles.streakLabel, { color: theme.colors.textSecondary }]}>
// //                   Day Streak
// //                 </Text>
// //               </View>
// //             </View>
// //           </View>

// //           <View style={[styles.pointsCard, { backgroundColor: theme.colors.secondary + '15' }]}>
// //             <View style={styles.streakContent}>
// //               <Icon name="star-circle" size={32} color={theme.colors.secondary} />
// //               <View style={styles.streakText}>
// //                 <Text style={[styles.streakNumber, { color: theme.colors.secondary }]}>
// //                   {progress.totalPoints}
// //                 </Text>
// //                 <Text style={[styles.streakLabel, { color: theme.colors.textSecondary }]}>
// //                   Total Points
// //                 </Text>
// //               </View>
// //             </View>
// //           </View>
// //         </View>

// //         {/* Overall Progress */}
// //         <View style={[styles.overallCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
// //           <View style={styles.overallHeader}>
// //             <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
// //               Overall Progress
// //             </Text>
// //             <Text style={[styles.progressPercent, { color: theme.colors.primary }]}>
// //               {totalProgress}%
// //             </Text>
// //           </View>
// //           <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
// //             <View
// //               style={[
// //                 styles.progressFill,
// //                 {
// //                   backgroundColor: theme.colors.primary,
// //                   width: `${totalProgress}%`,
// //                 },
// //               ]}
// //             />
// //           </View>
// //           <Text style={[styles.progressSubtext, { color: theme.colors.textSecondary }]}>
// //             {Math.round(totalProgress / 100 * 18)} of 18 lessons completed
// //           </Text>
// //         </View>

// //         {/* Quick Actions */}
// //         <View style={styles.actionsSection}>
// //           <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
// //             Quick Actions
// //           </Text>
// //           <View style={styles.actionsGrid}>
// //             <TouchableOpacity
// //               style={[styles.actionCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
// //               onPress={() => navigation.navigate('Lessons')}
// //             >
// //               <View style={[styles.actionIcon, { backgroundColor: theme.colors.success + '20' }]}>
// //                 <Icon name="book-open-variant" size={24} color={theme.colors.success} />
// //               </View>
// //               <Text style={[styles.actionTitle, { color: theme.colors.text }]}>Continue Learning</Text>
// //               <Text style={[styles.actionSubtitle, { color: theme.colors.textSecondary }]}>Start a lesson</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity
// //               style={[styles.actionCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
// //               onPress={() => navigation.navigate('Quiz')}
// //             >
// //               <View style={[styles.actionIcon, { backgroundColor: theme.colors.accent + '20' }]}>
// //                 <Icon name="clipboard-check" size={24} color={theme.colors.accent} />
// //               </View>
// //               <Text style={[styles.actionTitle, { color: theme.colors.text }]}>Take a Quiz</Text>
// //               <Text style={[styles.actionSubtitle, { color: theme.colors.textSecondary }]}>Test your skills</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         {/* Daily Tip */}
// //         <View style={[styles.tipCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
// //           <View style={styles.tipHeader}>
// //             <Icon name="lightbulb-on" size={24} color={theme.colors.warning} />
// //             <Text style={[styles.tipTitle, { color: theme.colors.text }]}>Daily Tip</Text>
// //           </View>
// //           <Text style={[styles.tipText, { color: theme.colors.textSecondary }]}>
// //             {tip}
// //           </Text>
// //         </View>

// //         {/* Motivation Card */}
// //         <View style={[styles.quoteCard, { backgroundColor: theme.colors.primary + '10' }]}>
// //           <Icon name="format-quote-open" size={28} color={theme.colors.primary} style={styles.quoteIcon} />
// //           <Text style={[styles.quoteText, { color: theme.colors.text }]}>
// //             "{quote.text}"
// //           </Text>
// //           <Text style={[styles.quoteAuthor, { color: theme.colors.textSecondary }]}>
// //             — {quote.author}
// //           </Text>
// //         </View>

// //         {/* Active Challenges */}
// //         <View style={styles.challengesSection}>
// //           <View style={styles.sectionHeader}>
// //             <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Challenges</Text>
// //             <TouchableOpacity onPress={() => navigation.navigate('Statistics')}>
// //               <Text style={[styles.seeAll, { color: theme.colors.primary }]}>See All</Text>
// //             </TouchableOpacity>
// //           </View>
// //           {challenges.filter(c => !progress.challengesCompleted.includes(c.id)).slice(0, 3).map((challenge) => (
// //             <View
// //               key={challenge.id}
// //               style={[styles.challengeCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
// //             >
// //               <View style={styles.challengeInfo}>
// //                 <Text style={[styles.challengeTitle, { color: theme.colors.text }]}>{challenge.title}</Text>
// //                 <Text style={[styles.challengeDesc, { color: theme.colors.textSecondary }]}>{challenge.description}</Text>
// //               </View>
// //               <View style={[styles.challengePoints, { backgroundColor: theme.colors.warning + '20' }]}>
// //                 <Icon name="star" size={14} color={theme.colors.warning} />
// //                 <Text style={[styles.challengePointsText, { color: theme.colors.warning }]}>{challenge.points}</Text>
// //               </View>
// //             </View>
// //           ))}
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   scrollView: {
// //     flex: 1,
// //   },
// //   content: {
// //     padding: 16,
// //     paddingBottom: 100,
// //   },
// //   welcomeSection: {
// //     flexDirection: 'row',
// //     gap: 12,
// //     marginBottom: 16,
// //   },
// //   streakCard: {
// //     flex: 1,
// //     borderRadius: 16,
// //     padding: 16,
// //   },
// //   pointsCard: {
// //     flex: 1,
// //     borderRadius: 16,
// //     padding: 16,
// //   },
// //   streakContent: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   streakText: {
// //     marginLeft: 12,
// //   },
// //   streakNumber: {
// //     fontSize: 24,
// //     fontWeight: '700',
// //   },
// //   streakLabel: {
// //     fontSize: 12,
// //   },
// //   overallCard: {
// //     borderRadius: 16,
// //     padding: 16,
// //     borderWidth: 1,
// //     marginBottom: 16,
// //   },
// //   overallHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 12,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //   },
// //   progressPercent: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //   },
// //   progressBar: {
// //     height: 12,
// //     borderRadius: 6,
// //     overflow: 'hidden',
// //   },
// //   progressFill: {
// //     height: '100%',
// //     borderRadius: 6,
// //   },
// //   progressSubtext: {
// //     marginTop: 8,
// //     fontSize: 13,
// //   },
// //   actionsSection: {
// //     marginBottom: 16,
// //   },
// //   actionsGrid: {
// //     flexDirection: 'row',
// //     gap: 12,
// //     marginTop: 12,
// //   },
// //   actionCard: {
// //     flex: 1,
// //     borderRadius: 16,
// //     padding: 16,
// //     borderWidth: 1,
// //     alignItems: 'center',
// //   },
// //   actionIcon: {
// //     width: 48,
// //     height: 48,
// //     borderRadius: 12,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginBottom: 8,
// //   },
// //   actionTitle: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //     textAlign: 'center',
// //   },
// //   actionSubtitle: {
// //     fontSize: 12,
// //     marginTop: 4,
// //     textAlign: 'center',
// //   },
// //   tipCard: {
// //     borderRadius: 16,
// //     padding: 16,
// //     borderWidth: 1,
// //     marginBottom: 16,
// //   },
// //   tipHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 8,
// //   },
// //   tipTitle: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     marginLeft: 8,
// //   },
// //   tipText: {
// //     fontSize: 14,
// //     lineHeight: 20,
// //   },
// //   quoteCard: {
// //     borderRadius: 16,
// //     padding: 20,
// //     marginBottom: 16,
// //   },
// //   quoteIcon: {
// //     marginBottom: 8,
// //   },
// //   quoteText: {
// //     fontSize: 16,
// //     fontStyle: 'italic',
// //     lineHeight: 24,
// //     marginBottom: 8,
// //   },
// //   quoteAuthor: {
// //     fontSize: 14,
// //     textAlign: 'right',
// //   },
// //   challengesSection: {
// //     marginBottom: 16,
// //   },
// //   sectionHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 12,
// //   },
// //   seeAll: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //   },
// //   challengeCard: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderRadius: 12,
// //     padding: 12,
// //     borderWidth: 1,
// //     marginBottom: 8,
// //   },
// //   challengeInfo: {
// //     flex: 1,
// //   },
// //   challengeTitle: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //   },
// //   challengeDesc: {
// //     fontSize: 12,
// //     marginTop: 2,
// //   },
// //   challengePoints: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingHorizontal: 10,
// //     paddingVertical: 6,
// //     borderRadius: 20,
// //   },
// //   challengePointsText: {
// //     fontSize: 12,
// //     fontWeight: '700',
// //     marginLeft: 4,
// //   },
// // });

// // export default HomeScreen;
