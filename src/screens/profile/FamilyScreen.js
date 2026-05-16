import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle } from 'react-native-svg';
import { T, FONTS } from '../../theme';
import TopBar from '../../components/TopBar';
import Stepper from '../../components/Stepper';
import Primary from '../../components/Primary';

function PlusIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5v14M5 12h14" stroke={T.accent} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function ParentIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="9" cy="7" r="3" stroke={T.accent} strokeWidth={1.8} />
      <Circle cx="16" cy="7" r="3" stroke={T.accent} strokeWidth={1.8} />
      <Path d="M3 20c0-3.3 2.7-6 6-6h1M11 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={T.accent} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export default function FamilyScreen() {
  const navigation = useNavigation();
  const [fatherProf, setFatherProf] = useState('Retired Engineer');
  const [motherProf, setMotherProf] = useState('Teacher');
  const [siblings, setSiblings] = useState('1 brother (married, in India)');
  const [familyLoc, setFamilyLoc] = useState('Vijayawada, Andhra Pradesh');

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar onSkip={() => navigation.navigate('Horoscope')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Stepper current={9} total={16} />
        <Text style={styles.title}>Your{'\n'}family</Text>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>FATHER'S PROFESSION</Text>
            <TextInput
              style={styles.input}
              value={fatherProf}
              onChangeText={setFatherProf}
              placeholder="e.g. Engineer, Business..."
              placeholderTextColor={T.mute}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>MOTHER'S PROFESSION</Text>
            <TextInput
              style={styles.input}
              value={motherProf}
              onChangeText={setMotherProf}
              placeholder="e.g. Teacher, Homemaker..."
              placeholderTextColor={T.mute}
            />
          </View>
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>SIBLINGS</Text>
          <TextInput
            style={styles.input}
            value={siblings}
            onChangeText={setSiblings}
            placeholder="e.g. 1 sister in the US..."
            placeholderTextColor={T.mute}
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>FAMILY BASED IN</Text>
          <TextInput
            style={styles.input}
            value={familyLoc}
            onChangeText={setFamilyLoc}
            placeholder="e.g. Hyderabad, NJ..."
            placeholderTextColor={T.mute}
          />
        </View>

        <TouchableOpacity style={styles.copilotCard} activeOpacity={0.7}>
          <View style={styles.copilotIcon}>
            <ParentIcon />
          </View>
          <View style={styles.copilotText}>
            <Text style={styles.copilotTitle}>Add a parent co-pilot</Text>
            <Text style={styles.copilotSub}>
              Let a trusted family member help search and vet profiles on your behalf
            </Text>
          </View>
          <View style={styles.plusCircle}>
            <PlusIcon />
          </View>
        </TouchableOpacity>

        <Primary
          label="Continue"
          onPress={() => navigation.navigate('Horoscope')}
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
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfField: { flex: 1 },
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
  copilotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: T.accent,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginTop: 8,
  },
  copilotIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FBF3F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copilotText: { flex: 1 },
  copilotTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: T.accent,
  },
  copilotSub: {
    fontSize: 12,
    color: T.mute,
    marginTop: 3,
    lineHeight: 18,
  },
  plusCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: T.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
