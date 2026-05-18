/**
 * Input — IS THIS SEAT TAKEN?
 *
 * The only input component in this app.
 * Handles all input types: text, password, search, textarea, dropdown display.
 *
 * Usage:
 *   <Input label="Username" placeholder="your_name" />
 *   <Input label="Password" variant="password" />
 *   <Input label="Email" state="success" successMessage="Available" />
 *   <Input label="Email" state="error" errorMessage="Enter a valid email" />
 *   <Input label="Bio" variant="textarea" charLimit={300} value={bio} />
 */

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, TextInputProps, ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { border, spacing } from '../../constants/spacing';
import { radius } from '../../constants/spacing';
type InputVariant = 'default' | 'password' | 'search' | 'textarea';
type InputState   = 'default' | 'focused' | 'success' | 'error' | 'disabled';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?:          string;
  hint?:           string;
  successMessage?: string;
  errorMessage?:   string;
  variant?:        InputVariant;
  state?:          InputState;
  charLimit?:      number;
  rightElement?:   React.ReactNode;
  containerStyle?: ViewStyle;
}

const stateBorder: Record<InputState, string> = {
  default:  colors.borderDefault,
  focused:  colors.borderFocus,
  success:  colors.borderFocus,
  error:    colors.error,
  disabled: colors.borderDefault,
};

const stateBg: Record<InputState, string> = {
  default:  colors.bgSurface,
  focused:  colors.bgSurface,
  success:  colors.bgSurface,
  error:    '#FFF8F8',
  disabled: colors.bgSurface,
};

export function Input({
  label,
  hint,
  successMessage,
  errorMessage,
  variant        = 'default',
  state          = 'default',
  charLimit,
  rightElement,
  containerStyle,
  value,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [internalFocused, setInternalFocused] = useState(false);
  const [showPassword, setShowPassword]        = useState(false);

  const resolvedState: InputState =
    state !== 'default' ? state :
    internalFocused      ? 'focused' : 'default';

  const isPassword = variant === 'password';
  const isTextarea = variant === 'textarea';
  const isSearch   = variant === 'search';

  const borderColor  = stateBorder[resolvedState];
  const borderWidth  = ['focused','success','error'].includes(resolvedState)
    ? border.medium : border.default;
  const bgColor      = stateBg[resolvedState];

  return (
    <View style={[styles.wrap, containerStyle]}>
      {label && (
        <Text style={styles.label} accessibilityRole="none">
          {label.toUpperCase()}
        </Text>
      )}

      <View style={[
        styles.inputBox,
        { borderColor, borderWidth, backgroundColor: bgColor },
        isTextarea && styles.textareaBox,
        state === 'disabled' && styles.disabled,
      ]}>
        {isSearch && (
          <Feather name="search" size={16} color={colors.textTertiary} style={styles.searchIcon} />
        )}

        <TextInput
          style={[
            styles.input,
            isTextarea && styles.textareaInput,
            isSearch   && { paddingLeft: 0 },
          ]}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={isPassword && !showPassword}
          multiline={isTextarea}
          numberOfLines={isTextarea ? 4 : 1}
          textAlignVertical={isTextarea ? 'top' : 'auto'}
          editable={state !== 'disabled'}
          value={value}
          onFocus={e => { setInternalFocused(true); onFocus?.(e); }}
          onBlur={e  => { setInternalFocused(false); onBlur?.(e); }}
          {...rest}
        />

        {/* Right slot — password toggle, tick, alert, or custom */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(p => !p)}
            style={styles.rightIcon}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Feather 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={18} 
              color={colors.textTertiary} 
            />
          </TouchableOpacity>
        )}
        {!isPassword && resolvedState === 'success' && (
          <View style={styles.rightIcon} accessibilityElementsHidden>
            <Feather name="check" size={16} color={colors.success} />
          </View>
        )}
        {!isPassword && resolvedState === 'error' && (
          <View style={styles.rightIcon} accessibilityElementsHidden>
            <Feather name="alert-circle" size={16} color={colors.error} />
          </View>
        )}
        {rightElement && !isPassword && (
          <View style={styles.rightIcon}>{rightElement}</View>
        )}
      </View>

      {/* Char counter for textarea */}
      {isTextarea && charLimit && (
        <Text style={styles.charCount}>
          {(value as string)?.length ?? 0} / {charLimit}
        </Text>
      )}

      {/* Below-field messages */}
      {resolvedState === 'success' && successMessage && (
        <Text style={[styles.message, { color: colors.success }]}>
          ✓ {successMessage}
        </Text>
      )}
      {resolvedState === 'error' && errorMessage && (
        <Text style={[styles.message, { color: colors.error }]}>
          {errorMessage}
        </Text>
      )}
      {hint && resolvedState === 'default' && (
        <Text style={styles.hint}>{hint}</Text>
      )}
    </View>
  );
}

