import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Input, Chip, ChipRow } from '../../components';
import { Feather } from '@expo/vector-icons';
import { typography } from '../../constants/typography';
import { colors } from '../../constants/colors';
import { spacing, radius, border } from '../../constants/spacing';

const SKIN_TONES = [
  '#FFDCB2',
  '#F7C18B',
  '#DE9C5E',
  '#C68642',
  '#9C632C',
  '#6C461F',
  '#3C2219'
];

const HEIGHT_OPTIONS = [
  "4' 10\"", "4' 11\"", "5' 0\"", "5' 1\"", "5' 2\"", "5' 3\"", "5' 4\"", "5' 5\"",
  "5' 6\"", "5' 7\"", "5' 8\"", "5' 9\"", "5' 10\"", "5' 11\"", "6' 0\"", "6' 1\"",
  "6' 2\"", "6' 3\"", "6' 4\"", "6' 5\""
];

const BODY_TYPE_OPTIONS = ['Slim', 'Athletic', 'Average', 'Curvy', 'Strong', 'Muscular', 'Heavy'];

interface SelectorModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (val: string) => void;
}

function SelectorModal({ visible, onClose, title, options, selectedValue, onSelect }: SelectorModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={modalStyles.backdrop}>
        <View style={modalStyles.sheet}>
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={modalStyles.closeBtn}>
              <Feather name="x" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <FlatList 
            data={options}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = selectedValue === item;
              return (
                <TouchableOpacity
                  style={[modalStyles.optionRow, isSelected && modalStyles.optionRowSelected]}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Text style={[modalStyles.optionText, isSelected && modalStyles.optionTextSelected]}>
                    {item}
                  </Text>
                  {isSelected && <Feather name="check" size={18} color={colors.brand} />}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default function Step5Look() {
  const router = useRouter();
  
  const [height, setHeight] = useState("5' 7\"");
  const [bodyType, setBodyType] = useState('Athletic');
  const [selectedSkinTone, setSelectedSkinTone] = useState('#DE9C5E'); // Default to 3rd circle
  
  // Set to empty string by default as requested
  const [hair, setHair] = useState('');
  
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const [isHeightModalVisible, setIsHeightModalVisible] = useState(false);
  const [isBodyModalVisible, setIsBodyModalVisible] = useState(false);

  const dressStyles = ['Casual', 'Streetwear', 'Smart casual', 'Formal', 'Boho', 'Sporty', 'Vintage'];

  const toggleStyle = (styleName: string) => {
    setSelectedStyles(prev => {
      if (prev.includes(styleName)) {
        return prev.filter(s => s !== styleName);
      } else if (prev.length < 2) {
        return [...prev, styleName];
      }
      return prev;
    });
  };

  const isContinueDisabled = !hair.trim() || selectedStyles.length === 0;

  return (
    <Screen noPadding edges={[]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.sub}>Revealed only after a match — never during a game.</Text>
          
          {/* Lock Banner */}
          <View style={styles.lockBanner}>
            <View style={styles.lockIconContainer}>
              <Feather name="lock" size={18} color={colors.brand} />
            </View>
            <View style={styles.lockTextContainer}>
              <Text style={styles.lockTitle}>Hidden until you match</Text>
              <Text style={styles.lockBody}>Stays locked during every game. Other players only see your avatar.</Text>
            </View>
          </View>

          {/* Height & Body Type Row */}
          <View style={styles.row}>
            {/* Height Selector */}
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => setIsHeightModalVisible(true)}
              style={{ flex: 1 }}
            >
              <View pointerEvents="none">
                <Input 
                  label="Height"
                  value={height}
                  editable={false}
                  rightElement={<Feather name="chevron-down" size={18} color={colors.textSecondary} />}
                />
              </View>
            </TouchableOpacity>

            {/* Body Type Selector */}
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => setIsBodyModalVisible(true)}
              style={{ flex: 1 }}
            >
              <View pointerEvents="none">
                <Input 
                  label="Body Type"
                  value={bodyType}
                  editable={false}
                  rightElement={<Feather name="chevron-down" size={18} color={colors.textSecondary} />}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Skin Tone */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>SKIN TONE</Text>
            <View style={styles.skinToneRow}>
              {SKIN_TONES.map(color => {
                const isSelected = selectedSkinTone === color;
                return (
                  <TouchableOpacity
                    key={color}
                    activeOpacity={0.8}
                    onPress={() => setSelectedSkinTone(color)}
                    style={styles.skinCircleWrapper}
                  >
                    {isSelected ? (
                      <View style={[styles.skinCircleSelected, { borderColor: colors.brand }]}>
                        <View style={[styles.skinCircleInner, { backgroundColor: color }]} />
                      </View>
                    ) : (
                      <View style={[styles.skinCircleInner, { backgroundColor: color }]} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Hair */}
          <View style={styles.section}>
            <Input 
              label="Hair"
              placeholder="e.g. Wavy, shoulder-length, dark brown"
              value={hair}
              onChangeText={setHair}
            />
          </View>

          {/* Dress Style */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>DRESS STYLE · PICK UP TO 2</Text>
            <ChipRow style={styles.chips}>
              {dressStyles.map(styleName => (
                <Chip 
                  key={styleName} 
                  label={styleName} 
                  selected={selectedStyles.includes(styleName)} 
                  onPress={() => toggleStyle(styleName)} 
                />
              ))}
            </ChipRow>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Button 
            label="Continue" 
            disabled={isContinueDisabled}
            onPress={() => router.push('/(onboarding)/step6-profile')} 
          />
        </View>
      </ScrollView>

      {/* Height Picker Modal */}
      <SelectorModal 
        visible={isHeightModalVisible}
        onClose={() => setIsHeightModalVisible(false)}
        title="Select Height"
        options={HEIGHT_OPTIONS}
        selectedValue={height}
        onSelect={setHeight}
      />

      {/* Body Type Picker Modal */}
      <SelectorModal 
        visible={isBodyModalVisible}
        onClose={() => setIsBodyModalVisible(false)}
        title="Select Body Type"
        options={BODY_TYPE_OPTIONS}
        selectedValue={bodyType}
        onSelect={setBodyType}
      />
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
  lockBanner: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    marginBottom: spacing.xl,
    alignItems: 'flex-start',
  },
  lockIconContainer: {
    marginRight: spacing.sm,
    paddingTop: 2,
  },
  lockTextContainer: {
    flex: 1,
  },
  lockTitle: {
    ...typography.bodyLg,
    fontWeight: '700',
    color: colors.brandDark,
    marginBottom: 4,
  },
  lockBody: {
    ...typography.bodySm,
    color: colors.brandDark,
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
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
  skinToneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skinCircleWrapper: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skinCircleInner: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  skinCircleSelected: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgPrimary,
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

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(13,13,26,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.bgPrimary,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: '55%',
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: border.default,
    borderColor: colors.borderDefault,
  },
  closeBtn: {
    padding: 4,
  },
  title: {
    ...typography.bodyLg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: border.thin,
    borderColor: colors.borderDefault,
  },
  optionRowSelected: {
    backgroundColor: '#F0EEFF',
  },
  optionText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: colors.brand,
  },
});
