import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { T, FONTS } from '../../theme';
import TopBar from '../../components/TopBar';
import Stepper from '../../components/Stepper';
import Primary from '../../components/Primary';

function InfoBox({ text }) {
  return (
    <View style={styles.infoBox}>
      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke={T.mute} strokeWidth={1.5} />
        <Path d="M12 11v5M12 8h.01" stroke={T.mute} strokeWidth={1.5} strokeLinecap="round" />
      </Svg>
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

export default function NameDOBScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('Anika');
  const [lastName, setLastName] = useState('Reddy');
  const [month, setMonth] = useState('04');
  const [day, setDay] = useState('15');
  const [year, setYear] = useState('1996');

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar onSkip={() => navigation.navigate('Gender')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Stepper current={2} total={16} />
        <Text style={styles.title}>Your name &{'\n'}birthday</Text>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>FIRST NAME</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Anika"
              placeholderTextColor={T.mute}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>LAST NAME</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Reddy"
              placeholderTextColor={T.mute}
            />
          </View>
        </View>

        <Text style={styles.fieldLabel}>DATE OF BIRTH</Text>
        <View style={styles.dateRow}>
          <View style={styles.monthField}>
            <TextInput
              style={styles.input}
              value={month}
              onChangeText={setMonth}
              placeholder="MM"
              placeholderTextColor={T.mute}
              keyboardType="number-pad"
              maxLength={2}
              textAlign="center"
            />
            <Text style={styles.dateHint}>Month</Text>
          </View>
          <View style={styles.dayField}>
            <TextInput
              style={styles.input}
              value={day}
              onChangeText={setDay}
              placeholder="DD"
              placeholderTextColor={T.mute}
              keyboardType="number-pad"
              maxLength={2}
              textAlign="center"
            />
            <Text style={styles.dateHint}>Day</Text>
          </View>
          <View style={styles.yearField}>
            <TextInput
              style={styles.input}
              value={year}
              onChangeText={setYear}
              placeholder="YYYY"
              placeholderTextColor={T.mute}
              keyboardType="number-pad"
              maxLength={4}
              textAlign="center"
            />
            <Text style={styles.dateHint}>Year</Text>
          </View>
        </View>

        <InfoBox text="You must be 18 or older to join Talambralu. Your age will be shown as 28 on your profile." />

        <Primary
          label="Continue"
          onPress={() => navigation.navigate('Gender')}
          style={{ marginTop: 32 }}
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
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  halfField: { flex: 1 },
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
  dateRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  monthField: { flex: 1.5 },
  dayField: { flex: 1 },
  yearField: { flex: 2 },
  dateHint: {
    fontSize: 11,
    color: T.mute,
    textAlign: 'center',
    marginTop: 5,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: T.field,
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: T.mute,
    lineHeight: 20,
  },
});
