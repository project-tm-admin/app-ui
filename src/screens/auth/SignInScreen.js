import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { T, FONTS } from '../../theme';
import TopBar from '../../components/TopBar';

const MAROON = T.accentInk;

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

function ChevronDown() {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9l6 6 6-6" stroke={T.mute} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ArrowRight() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function SignInScreen() {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  const handleSendCode = () => {
    navigation.navigate('OTP');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title="SIGN IN" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Brand + heading */}
          <Text style={styles.telugu}>తలంభాలు</Text>
          <Text style={styles.heading}>Welcome back.</Text>

          {/* Google SSO */}
          <TouchableOpacity style={styles.googleBtn} activeOpacity={0.8}>
            <GoogleIcon />
            <Text style={styles.googleLabel}>Continue with Gmail</Text>
          </TouchableOpacity>

          {/* OR divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Phone input row */}
          <View style={styles.phoneBox}>
            <TouchableOpacity style={styles.countryBtn} activeOpacity={0.7}>
              <Text style={styles.countryLabel}>US +1</Text>
              <ChevronDown />
            </TouchableOpacity>
            <View style={styles.phoneDivider} />
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              placeholder="(408) 555 0142"
              placeholderTextColor={T.mute}
              keyboardType="phone-pad"
              returnKeyType="done"
              onSubmitEditing={handleSendCode}
            />
            <TouchableOpacity
              style={[styles.sendBtn, !phone && styles.sendBtnDisabled]}
              onPress={handleSendCode}
              activeOpacity={0.85}
            >
              <Text style={styles.sendBtnText}>Send code</Text>
              <ArrowRight />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>New to Talambralu? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('EmailSignup')} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Create account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
  },

  telugu: {
    fontFamily: FONTS.display,
    fontSize: 15,
    color: MAROON,
    letterSpacing: 1,
    marginBottom: 8,
  },
  heading: {
    fontFamily: FONTS.display,
    fontSize: 42,
    color: T.ink,
    lineHeight: 50,
    marginBottom: 36,
  },

  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 54,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: T.hair2,
    backgroundColor: T.bg,
    marginBottom: 20,
  },
  googleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: T.ink,
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: T.hair2,
  },
  dividerText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: T.mute,
    letterSpacing: 1.5,
  },

  phoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: T.hair2,
    borderRadius: 16,
    overflow: 'hidden',
    height: 58,
    paddingLeft: 16,
    paddingRight: 6,
  },
  countryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 12,
  },
  countryLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: T.ink,
  },
  phoneDivider: {
    width: 1,
    height: 22,
    backgroundColor: T.hair2,
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: T.ink,
    padding: 0,
  },
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: T.ink,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginLeft: 8,
  },
  sendBtnDisabled: {
    opacity: 0.45,
  },
  sendBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 40,
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
