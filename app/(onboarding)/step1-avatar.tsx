import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Input, IllustrationAvatar } from '../../components';
import { typography } from '../../constants/typography';
import { colors } from '../../constants/colors';
import { spacing, radius } from '../../constants/spacing';

// 8 avatars from the HTML avatar set (IDs 1-8)
const AVATAR_IDS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Step1Avatar() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(3); // pre-select avatar 3
  const [username, setUsername] = useState('');

  const isContinueDisabled = !username.trim();

  return (
    <Screen noPadding edges={[]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.sub}>
            This is how others see you during games — no real photo.
          </Text>

          <Text style={styles.sectionLabel}>PICK YOUR FACE</Text>
          <View style={styles.grid}>
            {AVATAR_IDS.map((id) => (
              <IllustrationAvatar
                key={id}
                id={id}
                size={80}
                selected={selectedAvatar === id}
                onPress={() => setSelectedAvatar(id)}
                style={styles.avatarTile}
              />
            ))}
          </View>

          <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>
            USERNAME
          </Text>
          <Input
            value={username}
            onChangeText={setUsername}
            state={username.trim() ? 'success' : 'default'}
            successMessage={
              username.trim()
                ? 'Yours forever. No spaces, no real names.'
                : undefined
            }
            placeholder="stargazer_92"
          />
        </View>

        <View style={styles.footer}>
          <Button
            label="Continue"
            disabled={isContinueDisabled}
            onPress={() => router.push('/(onboarding)/step2-location')}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screenH,
  },
  scroll: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingTop: 0,
  },
  sub: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    marginTop: 3,
  },
  sectionLabel: {
    ...typography.labelSm,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  avatarTile: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: radius.lg,
    padding: 12, // makes the face inside look slightly smaller and premium
  },
  footer: {
    paddingBottom: spacing.lg,
    paddingTop: spacing.base,
    marginTop: 'auto',
  },
});
