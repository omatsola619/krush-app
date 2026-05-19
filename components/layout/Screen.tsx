import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export function Screen({ children, style, noPadding = false, edges = ['top', 'bottom'] }: ScreenProps) {
  const flattenedStyle = StyleSheet.flatten(style);
  const backgroundColor = flattenedStyle?.backgroundColor || colors.bgPrimary;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={edges}>
      <View style={[styles.container, !noPadding && styles.padding, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  padding: {
    paddingHorizontal: spacing.screenH,
    paddingTop: spacing.screenV,
  },
});
