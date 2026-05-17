import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Ellipse, G, Line, Defs, RadialGradient, Stop } from 'react-native-svg';
import { T, FONTS } from '../../theme';

const { width } = Dimensions.get('window');
const CREAM = '#FAF4EC';

function Bell() {
  return (
    <Svg width={52} height={80} viewBox="0 0 52 80">
      {[0, 11, 22].map(y => (
        <Ellipse key={y} cx="26" cy={y + 4} rx="2.5" ry="4.5" fill="none" stroke="#C9A030" strokeWidth={1.4} />
      ))}
      <Path d="M11 40 Q8 54 6 66 L46 66 Q44 54 41 40 Q33 32 26 32 Q19 32 11 40Z" fill="#D4A535" />
      <Ellipse cx="26" cy="66" rx="20" ry="4.5" fill="#B8892A" />
      <Circle cx="26" cy="32" r="4.5" fill="#C9A030" />
      <Line x1="26" y1="60" x2="26" y2="68" stroke="#8B6814" strokeWidth={1.5} />
      <Circle cx="26" cy="71" r="3.5" fill="#8B6814" />
      <Path d="M4 46 Q-1 52 4 58" stroke="#C9A030" strokeWidth={1.2} fill="none" opacity={0.6} strokeLinecap="round" />
      <Path d="M48 46 Q53 52 48 58" stroke="#C9A030" strokeWidth={1.2} fill="none" opacity={0.6} strokeLinecap="round" />
    </Svg>
  );
}

function FanBackdrop() {
  const cx = width / 2;
  const base = 330;

  // Fan leaves: [angle from vertical, color, opacity, length]
  const fans = [
    [-78, '#C8552A', 0.82, 190],
    [-60, '#8FA832', 0.88, 210],
    [-44, '#E07830', 0.90, 225],
    [-28, '#C04060', 0.88, 235],
    [-12, '#A8C040', 0.92, 248],
    [0,   '#D05060', 0.95, 255],
    [12,  '#A8C040', 0.92, 248],
    [28,  '#C04060', 0.88, 235],
    [44,  '#E07830', 0.90, 225],
    [60,  '#8FA832', 0.88, 210],
    [78,  '#C8552A', 0.82, 190],
  ];

  return (
    <Svg width={width} height={340} viewBox={`0 0 ${width} 340`} style={StyleSheet.absoluteFill}>
      {fans.map(([deg, color, opacity, len], i) => {
        const rad = (deg * Math.PI) / 180;
        const spread = 38 + Math.abs(deg) * 0.1;
        const tipX = cx;
        const tipY = base;
        const midX = tipX + len * Math.sin(rad);
        const midY = tipY - len * Math.cos(rad);
        const leftRad = ((deg - spread) * Math.PI) / 180;
        const rightRad = ((deg + spread) * Math.PI) / 180;
        const lx = tipX + len * 0.85 * Math.sin(leftRad);
        const ly = tipY - len * 0.85 * Math.cos(leftRad);
        const rx = tipX + len * 0.85 * Math.sin(rightRad);
        const ry = tipY - len * 0.85 * Math.cos(rightRad);

        return (
          <Path
            key={i}
            d={`M ${tipX} ${tipY} L ${lx} ${ly} Q ${midX} ${midY - 18} ${rx} ${ry} Z`}
            fill={color}
            opacity={opacity}
          />
        );
      })}
      {/* Soft vignette at bottom of fans */}
      <Path d={`M 0 240 Q ${cx} 280 ${width} 240 L ${width} 340 L 0 340 Z`} fill={CREAM} opacity={0.55} />
    </Svg>
  );
}

function ScatteredFlowers() {
  const dots = [
    { x: 22, y: 280, r: 5, color: '#E8A0B0' },
    { x: 40, y: 310, r: 3.5, color: '#E8C080' },
    { x: 14, y: 315, r: 4, color: '#E89090' },
    { x: width - 22, y: 275, r: 5, color: '#E8A0B0' },
    { x: width - 38, y: 308, r: 3.5, color: '#E8C080' },
    { x: width - 16, y: 318, r: 4, color: '#E89090' },
  ];
  return (
    <Svg width={width} height={340} viewBox={`0 0 ${width} 340`} style={StyleSheet.absoluteFill} pointerEvents="none">
      {dots.map((d, i) => (
        <G key={i}>
          <Circle cx={d.x} cy={d.y} r={d.r} fill={d.color} opacity={0.85} />
          {[0, 72, 144, 216, 288].map(angle => {
            const r2 = (angle * Math.PI) / 180;
            return (
              <Ellipse
                key={angle}
                cx={d.x + (d.r + 2) * Math.cos(r2)}
                cy={d.y + (d.r + 2) * Math.sin(r2)}
                rx={d.r * 0.7}
                ry={d.r * 1.1}
                fill={d.color}
                opacity={0.6}
                rotation={angle}
                originX={d.x + (d.r + 2) * Math.cos(r2)}
                originY={d.y + (d.r + 2) * Math.sin(r2)}
              />
            );
          })}
        </G>
      ))}
    </Svg>
  );
}

