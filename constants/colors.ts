/**
 * IS THIS SEAT TAKEN — Colour tokens
 *
 * LIGHT MODE ONLY. No dark mode in this app.
 *
 * Rule: never use a hex value directly in a component.
 * Always import from this file.
 *
 * Usage:
 *   import { colors } from '@/theme'
 *   style={{ backgroundColor: colors.brand }}
 */

export const colors = {

  // ── Backgrounds ──────────────────────────────────────────
  bgPrimary:    '#FFFFFF',   // default screen background
  bgSurface:    '#F8F7FF',   // input fields, secondary surfaces
  bgElevated:   '#F0EEFF',   // selected chip bg, banners, zodiac field

  // ── Brand ─────────────────────────────────────────────────
  brand:        '#6C3CE1',   // primary — all CTAs, active states, icons
  brandLight:   '#EDE9FE',   // chip selected bg (alias for bgElevated)
  brandDark:    '#5B21B6',   // text on purple-tinted backgrounds

  // ── Borders ───────────────────────────────────────────────
  borderDefault:'#E0DFF8',   // all default borders — soft purple-grey
  borderFocus:  '#6C3CE1',   // focused inputs, selected chips

  // ── Text ──────────────────────────────────────────────────
  textPrimary:  '#0D0D1A',   // headings, values, primary body
  textSecondary:'#9898B0',   // sub-labels, helper text, placeholders
  textTertiary: '#C0BFDA',   // hints, char counter, inactive labels
  textInactive: '#D0CFEA',   // inactive nav tab icons + labels

  // ── Semantic ──────────────────────────────────────────────
  success:      '#1D9E75',
  successBg:    '#D1FAE5',
  successBorder:'#A7F3D0',

  warning:      '#D97706',
  warningBg:    '#FEF3C7',
  warningBorder:'#FDE68A',

  error:        '#DC2626',
  errorBg:      '#FEE2E2',
  errorBorder:  '#FECACA',

  // ── Game accents ──────────────────────────────────────────
  // Used ONLY in their specific contexts (not general UI)
  matchPink:    '#B5195A',   // date vote button, reveal moment
  matchPinkBg:  '#FCE7F3',
  friendTeal:   '#0A7A9E',   // friends button only
  friendTealBg: '#E0F2FE',
  streakGold:   '#D97706',   // streak widget only (same as warning)
  streakGoldBg: '#FFFBEB',
  streakGoldBorder: '#FDE68A',

  // ── Answer states (question card) ─────────────────────────
  answerMatchBg:       '#D1FAE5',
  answerMatchBorder:   '#1D9E75',
  answerMatchText:     '#065F46',
  answerCompatBg:      '#F0EEFF',
  answerCompatBorder:  '#E0DFF8',
  answerCompatText:    '#5B21B6',
  answerNeutralBg:     '#F8F7FF',
  answerNeutralBorder: '#E0DFF8',
  answerNeutralText:   '#C0BFDA',
  answerOppBg:         '#FEE2E2',
  answerOppBorder:     '#FECACA',
  answerOppText:       '#991B1B',

  // ── Modal backdrop ────────────────────────────────────────
  modalBackdrop: 'rgba(13,13,26,0.5)',

  // ── Skeleton / shimmer ────────────────────────────────────
  skeleton:     '#F0EEFF',

  // ── Pure values ───────────────────────────────────────────
  white:        '#FFFFFF',
  transparent:  'transparent',

} as const;

export type ColorKey = keyof typeof colors;