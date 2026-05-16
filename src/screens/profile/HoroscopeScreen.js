import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Star } from 'react-native-svg';
import { T, FONTS } from '../../theme';
import TopBar from '../../components/TopBar';
import Stepper from '../../components/Stepper';
import Primary from '../../components/Primary';

const RASI_GRID = [
  { label: 'BIRTH STAR', value: 'Rohini' },
  { label: 'RASI', value: 'Vrishabha' },
  { label: 'PADA', value: 'Pada 2' },
  { label: 'LAGNA', value: 'Mesha' },
];

function StarIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
        stroke={T.accent}
        strokeWidth={1.5}
        fill={T.accentSoft}
      />
    </Svg>
  );
}

export default function HoroscopeScreen() {
  const navigation = useNavigation();
  const [birthTime, setBirthTime] = useState('06:45 AM');
  const [birthPlace, setBirthPlace] = useState('Vijayawada, Andhra Pradesh');

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar onSkip={() => navigation.navigate('Diet')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Stepper current={10} total={16} />
        <Text style={styles.title}>Birth{'\n'}details</Text>
        <Text style={styles.subtitle}>Used to calculate your horoscope for families who need it</Text>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>BIRTH TIME (OPTIONAL)</Text>
          <TextInput
            style={styles.input}
            value={birthTime}
            onChangeText={setBirthTime}
            placeholder="e.g. 06:45 AM"
            placeholderTextColor={T.mute}
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>BIRTH PLACE (OPTIONAL)</Text>
          <TextInput
            style={styles.input}
            value={birthPlace}
            onChangeText={setBirthPlace}
            placeholder="City, State, Country"
            placeholderTextColor={T.mute}
          />
        </View>

        {/* Calculated horoscope grid */}
        <View style={styles.gridCard}>
          <View style={styles.gridHeader}>
            <StarIcon />
            <Text style={styles.gridTitle}>Calculated from your details</Text>
          </View>
          <View style={styles.grid}>
            {RASI_GRID.map((item, i) => (
              <View key={i} style={styles.gridItem}>
                <Text style={styles.gridLabel}>{item.label}</Text>
                <Text style={styles.gridValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Your horoscope details are only shared with families who specifically request them.
          </Text>
        </View>

        <Primary
          label="Continue"
          onPress={() => navigation.navigate('Diet')}
          style={{ marginTop: 24 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  content: { paddingHorizontal: 24, paddingBottom: 40 },
  title: {
    fontFamily: FONTS.display,
    fontSize: 36,
    color: T.ink,
    lineHeight: 44,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: T.mute,
    marginBottom: 28,
    lineHeight: 22,
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
  gridCard: {
    borderWidth: 1,
    borderColor: T.hair2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  gridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  gridTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: T.mute,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '46%',
    backgroundColor: T.field,
    borderRadius: 12,
    padding: 12,
  },
  gridLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    letterSpacing: 1,
    color: T.mute,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 15,
    fontWeight: '600',
    color: T.ink2,
    fontFamily: FONTS.display,
  },
  noteBox: {
    backgroundColor: T.field,
    borderRadius: 12,
    padding: 14,
  },
  noteText: {
    fontSize: 13,
    color: T.mute,
    lineHeight: 20,
  },
});
