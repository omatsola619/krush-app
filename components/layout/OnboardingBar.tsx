import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { radius, animation } from '../../constants/spacing';

interface OnboardingBarProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingBar({ currentStep, totalSteps }: OnboardingBarProps) {
  const progress = Math.max(0, Math.min(currentStep / totalSteps, 1));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progress * 100}%`, { duration: animation.slow }),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, animatedStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
  },
  track: {
    height: 7,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.brand,
    borderRadius: radius.pill,
  },
});
