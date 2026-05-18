import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { border, radius } from '../../constants/spacing';

type BadgeVariant = 'purple' | 'green' | 'amber' | 'red' | 'teal' | 'grey';

interface BadgeProps {
  label:    string;
  variant?: BadgeVariant;
}

const badgeConfig: Record<BadgeVariant, { bg: string; text: string; bd: string }> = {
  purple: { bg: colors.bgElevated,   text: colors.brandDark,  bd: colors.borderDefault   },
  green:  { bg: colors.successBg,    text: '#065F46',         bd: colors.successBorder   },
  amber:  { bg: colors.warningBg,    text: '#92400E',         bd: colors.warningBorder   },
  red:    { bg: colors.errorBg,      text: '#991B1B',         bd: colors.errorBorder     },
  teal:   { bg: colors.friendTealBg, text: '#0C4A6E',         bd: '#BAE6FD'              },
  grey:   { bg: '#F1F5F9',           text: '#64748B',         bd: '#E2E8F0'              },
};

export function Badge({ label, variant = 'grey' }: BadgeProps) {
  const c = badgeConfig[variant];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg, borderColor: c.bd }]}>
      <Text style={[styles.badgeText, { color: c.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical:   4,
    paddingHorizontal: 10,
    borderRadius:      radius.pill,
    borderWidth:       border.default,
  },
  badgeText: { ...typography.micro, letterSpacing: 0, textTransform: 'none' as const },
});
