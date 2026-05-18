import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Input, Chip, ChipRow } from '../../components';
import { Feather } from '@expo/vector-icons';
import { typography } from '../../constants/typography';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// Helper to convert ISO 2-letter country code to flag emoji
function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function Step2Location() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState('United States');
  const [stateVal, setStateVal] = useState('California');
  
  // Set to null so none is selected by default as requested
  const [genderPreference, setGenderPreference] = useState<string | null>(null);
  
  // Age range starting at 18 and 70 by default
  const [ageRange, setAgeRange] = useState<number[]>([18, 70]);

  const genders = ['Women', 'Men', 'Non-binary', 'Everyone'];
  
  const screenWidth = Dimensions.get('window').width;
  const sliderWidth = screenWidth - (spacing.screenH * 2) - 24;

  const isContinueDisabled = !genderPreference || !country.trim();

  return (
    <Screen noPadding edges={[]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.sub}>No GPS — we match by country and state first.</Text>
          
          <View style={styles.form}>
            {/* Country Selector Dropdown using package */}
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              onSelect={(selectedCountry) => {
                setCountryCode(selectedCountry.cca2);
                setCountry(selectedCountry.name as string);
              }}
              renderFlagButton={(props) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={props.onOpen}
                  style={styles.dropdownTrigger}
                >
                  <View pointerEvents="none">
                    <Input 
                      label="Country"
                      value={`${getFlagEmoji(countryCode)} ${country}`}
                      editable={false}
                      rightElement={<Feather name="chevron-down" size={18} color={colors.textSecondary} />}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />

            <View style={{ marginTop: spacing.base }}>
              <Input 
                label="State"
                value={stateVal}
                onChangeText={setStateVal}
                state="focused"
              />
            </View>

            {/* Gender Preference selection */}
            <View style={{ marginTop: spacing.lg }}>
              <Text style={styles.sectionLabel}>I WANT TO MEET</Text>
              <ChipRow style={styles.chips}>
                {genders.map(g => (
                  <Chip 
                    key={g} 
                    label={g} 
                    selected={genderPreference === g} 
                    onPress={() => setGenderPreference(g)} 
                  />
                ))}
              </ChipRow>
            </View>

            {/* Age Range Slider */}
            <View style={{ marginTop: spacing.lg }}>
              <Text style={styles.sectionLabel}>AGE RANGE</Text>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderValueRow}>
                  <Text style={styles.sliderValueText}>{ageRange[0]}</Text>
                  <Text style={styles.toText}>to</Text>
                  <Text style={styles.sliderValueText}>{ageRange[1]}</Text>
                </View>
                
                <MultiSlider
                  values={ageRange}
                  onValuesChange={setAgeRange}
                  min={18}
                  max={70}
                  step={1}
                  allowOverlap={false}
                  snapped
                  sliderLength={sliderWidth}
                  selectedStyle={{ backgroundColor: colors.brand, height: 4 }}
                  unselectedStyle={{ backgroundColor: colors.borderDefault, height: 4 }}
                  trackStyle={{ height: 4, borderRadius: 2 }}
                  markerStyle={{
                    height: 22,
                    width: 22,
                    borderRadius: 11,
                    backgroundColor: colors.white,
                    borderWidth: 2,
                    borderColor: colors.brand,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 2,
                    elevation: 3,
                  }}
                  containerStyle={{ height: 40 }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button 
            label="Continue" 
            disabled={isContinueDisabled}
            onPress={() => router.push('/(onboarding)/step3-lifestyle')} 
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
  form: {
    marginTop: spacing.xs,
  },
  dropdownTrigger: {
    width: '100%',
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
  sliderContainer: {
    marginTop: spacing.xs,
    alignItems: 'center',
  },
  sliderValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
  sliderValueText: {
    ...typography.heading,
    color: colors.brand,
    fontWeight: '700',
  },
  toText: {
    ...typography.body,
    color: colors.textSecondary,
    paddingHorizontal: spacing.sm,
  },
  footer: {
    paddingBottom: spacing.lg,
    paddingTop: spacing.base,
    marginTop: 'auto',
  },
});
