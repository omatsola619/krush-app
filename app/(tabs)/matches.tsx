import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen, EmptyState } from '../../components';
import { typography } from '../../constants/typography';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function MatchesScreen() {
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Matches</Text>
      <EmptyState 
        icon="💌"
        title="No matches yet" 
        description="Play a few speed dates to find your spark." 
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.base,
  },
});
