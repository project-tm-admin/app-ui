import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { T, FONTS } from '../../theme';
import TopBar from '../../components/TopBar';
import Primary from '../../components/Primary';

function EyeIcon({ visible }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={T.mute} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx="12" cy="12" r="3" stroke={T.mute} strokeWidth={1.8} />
      {!visible && <Path d="M2 2L22 22" stroke={T.mute} strokeWidth={1.8} strokeLinecap="round" />}
    </Svg>
  );
}

function StrengthBar({ active, color }) {
  return (
    <View style={[styles.bar, { backgroundColor: active ? color : T.hair2 }]} />
  );
}

function CheckMark({ done }) {
  return (
    <View style={[styles.checkCircle, done && styles.checkDone]}>
      {done && (
        <Svg width={10} height={10} viewBox="0 0 10 10">
          <Path d="M2 5L4 7L8 3" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      )}
    </View>
  );
}

function PasswordRequirements({ password }) {
  const reqs = [
    { label: 'At least 8 characters', done: password.length >= 8 },
    { label: 'One uppercase letter', done: /[A-Z]/.test(password) },
    { label: 'One number or symbol', done: /[\d\W]/.test(password) },
    { label: 'Not a common password', done: password.length >= 6 && !/password|123456/i.test(password) },
  ];
  return (
    <View style={styles.reqGrid}>
      {reqs.map((r, i) => (
        <View key={i} style={styles.reqItem}>
          <CheckMark done={r.done} />
          <Text style={[styles.reqText, r.done && styles.reqDone]}>{r.label}</Text>
        </View>
      ))}
    </View>
  );
}

function getStrength(password) {
  if (password.length === 0) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[\d]/.test(password)) score++;
  if (/[\W]/.test(password)) score++;
  return score;
}

export default function EmailSignupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Str0ng!pwd');
  const [showPass, setShowPass] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const strength = getStrength(password);
  const strengthColors = ['#E53E3E', '#E57732', '#D4AC0D', '#3D8A5C'];
  const strengthLabels = ['', 'WEAK', 'FAIR', 'GOOD', 'STRONG'];

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create your{'\n'}account</Text>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>FULL NAME</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Anika Reddy"
            placeholderTextColor={T.mute}
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>EMAIL</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="anika@example.com"
            placeholderTextColor={T.mute}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>PASSWORD</Text>
          <View style={styles.passRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPass(v => !v)} style={styles.eyeBtn}>
              <EyeIcon visible={showPass} />
            </TouchableOpacity>
          </View>

          {/* Strength meter */}
          <View style={styles.strengthRow}>
            {[1, 2, 3, 4].map(i => (
              <StrengthBar
                key={i}
                active={i <= strength}
                color={strengthColors[Math.min(strength - 1, 3)]}
              />
            ))}
            <Text style={[styles.strengthLabel, { color: strengthColors[Math.min(strength - 1, 3)] || T.mute }]}>
              {strengthLabels[strength]}
            </Text>
          </View>
        </View>

        <PasswordRequirements password={password} />

        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setMarketing(v => !v)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, marketing && styles.checkboxOn]}>
            {marketing && (
              <Svg width={10} height={10} viewBox="0 0 10 10">
                <Path d="M2 5L4 7L8 3" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            )}
          </View>
          <Text style={styles.checkLabel}>
            Send me match suggestions and success stories (no spam)
          </Text>
        </TouchableOpacity>

        <Primary
          label="Create account"
          onPress={() => navigation.navigate('OTP')}
          style={{ marginTop: 24 }}
        />

        <TouchableOpacity onPress={() => navigation.navigate('OTP')} style={styles.signInLink}>
          <Text style={styles.signInText}>
            Have an account?{' '}
            <Text style={styles.signInBold}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  content: { paddingHorizontal: 24, paddingBottom: 40 },
  title: {
    fontFamily: FONTS.display,
    fontSize: 38,
    color: T.ink,
    lineHeight: 46,
    marginBottom: 32,
    marginTop: 8,
  },
  fieldWrap: { marginBottom: 16 },
  fieldLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 1.2,
    color: T.mute,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    backgroundColor: T.field,
    borderWidth: 1,
    borderColor: T.hair,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: T.ink,
  },
  passRow: { flexDirection: 'row', alignItems: 'center', gap: 0 },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    top: 14,
    padding: 4,
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  bar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
  strengthLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 1,
    marginLeft: 4,
  },
  reqGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '47%',
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: T.hair2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkDone: {
    backgroundColor: T.verify,
    borderColor: T.verify,
  },
  reqText: {
    fontSize: 12,
    color: T.mute,
    flex: 1,
  },
  reqDone: {
    color: T.verify,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: T.hair2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  checkboxOn: {
    backgroundColor: T.accent,
    borderColor: T.accent,
  },
  checkLabel: {
    flex: 1,
    fontSize: 13,
    color: T.mute,
    lineHeight: 20,
  },
  signInLink: { alignItems: 'center', marginTop: 20 },
  signInText: { fontSize: 14, color: T.mute },
  signInBold: { color: T.accent, fontWeight: '600' },
});
