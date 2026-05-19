/**
 * IllustrationAvatar — reusable illustrated avatar component
 * Converted from the "Avatar Set.html" file (8 flat-vector identities).
 *
 * Usage:
 *   <IllustrationAvatar id={1} size={80} selected={true} />
 *
 * Avatar IDs 1–8 map to the 8 identities in the original HTML avatar set.
 */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Path,
  Rect,
} from 'react-native-svg';

// ── Colour helpers ────────────────────────────────────────────────────────────
function lighten(hex: string, amt: number): string {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const mix = (v: number) => Math.round(v + (255 - v) * amt);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

function darken(hex: string, amt: number): string {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const mix = (v: number) => Math.round(v * (1 - amt));
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

// ── Hair style components ─────────────────────────────────────────────────────
// All designed for a 100×100 viewBox. Head: cx=50 cy=50 rx=36 ry=36.
// Hair sits ON TOP of the head, overlapping the forehead.

function HairShortFringe({ color }: { color: string }) {
  return (
    <Path
      d="M14 50 C 14 16, 30 6, 50 6 C 70 6, 86 16, 86 50 L 86 44 L 14 44 Z"
      fill={color}
    />
  );
}

function HairBowl({ color }: { color: string }) {
  return (
    <Path
      d="M10 62 C 10 12, 30 4, 50 4 C 70 4, 90 12, 90 62 C 84 58, 76 56, 68 56 L 32 56 C 24 56, 16 58, 10 62 Z"
      fill={color}
    />
  );
}

function HairCap({ color }: { color: string }) {
  return (
    <Path
      d="M22 40 C 22 16, 34 10, 50 10 C 66 10, 78 16, 78 40 C 70 36, 60 35, 50 35 C 40 35, 30 36, 22 40 Z"
      fill={color}
    />
  );
}

function HairSideSwept({ color }: { color: string }) {
  return (
    <Path
      d="M14 48 C 14 14, 32 4, 50 4 C 70 4, 86 14, 86 48 L 82 28 C 70 36, 50 46, 30 46 C 22 46, 16 47, 14 48 Z"
      fill={color}
    />
  );
}

function HairLocs({ color }: { color: string }) {
  return (
    <G fill={color}>
      <Path d="M12 52 C 12 14, 30 4, 50 4 C 70 4, 88 14, 88 52 C 82 50, 74 48, 66 49 L 34 49 C 26 48, 18 50, 12 52 Z" />
      <Rect x="10" y="46" width="7" height="48" rx="3.5" />
      <Rect x="20" y="50" width="7" height="44" rx="3.5" />
      <Rect x="30" y="54" width="7" height="40" rx="3.5" />
      <Rect x="63" y="54" width="7" height="40" rx="3.5" />
      <Rect x="73" y="50" width="7" height="44" rx="3.5" />
      <Rect x="83" y="46" width="7" height="48" rx="3.5" />
    </G>
  );
}

function HairFringe({ color }: { color: string }) {
  return (
    <Path
      d="M14 50 C 14 16, 30 6, 50 6 C 70 6, 86 16, 86 50 C 80 46, 70 44, 60 47 L 50 38 L 40 47 C 30 44, 20 46, 14 50 Z"
      fill={color}
    />
  );
}

function HairPuffs({ color }: { color: string }) {
  return (
    <G fill={color}>
      <Path d="M22 44 C 22 28, 34 20, 50 20 C 66 20, 78 28, 78 44 C 70 41, 60 40, 50 40 C 40 40, 30 41, 22 44 Z" />
      <Circle cx="32" cy="14" r="11" />
      <Circle cx="68" cy="14" r="11" />
    </G>
  );
}

function HairNeatRounded({ color }: { color: string }) {
  return (
    <Path
      d="M16 46 C 16 12, 32 4, 50 4 C 68 4, 84 12, 84 46 Q 50 40, 16 46 Z"
      fill={color}
    />
  );
}

// ── Avatar definitions (matches the HTML AVATARS array exactly) ───────────────
type HairStyle =
  | 'shortFringe'
  | 'bowl'
  | 'cap'
  | 'sideSwept'
  | 'locs'
  | 'fringe'
  | 'puffs'
  | 'neatRounded';

interface AvatarDef {
  skin: string;
  hair: string;
  style: HairStyle;
}

const AVATAR_DEFS: AvatarDef[] = [
  { skin: '#FDDBB4', hair: '#D4A843', style: 'shortFringe' },  // 1
  { skin: '#F1C27D', hair: '#1A0A00', style: 'bowl' },          // 2
  { skin: '#E0AC69', hair: '#0A0800', style: 'cap' },           // 3
  { skin: '#C68642', hair: '#3D2B1A', style: 'sideSwept' },     // 4
  { skin: '#8D5524', hair: '#0A0800', style: 'locs' },          // 5
  { skin: '#FDDBB4', hair: '#8B2E0A', style: 'fringe' },        // 6
  { skin: '#5C3317', hair: '#0A0600', style: 'puffs' },         // 7
  { skin: '#E0AC69', hair: '#3D2B1A', style: 'neatRounded' },   // 8
];

const HAIR_COMPONENTS: Record<HairStyle, React.FC<{ color: string }>> = {
  shortFringe: HairShortFringe,
  bowl: HairBowl,
  cap: HairCap,
  sideSwept: HairSideSwept,
  locs: HairLocs,
  fringe: HairFringe,
  puffs: HairPuffs,
  neatRounded: HairNeatRounded,
};

const EYE_COLOR = '#2C1A0A';

// ── SVG body of one avatar ────────────────────────────────────────────────────
function AvatarSVG({ def, clipId }: { def: AvatarDef; clipId: string }) {
  const { skin, hair, style } = def;
  const circleBg = lighten(skin, 0.18);
  const blush = darken(skin, 0.22);
  const HairComponent = HAIR_COMPONENTS[style];

  return (
    <Svg viewBox="0 0 100 100" width="100%" height="100%">
      <Defs>
        <ClipPath id={clipId}>
          <Circle cx="50" cy="50" r="50" />
        </ClipPath>
      </Defs>
      <G clipPath={`url(#${clipId})`}>
        {/* Circle background */}
        <Rect width="100" height="100" fill={circleBg} />

        {/* Neck / shoulders */}
        <Rect x="34" y="84" width="32" height="20" rx="7" fill={skin} />

        {/* Ears */}
        <Path d="M14 50 a4 6 0 0 0 0 12 z" fill={skin} />
        <Path d="M86 50 a4 6 0 0 1 0 12 z" fill={skin} />

        {/* Head */}
        <Ellipse cx="50" cy="50" rx="36" ry="36" fill={skin} />

        {/* Blush */}
        <Ellipse cx="28" cy="60" rx="5" ry="2.8" fill={blush} opacity="0.4" />
        <Ellipse cx="72" cy="60" rx="5" ry="2.8" fill={blush} opacity="0.4" />

        {/* Eyebrows */}
        <Path
          d="M34 42 Q 40 39, 46 42"
          stroke={hair}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M54 42 Q 60 39, 66 42"
          stroke={hair}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes */}
        <Ellipse cx="40" cy="51" rx="2.8" ry="3.6" fill={EYE_COLOR} />
        <Ellipse cx="60" cy="51" rx="2.8" ry="3.6" fill={EYE_COLOR} />
        {/* Catchlights */}
        <Circle cx="41" cy="50" r="1" fill="#FFFFFF" />
        <Circle cx="61" cy="50" r="1" fill="#FFFFFF" />

        {/* Mouth */}
        <Path
          d="M43 68 Q 50 73, 57 68"
          stroke={EYE_COLOR}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Hair — rendered last so it overlaps the forehead */}
        <HairComponent color={hair} />
      </G>
    </Svg>
  );
}

