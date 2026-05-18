import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Screen, Avatar, Button, StatCard } from '../../components';
import { typography } from '../../constants/typography';
import { colors } from '../../constants/colors';
import { spacing, radius, border } from '../../constants/spacing';
import { avatarSize } from '../../constants/index';

export default function ProfileScreen() {
  return (
    <Screen noPadding style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Avatar size={avatarSize.xl} initials="J" tier="legendary" />
          <Text style={styles.name}>Jane Doe</Text>
          <Text style={styles.username}>@janedoe</Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard label="Dates" value={12} />
          <StatCard label="Reveals" value={4} />
          <StatCard label="Streak" value={3} />
        </View>

        <View style={styles.actions}>
          <Button label="Edit Profile" variant="secondary" />
          <Button label="Sign Out" variant="ghost" />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: spacing.screenH,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  name: {
    ...typography.title,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: 2,
  },
  username: {
    ...typography.body,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.base,
    marginBottom: spacing.xl,
  },
  actions: {
    gap: spacing.base,
  },
});
