import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { T, FONTS } from '../../theme';
import TopBar from '../../components/TopBar';
import Stepper from '../../components/Stepper';
import Primary from '../../components/Primary';

const INCOME_RANGES = ['$50K–$100K', '$100K–$150K', '$150K–$200K', '$200K+'];

function DualSlider({ value, label }) {
  return (
    <View style={styles.sliderWrap}>
      <View style={styles.sliderTrack}>
        <View style={styles.sliderFillDual} />
        <View style={[styles.sliderThumb, { left: '20%' }]} />
        <View style={[styles.sliderThumb, { left: '60%' }]} />
      </View>
      <View style={styles.incomeLabels}>
        <Text style={styles.incomeMin}>$100K</Text>
        <Text style={styles.incomeCenter}>{label}</Text>
        <Text style={styles.incomeMax}>$185K</Text>
      </View>
    </View>
  );
}

export default function EducationScreen() {
  const navigation = useNavigation();
  const [degree, setDegree] = useState("Master's in Computer Science");
  const [university, setUniversity] = useState('University of Texas at Austin');
  const [jobTitle, setJobTitle] = useState('Senior Software Engineer');
  const [company, setCompany] = useState('Google');

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar onSkip={() => navigation.navigate('Visa')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Stepper current={7} total={16} />
        <Text style={styles.title}>Education{'\n'}& work</Text>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>HIGHEST DEGREE</Text>
          <TextInput
            style={styles.input}
            value={degree}
            onChangeText={setDegree}
            placeholder="e.g. B.Tech, MS, MBA, PhD..."
            placeholderTextColor={T.mute}
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>UNIVERSITY / COLLEGE</Text>
          <TextInput
            style={styles.input}
            value={university}
            onChangeText={setUniversity}
            placeholder="e.g. UT Austin, Georgia Tech..."
            placeholderTextColor={T.mute}
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>JOB TITLE</Text>
          <TextInput
            style={styles.input}
            value={jobTitle}
            onChangeText={setJobTitle}
            placeholder="e.g. Software Engineer, Doctor..."
            placeholderTextColor={T.mute}
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>COMPANY</Text>
          <TextInput
            style={styles.input}
            value={company}
            onChangeText={setCompany}
            placeholder="e.g. Google, TCS, Mayo Clinic..."
            placeholderTextColor={T.mute}
          />
        </View>

        <Text style={styles.fieldLabel}>ANNUAL INCOME RANGE</Text>
        <DualSlider label="$100K – $185K" />

        <View style={styles.incomeChips}>
          {INCOME_RANGES.map((r, i) => (
            <View key={i} style={[styles.incomeChip, i === 1 && styles.incomeChipSelected]}>
              <Text style={[styles.incomeChipText, i === 1 && styles.incomeChipTextSelected]}>{r}</Text>
            </View>
          ))}
        </View>

        <Primary
          label="Continue"
          onPress={() => navigation.navigate('Visa')}
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
    marginBottom: 28,
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
  sliderWrap: { marginBottom: 12 },
  sliderTrack: {
    height: 4,
    backgroundColor: T.hair2,
    borderRadius: 2,
    position: 'relative',
    marginBottom: 12,
  },
  sliderFillDual: {
    position: 'absolute',
    left: '20%',
    right: '40%',
    top: 0,
    bottom: 0,
    backgroundColor: T.accent,
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    top: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: T.accent,
    borderWidth: 3,
    borderColor: '#fff',
    marginLeft: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  incomeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incomeMin: { fontSize: 12, color: T.mute, fontFamily: FONTS.mono },
  incomeCenter: { fontSize: 13, fontWeight: '600', color: T.ink },
  incomeMax: { fontSize: 12, color: T.mute, fontFamily: FONTS.mono },
  incomeChips: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 4,
  },
  incomeChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: T.hair2,
  },
  incomeChipSelected: {
    backgroundColor: T.accent,
    borderColor: T.accent,
  },
  incomeChipText: {
    fontSize: 13,
    color: T.ink2,
  },
  incomeChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
