// Navigation Component
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../contexts/ThemeContext';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import LessonsScreen from '../screens/LessonsScreen';
import QuizScreen from '../screens/QuizScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

export type RootTabParamList = {
  Home: undefined;
  Lessons: { level?: 'beginner' | 'intermediate' | 'advanced' } | undefined;
  Quiz: { lessonId?: string } | undefined;
  Statistics: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

interface NavigationProps {
  children: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
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
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Lessons"
          component={LessonsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="book-open-variant" size={size} color={color} />
            ),
            tabBarLabel: 'Lessons',
          }}
        />
        <Tab.Screen
          name="Quiz"
          component={QuizScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="clipboard-check-outline" size={size} color={color} />
            ),
            tabBarLabel: 'Quiz',
          }}
        />
        <Tab.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="chart-bar" size={size} color={color} />
            ),
            tabBarLabel: 'Stats',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
