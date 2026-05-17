import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Ellipse, G, Line } from 'react-native-svg';
import { T, FONTS } from '../../theme';

const { width, height } = Dimensions.get('window');

const BG      = '#F5E4D0';   // warm peachy cream
const MAROON  = '#7A1828';   // primary button bg
const INK     = '#3D0C14';   // title color
const MUTED   = '#8B7060';   // tagline / terms
const GOLD    = '#C8922A';   // ornament / bell

const HERO_H  = Math.round(height * 0.595);

// ─── Bell ────────────────────────────────────────────────────────────────────
function Bell() {
  return (
    <Svg width={90} height={106} viewBox="0 0 90 106">
      {/* Chain links from top */}
      {[0, 10, 20, 30].map(y => (
        <Ellipse key={y} cx="45" cy={y + 4} rx="3.5" ry="5.5"
          fill="none" stroke={GOLD} strokeWidth={1.6} />
      ))}
      {/* Bell body */}
      <Path
        d="M30 52 Q20 64 16 78 Q14 88 18 94 Q22 98 30 99 L60 99 Q68 98 72 94 Q76 88 74 78 Q70 64 60 52 Q53 44 45 44 Q37 44 30 52Z"
        fill="#D4A030"
      />
      {/* Highlight sheen */}
      <Path
        d="M30 52 Q26 62 24 72 Q33 64 45 64 Q57 64 66 72 Q64 62 60 52 Q53 44 45 44 Q37 44 30 52Z"
        fill="#E8BC50" opacity={0.55}
      />
      {/* Rim */}
      <Ellipse cx="45" cy="99" rx="27" ry="5.5" fill="#B8882A" />
      <Ellipse cx="45" cy="97" rx="25" ry="4" fill="#C8A030" />
      {/* Top cap */}
      <Ellipse cx="45" cy="44" rx="7" ry="4.5" fill="#C09828" />
      {/* Clapper */}
      <Line x1="45" y1="90" x2="45" y2="100" stroke="#8B6814" strokeWidth={2} />
      <Circle cx="45" cy="103" r="5" fill="#8B6814" />
      {/* Sound waves */}
      <Path d="M9 62 Q2 71 9 80"  stroke={GOLD} strokeWidth={2}   fill="none" opacity={0.75} strokeLinecap="round" />
      <Path d="M3 55 Q-5 68 3 81" stroke={GOLD} strokeWidth={1.4} fill="none" opacity={0.4}  strokeLinecap="round" />
      <Path d="M81 62 Q88 71 81 80"  stroke={GOLD} strokeWidth={2}   fill="none" opacity={0.75} strokeLinecap="round" />
      <Path d="M87 55 Q95 68 87 81" stroke={GOLD} strokeWidth={1.4} fill="none" opacity={0.4}  strokeLinecap="round" />
    </Svg>
  );
}

// ─── Fan Backdrop ─────────────────────────────────────────────────────────────
function FanBackdrop() {
  const ox = width / 2;
  const oy = HERO_H + 50; // pivot below visible area so fans emerge from bottom
  const BASE = HERO_H * 0.90;
  const toRad = d => (d * Math.PI) / 180;

  // Front fans: [centerAngle, halfSpread, color, lengthRatio]
  const front = [
    [-80, 14, '#D4887A', 0.60],
    [-64, 14, '#A0B86C', 0.73],
    [-48, 14, '#D4A868', 0.82],
    [-33, 15, '#C07090', 0.88],
    [-17, 15, '#A8BF6A', 0.93],
    [ -1, 16, '#D08090', 0.97],
    [ 15, 15, '#A8BF6A', 0.93],
    [ 31, 15, '#C07090', 0.88],
    [ 47, 14, '#D4A868', 0.82],
    [ 63, 14, '#A0B86C', 0.73],
    [ 79, 14, '#D4887A', 0.60],
  ];

  // Back fans (behind, slightly muted)
  const back = [
    [-90, 12, '#C8A0B4', 0.50],
    [-73, 12, '#D0B478', 0.60],
    [-56, 12, '#B4C48C', 0.67],
    [-39, 12, '#D09888', 0.73],
    [-22, 12, '#C4A0C4', 0.78],
    [ -5, 13, '#D0A090', 0.80],
    [ 12, 12, '#C4A0C4', 0.78],
    [ 29, 12, '#D09888', 0.73],
    [ 46, 12, '#B4C48C', 0.67],
    [ 63, 12, '#D0B478', 0.60],
    [ 80, 12, '#C8A0B4', 0.50],
  ];

  const fanPath = (a, hs, L) => {
    const lx = ox + L * Math.sin(toRad(a - hs));
    const ly = oy - L * Math.cos(toRad(a - hs));
    const rx = ox + L * Math.sin(toRad(a + hs));
    const ry = oy - L * Math.cos(toRad(a + hs));
    return `M ${ox} ${oy} L ${lx} ${ly} A ${L} ${L} 0 0 1 ${rx} ${ry} Z`;
  };

  return (
    <Svg width={width} height={HERO_H} viewBox={`0 0 ${width} ${HERO_H}`}
      style={StyleSheet.absoluteFill}>
      {back.map(([a, hs, c, r], i) => (
        <Path key={`b${i}`} d={fanPath(a, hs, BASE * r)} fill={c} opacity={0.52} />
      ))}
      {front.map(([a, hs, c, r], i) => (
        <Path key={`f${i}`} d={fanPath(a, hs, BASE * r)} fill={c} opacity={0.90} />
      ))}
      {/* Soft cream blend at very bottom so illustration area fades into bg */}
      <Path
        d={`M 0 ${HERO_H} Q ${width / 2} ${HERO_H - 40} ${width} ${HERO_H} Z`}
        fill={BG} opacity={0.65}
      />
    </Svg>
  );
}

