# AGENT PROMPT — IS THIS SEAT TAKEN?
# Give this exact prompt to your AI IDE agent to kick off the build.
# It tells the agent everything it needs to know before writing a single line.

---

You are building a React Native + Expo app called "Is This Seat Taken?"

Before writing any code, read every file in this project:
- RULES.md                        ← project rules, must follow at all times
- src/theme/colors.ts             ← every colour token
- src/theme/typography.ts         ← every font style
- src/theme/spacing.ts            ← every spacing, radius, border, animation token
- src/theme/index.ts              ← theme barrel
- src/components/ui/Button.tsx    ← Button, VoteButtons, IconButton
- src/components/ui/Input.tsx     ← Input, PasswordStrengthBar, OTPInput
- src/components/ui/Chip.tsx      ← Chip, ChipRow, Badge, Toggle, Avatar, AvatarStack
- src/components/layout/Screen.tsx← Screen, OnboardingBar, AlertBanner, Modal, StatCard, EmptyState
- src/components/index.ts         ← component barrel

These files define the entire design system and component library.
You must use these and only these components when building screens.
Do not create any new styling primitives.
Do not use any colour, font, or spacing value not already in the theme files.

---

## YOUR FIRST TASK

Install all required dependencies:

```bash
npx expo install expo-router expo-font @expo-google-fonts/inter \
  react-native-safe-area-context react-native-screens \
  expo-status-bar expo-splash-screen \
  @supabase/supabase-js zustand \
  react-native-reanimated lottie-react-native \
  expo-image-picker expo-notifications expo-sharing
```

Then set up the project:

1. Configure app.json with the correct Expo Router entry point
2. Configure babel.config.js for Expo Router and Reanimated
3. Set up src/theme/ alias as @/theme in tsconfig.json
4. Set up src/components/ alias as @/components in tsconfig.json
5. Load Inter font in app/_layout.tsx using useFonts from @expo-google-fonts/inter
6. Create the folder structure from RULES.md

---

## SCREEN BUILD ORDER

Build screens in this exact order.
After each screen, confirm it matches the design spec before moving on.

### 1. app/index.tsx — Welcome screen
Full-screen centred layout. White background.
- App logo: 80×80 rounded square, bgElevated fill, brand border 1.5px, chair icon 36px brand colour
- App name: "Is This Seat Taken?" display typography, textPrimary
- Tagline: "Connect by personality. Reveal only when you're ready." body, textSecondary, centred, max-width 220
- "Create account" Button variant="primary" size="lg"
- "Sign in" Button variant="ghost" size="lg"
- Legal text: 12px textTertiary centred, brand colour links
- 3 bottom dots indicator: active dot 28×8px pill brand colour, inactive 8px circle borderDefault

### 2. app/(auth)/signup.tsx — Sign up
- Title: "Create account" title typography
- Sub: "Start your anonymous dating adventure" bodySm textSecondary
- 4 Input fields: Full name (success state), Username (success + availability message), Email (default), Password (focused + PasswordStrengthBar)
- Button "Continue"
- Footer: "Already have an account? Sign in" with brand colour link

### 3. app/(auth)/login.tsx — Sign in
- Logo mark: 52px square icon, bgElevated fill, chair icon, brand colour
- Title: "Welcome back"
- Sub: "Your seat is waiting"
- 2 Input fields: Email (focused), Password (with forgot link)
- Button "Sign in"
- Footer: "New here? Create account"

### 4. app/(onboarding)/_layout.tsx — Onboarding layout
- Renders OnboardingBar at very top (full bleed, no horizontal padding)
- Pass current step and totalSteps={6} to OnboardingBar
- Back arrow (IconButton) top-left, steps 2–6 only
- Slot for screen content below

### 5–10. app/(onboarding)/step1 through step6
Build each step following the design spec exactly.
Every step uses the shared OnboardingBar from the layout.
Every step has one "Continue" Button at the bottom (step6 uses "Enter the lobby").

### 11. app/(tabs)/_layout.tsx — Tab bar
Build the custom tab bar:
- 5 tabs: Home, Matches, Play (centre floating), Friends, Profile
- Centre Play button: 48px circle, brand fill, chair icon white, floats 16px above bar, white 3px border ring
- Active: brand colour / Inactive: textInactive colour

### 12. app/(tabs)/index.tsx — Home lobby
Build in sections (top to bottom):
- Top bar: avatar + greeting + username + notification + settings icons
- XP bar with level badge and fraction
- Stats row: 4 StatCards (dates, reveals, friends, streak)
- Today's seats + streak (2-column card grid)
- Game mode cards (3 vertical cards)
- Friends online avatar stack row

---

## DESIGN RULES TO ENFORCE

Every screen you build must follow these:

1. Import colours only from @/theme — never a raw hex
2. Import typography only from @/theme — never a raw fontSize
3. Import spacing only from @/theme — never a raw number for padding/gap
4. Use components only from @/components — never create new styled primitives
5. Wrap every screen in the Screen component from @/components
6. Use OnboardingBar from @/components on every onboarding step
7. The progress bar is always the VERY FIRST element after the status bar
   on onboarding screens — no padding above it, full bleed width
8. Every TouchableOpacity must have accessibilityLabel and accessibilityRole
9. Never use React Native's built-in Button component
10. Never use inline styles except for dynamic values (e.g. width from state)
11. Gap over margin for spacing between siblings in a flex container
12. No gradients. No drop shadows. No dark backgrounds. Light mode only.

---

## HOW TO VERIFY EACH SCREEN

After building each screen, check:
- All colours match the design spec (cross-reference colors.ts)
- All font sizes match typography.ts
- All spacing matches spacing.ts
- Components used match the existing component library
- Screen has loading state if it fetches data
- All interactive elements have accessibilityLabel
- No hardcoded values anywhere in the file