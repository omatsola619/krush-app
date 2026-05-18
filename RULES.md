# IS THIS SEAT TAKEN — Project Rules
# Read this file before writing any code.
# Every decision you make must follow these rules.

## What this app is
A gamified anonymous dating app built with React Native + Expo.
Users create anonymous avatar profiles, play structured
5-question multiple-choice speed dates, and only reveal
their real photo and name when both players mutually vote to date.

## Tech stack
- React Native + Expo (managed workflow)
- Expo Router v3 (file-based navigation)
- Supabase (Postgres + Auth + Storage + Realtime)
- Zustand (state management)
- React Native Reanimated 3 (animations)
- Lottie React Native (Lottie animations)
- @expo-google-fonts/inter (typography)
- TypeScript throughout — no plain JS files

## Absolute code rules

### Never do these
- Never hardcode a colour value in a component file
- Never hardcode a font size in a component file
- Never hardcode a spacing value in a component file
- Never use StyleSheet.create with raw hex values
- Never create a new component if one already exists in src/components/
- Never use any colour not defined in src/theme/colors.ts
- Never use any font size not defined in src/theme/typography.ts
- Never use any spacing value not defined in src/theme/spacing.ts
- Never mix light and dark screen logic in the same component
- Never use React Native's built-in Button component
- Never use inline styles unless it is a dynamic value (e.g. width from state)

### Always do these
- Always import colours from src/theme/colors.ts
- Always import typography from src/theme/typography.ts
- Always import spacing and radius from src/theme/spacing.ts
- Always wrap screens in SafeAreaView from react-native-safe-area-context
- Always add accessibilityLabel to every TouchableOpacity and Pressable
- Always add accessibilityRole to interactive elements
- Always handle loading state in every screen that fetches data
- Always handle error state in every screen that fetches data
- Always use Expo Router's router.push / router.replace for navigation
- Always export components as named exports, not default exports
- Always type all props with TypeScript interfaces
- Always use gap in flexbox instead of margin for spacing between siblings

## Design system location
src/theme/colors.ts     — all colour tokens (light mode only)
src/theme/typography.ts — all font styles
src/theme/spacing.ts    — spacing, radius, shadow tokens
src/theme/index.ts      — barrel export

## Screen mode rule
This app is LIGHT MODE ONLY.
Every screen uses the light colour tokens from src/theme/colors.ts.
There is no dark mode. Do not create dark mode variants.

## Component library location
src/components/ui/      — all base UI components
src/components/game/    — all game-specific components
src/components/layout/  — layout wrappers (Screen, Header, etc.)

## Navigation structure (Expo Router)
app/
  index.tsx                    ← welcome / splash
  (auth)/
    signup.tsx                 ← sign up screen
    login.tsx                  ← sign in screen
  (onboarding)/
    _layout.tsx                ← onboarding layout with progress bar
    step1-avatar.tsx
    step2-location.tsx
    step3-lifestyle.tsx
    step4-personality.tsx
    step5-look.tsx
    step6-profile.tsx
  (tabs)/
    _layout.tsx                ← tab bar layout
    index.tsx                  ← home lobby
    matches.tsx
    friends.tsx
    profile.tsx
  game/
    queue.tsx                  ← matchmaking screen
    room.tsx                   ← speed date game room
    reveal.tsx                 ← chemistry score + vote
    match.tsx                  ← it's a match reveal
    friend-offer.tsx           ← date over, offer friends

## Supabase tables
users, profiles, avatars, questions, compatibility_maps,
game_sessions, session_answers, session_votes,
matches, friends, daily_seats, streaks

## Animation rules
- Use Reanimated 3 for all UI animations
- Use Lottie for complex animations (matchmaking, reveal, XP level up)
- Progress bar fill: animated width using useSharedValue
- Chemistry ring: animated stroke-dashoffset or conic-gradient via SVG
- Reveal moment: scale + fade, 800ms, spring easing
- Streak flame: pulse animation when active
- Answer lock: brief scale down then up (haptic feel)

## Real-time rules (Supabase Realtime)
- Game rooms use Supabase Realtime channels
- Channel name format: game:${sessionId}
- Events: player_joined | answer_locked | round_complete | vote_cast | session_end
- Subscribe on game room mount
- Always unsubscribe on component unmount

## Scoring algorithm
- Exact match:  +20 points
- Compatible:   +10 points
- Neutral:      +5  points
- Opposite:     +0  points
- 5 questions × 20 max = 100 point ceiling (shown as %)
- Unanswered (timeout) = pass = 0 points for that question
- 3 passes in one session = date cancelled

## Question session composition
- User A picks 1–2 questions before matchmaking
- User B picks 1–2 questions before matchmaking
- System draws remaining questions to reach exactly 5 total
- If both pick same question, system replaces one with a new draw
- Question order is randomised — players never know who picked what