import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Screen } from '../../components';
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
      avatar: require('../../assets/images/avatar_1.png'),
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
      avatar: require('../../assets/images/avatar_2.png'),
      badgeLabel: 'Friends',
      badgeBg: '#E0F2FE',
      badgeText: '#0284C7',
      avatarBorder: '#0284C7',
      percentageColor: '#0284C7',
    },
    {
      id: '3',
      name: 'solarsister',
      chemistry: '31% chemistry',
      time: '3 days ago',
      percentage: '31%',
      avatar: require('../../assets/images/avatar_1.png'), // fallback illustration
      badgeLabel: 'Passed',
      badgeBg: '#F3F4F6',
      badgeText: '#6B7280',
      avatarBorder: '#C0BFDA',
      percentageColor: '#8E8E93',
    },
  ];

  return (
    <Screen noPadding edges={['top']} style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 1. Header Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.userInfo}>
            <Avatar size={40} source={require('../../assets/images/avatar_2.png')} status="none" />
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

        {/* 2. Open Right Now Card */}
        <View style={styles.openRightNowCard}>
          {/* Top section: stats & counts */}
          <View style={styles.cardHeaderRow}>
            {/* Left Col */}
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.openRightNowLabel}>OPEN RIGHT NOW</Text>
              <Text style={styles.hugeNumber}>23</Text>
              <Text style={styles.peopleLagosText}>people in Lagos</Text>
            </View>
            
            {/* Right Col */}
            <View style={styles.cardHeaderRight}>
              <View style={styles.countRow}>
                <View style={[styles.dotMarker, { backgroundColor: '#10B981' }]} />
                <Text style={styles.countText}>14 women</Text>
              </View>
              <View style={styles.countRow}>
                <View style={[styles.dotMarker, { backgroundColor: '#6C3CE1' }]} />
                <Text style={styles.countText}>9 men</Text>
              </View>
              <Text style={styles.avgWaitText}>avg wait 45s</Text>
            </View>
          </View>

          {/* Separation line */}
          <View style={styles.openCardDivider} />

          {/* Middle section: waiting list overlapping avatars */}
          <View style={styles.waitingContainer}>
            <View style={styles.avatarStack}>
              <View style={[styles.avatarCircle, { backgroundColor: '#D1A153', zIndex: 5 }]} />
              <View style={[styles.avatarCircle, { backgroundColor: '#5C3E35', zIndex: 4, marginLeft: -10 }]} />
              <View style={[styles.avatarCircle, { backgroundColor: '#FDE68A', zIndex: 3, marginLeft: -10 }]} />
              <View style={[styles.avatarCircle, { backgroundColor: '#FCD34D', zIndex: 2, marginLeft: -10 }]} />
              <View style={[styles.avatarCircle, { backgroundColor: '#3E2723', zIndex: 1, marginLeft: -10 }]} />
            </View>
            <Text style={styles.waitingText}>and 18 more waiting</Text>
          </View>

          {/* Join button */}
          <TouchableOpacity style={styles.joinSeatBtn} activeOpacity={0.8}>
            <Text style={styles.joinSeatBtnText}>Join them — open my seat</Text>
          </TouchableOpacity>

          {/* Bottom text */}
          <Text style={styles.seatsLeftText}>2 seats left today</Text>
        </View>

        {/* 3. Your dates Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your dates</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {dates.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.9} style={styles.dateCard}>
            {/* Avatar inside purple/blue/grey border */}
            <View style={[styles.avatarContainer, { borderColor: item.avatarBorder }]}>
              <Image source={item.avatar} style={styles.avatarImage} />
            </View>

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
    backgroundColor: '#FFFFFF',
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
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
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
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDot: {
    position: 'absolute',
    top: 2,
    right: 2,
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#E5E0FA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHeaderLeft: {
    flex: 1,
  },
  openRightNowLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: '#A899E6',
    letterSpacing: 0.5,
  },
  hugeNumber: {
    fontFamily: fontFamily.bold,
    fontSize: 48,
    color: '#0D0D1A',
    marginTop: 4,
    lineHeight: 48,
  },
  peopleLagosText: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: '#8E8E93',
    marginTop: 4,
  },
  cardHeaderRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dotMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  countText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: '#8E8E93',
  },
  avgWaitText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: '#C0BFDA',
    marginTop: 2,
  },
  openCardDivider: {
    height: 1.5,
    backgroundColor: '#F5F3FF',
    marginVertical: 16,
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
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  waitingText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 12,
  },
  joinSeatBtn: {
    backgroundColor: '#6C3CE1',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C3CE1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  joinSeatBtnText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  seatsLeftText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: '#C0BFDA',
    textAlign: 'center',
    marginTop: 10,
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
    borderWidth: 1,
    borderColor: '#e8e8eeff',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F7FF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  dateDetails: {
    flex: 1,
    marginLeft: 12,
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
    backgroundColor: '#F8F6FF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  questionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: '#A78BFA',
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
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#6C3CE1',
    borderWidth: 1.5,
  },
  chipUnselected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
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
    color: '#9CA3AF',
  },
});
