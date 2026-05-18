import { Stack, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingBar } from '../../components/layout/OnboardingBar';
import { IconButton } from '../../components/ui/Button';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { StatusBar } from 'expo-status-bar';

const stepTitles: Record<number, string> = {
  1: 'Choose your avatar',
  2: 'Where are you?',
  3: 'Your lifestyle',
  4: 'Your personality',
  5: 'Your look',
  6: 'Almost done'
};

export default function OnboardingLayout() {
  const pathname = usePathname();
  const router = useRouter();

  let step = 1;
  if (pathname.includes('step2')) step = 2;
  if (pathname.includes('step3')) step = 3;
  if (pathname.includes('step4')) step = 4;
  if (pathname.includes('step5')) step = 5;
  if (pathname.includes('step6')) step = 6;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />
      <OnboardingBar currentStep={step} totalSteps={6} />

      <View style={styles.header}>
        {step > 1 && (
          <View style={{ marginBottom: spacing.md }}>
            <IconButton
              icon={<View style={styles.backIcon} />} // placeholder for back icon
              accessibilityLabel="Go back"
              onPress={() => router.back()}
              variant="default"
              size={40}
            />
          </View>
        )}
        <Text style={styles.stepTitle}>{stepTitles[step]}</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bgPrimary } }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  stepTitle: {
    ...typography.title,
    color: colors.textPrimary,
  },
  header: {
    paddingHorizontal: spacing.screenH,
    paddingTop: spacing.sm,
    paddingBottom: 0,
  },
  backIcon: {
    width: 12,
    height: 12,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.textPrimary,
    transform: [{ rotate: '45deg' }, { translateX: 2 }, { translateY: -2 }],
  },
  content: {
    flex: 1,
  },
});
