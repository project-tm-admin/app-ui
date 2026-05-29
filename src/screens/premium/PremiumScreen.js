import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { T, FONTS } from '../../theme';

const CREAM    = '#FAF5ED';
const GOLD_INK = '#7A5810';

// ─── Icons ────────────────────────────────────────────────────────────────────
function XIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18M6 6l12 12" stroke={T.mute} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function ShieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L3 7v6c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7l-9-5z"
        stroke={GOLD_INK} strokeWidth={1.6} />
    </Svg>
  );
}

function MicIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Rect x="9" y="2" width="6" height="12" rx="3" stroke={GOLD_INK} strokeWidth={1.6} />
      <Path d="M19 10a7 7 0 01-14 0M12 19v3M8 22h8" stroke={GOLD_INK} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

function FilterIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={GOLD_INK} strokeWidth={1.6} />
      <Circle cx="12" cy="12" r="3" stroke={GOLD_INK} strokeWidth={1.6} />
      <Path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke={GOLD_INK} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

function InfinityIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4z"
        stroke={GOLD_INK} strokeWidth={1.6} />
      <Path d="M12 12c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z"
        stroke={GOLD_INK} strokeWidth={1.6} />
    </Svg>
  );
}

function EyeIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke={GOLD_INK} strokeWidth={1.6} />
      <Circle cx="12" cy="12" r="3" stroke={GOLD_INK} strokeWidth={1.6} />
    </Svg>
  );
}

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <ShieldIcon />,
    title: 'See full verified profile details',
    sub: 'ID · job · family · income confirmations · everything they shared.',
  },
  {
    icon: <MicIcon />,
    title: 'Voice intros & private messages',
    sub: 'Hear how they speak. Continue conversations after interest is accepted.',
  },
  {
    icon: <FilterIcon />,
    title: 'Advanced filters that matter',
    sub: 'Visa, community, gothram, profession, lifestyle, family preferences.',
  },
  {
    icon: <InfinityIcon />,
    title: 'Unlimited discovery & interests',
    sub: 'Beyond your 3 daily curated matches — explore freely, send freely.',
  },
  {
    icon: <EyeIcon />,
    title: "See who's interested in you",
    sub: 'Profile visitors, shortlisters, and pending interests — no guesswork.',
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function PremiumScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TALAMBRALU · PREMIUM</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <XIcon />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Hero star sphere */}
        <View style={styles.sphereWrap}>
          <LinearGradient
            colors={['#F5ECD0', '#E8D48A', '#D4B860', '#C8A840']}
            start={{ x: 0.2, y: 0.1 }}
            end={{ x: 0.9, y: 0.9 }}
            style={styles.sphere}
          >
            {/* Shine lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <View key={i} style={[styles.shineLine, { top: 28 + i * 12 }]} />
            ))}
            <Svg width={44} height={44} viewBox="0 0 24 24" style={{ zIndex: 2 }}>
              <Path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="#7A4A08"
              />
            </Svg>
          </LinearGradient>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>
          {'More '}
          <Text style={styles.italic}>meaningful{'\n'}</Text>
          {'introductions.'}
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Premium opens the doors family members usually open for you — deeper verification, private discovery, and unhurried conversations.
        </Text>

        {/* Features card */}
        <View style={styles.featuresCard}>
          {FEATURES.map((f, i) => (
            <View key={i} style={[styles.featureRow, i < FEATURES.length - 1 && styles.featureRowBorder]}>
              <View style={styles.featureIcon}>{f.icon}</View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureSub}>{f.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.86}>
          <Text style={styles.ctaText}>★  Continue with Premium · 6 months</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Text style={styles.notNow}>Not now · keep exploring on Free</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: CREAM },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    position: 'relative',
  },
  headerTitle: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    letterSpacing: 1.5,
    color: GOLD_INK,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: { paddingHorizontal: 24, alignItems: 'center' },

  // ── Sphere ────────────────────────────────────────────────────────────────
  sphereWrap: { marginVertical: 24 },
  sphere: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: GOLD_INK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  shineLine: {
    position: 'absolute',
    left: 0, right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  // ── Text ──────────────────────────────────────────────────────────────────
  headline: {
    fontFamily: FONTS.display,
    fontSize: 36,
    color: T.accent,
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 16,
  },
  italic: {
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 14,
    color: T.mute,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 8,
  },

  // ── Features card ─────────────────────────────────────────────────────────
  featuresCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 14,
  },
  featureRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.07)',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FAF5ED',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  featureText: { flex: 1 },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: T.ink,
    marginBottom: 4,
  },
  featureSub: {
    fontSize: 13,
    color: T.mute,
    lineHeight: 19,
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: CREAM,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 12,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  ctaBtn: {
    width: '100%',
    height: 52,
    backgroundColor: T.accent,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: T.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.2,
  },
  notNow: {
    fontSize: 13,
    color: T.mute,
  },
});