// ─── Scattered rice / petals upper-right ─────────────────────────────────────
function ScatteredPetals() {
  const items = [
    { x: width * 0.80, y: 58,  rx: 3.5, ry: 7, rot: -35, c: '#E8B0A0' },
    { x: width * 0.88, y: 80,  rx: 2.5, ry: 6, rot:  15, c: '#F0C868' },
    { x: width * 0.75, y: 92,  rx: 3,   ry: 7, rot: -18, c: '#E8C0A0' },
    { x: width * 0.93, y: 58,  rx: 2.5, ry: 5, rot:  28, c: '#ECA080' },
    { x: width * 0.84, y: 44,  rx: 2,   ry: 4.5, rot: -8, c: '#F0C070' },
  ];
  return (
    <Svg width={width} height={HERO_H} viewBox={`0 0 ${width} ${HERO_H}`}
      style={StyleSheet.absoluteFill} pointerEvents="none">
      {items.map((p, i) => (
        <Ellipse key={i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry}
          fill={p.c} opacity={0.72} rotation={p.rot}
          originX={p.x} originY={p.y} />
      ))}
    </Svg>
  );
}

// ─── Side flower bouquets (flanking the couple area) ─────────────────────────
function SideFlowers() {
  const flowerAt = (cx, cy, r, c) => (
    <>
      {[0, 60, 120, 180, 240, 300].map(angle => {
        const rad = (angle * Math.PI) / 180;
        return (
          <Ellipse
            key={angle}
            cx={cx + r * 0.9 * Math.cos(rad)}
            cy={cy + r * 0.9 * Math.sin(rad)}
            rx={r * 0.6} ry={r * 0.4}
            fill={c} opacity={0.82}
            rotation={angle + 90}
            originX={cx + r * 0.9 * Math.cos(rad)}
            originY={cy + r * 0.9 * Math.sin(rad)}
          />
        );
      })}
      <Circle cx={cx} cy={cy} r={r * 0.35} fill="#F8D898" opacity={0.9} />
    </>
  );

  const lx = width * 0.09;
  const rx = width * 0.91;
  const yBase = HERO_H * 0.72;

  return (
    <Svg width={width} height={HERO_H} viewBox={`0 0 ${width} ${HERO_H}`}
      style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Stems */}
      <Line x1={lx} y1={yBase - 60} x2={lx} y2={yBase + 30} stroke="#8A9A6A" strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={rx} y1={yBase - 60} x2={rx} y2={yBase + 30} stroke="#8A9A6A" strokeWidth={2.5} strokeLinecap="round" />
      {/* Left bouquet */}
      <G>{flowerAt(lx - 2, yBase - 70, 11, '#F4A0B4')}</G>
      <G>{flowerAt(lx - 14, yBase - 50, 9, '#F4B8C0')}</G>
      <G>{flowerAt(lx + 12, yBase - 55, 10, '#ECA0B8')}</G>
      <G>{flowerAt(lx,      yBase - 38, 8, '#F4C0C8')}</G>
      {/* Right bouquet */}
      <G>{flowerAt(rx + 2, yBase - 70, 11, '#F4A0B4')}</G>
      <G>{flowerAt(rx + 14, yBase - 50, 9, '#F4B8C0')}</G>
      <G>{flowerAt(rx - 12, yBase - 55, 10, '#ECA0B8')}</G>
      <G>{flowerAt(rx,       yBase - 38, 8, '#F4C0C8')}</G>
    </Svg>
  );
}

