import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  Animated, PanResponder, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Rect, Polygon } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { T, FONTS } from '../../theme';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.22;

// ─── Colors ──────────────────────────────────────────────────────────────────
const GOLD   = '#C8920A';
const GOLD_S = '#FEF3D4';
const TEAL_S = '#D4EEF4';
const TEAL_T = '#2A7A8A';
const PINK_S = '#FDE8EC';
const PINK_T = '#C0304A';

// ─── Match data ───────────────────────────────────────────────────────────────
const MATCHES = [
  {
    name: 'Priya S.', age: 26, matchPct: 87,
    location: 'Austin, TX, USA',
    job: 'Software Engineer at Amazon',
    edu: 'MS Computer Science · UT Dallas',
    gradient: ['#D4A5A0', '#A07070', '#7A4A50'],
    tags: [
      { emoji: '💕', label: 'Marriage-Focused', bg: PINK_S, color: PINK_T },
      { emoji: '👨‍👩‍👧', label: 'Family Involved', bg: GOLD_S, color: GOLD },
      { emoji: '🌐', label: 'US Settled', bg: TEAL_S, color: TEAL_T },
    ],
    stats: [
      { type: 'height',    label: 'Height',    value: "5'4\"",      iconBg: '#FFE4E8', iconColor: '#C0304A' },
      { type: 'community', label: 'Community', value: 'Reddy',      iconBg: '#EDE9FE', iconColor: '#7C3AED' },
      { type: 'tongue',    label: 'Tongue',    value: 'Telugu',     iconBg: '#D4EEF4', iconColor: '#2A7A8A' },
      { type: 'religion',  label: 'Religion',  value: 'Hindu',      iconBg: '#FEF3D4', iconColor: '#C8920A' },
      { type: 'diet',      label: 'Diet',      value: 'Vegetarian', iconBg: '#D4EDE0', iconColor: '#2D7A50' },
    ],
  },
  {
    name: 'Anjali R.', age: 28, matchPct: 91,
    location: 'Dallas, TX, USA',
    job: 'Senior Product Manager at Microsoft',
    edu: 'MBA · UT Austin',
    gradient: ['#C4956A', '#A87050', '#8A5A3C'],
    stats: [
      { type: 'height',    label: 'Height',    value: "5'6\"",  iconBg: '#FFE4E8', iconColor: '#C0304A' },
      { type: 'community', label: 'Community', value: 'Kamma',  iconBg: '#EDE9FE', iconColor: '#7C3AED' },
      { type: 'tongue',    label: 'Tongue',    value: 'Telugu', iconBg: '#D4EEF4', iconColor: '#2A7A8A' },
      { type: 'religion',  label: 'Religion',  value: 'Hindu',  iconBg: '#FEF3D4', iconColor: '#C8920A' },
      { type: 'diet',      label: 'Diet',      value: 'Non-Veg',iconBg: '#D4EDE0', iconColor: '#2D7A50' },
    ],
  },
  {
    name: 'Kavya M.', age: 30, matchPct: 78,
    location: 'San Jose, CA, USA',
    job: 'Data Scientist at Google',
    edu: 'PhD Computer Science · Stanford',
    gradient: ['#6A8BA8', '#4A6A8A', '#2A4A6A'],
    stats: [
      { type: 'height',    label: 'Height',    value: "5'5\"",      iconBg: '#FFE4E8', iconColor: '#C0304A' },
      { type: 'community', label: 'Community', value: 'Brahmin',    iconBg: '#EDE9FE', iconColor: '#7C3AED' },
      { type: 'tongue',    label: 'Tongue',    value: 'Telugu',     iconBg: '#D4EEF4', iconColor: '#2A7A8A' },
      { type: 'religion',  label: 'Religion',  value: 'Hindu',      iconBg: '#FEF3D4', iconColor: '#C8920A' },
      { type: 'diet',      label: 'Diet',      value: 'Vegetarian', iconBg: '#D4EDE0', iconColor: '#2D7A50' },
    ],
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function BellIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={T.ink} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M13.73 21a2 2 0 01-3.46 0" stroke={T.ink} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function DotsIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="5"  r="1.5" fill="white" />
      <Circle cx="12" cy="12" r="1.5" fill="white" />
      <Circle cx="12" cy="19" r="1.5" fill="white" />
    </Svg>
  );
}

function PlayIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Polygon points="5,3 19,12 5,21" fill="white" />
    </Svg>
  );
}

function BookmarkIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
        stroke={T.hair2} strokeWidth={1.8} />
    </Svg>
  );
}

function VerifiedBadge() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <Circle cx="9" cy="9" r="9" fill="#3D8A5C" />
      <Path d="M5 9l3 3 5-5" stroke="white" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ShieldIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L3 7v6c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7l-9-5z"
        stroke={GOLD} strokeWidth={1.6} fill={GOLD_S} />
      <Path d="M9 12l2 2 4-4" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function LocationIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke={T.mute} strokeWidth={1.6} />
      <Circle cx="12" cy="9" r="2.5" stroke={T.mute} strokeWidth={1.4} />
    </Svg>
  );
}

function BriefcaseIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="7" width="20" height="14" rx="2" stroke={T.mute} strokeWidth={1.6} />
      <Path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke={T.mute} strokeWidth={1.6} />
    </Svg>
  );
}

function GradCapIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="M22 10l-10-7L2 10l10 7 10-7z" stroke={T.mute} strokeWidth={1.6} strokeLinejoin="round" />
      <Path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke={T.mute} strokeWidth={1.6} />
    </Svg>
  );
}

function XIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke="#888" strokeWidth={1.5} />
      <Path d="M15 9l-6 6M9 9l6 6" stroke="#888" strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function StarIcon({ color }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
}

function HeartIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        fill="white" />
    </Svg>
  );
}

