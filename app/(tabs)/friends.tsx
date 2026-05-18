import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen, EmptyState } from '../../components';
import { typography } from '../../constants/typography';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function FriendsScreen() {
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <EmptyState 
        icon="👥"
        title="Your circle is empty" 
        description="Connect with people during speed dates to add them here." 
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
