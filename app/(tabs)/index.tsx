import { Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IllustrationAvatar, Screen } from '../../components';
import { spacing } from '../../constants/spacing';
import { fontFamily } from '../../constants/typography';

export default function HomeScreen() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedChip, setSelectedChip] = React.useState('Goes cold when hurt');

  const dates = [
    {
      id: '1',
      name: 'Zara K.',
      chemistry: '72% chemistry',
      time: 'yesterday',
      percentage: '72%',
      avatarId: 6,
      badgeLabel: 'Matched',
      badgeBg: '#E2F8EE',
      badgeText: '#10B981',
      avatarBorder: '#6C3CE1',
      percentageColor: '#6C3CE1',
    },
    {
      id: '2',
      name: 'moonwalker',
      chemistry: '58% chemistry',
      time: '2 days ago',
      percentage: '58%',
      avatarId: 3,
      badgeLabel: 'Friends',
      badgeBg: '#E0F2FE',
      badgeText: '#0284C7',
      avatarBorder: '#0284C7',
      percentageColor: '#0284C7',
    },
  ];

  return (
    <Screen noPadding edges={['top']} style={styles.container}>
      <StatusBar style="dark" />
      {/* 1. Header Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.userInfo}>
          <IllustrationAvatar id={3} size={44} circle style={styles.headerAvatar} />
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>Good evening</Text>
            <Text style={styles.username}>stargazer_92</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <View style={styles.iconBtnWrap}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Feather name="bell" size={20} color="#8E8E93" />
            </TouchableOpacity>
            <View style={styles.badgeDot} />
          </View>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Feather name="settings" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 2. Open Right Now Card */}
        <View style={styles.openRightNowCard}>
          {/* Top Header Section (Dark Black/Navy) */}
          <View style={styles.cardHeaderDark}>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDotSolid} />
              <Text style={styles.liveTextDark}>LIVE</Text>
            </View>
            <View style={styles.waitPillDark}>
              <Text style={styles.waitTextDark}>~ 42 sec wait</Text>
            </View>
          </View>

          {/* Body Section (White) */}
          <View style={styles.cardBodyWhite}>
            <View style={styles.waitingContainer}>
              <View style={styles.avatarStack}>
                {[3, 5, 2, 7].map((avatarId, i) => (
                  <View key={avatarId} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 5 - i }}>
                    <IllustrationAvatar id={avatarId} size={28} circle style={styles.stackedAvatar} />
                  </View>
                ))}
                {/* More badge */}
                <View style={[styles.moreBadge, { marginLeft: -8, zIndex: 1 }]}>
                  <Text style={styles.moreBadgeText}>+142</Text>
                </View>
              </View>
            </View>

            <Text style={styles.lookingHeadline}>147 looking right now.</Text>
            <Text style={styles.lookingSub}>Your seat is waiting — most pair in under a minute.</Text>
          </View>

          {/* Bottom Section (White) */}
          <View style={styles.cardBottomSection}>
            <View style={styles.dotsContainer}>
              <View style={styles.dotsRow}>
                <View style={[styles.indicatorDot, styles.dotPurple]} />
                <View style={[styles.indicatorDot, styles.dotPurple]} />
                <View style={[styles.indicatorDot, styles.dotMuted]} />
              </View>
              <Text style={styles.dotsText}>2 of 3 left</Text>
            </View>

            <TouchableOpacity style={styles.takeSeatBtn} activeOpacity={0.85}>
              <Text style={styles.takeSeatBtnText}>Take a seat</Text>
              <Feather name="arrow-right" size={15} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2.5 Rooms Live Card */}
        <TouchableOpacity style={styles.roomsLiveCard} activeOpacity={0.9}>
          <View style={styles.roomsIconContainer}>
            <Ionicons name="book" size={20} color="#6C3CE1" />
          </View>
          <View style={styles.roomsTextContainer}>
            <Text style={styles.roomsTitle}>2 rooms live right now</Text>
            <Text style={styles.roomsSubtitle}>34 people watching · join the queue</Text>
          </View>
          <View style={styles.watchButton}>
            <Text style={styles.watchText}>Watch</Text>
            <Feather name="arrow-right" size={14} color="#6C3CE1" style={{ marginLeft: 4 }} />
          </View>
        </TouchableOpacity>

        {/* 3. Your dates Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your dates</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {dates.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.9} style={styles.dateCard}>
            {/* Illustrated avatar with coloured ring */}
            <IllustrationAvatar
              id={item.avatarId}
              size={48}
              circle
              style={[styles.dateAvatar, { borderColor: item.avatarBorder }]}
            />

            <View style={styles.dateDetails}>
              <Text style={styles.dateName}>{item.name}</Text>
              <Text style={styles.dateSub}>{item.chemistry} · {item.time}</Text>
            </View>

            <View style={styles.badgeContainer}>
              <Text style={[styles.percentageText, { color: item.percentageColor }]}>{item.percentage}</Text>
              <View style={[styles.badge, { backgroundColor: item.badgeBg }]}>
                <Text style={[styles.badgeText, { color: item.badgeText }]}>{item.badgeLabel}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* 4. Today's question Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's question</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionLabel}>IN TODAY'S DATES</Text>
          <Text style={styles.questionText}>What do your exes say your biggest flaw is?</Text>

          <View style={styles.chipsContainer}>
            {[
              'Goes cold when hurt',
              'Too intense',
              'Avoids conflict',
              'Bad communicator'
            ].map((option) => {
              const isSelected = selectedChip === option;
              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.8}
                  onPress={() => setSelectedChip(option)}
                  style={[
                    styles.chip,
                    isSelected ? styles.chipSelected : styles.chipUnselected
                  ]}
                >
                  <Text style={[
                    styles.chipText,
                    isSelected ? styles.chipTextSelected : styles.chipTextUnselected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scroll: {
    paddingBottom: spacing.xxl,
  },

  // Header Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 16,
    backgroundColor: '#F8F9FE',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  headerAvatar: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  greeting: {
    gap: 1
  },
  greetingText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: '#8E8E93'
  },
  username: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: '#0D0D1A'
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10
  },
  iconBtnWrap: {
    position: 'relative',
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: '#EFEBFF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  // Open Right Now Card
  openRightNowCard: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#6C3CE1',
    overflow: 'hidden',
    shadowColor: '#6C3CE1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeaderDark: {
    backgroundColor: '#0A0A14',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -2,
    marginLeft: -2,
    marginRight: -2,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDotSolid: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  liveTextDark: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: '#10B981',
    letterSpacing: 0.5,
  },
  waitPillDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  waitTextDark: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: '#8E8E93',
  },
  cardBodyWhite: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 22,
  },
  waitingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackedAvatar: {
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  moreBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3EFFF',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 9,
    color: '#6C3CE1',
  },
  lookingHeadline: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: '#0D0D1A',
    marginBottom: 6,
  },
  lookingSub: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },
  cardBottomSection: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#EFEBFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  dotPurple: {
    backgroundColor: '#6C3CE1',
  },
  dotMuted: {
    backgroundColor: '#E5E0FA',
  },
  dotsText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: '#8E8E93',
  },
  takeSeatBtn: {
    backgroundColor: '#6C3CE1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
  },
  takeSeatBtnText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },

  // Rooms Live Card
  roomsLiveCard: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#EFEBFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomsIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roomsTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  roomsTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: '#0D0D1A',
    marginBottom: 2,
  },
  roomsSubtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: '#8E8E93',
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: '#6C3CE1',
  },

  // Section Styling
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: '#0D0D1A',
  },
  seeAllText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: '#6C3CE1',
  },

  // Date Cards
  dateCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EFEBFF',
    borderRadius: 20,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateAvatar: {
    borderWidth: 2,
    borderRadius: 999,
    marginRight: 12,
    overflow: 'hidden',
  },
  dateDetails: {
    flex: 1,
  },
  dateName: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: '#0D0D1A',
  },
  dateSub: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  badgeContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  percentageText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
  },

  // Question Card & Chips
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 32,
    borderWidth: 1.5,
    borderColor: '#EFEBFF',
  },
  questionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: '#A899E6',
    letterSpacing: 0.5,
  },
  questionText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: '#0D0D1A',
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 22,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1.5,
  },
  chipSelected: {
    backgroundColor: '#F3EFFF',
    borderColor: '#6C3CE1',
  },
  chipUnselected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEBFF',
  },
  chipText: {
    fontSize: 13,
  },
  chipTextSelected: {
    fontFamily: fontFamily.bold,
    color: '#6C3CE1',
  },
  chipTextUnselected: {
    fontFamily: fontFamily.medium,
    color: '#8E8E93',
  },
});
