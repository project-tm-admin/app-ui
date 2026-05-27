import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { T, FONTS } from '../../theme';
import TopBar from '../../components/TopBar';

const BG   = '#FAF8F5';
const MAROON = T.accentInk;

function PhoneIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="2" width="14" height="20" rx="3" stroke={T.ink} strokeWidth={1.7} />
      <Path d="M9 6h6" stroke={T.ink} strokeWidth={1.7} strokeLinecap="round" />
      <Circle cx="12" cy="18" r="1" fill={T.ink} />
    </Svg>
  );
}

function GoogleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.2 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.9 6.1C12.4 13 17.7 9.5 24 9.5z" />
      <Path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8C43.7 37.2 46.5 31.3 46.5 24.5z" />
      <Path fill="#FBBC05" d="M10.5 28.6A14.7 14.7 0 019.5 24c0-1.6.3-3.2.8-4.6l-7.9-6.1A23.9 23.9 0 000 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z" />
      <Path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.3 0-11.6-3.5-13.5-9l-7.9 6.1C6.6 42.6 14.6 48 24 48z" />
    </Svg>
  );
}

function AppleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M16.5 1c-1.1 1.2-2 2.9-1.7 4.6 1.5.1 3-0.8 4-2C19.8 2.4 18.8.8 16.5 1z" fill={T.ink} />
      <Path d="M21.5 17.5c-.5 1-1 2-1.8 2.9-.9 1.1-1.9 2.3-3.3 2.3-1.3 0-1.8-.8-3.4-.8-1.7 0-2.2.8-3.5.8-1.4 0-2.3-1.1-3.3-2.3C4.3 17.8 3 14.8 3 12c0-4.2 2.7-6.4 5.4-6.4 1.4 0 2.6.9 3.5.9.8 0 2.4-1 4-1 .9 0 3.2.4 4.6 2.7-3.7 2.1-3.1 7.5.5 9.3z" fill={T.ink} />
    </Svg>
  );
}

function ChevronRight() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M9 6l6 6-6 6" stroke={T.mute} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function AuthRow({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.authRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.authIcon}>{icon}</View>
      <Text style={styles.authLabel}>{label}</Text>
      <ChevronRight />
    </TouchableOpacity>
  );
}

export default function SignInScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title="SIGN IN" />

      <View style={styles.content}>
        {/* Heading block */}
        <View style={styles.headingBlock}>
          <Text style={styles.telugu}>తలంభాలు</Text>
          <Text style={styles.heading}>Welcome back.</Text>
          <Text style={styles.tagline}>Rooted in Culture. Designed for Today.</Text>
          <Text style={styles.sub}>Private, trusted, and thoughtfully designed for Telugu families.</Text>
        </View>

        {/* Auth options */}
        <View style={styles.optionList}>
          <AuthRow
            icon={<PhoneIcon />}
            label="Continue with Phone"
            onPress={() => navigation.navigate('OTP')}
          />
          <AuthRow
            icon={<GoogleIcon />}
            label="Continue with Google"
            onPress={() => {}}
          />
          <AuthRow
            icon={<AppleIcon />}
            label="Continue with Apple"
            onPress={() => {}}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>New to Talambralu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('EmailSignup')} activeOpacity={0.7}>
            <Text style={styles.footerLink}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },

  headingBlock: {
    marginBottom: 32,
  },
  telugu: {
    fontFamily: FONTS.display,
    fontSize: 14,
    color: MAROON,
    marginBottom: 6,
  },
  heading: {
    fontFamily: FONTS.display,
    fontSize: 40,
    color: T.ink,
    lineHeight: 48,
    marginBottom: 6,
  },
  tagline: {
    fontFamily: FONTS.display,
    fontSize: 15,
    color: T.ink,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  sub: {
    fontSize: 13,
    color: T.mute,
    lineHeight: 20,
  },

  optionList: {
    gap: 10,
    marginBottom: 24,
  },
  authRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: T.hair2,
    borderRadius: 14,
    backgroundColor: BG,
  },
  authIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authLabel: {
    flex: 1,
    fontSize: 16,
    color: T.ink,
    fontWeight: '500',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 14,
    color: T.mute,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: MAROON,
  },
});
