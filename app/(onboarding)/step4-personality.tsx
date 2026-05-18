import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Chip, ChipRow } from '../../components';
import { typography } from '../../constants/typography';
import { colors } from '../../constants/colors';
import { spacing, radius, border } from '../../constants/spacing';

export default function Step4Personality() {
  const router = useRouter();
  
  const [selectedLoveLanguages, setSelectedLoveLanguages] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [careerAmbition, setCareerAmbition] = useState<string | null>(null);

  const loveLanguages = ['Words of affirmation', 'Quality time', 'Acts of service', 'Gifts', 'Physical touch'];
  const interests = ['Hiking', 'Cooking', 'Live music', 'Reading', 'Travel', 'Gaming', 'Yoga', 'Films', 'Coffee'];
  const careerOptions = ['Ambitious', 'Balanced', 'Chill', 'Still figuring it out'];

  const isContinueDisabled = selectedLoveLanguages.length === 0 || selectedInterests.length === 0 || !careerAmbition;

  const toggleLoveLanguage = (lang: string) => {
    setSelectedLoveLanguages(prev => {
      if (prev.includes(lang)) {
        return prev.filter(l => l !== lang);
      } else if (prev.length < 3) {
        return [...prev, lang];
      }
      return prev;
    });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else if (prev.length < 6) {
        return [...prev, interest];
      }
      return prev;
    });
  };

  return (
    <Screen noPadding edges={[]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.sub}>Shown after a reveal — never during a game.</Text>
          
          {/* Love Language */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>LOVE LANGUAGE · PICK UP TO 3</Text>
            <ChipRow style={styles.chips}>
              {loveLanguages.map(opt => (
                <Chip 
                  key={opt} 
                  label={opt} 
                  selected={selectedLoveLanguages.includes(opt)} 
                  onPress={() => toggleLoveLanguage(opt)} 
                />
              ))}
            </ChipRow>
          </View>

          {/* Interests */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>INTERESTS · PICK UP TO 6</Text>
            <ChipRow style={styles.chips}>
              {interests.map(opt => (
                <Chip 
                  key={opt} 
                  label={opt} 
                  selected={selectedInterests.includes(opt)} 
                  onPress={() => toggleInterest(opt)} 
                />
              ))}
            </ChipRow>
          </View>

          {/* Career Ambition */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>CAREER AMBITION</Text>
            <ChipRow style={styles.chips}>
              {careerOptions.map(opt => (
                <Chip 
                  key={opt} 
                  label={opt} 
                  selected={careerAmbition === opt} 
                  onPress={() => setCareerAmbition(opt)} 
                />
              ))}
            </ChipRow>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Button 
            label="Continue" 
            disabled={isContinueDisabled}
            onPress={() => router.push('/(onboarding)/step5-look')} 
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  footer: {
    paddingBottom: spacing.lg,
    paddingTop: spacing.base,
    marginTop: 'auto',
  },
});
