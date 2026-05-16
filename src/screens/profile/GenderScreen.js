import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle } from 'react-native-svg';
import { T, FONTS } from '../../theme';
import TopBar from '../../components/TopBar';
import Stepper from '../../components/Stepper';
import CardRow from '../../components/CardRow';
import Primary from '../../components/Primary';

function WomanIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={T.accent} strokeWidth={1.8} />
      <Path d="M12 12v8M9 17h6" stroke={T.accent} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function ManIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="10" cy="10" r="5" stroke={T.accent} strokeWidth={1.8} />
      <Path d="M20 4l-5 5M15 4h5v5" stroke={T.accent} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function NonBinaryIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="10" r="4" stroke={T.accent} strokeWidth={1.8} />
      <Path d="M12 14v6M9 17h6M8 6L5 3M16 6l3-3" stroke={T.accent} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export default function GenderScreen() {
  const navigation = useNavigation();
  const [iAm, setIAm] = useState('Woman');
  const [lookingFor, setLookingFor] = useState('Men');

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar onSkip={() => navigation.navigate('USLocation')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Stepper current={3} total={16} />
        <Text style={styles.title}>Tell us{'\n'}about you</Text>

        <Text style={styles.sectionLabel}>I am</Text>
        <CardRow
          icon={<WomanIcon />}
          title="Woman"
          selected={iAm === 'Woman'}
          onPress={() => setIAm('Woman')}
        />
        <CardRow
          icon={<ManIcon />}
          title="Man"
          selected={iAm === 'Man'}
          onPress={() => setIAm('Man')}
        />
        <CardRow
          icon={<NonBinaryIcon />}
          title="Non-binary"
          selected={iAm === 'Non-binary'}
          onPress={() => setIAm('Non-binary')}
        />

        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Looking for</Text>
        <CardRow
          title="Men"
          selected={lookingFor === 'Men'}
          onPress={() => setLookingFor('Men')}
        />
        <CardRow
          title="Women"
          selected={lookingFor === 'Women'}
          onPress={() => setLookingFor('Women')}
        />
        <CardRow
          title="Everyone"
          selected={lookingFor === 'Everyone'}
          onPress={() => setLookingFor('Everyone')}
        />

        <Primary
          label="Continue"
          onPress={() => navigation.navigate('USLocation')}
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
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: T.mute,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
});
