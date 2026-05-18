import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Input } from '../../components';
import { Feather } from '@expo/vector-icons';
import { typography } from '../../constants/typography';
import { colors } from '../../constants/colors';
import { spacing, radius, border } from '../../constants/spacing';
import * as ImagePicker from 'expo-image-picker';

export default function Step6Profile() {
  const router = useRouter();
  const [bio, setBio] = useState('');
  
  const [photo1, setPhoto1] = useState<string | null>(null);
  const [photo2, setPhoto2] = useState<string | null>(null);

  const pickImage = async (photoIndex: 1 | 2) => {
    try {
      // Request media library permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need access to your photos to let you upload a profile picture.'
        );
        return;
      }

      // Launch library picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4], // Crops exactly to 3:4 portrait aspect ratio!
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        if (photoIndex === 1) {
          setPhoto1(uri);
        } else {
          setPhoto2(uri);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the image.');
      console.log(error);
    }
  };

  // Photo 1 is face required, so it must be uploaded to continue!
  const isContinueDisabled = !photo1 || !bio.trim();

  return (
    <Screen noPadding edges={[]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.sub}>Your real profile — only shown after a mutual match.</Text>
          
          {/* Real Photos */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>REAL PHOTOS</Text>
            <View style={styles.photoRow}>
              {/* Photo 1 (Face Required) */}
              <TouchableOpacity 
                activeOpacity={0.8} 
                style={[styles.photoBox, photo1 && styles.photoBoxActive]}
                onPress={() => pickImage(1)}
              >
                {photo1 ? (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: photo1 }} style={styles.uploadedImage} resizeMode="cover" />
                    <TouchableOpacity 
                      style={styles.removeBadge} 
                      activeOpacity={0.8}
                      onPress={(e) => {
                        e.stopPropagation(); // Prevents launching picker again on remove click!
                        setPhoto1(null);
                      }}
                    >
                      <Feather name="x" size={14} color={colors.white} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View style={styles.cameraIconCircle}>
                      <Feather name="camera" size={20} color={colors.brand} />
                    </View>
                    <Text style={styles.photoBoxTitle}>Photo 1</Text>
                    <Text style={styles.photoBoxSub}>FACE REQUIRED</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Photo 2 (Optional) */}
              <TouchableOpacity 
                activeOpacity={0.8} 
                style={[styles.photoBox, photo2 && styles.photoBoxActive]}
                onPress={() => pickImage(2)}
              >
                {photo2 ? (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: photo2 }} style={styles.uploadedImage} resizeMode="cover" />
                    <TouchableOpacity 
                      style={styles.removeBadge} 
                      activeOpacity={0.8}
                      onPress={(e) => {
                        e.stopPropagation(); // Prevents launching picker again on remove click!
                        setPhoto2(null);
                      }}
                    >
                      <Feather name="x" size={14} color={colors.white} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View style={[styles.cameraIconCircle, { backgroundColor: '#F4F5F7' }]}>
                      <Feather name="camera" size={20} color={colors.textSecondary} />
                    </View>
                    <Text style={styles.photoBoxTitle}>Photo 2</Text>
                    <Text style={styles.photoBoxSub}>OPTIONAL</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Bio */}
          <View style={styles.section}>
            <Input 
              variant="textarea"
              label="BIO"
              value={bio}
              onChangeText={setBio}
              charLimit={160}
              placeholder="Tell us about yourself..."
            />
          </View>

          {/* Success Banner */}
          <View style={styles.successBanner}>
            <Feather name="check-circle" size={18} color="#0F5132" style={styles.successIcon} />
            <View style={styles.successTextContainer}>
              <Text style={styles.successTitle}>You're all set</Text>
              <Text style={styles.successBody}>Your real profile stays locked until both players say "Date".</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Button 
            label="Enter the lobby" 
            disabled={isContinueDisabled}
            onPress={() => router.replace('/(tabs)')} 
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
  photoRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  photoBox: {
    flex: 1,
    height: 160,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderDefault,
    backgroundColor: colors.bgSurface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    overflow: 'hidden',
  },
  photoBoxActive: {
    borderStyle: 'solid',
    borderColor: colors.borderDefault,
    padding: 0,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: radius.lg,
  },
  removeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(13,13,26,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  cameraIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0EEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  photoBoxTitle: {
    ...typography.labelSm,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  photoBoxSub: {
    ...typography.micro,
    color: colors.textTertiary,
    marginTop: 2,
  },
  successBanner: {
    backgroundColor: '#E8FDF0',
    borderColor: '#D1E7DD',
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  successIcon: {
    marginRight: spacing.sm,
    paddingTop: 1,
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    ...typography.body,
    fontWeight: '700',
    color: '#0F5132',
    marginBottom: 2,
  },
  successBody: {
    ...typography.bodySm,
    color: '#0F5132',
    lineHeight: 18,
  },
  footer: {
    paddingBottom: spacing.lg,
    paddingTop: spacing.base,
    marginTop: 'auto',
  },
});
