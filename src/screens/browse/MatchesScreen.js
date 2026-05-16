import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Polygon } from 'react-native-svg';
import { T, FONTS } from '../../theme';
import PhotoPlaceholder from '../../components/PhotoPlaceholder';

const { width } = Dimensions.get('window');
const CARD_W = width - 32;

function BellIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={T.ink} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M13.73 21a2 2 0 01-3.46 0" stroke={T.ink} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx="18" cy="7" r="4" fill={T.accent} />
    </Svg>
  );
}

function XIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18M6 6l12 12" stroke="#E53E3E" strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

function StarIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path
        d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
        fill="#D4A017"
        stroke="#D4A017"
        strokeWidth={1}
      />
    </Svg>
  );
}

function HeartIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        fill={T.accent}
        stroke={T.accent}
        strokeWidth={1}
      />
    </Svg>
  );
}

function VerifyDotSm() {
  return (
    <View style={styles.verifyDot}>
      <Svg width={10} height={10} viewBox="0 0 10 10">
        <Circle cx="5" cy="5" r="5" fill={T.verify} />
        <Path d="M3 5l1.5 1.5L7 3.5" stroke="white" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

const WHY_REASONS = [
  { icon: '🎓', text: 'Both have US master\'s degrees' },
  { icon: '📍', text: 'Bay Area — 12 miles apart' },
  { icon: '🙏', text: 'Hindu · Kamma community match' },
  { icon: '⭐', text: 'Compatible birth stars (Rohini–Mrigashira)' },
];

const STATS = [
  { label: 'HEIGHT', value: "5'6\"" },
  { label: 'RELIGION', value: 'Hindu · Kamma' },
  { label: 'INCOME', value: '$185K/yr' },
  { label: 'COMPLEXION', value: 'Wheatish' },
];

export default function MatchesScreen() {
  const navigation = useNavigation();
  const [showWhy, setShowWhy] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateLabel}>Friday, May 16</Text>
            <Text style={styles.namaste}>Namaste, Anika</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <BellIcon />
          </TouchableOpacity>
        </View>

        {/* Intro label */}
        <View style={styles.introRow}>
          <Text style={styles.introLabel}>Today's introductions</Text>
          <Text style={styles.introCount}>1 of 5</Text>
        </View>

        {/* Match card */}
        <TouchableOpacity
          style={styles.matchCard}
          onPress={() => navigation.navigate('MatchDetail')}
          activeOpacity={0.95}
        >
          <PhotoPlaceholder width={CARD_W} height={380} label="Anjali R." style={{ borderRadius: 0 }} />

          {/* Top badges */}
          <View style={styles.topBadge}>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>★ PREMIUM</Text>
            </View>
          </View>

          {/* Profile info overlay */}
          <View style={styles.cardInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.matchName}>Anjali R., 28</Text>
              <VerifyDotSm />
            </View>

            {/* 2x2 stats grid */}
            <View style={styles.statsGrid}>
              {STATS.map((s, i) => (
                <View key={i} style={styles.statItem}>
                  <Text style={styles.statLabel}>{s.label}</Text>
                  <Text style={styles.statValue}>{s.value}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.moreAboutRow}
              onPress={() => setShowWhy(v => !v)}
              activeOpacity={0.7}
            >
              <Text style={styles.moreAboutText}>More about Anjali ↓</Text>
            </TouchableOpacity>

            {showWhy && (
              <View style={styles.whyPanel}>
                <Text style={styles.whyTitle}>Why we matched you</Text>
                {WHY_REASONS.map((r, i) => (
                  <View key={i} style={styles.whyRow}>
                    <Text style={styles.whyIcon}>{r.icon}</Text>
                    <Text style={styles.whyText}>{r.text}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Page dots */}
        <View style={styles.dotsRow}>
          {[0, 1, 2, 3, 4].map(i => (
            <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
          ))}
        </View>

        {/* More tomorrow card */}
        <View style={styles.tomorrowCard}>
          <Text style={styles.tomorrowText}>7 more arriving tomorrow</Text>
          <Text style={styles.tomorrowSub}>We carefully curate your matches each day</Text>
        </View>

        {/* Action row */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.actionCircle, styles.passCircle]}>
              <XIcon />
            </View>
            <Text style={[styles.actionLabel, { color: '#E53E3E' }]}>Pass</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.actionCircle, styles.saveCircle]}>
              <StarIcon />
            </View>
            <Text style={[styles.actionLabel, { color: '#D4A017' }]}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <View style={[styles.actionCircle, styles.heartCircle]}>
              <HeartIcon />
            </View>
            <Text style={[styles.actionLabel, { color: T.accent }]}>Interested</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  dateLabel: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: T.mute,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  namaste: {
    fontFamily: FONTS.display,
    fontSize: 26,
    color: T.ink,
    marginTop: 2,
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: T.field,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  introLabel: {
    fontSize: 13,
    color: T.mute,
    fontWeight: '500',
  },
  introCount: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: T.accent,
    fontWeight: '700',
  },
  matchCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: T.field,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  topBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  premiumBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  premiumText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4A017',
    letterSpacing: 0.5,
  },
  cardInfo: {
    backgroundColor: T.bg,
    padding: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  matchName: {
    fontFamily: FONTS.display,
    fontSize: 22,
    color: T.ink,
    fontWeight: '600',
  },
  verifyDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  statItem: {
    width: '47%',
    backgroundColor: T.field,
    borderRadius: 10,
    padding: 10,
  },
  statLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    letterSpacing: 1,
    color: T.mute,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: T.ink2,
  },
  moreAboutRow: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  moreAboutText: {
    fontSize: 13,
    color: T.accent,
    fontWeight: '500',
  },
  whyPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
  },
  whyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: T.accent,
    marginBottom: 10,
  },
  whyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  whyIcon: { fontSize: 15 },
  whyText: { fontSize: 13, color: T.ink2, flex: 1 },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: T.hair2,
  },
  dotActive: {
    width: 20,
    backgroundColor: T.accent,
  },
  tomorrowCard: {
    marginHorizontal: 16,
    backgroundColor: T.field,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  tomorrowText: {
    fontSize: 15,
    fontWeight: '600',
    color: T.ink,
    marginBottom: 4,
  },
  tomorrowSub: {
    fontSize: 12,
    color: T.mute,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    paddingHorizontal: 20,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 6,
  },
  actionCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  passCircle: { backgroundColor: '#FFF0F0' },
  saveCircle: { backgroundColor: '#FFFAED' },
  heartCircle: { backgroundColor: '#FFFFFF' },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
