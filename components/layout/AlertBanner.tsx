import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { radius, border, spacing } from '../../constants/spacing';

type AlertVariant = 'purple' | 'green' | 'amber' | 'red';

interface AlertBannerProps {
  message: string;
  variant?: AlertVariant;
  style?: ViewStyle;
}

const config: Record<AlertVariant, { bg: string; text: string; bd: string }> = {
  purple: { bg: colors.bgElevated,   text: colors.brandDark, bd: colors.borderDefault },
  green:  { bg: colors.successBg,    text: '#065F46',        bd: colors.successBorder },
  amber:  { bg: colors.warningBg,    text: '#92400E',        bd: colors.warningBorder },
  red:    { bg: colors.errorBg,      text: '#991B1B',        bd: colors.errorBorder   },
};

export function AlertBanner({ message, variant = 'purple', style }: AlertBannerProps) {
  const c = config[variant];

  return (
    <View style={[styles.container, { backgroundColor: c.bg, borderColor: c.bd }, style]}>
      <Text style={[styles.text, { color: c.text }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: border.default,
    width: '100%',
  },
  text: {
    ...typography.bodySm,
  },
});
