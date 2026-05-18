/**
 * Button — IS THIS SEAT TAKEN?
 *
 * The only button component in this app.
 * Never use React Native's built-in Button.
 * Never create a one-off styled TouchableOpacity for a button.
 *
 * Variants:
 *   primary   — filled purple, white text (main CTAs)
 *   ghost     — transparent, purple border + text
 *   secondary — light grey fill, muted text
 *   danger    — light red fill, red text
 *   match     — filled pink (date vote)
 *   friend    — filled teal (friend vote)
 *
 * Sizes:
 *   lg — 15px, padding 15px (primary CTAs)
 *   md — 14px, padding 13px (default)
 *   sm — 12px, padding 8px  (inline, compact)
 *
 * Usage:
 *   <Button label="Find my seat" onPress={fn} />
 *   <Button label="Skip" variant="ghost" size="sm" />
 *   <Button label="Loading..." loading />
 *   <Button label="Continue" disabled />
 */

import React from 'react';
import {
  TouchableOpacity, Text, ActivityIndicator,
  View, StyleSheet, ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { border, spacing } from '../../constants/spacing';
import { radius } from '../../constants/spacing';

type Variant = 'primary' | 'ghost' | 'secondary' | 'danger' | 'match' | 'friend';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label:      string;
  onPress?:   () => void;
  variant?:   Variant;
  size?:      Size;
  loading?:   boolean;
  disabled?:  boolean;
  fullWidth?: boolean;
  leftIcon?:  React.ReactNode;
  style?:     ViewStyle;
}

const variantStyles: Record<Variant, { bg: string; text: string; borderColor: string; borderWidth: number }> = {
  primary:   { bg: colors.brand,      text: colors.white,        borderColor: colors.brand,         borderWidth: 0 },
  ghost:     { bg: colors.transparent,text: colors.brand,        borderColor: colors.brand,         borderWidth: border.medium },
  secondary: { bg: colors.bgSurface,  text: colors.textSecondary,borderColor: colors.borderDefault, borderWidth: border.default },
  danger:    { bg: colors.errorBg,    text: '#991B1B',           borderColor: colors.errorBorder,   borderWidth: border.default },
  match:     { bg: colors.matchPink,  text: colors.white,        borderColor: colors.matchPink,     borderWidth: 0 },
  friend:    { bg: colors.friendTeal, text: colors.white,        borderColor: colors.friendTeal,    borderWidth: 0 },
};

const sizeStyles: Record<Size, { paddingVertical: number; fontSize: number; borderRadius: number }> = {
  lg: { paddingVertical: 15, fontSize: 15, borderRadius: radius.button },
  md: { paddingVertical: 13, fontSize: 14, borderRadius: radius.button },
  sm: { paddingVertical: 8,  fontSize: 12, borderRadius: radius.md     },
};

export function Button({
  label,
  onPress,
  variant   = 'primary',
  size      = 'lg',
  loading   = false,
  disabled  = false,
  fullWidth = true,
  leftIcon,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.87}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={[
        styles.base,
        {
          backgroundColor:  v.bg,
          borderColor:      v.borderColor,
          borderWidth:      v.borderWidth,
          borderRadius:     s.borderRadius,
          paddingVertical:  s.paddingVertical,
          opacity: isDisabled ? 0.4 : 1,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'ghost' ? colors.brand : colors.white}
        />
      ) : (
        <View style={styles.inner}>
          {leftIcon && <View style={styles.iconWrap}>{leftIcon}</View>}
          <Text
            style={[
              typography.label,
              { color: v.text, fontSize: s.fontSize },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

/**
 * VoteButtons — the Date / Friends / Pass trio
 * Used at the end of every speed date session.
 * Always renders 3 equal-width buttons in a row.
 */
interface VoteButtonsProps {
  onDate?:    () => void;
  onFriend?:  () => void;
  onPass?:    () => void;
  disabled?:  boolean;
}

export function VoteButtons({ onDate, onFriend, onPass, disabled }: VoteButtonsProps) {
  return (
    <View style={styles.voteRow}>
      <TouchableOpacity
        style={[styles.voteBtn, { backgroundColor: colors.matchPink }]}
        onPress={onDate}
        disabled={disabled}
        activeOpacity={0.87}
        accessibilityRole="button"
        accessibilityLabel="Vote to date"
      >
        <Text style={[styles.voteTxt, { color: colors.white }]}>❤  Date</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.voteBtn, { backgroundColor: colors.friendTeal }]}
        onPress={onFriend}
        disabled={disabled}
        activeOpacity={0.87}
        accessibilityRole="button"
        accessibilityLabel="Vote to be friends"
      >
        <Text style={[styles.voteTxt, { color: colors.white }]}>Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.voteBtn, { backgroundColor: colors.bgSurface, borderWidth: border.default, borderColor: colors.borderDefault }]}
        onPress={onPass}
        disabled={disabled}
        activeOpacity={0.87}
        accessibilityRole="button"
        accessibilityLabel="Pass"
      >
        <Text style={[styles.voteTxt, { color: colors.textTertiary }]}>Pass</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * IconButton — circular button for icons
 * Used for back arrows, close buttons, share, settings etc.
 */
interface IconButtonProps {
  icon:               React.ReactNode;
  onPress?:           () => void;
  variant?:           'default' | 'primary';
  size?:              number;
  accessibilityLabel: string;
  style?:             ViewStyle;
}

export function IconButton({
  icon, onPress, variant = 'default',
  size = 40, accessibilityLabel, style,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          width:           size,
          height:          size,
          borderRadius:    size / 2,
          backgroundColor: variant === 'primary' ? colors.brand : colors.bgSurface,
          borderWidth:     variant === 'default' ? border.default : 0,
          borderColor:     colors.borderDefault,
          alignItems:      'center',
          justifyContent:  'center',
        },
        style,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems:    'center',
    justifyContent:'center',
    paddingHorizontal: spacing.lg,
  },
  fullWidth:  { width: '100%' },
  inner:      { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconWrap:   { marginRight: 2 },
  voteRow:    { flexDirection: 'row', gap: spacing.sm },
  voteBtn: {
    flex: 1, paddingVertical: 12,
    borderRadius: radius.input,
    alignItems: 'center', justifyContent: 'center',
  },
  voteTxt: {
    ...typography.labelSm,
    fontSize: 12,
  },
});