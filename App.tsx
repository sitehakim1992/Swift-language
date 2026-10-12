/**
 * SwiftLearn - Swift Programming Learning App
 * A comprehensive React Native application for learning Swift programming
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme, LogBox, View, BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mobileAds from 'react-native-google-mobile-ads';

import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { ProgressProvider } from './src/contexts/ProgressContext';
import PrivacyConsentModal from './src/components/PrivacyConsentModal';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LessonsScreen from './src/screens/LessonsScreen';
import LessonDetailScreen from './src/screens/LessonDetailScreen';
import QuizScreen from './src/screens/QuizScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const PRIVACY_KEY = 'privacy_policy_accepted_v1';

// Navigation types
export type RootStackParamList = {
  MainTabs: undefined;
  LessonDetail: { lessonId: string };
};

export type TabParamList = {
  Home: undefined;
  Lessons: { level?: 'beginner' | 'intermediate' | 'advanced' } | undefined;
  Quiz: { lessonId?: string } | undefined;
  Statistics: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-open-variant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-check-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-bar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // null = still reading storage, false = not accepted yet, true = accepted
  const [accepted, setAccepted] = useState<boolean | null>(null);

  // 1) Read the saved consent on startup
  useEffect(() => {
    AsyncStorage.getItem(PRIVACY_KEY)
      .then(value => setAccepted(value === 'true'))
      .catch(() => setAccepted(false));
  }, []);

  // 2) Initialize AdMob ONLY after the user accepted the privacy policy
  useEffect(() => {
    if (accepted !== true) {
      return;
    }
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob initialized', adapterStatuses);
      })
      .catch(error => {
        console.log('AdMob initialization error', error);
      });
  }, [accepted]);

  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem(PRIVACY_KEY, 'true');
    } catch (e) {
      // if saving fails, the user can still continue for this session
    }
    setAccepted(true);
  };

  const handleDecline = () => {
    BackHandler.exitApp();
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      {accepted === null ? (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
      ) : accepted ? (
        <ThemeProvider>
          <ProgressProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </ProgressProvider>
        </ThemeProvider>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <PrivacyConsentModal
            visible
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        </View>
      )}
    </SafeAreaProvider>
  );
}

export default App;