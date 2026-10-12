// Lesson Detail Screen — Redesigned
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
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

type RootStackParamList = {
  LessonDetail: { lessonId: string };
};

type LessonDetailRouteProp = RouteProp<RootStackParamList, 'LessonDetail'>;

// ضع هنا Ad Unit ID الخاص بإعلان "إكمال الدرس" (منفصل عن إعلان الكويز)
const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-6551659254419770/8105375162';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const D = {
  bg: '#0A0E1A',
  card: '#141B2D',
  cardBorder: '#1E2A45',
  cardHover: '#18213A',
  indigo: '#6366F1',
  indigoDim: 'rgba(99,102,241,0.13)',
  gold: '#F59E0B',
  goldDim: 'rgba(245,158,11,0.13)',
  emerald: '#10B981',
  emeraldDim: 'rgba(16,185,129,0.13)',
  rose: '#F43F5E',
  roseDim: 'rgba(244,63,94,0.13)',
  orange: '#F97316',
  violet: '#8B5CF6',
  violetDim: 'rgba(139,92,246,0.13)',
  sky: '#38BDF8',
  skyDim: 'rgba(56,189,248,0.13)',
  textPrimary: '#F1F5F9',
  textSecondary: '#64748B',
};

const LEVEL_CONFIG = {
  beginner:     { color: D.emerald, dim: D.emeraldDim, icon: 'sprout',            label: 'Beginner'     },
  intermediate: { color: D.orange,  dim: D.goldDim,    icon: 'tree',              label: 'Intermediate' },
  advanced:     { color: D.rose,    dim: D.roseDim,    icon: 'tree-of-knowledge', label: 'Advanced'     },
};

type SectionKey = 'content' | 'code' | 'explanation' | 'tips';

const SECTIONS: Array<{ key: SectionKey; label: string; icon: string; color: string; dim: string }> = [
  { key: 'content',     label: 'Theory',       icon: 'text-box-outline',  color: D.sky,    dim: D.skyDim    },
  { key: 'code',        label: 'Code Example', icon: 'code-tags',         color: D.indigo, dim: D.indigoDim },
  { key: 'explanation', label: 'Explanation',  icon: 'lightbulb-outline', color: D.gold,   dim: D.goldDim   },
  { key: 'tips',        label: 'Pro Tips',     icon: 'star-outline',      color: D.emerald,dim: D.emeraldDim},
];

