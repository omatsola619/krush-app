import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Image } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { border } from '../../constants/spacing';
import { avatarSize } from '../../constants/index';

type AvatarTier   = 'common' | 'rare' | 'epic' | 'legendary';
type AvatarStatus = 'online' | 'away' | 'offline' | 'none';

interface AvatarProps {
  size?:     number;
  tier?:     AvatarTier;
  status?:   AvatarStatus;
  selected?: boolean;
  initials?: string;   // shown if no image
  source?: any;        // image source
  style?:    ViewStyle;
}

const tierBorderColor: Record<AvatarTier, string> = {
  common:    colors.borderDefault,
  rare:      colors.brand,
  epic:      '#B5870A',
  legendary: '#0A7A9E',
};

const statusDotColor: Record<AvatarStatus, string> = {
  online:  colors.success,
  away:    colors.streakGold,
  offline: colors.textInactive,
  none:    colors.transparent,
};

export function Avatar({
  size     = avatarSize.sm,
  tier     = 'common',
  status   = 'none',
  selected = false,
  initials,
  source,
  style,
}: AvatarProps) {
  const borderColor = selected ? colors.brand : tierBorderColor[tier];
  const dotSize     = Math.round(size * 0.22);

  return (
    <View style={[{ width: size, height: size }, style]}>
      <View style={[
        styles.avatarFrame,
        {
          width:         size,
          height:        size,
          borderRadius:  size / 2,
          borderColor,
          borderWidth:   tier === 'common' && !selected ? border.default : border.thick,
        },
      ]}>
        <View style={[styles.avatarInner, { borderRadius: size / 2 }]}>
          {source ? (
            <Image source={source} style={{ width: '100%', height: '100%', borderRadius: size / 2 }} />
          ) : initials ? (
            <Text style={{ ...typography.labelSm, color: colors.brand, fontSize: size * 0.3 }}>
              {initials}
            </Text>
          ) : (
            <View style={[styles.avatarPlaceholder, { borderRadius: size / 2 }]} />
          )}
        </View>
      </View>

      {status !== 'none' && (
        <View style={[
          styles.statusDot,
          {
            width:           dotSize,
            height:          dotSize,
            borderRadius:    dotSize / 2,
            backgroundColor: statusDotColor[status],
            bottom:          size * 0.02,
            right:           size * 0.02,
          },
        ]} />
      )}
    </View>
  );
}

export function AvatarStack({ count = 4, size = 36 }: { count?: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
        <View
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : -(size * 0.28),
            zIndex:     i,
          }}
        >
          <Avatar size={size} status="online" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarFrame:   { overflow: 'hidden' },
  avatarInner: {
    flex:            1,
    backgroundColor: colors.bgElevated,
    alignItems:      'center',
    justifyContent:  'center',
  },
  avatarPlaceholder: { flex: 1, backgroundColor: colors.bgElevated },
  statusDot: {
    position:  'absolute',
    borderWidth: 2,
    borderColor: colors.white,
  },
});
