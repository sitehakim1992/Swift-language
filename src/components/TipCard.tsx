// Tip Card Component
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../contexts/ThemeContext';

interface TipCardProps {
  tip: string;
  index?: number;
}

const TipCard: React.FC<TipCardProps> = ({ tip, index = 0 }) => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const tipIcons = ['lightbulb', 'code-tags', 'rocket', 'star', 'zap'];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
        style={styles.header}
      >
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.warning + '20' }]}>
          <Icon
            name={tipIcons[index % tipIcons.length]}
            size={20}
            color={theme.colors.warning}
          />
        </View>
        <View style={styles.content}>
          <Text style={[styles.tipText, { color: theme.colors.text }]} numberOfLines={expanded ? undefined : 2}>
            {tip}
          </Text>
        </View>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: 12,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default TipCard;