/**
 * PasswordStrengthBar
 * Renders below a password Input when you want to show strength.
 * Pass the raw password value — it calculates strength internally.
 */
export function PasswordStrengthBar({ value }: { value: string }) {
  const strength =
    !value          ? 0 :
    value.length < 6 ? 1 :
    value.length < 10 ? 2 : 3;

  const fillColor = [
    colors.transparent,
    colors.error,
    colors.warning,
    colors.success,
  ][strength];

  const label = ['', 'Weak password', 'Fair password', 'Strong password'][strength];

  return (
    <View style={strengthStyles.wrap}>
      <View style={strengthStyles.track}>
        <View style={[
          strengthStyles.fill,
          { width: `${(strength / 3) * 100}%` as any, backgroundColor: fillColor },
        ]} />
      </View>
      {strength > 0 && (
        <Text style={[strengthStyles.label, { color: fillColor }]}>{label}</Text>
      )}
    </View>
  );
}

/**
 * OTPInput — 6-box verification code input
 * Used on phone/email verification screens.
 */
export function OTPInput({ length = 6, value = '' }: {
  length?: number;
  value?:  string;
}) {
  return (
    <View style={otpStyles.row} accessibilityLabel="Verification code">
      {Array.from({ length }).map((_, i) => {
        const char     = value[i];
        const isActive = i === value.length;
        const isFilled = i < value.length;
        return (
          <View
            key={i}
            style={[
              otpStyles.box,
              isActive && otpStyles.boxActive,
              isFilled && otpStyles.boxFilled,
            ]}
          >
            <Text style={otpStyles.char}>{char ?? '—'}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:       { gap: spacing.xs },
  label: {
    ...typography.caption,
    color:        colors.textSecondary,
    marginBottom: 2,
  },
  inputBox: {
    flexDirection:     'row',
    alignItems:        'center',
    borderRadius:      radius.input,
    paddingHorizontal: spacing.md,
    paddingVertical:   14,
    minHeight:         52,
  },
  textareaBox:  { alignItems: 'flex-start', minHeight: 80 },
  input: {
    flex:  1,
    ...typography.body,
    lineHeight: undefined,   // iOS clips text when lineHeight is set on TextInput
    color: colors.textPrimary,
    padding: 0,
    includeFontPadding: false,
  },
  textareaInput: { paddingTop: 0 },
  rightIcon:     { marginLeft: spacing.sm },
  searchIcon:    { marginRight: spacing.sm, fontSize: 16 },
  charCount: {
    ...typography.caption,
    color:     colors.textTertiary,
    textAlign: 'right',
    letterSpacing: 0,
    textTransform: 'none' as const,
  },
  message: {
    ...typography.caption,
    letterSpacing:  0,
    textTransform:  'none' as const,
  },
  hint: {
    ...typography.caption,
    color:          colors.textTertiary,
    letterSpacing:  0,
    textTransform:  'none' as const,
    lineHeight:     16,
  },
  disabled: { opacity: 0.4 },
});

const strengthStyles = StyleSheet.create({
  wrap:  { gap: 4, marginTop: 2 },
  track: {
    height:          4,
    backgroundColor: colors.bgElevated,
    borderRadius:    radius.pill,
    overflow:        'hidden',
  },
  fill:  { height: 4, borderRadius: radius.pill },
  label: {
    ...typography.caption,
    letterSpacing:  0,
    textTransform:  'none' as const,
  },
});

const otpStyles = StyleSheet.create({
  row:  { flexDirection: 'row', gap: spacing.sm },
  box: {
    flex:            1,
    height:          52,
    borderRadius:    radius.input,
    borderWidth:     border.default,
    borderColor:     colors.borderDefault,
    backgroundColor: colors.bgSurface,
    alignItems:      'center',
    justifyContent:  'center',
  },
  boxActive: {
    borderColor:  colors.borderFocus,
    borderWidth:  border.medium,
  },
  boxFilled: {
    borderColor: colors.success,
  },
  char: {
    ...typography.title,
    color: colors.textPrimary,
  },
});