// ─── Bottom corner flower decor ───────────────────────────────────────────────
function CornerFlowers() {
  const petal = (cx, cy, r, c, angle) => {
    const rad = (angle * Math.PI) / 180;
    return (
      <Ellipse
        key={angle}
        cx={cx + r * 0.9 * Math.cos(rad)}
        cy={cy + r * 0.9 * Math.sin(rad)}
        rx={r * 0.6} ry={r * 0.38}
        fill={c} opacity={0.80}
        rotation={angle + 90}
        originX={cx + r * 0.9 * Math.cos(rad)}
        originY={cy + r * 0.9 * Math.sin(rad)}
      />
    );
  };

  const flower = (cx, cy, r, c) => (
    <>
      {[0, 60, 120, 180, 240, 300].map(a => petal(cx, cy, r, c, a))}
      <Circle cx={cx} cy={cy} r={r * 0.32} fill="#F8D898" opacity={0.9} />
    </>
  );

  return (
    <Svg width={width} height={100} viewBox={`0 0 ${width} 100`}
      style={{ position: 'absolute', bottom: 0, left: 0 }} pointerEvents="none">
      {/* Bottom-left */}
      <G>{flower(10,  82, 10, '#F4A0B4')}</G>
      <G>{flower(28, 92, 8,  '#F4B8C0')}</G>
      <G>{flower(18, 68, 7,  '#ECA0B8')}</G>
      <G>{flower(40, 78, 7,  '#F4C0C8')}</G>
      {/* Bottom-right */}
      <G>{flower(width - 10, 82, 10, '#F4A0B4')}</G>
      <G>{flower(width - 28, 92, 8,  '#F4B8C0')}</G>
      <G>{flower(width - 18, 68, 7,  '#ECA0B8')}</G>
      <G>{flower(width - 40, 78, 7,  '#F4C0C8')}</G>
    </Svg>
  );
}

// ─── Text ornaments ───────────────────────────────────────────────────────────
function OrnamentDivider() {
  return (
    <Svg width={190} height={16} viewBox="0 0 190 16">
      <Line x1="0"   y1="8" x2="64"  y2="8" stroke={GOLD} strokeWidth={0.8} opacity={0.45} />
      <Circle cx="72"  cy="8" r="2"   fill={GOLD} opacity={0.5} />
      <Circle cx="81"  cy="8" r="1.4" fill={GOLD} opacity={0.4} />
      <Circle cx="95"  cy="8" r="3"   fill={GOLD} opacity={0.55} />
      <Circle cx="109" cy="8" r="1.4" fill={GOLD} opacity={0.4} />
      <Circle cx="118" cy="8" r="2"   fill={GOLD} opacity={0.5} />
      <Line x1="126" y1="8" x2="190" y2="8" stroke={GOLD} strokeWidth={0.8} opacity={0.45} />
    </Svg>
  );
}

function SmallHeart() {
  return (
    <Svg width={14} height={13} viewBox="0 0 14 13">
      <Path
        d="M7 12C7 12 1 7.8 1 4C1 2.3 2.3 1 4 1C5.3 1 6.5 1.8 7 3C7.5 1.8 8.7 1 10 1C11.7 1 13 2.3 13 4C13 7.8 7 12 7 12Z"
        fill={GOLD} opacity={0.6}
      />
    </Svg>
  );
}

