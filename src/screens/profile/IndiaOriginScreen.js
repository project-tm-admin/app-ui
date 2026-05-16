import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { T, FONTS } from '../../theme';
import TopBar from '../../components/TopBar';
import Stepper from '../../components/Stepper';
import Chip from '../../components/Chip';
import Primary from '../../components/Primary';

const STATES = ['Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra', 'Other'];
const TONGUES = ['Telugu', 'English', 'Hindi', 'Tamil', 'Kannada'];

export default function IndiaOriginScreen() {
  const navigation = useNavigation();
  const [homeState, setHomeState] = useState('Andhra Pradesh');
  const [district, setDistrict] = useState('Krishna');
  const [tongues, setTongues] = useState(['Telugu', 'English']);
  const [community, setCommunity] = useState('Kamma');

  const toggleTongue = t => {
    setTongues(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar onSkip={() => navigation.navigate('Religion')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Stepper current={5} total={16} />
        <Text style={styles.title}>Roots in{'\n'}India</Text>

        <Text style={styles.sectionLabel}>HOME STATE</Text>
        <View style={styles.chipsWrap}>
          {STATES.map(s => (
            <Chip
              key={s}
              label={s}
              selected={homeState === s}
              onPress={() => setHomeState(s)}
            />
          ))}
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>DISTRICT (OPTIONAL)</Text>
          <TextInput
            style={styles.input}
            value={district}
            onChangeText={setDistrict}
            placeholder="e.g. Krishna, Guntur, Hyderabad..."
            placeholderTextColor={T.mute}
          />
        </View>

        <Text style={styles.sectionLabel}>MOTHER TONGUE</Text>
        <View style={styles.chipsWrap}>
          {TONGUES.map(t => (
            <Chip
              key={t}
              label={t}
              selected={tongues.includes(t)}
              onPress={() => toggleTongue(t)}
            />
          ))}
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>COMMUNITY / CASTE (OPTIONAL)</Text>
          <TextInput
            style={styles.input}
            value={community}
            onChangeText={setCommunity}
            placeholder="e.g. Kamma, Reddy, Brahmin..."
            placeholderTextColor={T.mute}
          />
        </View>

        <Primary
          label="Continue"
          onPress={() => navigation.navigate('Religion')}
          style={{ marginTop: 16 }}
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
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 1.2,
    color: T.mute,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  fieldWrap: { marginBottom: 20 },
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
});
