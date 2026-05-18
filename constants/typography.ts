/**
 * IS THIS SEAT TAKEN — Typography tokens
 *
 * Font: Inter (load via @expo-google-fonts/inter)
 *
 * Rule: never write a raw fontSize or fontFamily in a component.
 * Always use these styles via spread or direct reference.
 *
 * Usage:
 *   import { typography } from '@/theme'
 *   style={[typography.title, { color: colors.textPrimary }]}
 */

import { TextStyle } from 'react-native';

export const fontFamily = {
  regular:   'Inter_400Regular',
  medium:    'Inter_500Medium',
  semiBold:  'Inter_600SemiBold',
  bold:      'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
} as const;

export const typography = {

  /**
   * Display — 28px / 800
   * Used for: app name on splash, chemistry %, big reward numbers
   */
  display: {
    fontFamily:    fontFamily.extraBold,
    fontSize:      28,
    lineHeight:    32,
    letterSpacing: -0.84,
  } as TextStyle,

  /**
   * Title — 22px / 800
   * Used for: screen headings ("Create account", "Choose your avatar")
   */
  title: {
    fontFamily:    fontFamily.extraBold,
    fontSize:      24,
    lineHeight:    26,
    letterSpacing: -0.44,
  } as TextStyle,

  /**
   * Title sm — 19px / 800
   * Used for: onboarding step headings
   */
  titleSm: {
    fontFamily:    fontFamily.extraBold,
    fontSize:      19,
    lineHeight:    23,
    letterSpacing: -0.38,
  } as TextStyle,

  /**
   * Heading — 16px / 700
   * Used for: section labels, card titles, "Choose a game"
   */
  heading: {
    fontFamily: fontFamily.bold,
    fontSize:   16,
    lineHeight: 21,
  } as TextStyle,

  /**
   * Body lg — 15px / 500
   * Used for: prominent body text, nav item names in top bar
   */
  bodyLg: {
    fontFamily: fontFamily.medium,
    fontSize:   15,
    lineHeight: 22,
  } as TextStyle,

  /**
   * Body — 14px / 400
   * Used for: standard body, input values, chip text, sub-text
   */
  body: {
    fontFamily: fontFamily.regular,
    fontSize:   14,
    lineHeight: 23,
  } as TextStyle,

  /**
   * Body sm — 13px / 400
   * Used for: helper text, sub-labels, footer links, game captions
   */
  bodySm: {
    fontFamily: fontFamily.regular,
    fontSize:   13,
    lineHeight: 21,
  } as TextStyle,

  /**
   * Label — 14px / 700
   * Used for: primary button text
   */
  label: {
    fontFamily: fontFamily.bold,
    fontSize:   14,
    lineHeight: 18,
  } as TextStyle,

  /**
   * Label sm — 13px / 600
   * Used for: secondary button text, chip selected text, link text
   */
  labelSm: {
    fontFamily: fontFamily.semiBold,
    fontSize:   13,
    lineHeight: 17,
  } as TextStyle,

  /**
   * Caption — 11px / 700 / UPPERCASE
   * Used for: field labels above inputs, nav tab labels, stat card labels
   */
  caption: {
    fontFamily:     fontFamily.bold,
    fontSize:       11,
    lineHeight:     14,
    letterSpacing:  0.66,
    textTransform:  'uppercase' as const,
  } as TextStyle,

  /**
   * Micro — 10px / 600 / UPPERCASE
   * Used for: badge text, secondary captions, seat/streak sub-labels
   */
  micro: {
    fontFamily:    fontFamily.semiBold,
    fontSize:      10,
    lineHeight:    12,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
  } as TextStyle,

} as const;