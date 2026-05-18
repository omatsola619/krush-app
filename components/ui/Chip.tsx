/**
 * Chip — selection chip (pill shape)
 */

import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { border, spacing, radius } from '../../constants/spacing';

interface ChipProps {
  label:      string;
  selected?:  boolean;
  onPress?:   () => void;
  size?:      'sm' | 'md';
  disabled?:  boolean;
  removable?: boolean;
  onRemove?:  () => void;
}

export function Chip({
  label,
  selected  = false,
  onPress,
  size      = 'md',
  disabled  = false,
  removable = false,
  onRemove,
}: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={label}
      style={[
        styles.chip,
        size === 'sm' && styles.chipSm,
        selected       && styles.chipSelected,
        disabled       && styles.chipDisabled,
      ]}
    >
      <Text style={[
        styles.chipText,
        size === 'sm'  && styles.chipTextSm,
        selected        && styles.chipTextSelected,
      ]}>
        {label}
      </Text>
      {removable && selected && (
        <TouchableOpacity
          onPress={onRemove}
          style={styles.chipRemove}
          accessibilityLabel={`Remove ${label}`}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={{ fontSize: 11, color: colors.brand }}>✕</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

// Wraps chips in a flex-wrap row
export function ChipRow({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.chipRow, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  chip: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingVertical:   9,
    paddingHorizontal: 18,
    borderRadius:   radius.pill,
    borderWidth:    border.default,
    borderColor:    colors.borderDefault,
    backgroundColor: colors.bgSurface,
  },
  chipSm:          { paddingVertical: 7, paddingHorizontal: 13 },
  chipSelected: {
    borderColor:     colors.borderFocus,
    borderWidth:     border.medium,
    backgroundColor: colors.bgElevated,
  },
  chipDisabled:    { opacity: 0.35 },
  chipText:        { ...typography.body, color: colors.textSecondary },
  chipTextSm:      { fontSize: 12 },
  chipTextSelected:{ ...typography.labelSm, color: colors.brandDark },
  chipRemove:      { marginLeft: spacing.sm },
  chipRow:         { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});