// ─── Button icons ─────────────────────────────────────────────────────────────
function CoupleHeartIcon() {
  return (
    <Svg width={30} height={28} viewBox="0 0 30 28">
      <Path
        d="M15 26C15 26 2 17.5 2 9C2 5.7 4.7 3 8 3C10.5 3 12.8 4.4 15 6.5C17.2 4.4 19.5 3 22 3C25.3 3 28 5.7 28 9C28 17.5 15 26 15 26Z"
        fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.4)" strokeWidth={1}
      />
      <Circle cx="10.5" cy="11" r="3" fill="white" opacity={0.85} />
      <Path d="M7 18c0-2 1.6-3.5 3.5-3.5S14 16 14 18" stroke="white" strokeWidth={1.3} fill="none" strokeLinecap="round" opacity={0.85} />
      <Circle cx="19.5" cy="11" r="3" fill="white" opacity={0.85} />
      <Path d="M16 18c0-2 1.6-3.5 3.5-3.5S23 16 23 18" stroke="white" strokeWidth={1.3} fill="none" strokeLinecap="round" opacity={0.85} />
    </Svg>
  );
}

function PersonOutline() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={INK} strokeWidth={1.6} />
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

function Arrow({ color }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Hero illustration */}
      <View style={styles.hero}>
        <FanBackdrop />
        <SideFlowers />
        <ScatteredPetals />
        <View style={styles.bellWrap}>
          <Bell />
        </View>
        {/* Couple placeholder — swap welcome-couple.png with the colored illustration */}
        <Image
          source={require('../../../assets/welcome-couple.png')}
          style={styles.coupleImg}
          resizeMode="contain"
        />
      </View>

      {/* Text */}
      <View style={styles.textSection}>
        <Text style={styles.teluguScript}>తలంభాలు</Text>
        <OrnamentDivider />
        <SmallHeart />
        <Text style={styles.title}>Talambralu</Text>
        <Text style={styles.tagline}>Telugu matches, made for life in{'\n'}the U.S.</Text>
        <View style={{ marginTop: 2 }}>
          <SmallHeart />
        </View>
      </View>

      {/* CTAs */}
      <SafeAreaView edges={['bottom']} style={styles.ctaWrap}>
        {/* Primary button */}
        <TouchableOpacity
          style={styles.primaryOuter}
          onPress={() => navigation.navigate('EmailSignup')}
          activeOpacity={0.88}
        >
          <View style={styles.primaryInner}>
            <View style={styles.primaryIconBox}>
              <CoupleHeartIcon />
            </View>
            <Text style={styles.primaryLabel}>Create an account</Text>
            <Arrow color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Ghost button */}
        <TouchableOpacity
          style={styles.ghostBtn}
          onPress={() => navigation.navigate('OTP')}
          activeOpacity={0.72}
        >
          <View style={styles.ghostIconBox}>
            <PersonOutline />
          </View>
          <Text style={styles.ghostLabel}>I already have an account</Text>
          <Arrow color={INK} />
        </TouchableOpacity>

        <Text style={styles.terms}>
          {'By continuing you agree to our '}
          <Text style={styles.termsLink}>Terms</Text>
          {'  •  '}
          <Text style={styles.termsLink}>Privacy</Text>
        </Text>
      </SafeAreaView>

      <CornerFlowers />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  // Hero
  hero: {
    width,
    height: HERO_H,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: BG,
  },
  bellWrap: {
    position: 'absolute',
    top: -8,
    alignSelf: 'center',
    zIndex: 20,
  },
  coupleImg: {
    width: width * 0.74,
    height: HERO_H * 0.86,
    zIndex: 10,
    marginBottom: -6,
  },

  // Text
  textSection: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 6,
    gap: 3,
  },
  teluguScript: {
    fontFamily: FONTS.display,
    fontSize: 18,
    color: T.accent,
    letterSpacing: 2,
    marginBottom: 2,
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 54,
    color: INK,
    lineHeight: 62,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  tagline: {
    fontSize: 15,
    color: MUTED,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 23,
  },

  // CTA
  ctaWrap: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: 'flex-end',
    paddingBottom: 36,
    gap: 10,
  },

  // Primary button: maroon shell → inner gold-bordered layer → content
  primaryOuter: {
    borderRadius: 18,
    backgroundColor: MAROON,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryInner: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(210, 150, 60, 0.50)',
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  primaryIconBox: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.2,
  },

  // Ghost button
  ghostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(80,40,20,0.18)',
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  ghostIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ghostLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: INK,
  },

  terms: {
    fontSize: 12.5,
    color: MUTED,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 2,
  },
  termsLink: {
    color: T.accent,
    fontWeight: '600',
  },
});
