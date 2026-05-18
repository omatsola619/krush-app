import React from 'react';
import { View, Text, StyleSheet, Modal as RNModal, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { radius, spacing } from '../../constants/spacing';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ visible, onClose, title, children }: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} accessibilityLabel="Close modal" />
        <View style={styles.content}>
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
          <View style={styles.body}>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.modalBackdrop,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.screenH,
  },
  content: {
    backgroundColor: colors.bgPrimary,
    borderRadius: radius.xl,
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDefault,
    alignItems: 'center',
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  body: {
    padding: spacing.base,
  },
});
