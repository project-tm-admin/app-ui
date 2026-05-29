import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Rect, Polygon } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { T, FONTS } from '../../theme';

const GOLD = '#C8920A';
const GOLD_S = '#FEF3D4';

// ─── Icons ────────────────────────────────────────────────────────────────────

function BackIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M20 12H4M4 12l6-6M4 12l6 6" stroke={T.ink} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronRight() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke={T.hair2} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PersonIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={T.ink} strokeWidth={1.6} />
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={T.ink} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

function ShieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L3 7v6c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7l-9-5z"
        stroke={T.ink} strokeWidth={1.6} />
    </Svg>
  );
}

function BellIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={T.ink} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M13.73 21a2 2 0 01-3.46 0" stroke={T.ink} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

function LockIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="11" width="18" height="11" rx="2" stroke={T.ink} strokeWidth={1.6} />
      <Path d="M7 11V7a5 5 0 0110 0v4" stroke={T.ink} strokeWidth={1.6} />
    </Svg>
  );
}

function HelpIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={T.ink} strokeWidth={1.6} />
      <Path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke={T.ink} strokeWidth={1.6} strokeLinecap="round" />
      <Circle cx="12" cy="17" r="0.8" fill={T.ink} />
    </Svg>
  );
}

function ChatIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
        stroke={T.ink} strokeWidth={1.6} strokeLinejoin="round" />
    </Svg>
  );
}

function DocIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke={T.ink} strokeWidth={1.6} />
      <Path d="M14 2v6h6M9 12h6M9 16h4" stroke={T.ink} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function StarFilled() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={GOLD} />
    </Svg>
  );
}

// ─── Section group ────────────────────────────────────────────────────────────

function SettingsRow({ icon, title, subtitle, isLast, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.row, !isLast && styles.rowBorder]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowIcon}>{icon}</View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle ? <Text style={styles.rowSub}>{subtitle}</Text> : null}
      </View>
      <ChevronRight />
    </TouchableOpacity>
  );
}

function SettingsGroup({ label, rows }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupLabel}>{label}</Text>
      <View style={styles.groupCard}>
        {rows.map((r, i) => (
          <SettingsRow
            key={r.title}
            icon={r.icon}
            title={r.title}
            subtitle={r.subtitle}
            isLast={i === rows.length - 1}
            onPress={r.onPress}
          />
        ))}
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function MyProfileScreen() {
  const navigation = useNavigation();

  const accountRows = [
    {
      icon: <PersonIcon />,
      title: 'Edit profile',
      subtitle: 'Photos, basics, prompts',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      icon: <ShieldIcon />,
      title: 'Privacy & blocked',
      subtitle: 'Profile visibility · 4 blocked',
    },
    {
      icon: <BellIcon />,
      title: 'Notifications',
      subtitle: 'Push · email · WhatsApp',
    },
    {
      icon: <LockIcon />,
      title: 'Login & security',
      subtitle: 'Phone · email · passkey',
    },
  ];

  const supportRows = [
    { icon: <HelpIcon />, title: 'Help & FAQs' },
    { icon: <ChatIcon />, title: 'Contact us' },
    { icon: <DocIcon />,  title: 'Terms & privacy' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn} hitSlop={8}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.topTitle}>SETTINGS</Text>
        <View style={styles.topBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* User identity row */}
        <View style={styles.identityRow}>
          <View style={styles.avatarCircle}>
            <LinearGradient
              colors={['#D4A574', '#C4856A', '#A86050']}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.avatarInitials}>AT</Text>
          </View>
          <View style={styles.identityText}>
            <Text style={styles.identityName}>Anika Talluri</Text>
            <Text style={styles.identitySub}>+1 415 ••• 2419 · anika@gmail.com</Text>
          </View>
        </View>

        {/* Premium banner */}
        <View style={styles.premiumCard}>
          <View style={styles.premiumLeft}>
            <View style={styles.starCircle}>
              <StarFilled />
            </View>
            <View style={styles.premiumTextBlock}>
              <Text style={styles.premiumTitle}>Try Talambralu Premium</Text>
              <Text style={styles.premiumSub}>
                Unlimited discovery · verified details · voice intros · private browsing.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.premiumBtn} activeOpacity={0.85} onPress={() => navigation.navigate('Premium')}>
            <Text style={styles.premiumBtnText}>See plans  ›</Text>
          </TouchableOpacity>
        </View>

        {/* Account section */}
        <SettingsGroup label="ACCOUNT" rows={accountRows} />

        {/* Support section */}
        <SettingsGroup label="SUPPORT" rows={supportRows} />

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.7}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },

  // ── Top bar ───────────────────────────────────────────────────────────────
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: T.hair,
  },
  topBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  topTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTS.mono,
    fontSize: 12,
    letterSpacing: 1.5,
    color: T.ink,
  },

  scroll: { paddingHorizontal: 20, paddingTop: 20 },

  // ── Identity ──────────────────────────────────────────────────────────────
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    zIndex: 1,
  },
  identityText: { flex: 1 },
  identityName: {
    fontFamily: FONTS.display,
    fontSize: 22,
    color: T.ink,
    marginBottom: 3,
  },
  identitySub: {
    fontSize: 13,
    color: T.mute,
  },

  // ── Premium banner ────────────────────────────────────────────────────────
  premiumCard: {
    backgroundColor: GOLD_S,
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    gap: 12,
  },
  premiumLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  starCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  premiumTextBlock: { flex: 1 },
  premiumTitle: {
    fontFamily: FONTS.display,
    fontSize: 18,
    color: T.accent,
    marginBottom: 4,
  },
  premiumSub: {
    fontSize: 13,
    color: T.mute,
    lineHeight: 19,
  },
  premiumBtn: {
    backgroundColor: T.accent,
    borderRadius: 100,
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: T.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },

  // ── Settings group ────────────────────────────────────────────────────────
  group: { marginBottom: 24 },
  groupLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: T.mute,
    marginBottom: 10,
  },
  groupCard: {
    borderWidth: 1,
    borderColor: T.hair,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: T.bg,
  },

  // ── Row ───────────────────────────────────────────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
    backgroundColor: T.bg,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: T.hair,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: T.field,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  rowText: { flex: 1 },
  rowTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: T.ink,
    marginBottom: 2,
  },
  rowSub: {
    fontSize: 12,
    color: T.mute,
  },

  // ── Sign out ──────────────────────────────────────────────────────────────
  signOutBtn: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  signOutText: {
    fontSize: 15,
    color: '#E53E3E',
    fontWeight: '500',
  },
});
