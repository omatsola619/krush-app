/**
 * IS THIS SEAT TAKEN — Spacing, radius, shadow tokens
 *
 * Rule: never write a raw number for padding, margin,
 * borderRadius, or gap in a component. Use these values.
 *
 * Usage:
 *   import { spacing, radius, shadow } from '@/theme'
 *   style={{ padding: spacing.base, borderRadius: radius.card }}
 */

export const spacing = {
  xs:     4,
  sm:     7,
  md:     12,
  base:   16,
  lg:     24,
  xl:     32,
  xxl:    48,

  // Screen-level
  screenH: 24,   // horizontal screen padding (all screens)
  screenV: 20,   // vertical padding top of content below header
} as const;

export const radius = {
  xs:     6,    // letter badges inside answer options
  sm:     8,    // small elements, skeleton loaders
  md:     10,   // card radio buttons, small cards
  input:  12,   // all input fields, chips, small cards
  card:   14,   // answer option cards, list items
  lg:     16,   // main content cards, game mode cards
  xl:     20,   // modals, bottom sheets
  button: 14,   // all CTA buttons
  icon:   14,   // icon container squares (40-52px)
  pill:   999,  // chips, badges, avatars, toggles, progress bars
} as const;

export const shadow = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  // Not used visually — elevation is shown through borders only
  // This exists to explicitly override any default shadows
} as const;

export const border = {
  thin:   0.5,   // very subtle separators
  default: 1,    // most borders
  medium: 1.5,   // focused inputs, selected chips, active cards
  thick:  2,     // avatar tier borders
  ring:   3,     // floating play button ring, skin tone selection ring
} as const;

export const animation = {
  fast:    150,   // button press, chip select
  normal:  250,   // screen transitions, chip group changes
  slow:    400,   // progress bar fill, modal open
  reveal:  800,   // the match reveal moment
  easing: {
    default: [0.4, 0, 0.2, 1],   // ease in-out
    spring:  [0.34, 1.56, 0.64, 1], // spring bounce
    out:     [0.0, 0, 0.2, 1],   // ease out
  },
} as const;

export const avatarSize = {
  xs:  32,   // top bar, stacked group
  sm:  44,   // list items, match history rows
  md:  56,   // friends list, online row
  lg:  64,   // lobby hero card
  xl:  72,   // profile screen
  xxl: 96,   // reveal screen
} as const;

export const iconSize = {
  sm:  16,   // inline icons, field icons
  md:  20,   // card icons
  lg:  22,   // nav bar icons
  xl:  28,   // empty state icons
  xxl: 36,   // logo mark / splash
} as const;