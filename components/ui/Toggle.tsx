import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { radius, spacing } from '../../constants/spacing';

interface ToggleProps {
  value:       boolean;
  onToggle:    (next: boolean) => void;
  label?:      string;
  subLabel?:   string;
  showDivider?:boolean;
}

export function Toggle({ value, onToggle, label, subLabel, showDivider = true }: ToggleProps) {
  return (
    <View style={[styles.toggleRow, showDivider && styles.toggleDivider]}>
      {(label || subLabel) && (
        <View style={{ flex: 1, gap: 2 }}>
          {label    && <Text style={styles.toggleLabel}>{label}</Text>}
          {subLabel && <Text style={styles.toggleSub}>{subLabel}</Text>}
        </View>
      )}
      <TouchableOpacity
        onPress={() => onToggle(!value)}
        activeOpacity={0.8}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
        accessibilityLabel={label}
        style={[styles.toggleTrack, value && styles.toggleOn]}
      >
        <View style={[styles.toggleKnob, value && styles.toggleKnobOn]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingVertical: spacing.sm,
    gap:            spacing.md,
  },
  toggleDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.bgElevated,
  },
  toggleLabel: { ...typography.body, color: colors.textPrimary },
  toggleSub:   { ...typography.caption, color: colors.textTertiary, letterSpacing: 0, textTransform: 'none' as const },
  toggleTrack: {
    width:           44,
    height:          24,
    borderRadius:    radius.pill,
    backgroundColor: colors.borderDefault,
    justifyContent:  'center',
    padding:         3,
  },
  toggleOn:      { backgroundColor: colors.brand },
  toggleKnob: {
    width:           18,
    height:          18,
    borderRadius:    9,
    backgroundColor: colors.white,
  },
  toggleKnobOn:  { alignSelf: 'flex-end' },
});