// ─── Stat icons (colored boxes) ───────────────────────────────────────────────
function HeightStatIcon({ color }) {
  return (
    <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function CommunityStatIcon({ color }) {
  return (
    <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <Circle cx="9" cy="7" r="3" stroke={color} strokeWidth={1.8} />
      <Path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M16 11c1.7 0 3 1.3 3 3s-1.3 3-3 3" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M19 20c0-2 1-3.5 2-4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
function TongueStatIcon({ color }) {
  return (
    <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
        stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
}
function ReligionStatIcon({ color }) {
  return (
    <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
function DietStatIcon({ color }) {
  return (
    <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2a9 9 0 100 18A9 9 0 0012 2z" stroke={color} strokeWidth={1.8} />
      <Path d="M8 12s1-2 4-2 4 2 4 2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx="9" cy="9" r="1" fill={color} />
      <Circle cx="15" cy="9" r="1" fill={color} />
    </Svg>
  );
}

function LockIcon() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="11" width="18" height="11" rx="2" stroke={T.mute} strokeWidth={1.6} />
      <Path d="M7 11V7a5 5 0 0110 0v4" stroke={T.mute} strokeWidth={1.6} />
    </Svg>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function MatchesScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX      = useRef(new Animated.Value(0)).current;
  const indexRef        = useRef(0);
  const pendingEntryDir = useRef(null);

  useLayoutEffect(() => {
    const dir = pendingEntryDir.current;
    if (dir !== null) {
      pendingEntryDir.current = null;
      translateX.setValue(dir * (width + 40));
      Animated.spring(translateX, {
        toValue: 0, useNativeDriver: true, tension: 220, friction: 20,
      }).start();
    }
  }, [currentIndex]);

  const commitSwipe = (nextIndex, entryDir) => {
    pendingEntryDir.current = entryDir;
    indexRef.current = nextIndex;
    setCurrentIndex(nextIndex);
  };

  const advanceTo = (next) => {
    if (next < 0 || next >= MATCHES.length) return;
    commitSwipe(next, next > indexRef.current ? 1 : -1);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > Math.abs(gs.dy) && Math.abs(gs.dx) > 10,
      onPanResponderMove: (_, gs) => {
        const idx = indexRef.current;
        const edge = (idx === 0 && gs.dx > 0) || (idx === MATCHES.length - 1 && gs.dx < 0);
        translateX.setValue(edge ? gs.dx * 0.12 : gs.dx);
      },
      onPanResponderRelease: (_, gs) => {
        const idx = indexRef.current;
        if (gs.dx < -SWIPE_THRESHOLD && idx < MATCHES.length - 1) {
          commitSwipe(idx + 1, 1);
        } else if (gs.dx > SWIPE_THRESHOLD && idx > 0) {
          commitSwipe(idx - 1, -1);
        } else {
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true, tension: 180, friction: 12 }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateX, { toValue: 0, useNativeDriver: true, tension: 180, friction: 12 }).start();
      },
    })
  ).current;

  const match = MATCHES[currentIndex];

  const renderStatIcon = (type, color) => {
    if (type === 'height')    return <HeightStatIcon color={color} />;
    if (type === 'community') return <CommunityStatIcon color={color} />;
    if (type === 'tongue')    return <TongueStatIcon color={color} />;
    if (type === 'religion')  return <ReligionStatIcon color={color} />;
    if (type === 'diet')      return <DietStatIcon color={color} />;
    return null;
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Header ────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logoScript}>✿ తలంభాలు</Text>
            <Text style={styles.logoSub}>Bringing families together</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
              <BellIcon />
              <View style={styles.bellDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Greeting + Trust banner ───────────────────────────────────── */}
        <View style={styles.greetRow}>
          <View style={styles.greetLeft}>
            <Text style={styles.greetSmall}>Good to see you,</Text>
            <Text style={styles.greetName}>Anika <Text style={styles.leaf}>🌿</Text></Text>
          </View>
          <View style={styles.trustBanner}>
            <ShieldIcon />
            <View style={styles.trustText}>
              <Text style={styles.trustTitle}>Safe. Verified. Trusted.</Text>
              <Text style={styles.trustSub}>Genuine Telugu families · safe community.</Text>
            </View>
          </View>
        </View>

        {/* ── Section header ────────────────────────────────────────────── */}
        <View style={styles.sectionRow}>
          <View>
            <Text style={styles.sectionTitle}>🌸  Today's Matches</Text>
            <Text style={styles.sectionSub}>Curated for you</Text>
          </View>
          <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View all  ›</Text>
          </TouchableOpacity>
        </View>

        {/* ── Swipeable match card ──────────────────────────────────────── */}
        <Animated.View
          style={[styles.card, { transform: [{ translateX }] }]}
          {...panResponder.panHandlers}
        >
          {/* Photo area */}
          <View style={styles.photoArea}>
            <LinearGradient
              colors={match.gradient}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </View>

          {/* Card body */}
          <View style={styles.cardBody}>
            {/* Name row */}
            <View style={styles.nameRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MatchDetail')}
                activeOpacity={0.7}
                style={styles.nameTap}
              >
                <Text style={styles.name}>{match.name}, {match.age}</Text>
              </TouchableOpacity>
              <VerifiedBadge />
            </View>

            {/* Location */}
            <View style={styles.infoRow}>
              <LocationIcon />
              <Text style={styles.infoText}>{match.location}</Text>
            </View>

            {/* Job */}
            <View style={styles.infoRow}>
              <BriefcaseIcon />
              <Text style={styles.infoText}>{match.job}</Text>
            </View>

            {/* Education */}
            <View style={styles.infoRow}>
              <GradCapIcon />
              <Text style={styles.infoText}>{match.edu}</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsGrid}>
              {match.stats.filter(s => s.type !== 'tongue').map((s, i) => (
                <View key={i} style={styles.statCell}>
                  <Text style={styles.statLabel}>{s.label}</Text>
                  <Text style={styles.statValue}>{s.value}</Text>
                </View>
              ))}
            </View>

            {/* Action buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.skipBtn}
                onPress={() => advanceTo(currentIndex + 1)}
                activeOpacity={0.75}
              >
                <XIcon />
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shortlistBtn}
                onPress={() => advanceTo(currentIndex + 1)}
                activeOpacity={0.75}
              >
                <StarIcon color={GOLD} />
                <Text style={styles.shortlistText}>Shortlist</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.expressBtn}
                onPress={() => advanceTo(currentIndex + 1)}
                activeOpacity={0.85}
              >
                <HeartIcon />
                <Text style={styles.expressText}>Send Interest</Text>
              </TouchableOpacity>
            </View>

            {/* Privacy note */}
            <View style={styles.privacyRow}>
              <LockIcon />
              <Text style={styles.privacyText}>Private — shared only if accepted.</Text>
            </View>
          </View>
        </Animated.View>

        {/* ── Upgrade banner ────────────────────────────────────────────── */}
        <View style={styles.upgradeBanner}>
          <Text style={styles.upgradeIcon}>⭐</Text>
          <View style={styles.upgradeText}>
            <Text style={[styles.upgradeTitle, { color: T.accent }]}>3 of 3 daily intros viewed</Text>
            <Text style={styles.upgradeSub}>Unlock unlimited intros & verified details with Premium.</Text>
          </View>
          <TouchableOpacity style={styles.upgradeBtn} activeOpacity={0.85}>
            <Text style={styles.upgradeBtnText}>★ Upgrade</Text>
          </TouchableOpacity>
        </View>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <View style={styles.safeFooter}>
          <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <Path d="M12 2L3 7v6c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7l-9-5z"
              stroke={T.mute} strokeWidth={1.5} />
          </Svg>
          <Text style={styles.safeText}>SAFE & VERIFIED COMMUNITY</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  scroll: { paddingBottom: 16 },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 4,
  },
  headerLeft: { gap: 1 },
  logoScript: {
    fontFamily: FONTS.display,
    fontSize: 16,
    color: T.accent,
    letterSpacing: 0.3,
  },
  logoSub: {
    fontSize: 11,
    color: T.mute,
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bellBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: T.hair,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53E3E',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D4A5A0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },

  // ── Greeting + trust ──────────────────────────────────────────────────────
  greetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
    gap: 12,
  },
  greetLeft: { gap: 0 },
  greetSmall: {
    fontSize: 13,
    color: T.mute,
  },
  greetName: {
    fontFamily: FONTS.display,
    fontSize: 28,
    color: T.accent,
    lineHeight: 34,
  },
  leaf: { fontSize: 18 },
  trustBanner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: GOLD_S,
    borderRadius: 12,
    padding: 10,
  },
  trustText: { flex: 1, gap: 2 },
  trustTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: T.ink,
  },
  trustSub: {
    fontSize: 11,
    color: T.mute,
    lineHeight: 15,
  },

  // ── Section header ────────────────────────────────────────────────────────
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontFamily: FONTS.display,
    fontSize: 17,
    color: T.accent,
  },
  sectionSub: {
    fontSize: 12,
    color: T.mute,
    marginTop: 1,
  },
  viewAllBtn: {
    borderWidth: 1,
    borderColor: T.accent,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  viewAllText: {
    fontSize: 13,
    color: T.accent,
    fontWeight: '500',
  },

  // ── Match card ────────────────────────────────────────────────────────────
  card: {
    marginHorizontal: 16,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 5,
  },

  // Photo area
  photoArea: {
    height: 230,
    position: 'relative',
    overflow: 'hidden',
  },
  matchBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  matchBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  dotsBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.50)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
  },
  voiceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  voiceDuration: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },

  // Card body
  cardBody: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameTap: { flex: 1 },
  name: {
    fontFamily: FONTS.display,
    fontSize: 22,
    color: T.ink,
  },
  nameRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookmarkBtn: {
    padding: 4,
  },

  // Info rows
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  infoText: {
    fontSize: 13,
    color: T.mute,
    flex: 1,
  },

  // Tags
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
    marginBottom: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  tagEmoji: { fontSize: 12 },
  tagLabel: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
    marginTop: 10,
  },
  statCell: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: '#F5F2EE',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: T.hair,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  statLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    color: T.mute,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: T.ink,
  },

  // Actions
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 100,
    borderWidth: 1.2,
    borderColor: T.hair2,
  },
  skipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  shortlistBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 100,
    borderWidth: 1.2,
    borderColor: GOLD,
    backgroundColor: GOLD_S,
  },
  shortlistText: {
    fontSize: 14,
    color: GOLD,
    fontWeight: '600',
  },
  expressBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 100,
    backgroundColor: T.accent,
  },
  expressText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },

  // Privacy
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  privacyText: {
    fontSize: 12,
    color: T.mute,
  },

  // ── Upgrade banner ────────────────────────────────────────────────────────
  upgradeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: GOLD_S,
    borderRadius: 14,
    padding: 14,
  },
  upgradeIcon: { fontSize: 22 },
  upgradeText: { flex: 1, gap: 2 },
  upgradeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: T.ink,
  },
  upgradeSub: {
    fontSize: 11,
    color: T.mute,
    lineHeight: 15,
  },
  upgradeBtn: {
    backgroundColor: T.accent,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  upgradeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },

  // ── Safe footer ───────────────────────────────────────────────────────────
  safeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
    paddingBottom: 4,
  },
  safeText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    color: T.mute,
    letterSpacing: 1,
  },
});