// ── Public component ──────────────────────────────────────────────────────────
export interface IllustrationAvatarProps {
  /** 1–8, matching the 8 avatar identities from the HTML file */
  id: number;
  /** Diameter in dp. Defaults to 80. */
  size?: number;
  /** Shows the purple selection ring when true */
  selected?: boolean;
  /** Forces a perfectly circular shape (borderRadius = size/2). Default: false (rounded square). */
  circle?: boolean;
  /** Called when the user taps the avatar */
  onPress?: () => void;
  /** Extra style overrides for the outer tile */
  style?: object;
}

export function IllustrationAvatar({
  id,
  size = 80,
  selected = false,
  circle = false,
  onPress,
  style,
}: IllustrationAvatarProps) {
  const def = AVATAR_DEFS[(id - 1) % AVATAR_DEFS.length];
  // Unique clip ID so multiple avatars on the same screen don't clash
  const clipId = `av-clip-${id}-${def.style}`;

  const borderRadius = circle ? size / 2 : size * 0.22;

  const tile = (
    <View
      style={[
        avatarStyles.tile,
        {
          width: size,
          height: size,
          borderRadius,
        },
        selected && avatarStyles.tileSelected,
        style,
      ]}
    >
      <AvatarSVG def={def} clipId={clipId} />
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {tile}
      </TouchableOpacity>
    );
  }

  return tile;
}

// ── Styles ────────────────────────────────────────────────────────────────────
const avatarStyles = StyleSheet.create({
  tile: {
    backgroundColor: '#F0EEFF',
    borderWidth: 2.5,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 4,
  },
  tileSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#6C3CE1',
  },
});

export default IllustrationAvatar;
