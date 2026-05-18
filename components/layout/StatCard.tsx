import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { radius, border, spacing } from '../../constants/spacing';

interface StatCardProps {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: border.default,
    borderColor: colors.borderDefault,
    padding: spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    ...typography.display,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
