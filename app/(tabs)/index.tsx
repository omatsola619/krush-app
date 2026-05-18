import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Screen, Button, Avatar, AvatarStack } from '../../components';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing, radius, border } from '../../constants/spacing';
import { avatarSize } from '../../constants/index';

export default function HomeScreen() {
  return (
    <Screen noPadding style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 1. Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.userInfo}>
            <Avatar size={avatarSize.sm} initials="J" status="online" />
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>Good evening,</Text>
              <Text style={styles.username}>Jane</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconText}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Hero Invite Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Your seat is waiting</Text>
            <Text style={styles.heroSub}>3 seats remaining today</Text>
            <View style={styles.pips}>
              <View style={[styles.pip, styles.pipActive]} />
              <View style={[styles.pip, styles.pipActive]} />
              <View style={styles.pip} />
            </View>
          </View>
          <Button label="Find a seat" size="md" fullWidth={false} />
        </View>

        {/* 3. Near you in Lagos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Near you in Lagos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {[
              { id: 1, name: 'Alex', src: require('../../assets/images/avatar_1.png') },
              { id: 2, name: 'Sam', src: require('../../assets/images/avatar_2.png') },
              { id: 3, name: 'Mystery', src: null },
            ].map((p, i) => (
              <View key={p.id} style={styles.personCard}>
                <Avatar 
                  size={avatarSize.lg} 
                  tier={i % 2 === 0 ? 'rare' : 'common'} 
                  status="online" 
                  source={p.src}
                  initials={!p.src ? '?' : undefined}
                />
                <Text style={styles.personName}>{p.name}</Text>
                <Text style={styles.personLoc}>Lagos • 2km</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 4. Streak Banner */}
        <View style={styles.streakBanner}>
          <Text style={styles.streakIcon}>🔥</Text>
          <View style={styles.streakText}>
            <Text style={styles.streakTitle}>3 day streak!</Text>
            <Text style={styles.streakSub}>Play today to keep it going.</Text>
          </View>
        </View>

        {/* 5. Recent dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent dates</Text>
          {[1, 2].map((i) => (
            <View key={i} style={styles.dateRow}>
              <Avatar size={avatarSize.sm} initials="?" />
              <View style={styles.dateInfo}>
                <Text style={styles.dateName}>Anonymous</Text>
                <Text style={styles.dateTime}>Yesterday</Text>
              </View>
              <View style={styles.chemBadge}>
                <Text style={styles.chemText}>{80 + i * 5}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 6. Friends online */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Friends online</Text>
          <View style={styles.friendsRow}>
            <AvatarStack count={3} size={avatarSize.md} />
            <Text style={styles.friendsCount}>+ 2 more</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: spacing.xxl },
  
  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenH,
    paddingTop: spacing.sm,
    paddingBottom: spacing.base,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  greeting: { gap: 2 },
  greetingText: { ...typography.bodySm, color: colors.textSecondary },
  username: { ...typography.heading, color: colors.textPrimary },
  headerActions: { flexDirection: 'row', gap: spacing.sm },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.bgSurface,
    alignItems: 'center', justifyContent: 'center',
  },
  iconText: { fontSize: 18 },

  // Hero Card
  heroCard: {
    marginHorizontal: spacing.screenH,
    padding: spacing.lg,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  heroContent: { flex: 1, gap: 4 },
  heroTitle: { ...typography.titleSm, color: colors.brandDark },
  heroSub: { ...typography.bodySm, color: colors.textSecondary },
  pips: { flexDirection: 'row', gap: 4, marginTop: spacing.xs },
  pip: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.borderDefault },
  pipActive: { backgroundColor: colors.brand },

  // Section
  section: { marginBottom: spacing.xl },
  sectionTitle: {
    ...typography.heading,
    color: colors.textPrimary,
    paddingHorizontal: spacing.screenH,
    marginBottom: spacing.md,
  },
  hScroll: { paddingHorizontal: spacing.screenH, gap: spacing.md },
  
  // Person Card
  personCard: {
    padding: spacing.base,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: border.default,
    borderColor: colors.borderDefault,
    alignItems: 'center',
    width: 120,
  },
  personName: { ...typography.labelSm, color: colors.textPrimary, marginTop: spacing.sm },
  personLoc: { ...typography.micro, color: colors.textSecondary, marginTop: 2, textTransform: 'none' as const },

  // Streak Banner
  streakBanner: {
    marginHorizontal: spacing.screenH,
    padding: spacing.base,
    backgroundColor: colors.streakGoldBg,
    borderRadius: radius.md,
    borderWidth: border.default,
    borderColor: colors.streakGoldBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  streakIcon: { fontSize: 28 },
  streakText: { flex: 1 },
  streakTitle: { ...typography.label, color: '#92400E' },
  streakSub: { ...typography.bodySm, color: '#B45309' },

  // Date Row
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenH,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  dateInfo: { flex: 1 },
  dateName: { ...typography.labelSm, color: colors.textPrimary },
  dateTime: { ...typography.bodySm, color: colors.textSecondary },
  chemBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: colors.matchPinkBg,
    borderRadius: radius.pill,
  },
  chemText: { ...typography.labelSm, color: colors.matchPink },

  // Friends Row
  friendsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenH,
    gap: spacing.md,
  },
  friendsCount: { ...typography.bodySm, color: colors.textSecondary },
  lastSection: { marginBottom: spacing.xxl },
});
