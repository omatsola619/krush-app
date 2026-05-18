import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Input } from '../../components';
import { typography } from '../../constants/typography';
import { colors } from '../../constants/colors';
import { spacing, radius, border } from '../../constants/spacing';

const AVATARS = [
  { id: 1, src: require('../../assets/images/user-avatar/Avatar (1).png') },
  { id: 2, src: require('../../assets/images/user-avatar/Avatar (2).png') },
  { id: 3, src: require('../../assets/images/user-avatar/Avatar (3).png') },
  { id: 4, src: require('../../assets/images/user-avatar/Avatar (4).png') },
  { id: 5, src: require('../../assets/images/user-avatar/Avatar (5).png') },
  { id: 6, src: require('../../assets/images/user-avatar/Avatar.png') },
];

export default function Step1Avatar() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(3); // Defaulting to 3 as in screenshot
  const [username, setUsername] = useState('');

  const isContinueDisabled = !username.trim();

  return (
    <Screen noPadding edges={[]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.sub}>This is how others see you during games — no real photo.</Text>
          
          <Text style={styles.sectionLabel}>PICK YOUR FACE</Text>
          <View style={styles.grid}>
            {AVATARS.map((avatar) => {
              const isSelected = selectedAvatar === avatar.id;
              return (
                <TouchableOpacity
                  key={avatar.id}
                  style={[
                    styles.avatarCard,
                    isSelected && styles.avatarCardSelected
                  ]}
                  onPress={() => setSelectedAvatar(avatar.id)}
                  activeOpacity={0.7}
                >
                  <Image source={avatar.src} style={styles.avatarImage} resizeMode="contain" />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>USERNAME</Text>
          <Input 
            value={username}
            onChangeText={setUsername}
            state={username.trim() ? "success" : "default"}
            successMessage={username.trim() ? "Yours forever. No spaces, no real names." : undefined}
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
    rowGap: spacing.md,
  },
  avatarCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: radius.lg,
    borderWidth: border.default,
    borderColor: colors.borderDefault,
    backgroundColor: colors.bgSurface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  avatarCardSelected: {
    borderColor: colors.brand,
    borderWidth: border.medium,
    backgroundColor: '#F0EEFF', // Light purple background as shown in image
  },
  avatarImage: {
    width: '85%',
    height: '85%',
  },
  footer: {
    paddingBottom: spacing.lg,
    paddingTop: spacing.base,
    marginTop: 'auto',
  },
});
