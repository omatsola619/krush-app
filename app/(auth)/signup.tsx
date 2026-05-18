import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Input } from '../../components';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export default function SignupScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.sub}>Start your anonymous dating adventure</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Full name"
              placeholder="Jane Doe"
            />
            <Input
              label="Email"
              placeholder="jane@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View>
              <Input
                label="Password"
                variant="password"
                placeholder="Min 6 characters"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              label="Continue"
              onPress={() => router.push('/(onboarding)/step1-avatar')}
            />
            <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.loginLink}>
              <Text style={styles.footerText}>
                Already have an account? <Text style={styles.linkText}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  sub: {
    ...typography.bodySm,
    color: colors.textSecondary,
  },
  form: {
    gap: spacing.base,
    marginBottom: spacing.xxl,
  },
  footer: {
    marginTop: 'auto',
    gap: spacing.lg,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  footerText: {
    ...typography.bodySm,
    color: colors.textSecondary,
  },
  linkText: {
    ...typography.labelSm,
    color: colors.brand,
  },
});