const LessonDetailScreen: React.FC = () => {
  const route = useRoute<LessonDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { markLessonComplete, progress } = useProgress();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [expandedSection, setExpandedSection] = useState<SectionKey | null>('code');
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const foundLesson = swiftLessons.find(l => l.id === route.params.lessonId);
    setLesson(foundLesson || null);
  }, [route.params.lessonId]);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
      },
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setAdLoaded(false);
        interstitial.load(); // إعادة تحضير إعلان جديد
      },
    );

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  if (!lesson) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header title="Lesson" showBack onBack={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <Icon name="book-open-variant" size={48} color={D.textSecondary} style={{ opacity: 0.4 }} />
          <Text style={styles.loadingText}>Lesson not found</Text>
        </View>
      </View>
    );
  }

  const level = lesson.level;
  const levelConf = LEVEL_CONFIG[level] || LEVEL_CONFIG.beginner;
  const isCompleted = progress[level].completedLessons.includes(lesson.id);
  const allLessons = getLessonsByLevel(level);
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleMarkComplete = async () => {
    await markLessonComplete(lesson.id);
    Alert.alert(
      '🎉 Lesson Completed!',
      "You've completed this lesson. Keep going!",
      [
        {
          text: 'Next Lesson',
          onPress: () => {
            // الإعلان يظهر بعد ضغط المستخدم، أي بعد نقطة انتقال طبيعية
            if (adLoaded) {
              interstitial.show();
            }
            nextLesson && (navigation as any).push('LessonDetail', { lessonId: nextLesson.id });
          },
        },
        {
          text: 'Back to Lessons',
          onPress: () => {
            if (adLoaded) {
              interstitial.show();
            }
            navigation.goBack();
          },
        },
      ]
    );
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

        {/* Hero Card */}
        <View style={[styles.heroCard, { backgroundColor: D.card, borderColor: D.cardBorder }]}>
          <View style={styles.heroTopRow}>
            <View style={[styles.levelBadge, { backgroundColor: levelConf.dim, borderColor: levelConf.color + '50' }]}>
              <Icon name={levelConf.icon} size={13} color={levelConf.color} />
              <Text style={[styles.levelBadgeText, { color: levelConf.color }]}>{levelConf.label}</Text>
            </View>
            <View style={styles.orderBadge}>
              <Text style={styles.orderText}>#{lesson.order}</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>{lesson.title}</Text>
          <Text style={styles.heroDesc}>{lesson.description}</Text>

          {isCompleted && (
            <View style={[styles.completedBanner, { backgroundColor: D.emerald + '18', borderColor: D.emerald + '40' }]}>
              <Icon name="check-circle" size={16} color={D.emerald} />
              <Text style={[styles.completedBannerText, { color: D.emerald }]}>Lesson Completed</Text>
            </View>
          )}
        </View>

        {/* Accordion Sections */}
        {SECTIONS.map((sec) => {
          const isExpanded = expandedSection === sec.key;
          return (
            <View key={sec.key} style={styles.sectionWrap}>
              <TouchableOpacity
                style={[
                  styles.sectionHeader,
                  { backgroundColor: D.card, borderColor: isExpanded ? sec.color + '50' : D.cardBorder },
                  isExpanded && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
                ]}
                onPress={() => setExpandedSection(isExpanded ? null : sec.key)}
                activeOpacity={0.8}
              >
                <View style={[styles.sectionHeaderIcon, { backgroundColor: sec.dim }]}>
                  <Icon name={sec.icon} size={18} color={sec.color} />
                </View>
                <Text style={styles.sectionHeaderLabel}>{sec.label}</Text>
                {sec.key === 'tips' && (
                  <View style={[styles.tipCountBadge, { backgroundColor: sec.dim }]}>
                    <Text style={[styles.tipCountText, { color: sec.color }]}>{lesson.tips.length}</Text>
                  </View>
                )}
                <View style={[styles.chevronWrap, isExpanded && { backgroundColor: sec.dim }]}>
                  <Icon
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={isExpanded ? sec.color : D.textSecondary}
                  />
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={[
                  styles.sectionBody,
                  { backgroundColor: D.card, borderColor: sec.color + '50' },
                ]}>
                  {sec.key === 'code' ? (
                    <CodeBlock code={lesson.codeExample} />
                  ) : sec.key === 'tips' ? (
                    <View style={styles.tipsInner}>
                      {lesson.tips.map((tip, i) => <TipCard key={i} tip={tip} index={i} />)}
                    </View>
                  ) : (
                    <Text style={styles.bodyText}>
                      {sec.key === 'content' ? lesson.content : lesson.explanation}
                    </Text>
                  )}
                </View>
              )}
            </View>
          );
        })}

        {/* Navigation */}
        <View style={styles.navSection}>
          <View style={styles.navRow}>
            {prevLesson && (
              <TouchableOpacity
                style={[styles.navBtn, { backgroundColor: D.card, borderColor: D.cardBorder }]}
                onPress={() => (navigation as any).push('LessonDetail', { lessonId: prevLesson.id })}
                activeOpacity={0.8}
              >
                <Icon name="arrow-left" size={16} color={D.textSecondary} />
                <View style={styles.navBtnText}>
                  <Text style={styles.navBtnLabel}>Previous</Text>
                  <Text style={styles.navBtnTitle} numberOfLines={1}>{prevLesson.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            {nextLesson && (
              <TouchableOpacity
                style={[styles.navBtn, styles.navBtnRight, { backgroundColor: D.card, borderColor: D.cardBorder }]}
                onPress={() => (navigation as any).push('LessonDetail', { lessonId: nextLesson.id })}
                activeOpacity={0.8}
              >
                <View style={[styles.navBtnText, { alignItems: 'flex-end' }]}>
                  <Text style={styles.navBtnLabel}>Next</Text>
                  <Text style={styles.navBtnTitle} numberOfLines={1}>{nextLesson.title}</Text>
                </View>
                <Icon name="arrow-right" size={16} color={D.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {!isCompleted && (
            <TouchableOpacity
              style={[styles.completeBtn, { backgroundColor: D.indigo }]}
              onPress={handleMarkComplete}
              activeOpacity={0.85}
            >
              <Icon name="check-circle-outline" size={20} color="#fff" />
              <Text style={styles.completeBtnText}>Mark as Complete</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: D.textSecondary,
  },

  // Hero Card
  heroCard: {
    margin: 16,
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  orderBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  orderText: {
    fontSize: 12,
    color: D.textSecondary,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: D.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 8,
    lineHeight: 28,
  },
  heroDesc: {
    fontSize: 14,
    lineHeight: 22,
    color: D.textSecondary,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  completedBannerText: {
    fontSize: 13,
    fontWeight: '700',
  },

  // Accordion
  sectionWrap: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  sectionHeaderIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: D.textPrimary,
    letterSpacing: -0.2,
  },
  tipCountBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tipCountText: {
    fontSize: 12,
    fontWeight: '800',
  },
  chevronWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionBody: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 24,
    color: D.textSecondary,
  },
  tipsInner: { gap: 0 },

  // Navigation
  navSection: {
    margin: 16,
    marginTop: 24,
    gap: 12,
  },
  navRow: {
    flexDirection: 'row',
    gap: 10,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  navBtnRight: {
    justifyContent: 'flex-end',
  },
  navBtnText: {
    flex: 1,
  },
  navBtnLabel: {
    fontSize: 10,
    color: D.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  navBtnTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: D.textPrimary,
  },
  completeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 18,
  },
  completeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.2,
  },
});

export default LessonDetailScreen;