function OrnamentLine() {
  return (
    <Svg width={200} height={14} viewBox="0 0 200 14">
      <Line x1="0" y1="7" x2="70" y2="7" stroke={T.accent} strokeWidth={0.8} opacity={0.4} />
      <Circle cx="80" cy="7" r="2" fill={T.accent} opacity={0.5} />
      <Circle cx="90" cy="7" r="3" fill={T.accent} opacity={0.6} />
      <Circle cx="100" cy="7" r="2" fill={T.accent} opacity={0.5} />
      <Line x1="110" y1="7" x2="200" y2="7" stroke={T.accent} strokeWidth={0.8} opacity={0.4} />
    </Svg>
  );
}

function SmallHeart() {
  return (
    <Svg width={14} height={12} viewBox="0 0 14 12">
      <Path
        d="M7 11C7 11 1 7 1 3.5C1 2 2 1 3.5 1C4.8 1 6 1.8 7 3C8 1.8 9.2 1 10.5 1C12 1 13 2 13 3.5C13 7 7 11 7 11Z"
        fill={T.accent}
        opacity={0.7}
      />
    </Svg>
  );
}

function CreateIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth={1.6} fill="rgba(255,255,255,0.2)" />
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M17 3l2 2-5 5" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function LoginIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={T.ink} strokeWidth={1.6} />
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={T.ink} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

function ArrowRight({ color = '#fff' }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h14M14 6l6 6-6 6" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Illustration area */}
      <View style={styles.hero}>
        <FanBackdrop />
        <ScatteredFlowers />
        <View style={styles.bellWrap}>
          <Bell />
        </View>
        <Image
          source={require('../../../assets/welcome-couple.png')}
          style={styles.coupleImage}
          resizeMode="contain"
        />
      </View>

      {/* Text section */}
      <View style={styles.textSection}>
        <Text style={styles.teluguScript}>తలంభాలు</Text>
        <OrnamentLine />
        <Text style={styles.title}>Talambralu</Text>
        <Text style={styles.tagline}>Telugu matches, made for life{'\n'}in the U.S.</Text>
        <SmallHeart />
      </View>

      {/* CTA section */}
      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('EmailSignup')}
          activeOpacity={0.88}
        >
          <View style={styles.btnIconWrap}>
            <CreateIcon />
          </View>
          <Text style={styles.primaryBtnText}>Create an account</Text>
          <ArrowRight color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ghostBtn}
          onPress={() => navigation.navigate('OTP')}
          activeOpacity={0.7}
        >
          <View style={styles.ghostIconWrap}>
            <LoginIcon />
          </View>
          <Text style={styles.ghostBtnText}>I already have an account</Text>
          <ArrowRight color={T.ink} />
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing you agree to our{' '}
          <Text style={styles.link}>Terms</Text>
          {'  •  '}
          <Text style={styles.link}>Privacy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: CREAM,
  },
  hero: {
    width,
    height: 340,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: CREAM,
  },
  bellWrap: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    zIndex: 10,
  },
  coupleImage: {
    width: width * 0.72,
    height: 270,
    zIndex: 5,
    marginBottom: -10,
  },
  textSection: {
    alignItems: 'center',
    paddingVertical: 14,
    gap: 6,
  },
  teluguScript: {
    fontFamily: FONTS.display,
    fontSize: 18,
    color: T.accent,
    letterSpacing: 1.5,
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 50,
    color: T.ink,
    lineHeight: 58,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    color: T.mute,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 8,
    justifyContent: 'flex-end',
    gap: 10,
  },
  primaryBtn: {
    height: 58,
    backgroundColor: T.accent,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  btnIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  ghostBtn: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(42,39,35,0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  ghostIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ghostBtnText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: T.ink,
  },
  terms: {
    fontSize: 12,
    color: T.mute,
    textAlign: 'center',
    lineHeight: 18,
    paddingBottom: 4,
  },
  link: {
    color: T.accent,
    fontWeight: '500',
  },
});
