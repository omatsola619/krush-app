import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Chip, ChipRow } from '../../components';
import { typography } from '../../constants/typography';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function Step3Lifestyle() {
  const router = useRouter();
  
  const [drinking, setDrinking] = useState<string | null>(null);
  const [smoking, setSmoking] = useState<string | null>(null);
  const [diet, setDiet] = useState<string | null>(null);
  const [wantKids, setWantKids] = useState<string | null>(null);

  const drinkingOptions = ['Never', 'Socially', 'Regularly'];
  const smokingOptions = ['Never', 'Occasionally', 'Regularly'];
  const dietOptions = ['No preference', 'Vegetarian', 'Vegan', 'Halal'];
  const kidsOptions = ['Yes', 'No', 'Open to it', 'Have them'];

  const isContinueDisabled = !drinking || !smoking || !diet || !wantKids;

  return (
    <Screen noPadding edges={[]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.sub}>Helps us avoid obvious mismatches. Revealed after a match.</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>DRINKING</Text>
            <ChipRow style={styles.chips}>
              {drinkingOptions.map(opt => (
                <Chip 
                  key={opt} 
                  label={opt} 
                  selected={drinking === opt} 
                  onPress={() => setDrinking(opt)} 
                />
              ))}
            </ChipRow>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>SMOKING</Text>
            <ChipRow style={styles.chips}>
              {smokingOptions.map(opt => (
                <Chip 
                  key={opt} 
                  label={opt} 
                  selected={smoking === opt} 
                  onPress={() => setSmoking(opt)} 
                />
              ))}
            </ChipRow>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>DIET</Text>
            <ChipRow style={styles.chips}>
              {dietOptions.map(opt => (
                <Chip 
                  key={opt} 
                  label={opt} 
                  selected={diet === opt} 
                  onPress={() => setDiet(opt)} 
                />
              ))}
            </ChipRow>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>WANT KIDS?</Text>
            <ChipRow style={styles.chips}>
              {kidsOptions.map(opt => (
                <Chip 
                  key={opt} 
                  label={opt} 
                  selected={wantKids === opt} 
                  onPress={() => setWantKids(opt)} 
                />
              ))}
            </ChipRow>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Button 
            label="Continue" 
            disabled={isContinueDisabled}
            onPress={() => router.push('/(onboarding)/step4-personality')} 
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
