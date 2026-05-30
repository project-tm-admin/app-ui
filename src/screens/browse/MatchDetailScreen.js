import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Polygon } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { T, FONTS } from '../../theme';

const { height } = Dimensions.get('window');

// ─── Colors ──────────────────────────────────────────────────────────────────
const GREEN   = '#3D8A5C';
const GREEN_S = '#DCEFE2';
const SALMON_S= '#FDF0EB';
const GOLD    = '#C8920A';
const GOLD_S  = '#FEF3D4';

const WAVEFORM = [12,22,38,18,44,26,34,48,20,14,40,30,16,42,22,36,18,44,28,20];
const TABS = ['About', 'Career', 'Family', 'Jaathakam', 'Trust'];

// ─── Icons ────────────────────────────────────────────────────────────────────
function BackIcon({ color = T.ink }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M20 12H4M4 12l6-6M4 12l6 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function DotsIconV() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="5"  r="1.5" fill="white" />
      <Circle cx="12" cy="12" r="1.5" fill="white" />
      <Circle cx="12" cy="19" r="1.5" fill="white" />
    </Svg>
  );
}
function PlayIcon({ size = 16 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polygon points="5,3 19,12 5,21" fill="#fff" />
    </Svg>
  );
}
function VerifiedCircle({ size = 18 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Circle cx="9" cy="9" r="9" fill={GREEN} />
      <Path d="M5 9l3 3 5-5" stroke="white" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function ShieldIcon({ size = 28 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L3 7v6c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7l-9-5z" stroke={GREEN} strokeWidth={1.6} fill={GREEN_S} />
      <Path d="M9 12l2 2 4-4" stroke={GREEN} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function CheckCircle({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Circle cx="10" cy="10" r="10" fill={GREEN_S} />
      <Path d="M6 10l3 3 5-5" stroke={GREEN} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function XCircleIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={T.hair2} strokeWidth={1.5} />
      <Path d="M15 9l-6 6M9 9l6 6" stroke={T.mute} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
function BookmarkOutline() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" stroke={T.ink} strokeWidth={1.8} />
    </Svg>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function SectionLabel({ text, style }) {
  return <Text style={[s.sectionLabel, style]}>{text}</Text>;
}
function VerifiedBadge() {
  return (
    <View style={s.verifiedBadge}>
      <Text style={s.verifiedBadgeText}>VERIFIED</Text>
    </View>
  );
}
function PremiumGate({ title, subtitle }) {
  return (
    <View style={s.premiumGate}>
      <View style={s.premiumChip}>
        <Text style={s.premiumChipText}>✦ PREMIUM</Text>
      </View>
      <Text style={s.premiumTitle}>{title}</Text>
      {subtitle ? <Text style={s.premiumSub}>{subtitle}</Text> : null}
      <TouchableOpacity style={s.premiumBtn} activeOpacity={0.85}>
        <Text style={s.premiumBtnText}>See Premium plans  ›</Text>
      </TouchableOpacity>
    </View>
  );
}
function BottomBar({ onPass, onInterest }) {
  return (
    <View style={s.bottomBar}>
      <TouchableOpacity style={s.bottomCircle} onPress={onPass} activeOpacity={0.7}>
        <XCircleIcon />
      </TouchableOpacity>
      <TouchableOpacity style={s.bottomCircle} activeOpacity={0.7}>
        <BookmarkOutline />
      </TouchableOpacity>
      <TouchableOpacity style={s.sendBtn} onPress={onInterest} activeOpacity={0.85}>
        <Text style={s.sendBtnText}>Send interest  ›</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Section content ──────────────────────────────────────────────────────────
function AboutContent() {
  const prompts = [
    {
      q: 'WHAT "HOME" MEANS TO ME',
      a: "Sunday filter coffee, my mom's voice on speakerphone, and the smell of tadka somewhere in the building.",
    },
    {
      q: 'A PERFECT SATURDAY',
      a: "A long walk on White Rock Lake, biryani with friends, and then a film I've been putting off — preferably Sankranthiki or vintage Mani Ratnam.",
    },
    {
      q: "FIRST THING YOU'D NOTICE ABOUT ME",
      a: 'I take filter-coffee opinions extremely seriously. Brand, decoction ratio, davara temperature — there is one right way.',
    },
  ];
  return (
    <View style={s.sectionContent}>
      <SectionLabel text="ABOUT ANJALI" />
      {prompts.map((p, i) => (
        <View key={i} style={s.promptBlock}>
          <Text style={s.promptQ}>{p.q}</Text>
          <Text style={s.promptA}>{p.a}</Text>
        </View>
      ))}
      <SectionLabel text="VOICE INTRO" style={{ marginTop: 4 }} />
      <View style={s.voiceRow}>
        <TouchableOpacity style={s.playCircle} activeOpacity={0.8}>
          <PlayIcon size={16} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={s.voiceLabel}>Voice intro · 0:24</Text>
          <View style={s.waveRow}>
            {WAVEFORM.map((h, i) => (
              <View key={i} style={[s.waveBar, { height: h }, i < 10 && { backgroundColor: T.accent }]} />
            ))}
          </View>
        </View>
      </View>
      <SectionLabel text="PERSONALITY" style={{ marginTop: 20 }} />
      <View style={s.tagsWrap}>
        {['Curious', 'Family-first', 'Reads a lot', 'Adventurous', 'Homebody'].map((t, i) => (
          <View key={i} style={s.personalityTag}>
            <Text style={s.personalityTagText}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function CareerContent() {
  return (
    <View style={s.sectionContent}>
      <SectionLabel text="CURRENTLY" />
      <View style={s.currentJob}>
        <View style={s.currentJobTop}>
          <Text style={s.currentTitle}>Senior Software Engineer</Text>
          <VerifiedBadge />
        </View>
        <Text style={s.currentSub}>Amazon · Dallas, TX</Text>
        <Text style={s.currentDuration}>2022 — present · 3 years 4 months</Text>
        <View style={s.jobChips}>
          <View style={s.jobChip}><Text style={s.jobChipLabel}>INCOME</Text><Text style={s.jobChipValue}>$180K</Text></View>
          <View style={s.jobChip}><Text style={s.jobChipLabel}>WORK AUTH</Text><Text style={s.jobChipValue}>H1B</Text></View>
          <View style={s.jobChip}><Text style={s.jobChipLabel}>RELOCATE</Text><Text style={s.jobChipValue}>Yes</Text></View>
        </View>
      </View>
      <SectionLabel text="CAREER TIMELINE" style={{ marginTop: 4 }} />
      {[
        { year: '2022', company: 'Amazon',    role: 'Senior SWE · Dallas' },
        { year: '2019', company: 'Microsoft', role: 'SDE II · Redmond' },
        { year: '2017', company: 'UT Dallas', role: 'Research assistant · NLP lab' },
      ].map((item, i) => (
        <View key={i} style={s.timelineRow}>
          <Text style={s.timelineYear}>{item.year}</Text>
          <View style={s.timelineLine}>
            <View style={s.timelineDot} />
            {i < 2 && <View style={s.timelineTrack} />}
          </View>
          <View style={s.timelineRight}>
            <Text style={s.timelineCompany}>{item.company}</Text>
            <Text style={s.timelineRole}>{item.role}</Text>
          </View>
        </View>
      ))}
      <SectionLabel text="EDUCATION" style={{ marginTop: 8 }} />
      {[
        { year: '2019', degree: 'MS, Computer Science', school: 'University of Texas, Dallas · 3.9 GPA' },
        { year: '2017', degree: 'B.Tech, CSE',          school: 'JNTU Hyderabad · 9.1 / 10' },
      ].map((item, i) => (
        <View key={i} style={s.timelineRow}>
          <Text style={s.timelineYear}>{item.year}</Text>
          <View style={s.timelineLine}>
            <View style={s.timelineDot} />
            {i < 1 && <View style={s.timelineTrack} />}
          </View>
          <View style={s.timelineRight}>
            <Text style={s.timelineCompany}>{item.degree}</Text>
            <Text style={s.timelineRole}>{item.school}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function FamilyContent() {
  const tag = (label) => (
    <View style={s.familyTag}><Text style={s.familyTagText}>{label}</Text></View>
  );
  return (
    <View style={s.sectionContent}>
      <SectionLabel text="PARENTS" />
      <View style={s.familyMember}>
        <Text style={s.familyRole}>FATHER</Text>
        <Text style={s.familyName}>Ramachandra Reddy</Text>
        <Text style={s.familySub}>Retd. AP govt. officer · Hyderabad</Text>
        <View style={s.familyTags}>{tag('Native')}{tag('In India')}</View>
      </View>
      <View style={s.familyMember}>
        <Text style={s.familyRole}>MOTHER</Text>
        <Text style={s.familyName}>Padma Reddy</Text>
        <Text style={s.familySub}>Homemaker · Hyderabad</Text>
        <View style={s.familyTags}>{tag('Native')}{tag('In India')}</View>
      </View>
      <SectionLabel text="SIBLINGS" style={{ marginTop: 4 }} />
      <View style={s.familyMember}>
        <Text style={s.familyRole}>YOUNGER SISTER</Text>
        <Text style={s.familyName}>Sahasra, 25</Text>
        <Text style={s.familySub}>Product designer · Bengaluru · unmarried</Text>
        <View style={s.familyTags}>{tag('Working')}</View>
      </View>
      <SectionLabel text="ROOTS" style={{ marginTop: 4 }} />
      <View style={s.rootsGrid}>
        {[
          { label: 'NATIVE PLACE', value: 'Kadapa, AP' },
          { label: 'GREW UP IN',   value: 'Hyderabad' },
          { label: 'MOTHER TONGUE',value: 'Telugu' },
          { label: 'ALSO SPEAKS',  value: 'English, Hindi' },
          { label: 'CASTE',        value: 'Reddy · Pakanati' },
          { label: 'GOTRA',        value: 'Bharadwaja' },
        ].map((r, i) => (
          <View key={i} style={s.rootCell}>
            <Text style={s.rootLabel}>{r.label}</Text>
            <Text style={s.rootValue}>{r.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function JaathakamContent() {
  const kootas = [
    { name: 'Varna',        score: '1/1' }, { name: 'Vashya',       score: '2/2' },
    { name: 'Tara',         score: '3/3' }, { name: 'Yoni',         score: '3/4' },
    { name: 'Graha Maitri', score: '4/5' }, { name: 'Gana',         score: '5/6' },
    { name: 'Bhakoot',      score: '3/7' }, { name: 'Nadi',         score: '7/8' },
  ];
  return (
    <View style={s.sectionContent}>
      <SectionLabel text="GUNAMILAN" />
      <View style={s.kootaCard}>
        <Text style={s.kootaScore}><Text style={s.kootaBig}>28</Text> / 36 koota points</Text>
        <Text style={s.kootaSub}>Strong compatibility · above the 18-point cutoff</Text>
        <View style={s.kootaGrid}>
          {kootas.map((k, i) => (
            <View key={i} style={s.kootaCell}>
              <Text style={s.kootaName}>{k.name}</Text>
              <Text style={s.kootaVal}>{k.score}</Text>
            </View>
          ))}
        </View>
      </View>
      <SectionLabel text="BIRTH DETAILS" style={{ marginTop: 4 }} />
      <View style={s.detailGrid}>
        {[
          { label: 'DATE', value: '04 Aug 1997' }, { label: 'TIME', value: '06:14 AM' },
          { label: 'PLACE', value: 'Hyderabad, IN' }, { label: 'TIMEZONE', value: 'IST · +5:30' },
        ].map((d, i) => (
          <View key={i} style={s.detailCell}>
            <Text style={s.detailLabel}>{d.label}</Text>
            <Text style={s.detailValue}>{d.value}</Text>
          </View>
        ))}
      </View>
      <SectionLabel text="ASTROLOGY" style={{ marginTop: 4 }} />
      <View style={s.detailGrid}>
        {[
          { label: 'RASI', value: 'Karkataka · Cancer' }, { label: 'NAKSHATRA', value: 'Pushyami · pada 2' },
          { label: 'LAGNA', value: 'Simha · Leo' },       { label: 'CHANDRA', value: 'Karkataka' },
        ].map((d, i) => (
          <View key={i} style={s.detailCell}>
            <Text style={s.detailLabel}>{d.label}</Text>
            <Text style={s.detailValue}>{d.value}</Text>
          </View>
        ))}
      </View>
      <SectionLabel text="DOSHAS" style={{ marginTop: 4 }} />
      <View style={s.detailGrid}>
        {[
          { label: 'MANGAL DOSHA', value: 'No' }, { label: 'KUJA DOSHA', value: 'No' },
        ].map((d, i) => (
          <View key={i} style={s.detailCell}>
            <Text style={s.detailLabel}>{d.label}</Text>
            <Text style={s.detailValue}>{d.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function TrustContent() {
  return (
    <View style={s.sectionContent}>
      <SectionLabel text="TRUST SCORE" />
      <View style={s.trustScore}>
        <View style={s.trustIconWrap}><ShieldIcon size={32} /></View>
        <View style={s.trustTextBlock}>
          <Text style={s.trustTitle}>High trust</Text>
          <Text style={s.trustSub}>5 of 5 verifications complete · joined 11 months ago</Text>
        </View>
      </View>
      <SectionLabel text="VERIFICATIONS" style={{ marginTop: 4 }} />
      {[
        { title: 'Government ID', sub: 'Aadhaar · last 4: 3421' },
        { title: 'Selfie match',  sub: 'Live photo · 96% match' },
      ].map((v, i) => (
        <View key={i} style={s.verifyRow}>
          <CheckCircle />
          <View style={s.verifyText}>
            <Text style={s.verifyTitle}>{v.title}</Text>
            <Text style={s.verifySub}>{v.sub}</Text>
          </View>
          <VerifiedBadge />
        </View>
      ))}
      <PremiumGate
        title="See full verification details"
        subtitle="Work email, education & phone confirmations are visible to Premium members."
      />
      <SectionLabel text="PROFILE MANAGED BY" style={{ marginTop: 16 }} />
      <View style={s.managedRow}>
        <View style={s.managedAvatar}>
          <Text style={s.managedAvatarText}>AR</Text>
        </View>
        <View>
          <Text style={s.managedTitle}>Self-managed by Anjali</Text>
          <Text style={s.managedSub}>Last edit · 2 days ago · responds within ~4 hrs</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function MatchDetailScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('About');

  const scrollRef       = useRef(null);
  const sectionOffsets  = useRef({});
  const tabBarH         = useRef(50);
  const activeTabRef    = useRef('About');
  const isProgrammatic  = useRef(false);

  // Tap a tab → scroll to its section
  const handleTabPress = useCallback((tab) => {
    const y = sectionOffsets.current[tab];
    if (y == null || !scrollRef.current) return;
    isProgrammatic.current = true;
    activeTabRef.current = tab;
    setActiveTab(tab);
    scrollRef.current.scrollTo({ y: Math.max(0, y - tabBarH.current), animated: true });
    setTimeout(() => { isProgrammatic.current = false; }, 600);
  }, []);

  // Scroll → update active tab (scroll-spy)
  const handleScroll = useCallback((event) => {
    if (isProgrammatic.current) return;
    const scrollY = event.nativeEvent.contentOffset.y;
    const h = tabBarH.current;
    let current = TABS[0];
    for (const tab of TABS) {
      const y = sectionOffsets.current[tab];
      if (y != null && y - h <= scrollY + 16) current = tab;
    }
    if (current !== activeTabRef.current) {
      activeTabRef.current = current;
      setActiveTab(current);
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <ScrollView
        ref={scrollRef}
        stickyHeaderIndices={[2]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ── 0: Photo ──────────────────────────────────────────────── */}
        <View style={s.photoArea}>
          <LinearGradient
            colors={['#C4956A', '#A07050', '#7A4A40']}
            start={{ x: 0.2, y: 0 }} end={{ x: 0.9, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.18)', 'transparent', 'transparent']}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView style={s.photoOverlay} edges={['top']}>
            <View style={s.photoTopRow}>
              <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
                <BackIcon color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <View style={s.photoDots}>
            <View style={[s.photoDot, s.photoDotActive]} />
            <View style={s.photoDot} />
            <View style={s.photoDot} />
          </View>
        </View>

        {/* ── 1: Profile info ───────────────────────────────────────── */}
        <View style={s.profileInfo}>
          <View style={s.nameRow}>
            <Text style={s.nameText}>Anjali Reddy, 28</Text>
            <VerifiedCircle size={18} />
          </View>
          <View style={s.metaRow}>
            <Text style={s.metaText}>5'6"</Text>
            <Text style={s.metaGap}>{'   '}</Text>
            <Text style={s.metaText}>Dallas, TX</Text>
            <Text style={s.metaSep}>  •  </Text>
            <View style={s.onlineDot} />
            <Text style={s.activeText}>Active 2h ago</Text>
          </View>
        </View>

        {/* ── 2: Tab bar — STICKY ───────────────────────────────────── */}
        <View
          style={s.tabBar}
          onLayout={e => { tabBarH.current = e.nativeEvent.layout.height; }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.tabBarInner}
            bounces={false}
          >
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab}
                style={[s.tabPill, activeTab === tab && s.tabPillActive]}
                onPress={() => handleTabPress(tab)}
                activeOpacity={0.7}
              >
                <Text style={[s.tabText, activeTab === tab && s.tabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── 3–7: Sections (stacked, full-page scroll) ─────────────── */}
        <View onLayout={e => { sectionOffsets.current['About'] = e.nativeEvent.layout.y; }}>
          <AboutContent />
        </View>

        <View style={s.sectionDivider} />

        <View onLayout={e => { sectionOffsets.current['Career'] = e.nativeEvent.layout.y; }}>
          <CareerContent />
        </View>

        <View style={s.sectionDivider} />

        <View onLayout={e => { sectionOffsets.current['Family'] = e.nativeEvent.layout.y; }}>
          <FamilyContent />
        </View>

        <View style={s.sectionDivider} />

        <View onLayout={e => { sectionOffsets.current['Jaathakam'] = e.nativeEvent.layout.y; }}>
          <JaathakamContent />
        </View>

        <View style={s.sectionDivider} />

        <View onLayout={e => { sectionOffsets.current['Trust'] = e.nativeEvent.layout.y; }}>
          <TrustContent />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Sticky bottom bar ─────────────────────────────────────────── */}
      <SafeAreaView style={s.bottomBarWrap} edges={['bottom']}>
        <BottomBar onPass={() => navigation.goBack()} onInterest={() => {}} />
      </SafeAreaView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({

  // ── Photo ─────────────────────────────────────────────────────────────────
  photoArea: {
    height: height * 0.44,
    overflow: 'hidden',
  },
  photoOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
  },
  photoTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.40)',
    justifyContent: 'center', alignItems: 'center',
  },
  dotsBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.40)',
    justifyContent: 'center', alignItems: 'center',
  },
  photoDots: {
    position: 'absolute',
    bottom: 12, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  photoDot: {
    width: 5, height: 5, borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  photoDotActive: {
    width: 18,
    backgroundColor: '#fff',
  },

  // ── Profile info ──────────────────────────────────────────────────────────
  profileInfo: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: T.bg,
  },
  nameRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginBottom: 5,
  },
  nameText: {
    fontFamily: FONTS.display,
    fontSize: 24, fontWeight: '600', color: T.ink,
  },
  metaRow: {
    flexDirection: 'row', alignItems: 'center',
  },
  metaText:  { fontSize: 13, color: T.ink2 },
  metaGap:   { fontSize: 13, color: T.mute },
  metaSep:   { fontSize: 13, color: T.mute },
  onlineDot: {
    width: 7, height: 7, borderRadius: 4,
    backgroundColor: GREEN, marginRight: 5,
  },
  activeText: { fontSize: 13, color: T.ink2 },

  // ── Tab bar (sticky) ──────────────────────────────────────────────────────
  tabBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: T.hair,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: T.hair,
    backgroundColor: T.bg,
  },
  tabBarInner: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  tabPill: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1, borderColor: T.hair2,
    backgroundColor: T.bg,
  },
  tabPillActive: {
    borderColor: T.ink,
    backgroundColor: T.ink,
  },
  tabText: {
    fontSize: 14, color: T.ink2, fontWeight: '400',
  },
  tabTextActive: {
    color: '#fff', fontWeight: '600',
  },

  // ── Section divider ───────────────────────────────────────────────────────
  sectionDivider: {
    height: 8,
    backgroundColor: T.field,
  },

  // ── Section content padding ───────────────────────────────────────────────
  sectionContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  // ── Section label ─────────────────────────────────────────────────────────
  sectionLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10, letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: T.mute, marginBottom: 12,
  },

  // ── Prompts ───────────────────────────────────────────────────────────────
  promptBlock: {
    marginBottom: 14,
    backgroundColor: T.field,
    borderRadius: 12, padding: 14,
  },
  promptQ: {
    fontFamily: FONTS.mono,
    fontSize: 9, letterSpacing: 1, color: T.mute,
    textTransform: 'uppercase', marginBottom: 6,
  },
  promptA: {
    fontFamily: FONTS.display,
    fontSize: 16, fontStyle: 'italic',
    color: T.ink2, lineHeight: 25,
  },

  // ── Voice intro ───────────────────────────────────────────────────────────
  voiceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: T.field, borderRadius: 12, padding: 12, marginBottom: 4,
  },
  playCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: T.accent,
    justifyContent: 'center', alignItems: 'center', paddingLeft: 2,
  },
  voiceLabel: { fontSize: 13, fontWeight: '600', color: T.ink, marginBottom: 6 },
  waveRow: { flexDirection: 'row', alignItems: 'center', gap: 2, height: 32 },
  waveBar: { flex: 1, borderRadius: 2, backgroundColor: T.hair2, minHeight: 3 },

  // ── Personality tags ──────────────────────────────────────────────────────
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  personalityTag: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 100, borderWidth: 1, borderColor: T.hair2,
  },
  personalityTagText: { fontSize: 13, color: T.ink },

  // ── Verified badge ────────────────────────────────────────────────────────
  verifiedBadge: {
    backgroundColor: GREEN_S,
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5,
  },
  verifiedBadgeText: { fontSize: 10, fontWeight: '700', color: GREEN, letterSpacing: 0.4 },

  // ── Premium gate ──────────────────────────────────────────────────────────
  premiumGate: {
    borderWidth: 1, borderColor: T.hair2,
    borderRadius: 16, padding: 18,
    alignItems: 'center', gap: 8, marginTop: 8,
  },
  premiumChip: {
    backgroundColor: GOLD_S, borderRadius: 100,
    paddingHorizontal: 12, paddingVertical: 4,
  },
  premiumChipText: { fontSize: 11, fontWeight: '700', color: GOLD, letterSpacing: 0.5 },
  premiumTitle: { fontFamily: FONTS.display, fontSize: 18, color: T.accent, textAlign: 'center' },
  premiumSub: { fontSize: 13, color: T.mute, textAlign: 'center', lineHeight: 19 },
  premiumBtn: {
    marginTop: 4, backgroundColor: T.accent,
    borderRadius: 100, paddingHorizontal: 24, paddingVertical: 11,
  },
  premiumBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },

  // ── Career ────────────────────────────────────────────────────────────────
  currentJob: {
    borderWidth: 1, borderColor: T.hair2, borderRadius: 14, padding: 14, marginBottom: 20,
  },
  currentJobTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  currentTitle: { fontFamily: FONTS.display, fontSize: 20, color: T.ink, flex: 1, marginRight: 8 },
  currentSub: { fontSize: 14, color: T.mute, marginBottom: 2 },
  currentDuration: { fontSize: 12, color: T.mute, marginBottom: 12 },
  jobChips: { flexDirection: 'row', gap: 8 },
  jobChip: { flex: 1, backgroundColor: T.field, borderRadius: 10, padding: 10 },
  jobChipLabel: { fontFamily: FONTS.mono, fontSize: 8, letterSpacing: 0.8, color: T.mute, textTransform: 'uppercase', marginBottom: 3 },
  jobChipValue: { fontSize: 14, fontWeight: '600', color: T.ink },

  // ── Timeline ──────────────────────────────────────────────────────────────
  timelineRow: { flexDirection: 'row', marginBottom: 4, minHeight: 52 },
  timelineYear: { fontFamily: FONTS.mono, fontSize: 12, color: T.mute, width: 38, paddingTop: 2 },
  timelineLine: { width: 20, alignItems: 'center', paddingTop: 4 },
  timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: T.ink },
  timelineTrack: { flex: 1, width: 1.5, backgroundColor: T.hair2, marginTop: 2 },
  timelineRight: { flex: 1, paddingLeft: 8, paddingBottom: 16 },
  timelineCompany: { fontSize: 15, fontWeight: '600', color: T.ink, marginBottom: 2 },
  timelineRole: { fontSize: 13, color: T.mute },

  // ── Family ────────────────────────────────────────────────────────────────
  familyMember: { marginBottom: 18 },
  familyRole: { fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 1, color: T.mute, textTransform: 'uppercase', marginBottom: 4 },
  familyName: { fontFamily: FONTS.display, fontSize: 20, color: T.ink, marginBottom: 2 },
  familySub: { fontSize: 13, color: T.mute, marginBottom: 6 },
  familyTags: { flexDirection: 'row', gap: 6 },
  familyTag: { backgroundColor: T.field, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  familyTagText: { fontSize: 12, color: T.ink2, fontWeight: '500' },
  rootsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  rootCell: { width: '50%', paddingVertical: 10, paddingRight: 12 },
  rootLabel: { fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 1, color: T.mute, textTransform: 'uppercase', marginBottom: 3 },
  rootValue: { fontSize: 14, fontWeight: '500', color: T.ink },

  // ── Gunamilan ─────────────────────────────────────────────────────────────
  kootaCard: { backgroundColor: SALMON_S, borderRadius: 16, padding: 16, marginBottom: 20 },
  kootaScore: { fontSize: 16, color: T.accent, fontWeight: '500', marginBottom: 4 },
  kootaBig: { fontFamily: FONTS.display, fontSize: 36, fontWeight: '700', color: T.accent },
  kootaSub: { fontSize: 13, color: T.mute, marginBottom: 16 },
  kootaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 1, backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: 10, overflow: 'hidden' },
  kootaCell: { width: '50%', backgroundColor: SALMON_S, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kootaName: { fontSize: 13, color: T.ink2 },
  kootaVal: { fontSize: 13, fontWeight: '700', color: T.accent },
  detailGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  detailCell: { width: '50%', paddingVertical: 8, paddingRight: 12 },
  detailLabel: { fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 1, color: T.mute, textTransform: 'uppercase', marginBottom: 3 },
  detailValue: { fontSize: 14, fontWeight: '500', color: T.ink },

  // ── Trust ─────────────────────────────────────────────────────────────────
  trustScore: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: GREEN_S, borderRadius: 16, padding: 16, marginBottom: 20 },
  trustIconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  trustTextBlock: { flex: 1 },
  trustTitle: { fontFamily: FONTS.display, fontSize: 20, color: T.ink, marginBottom: 4 },
  trustSub: { fontSize: 13, color: T.mute, lineHeight: 18 },
  verifyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: T.hair, marginBottom: 4 },
  verifyText: { flex: 1 },
  verifyTitle: { fontSize: 14, fontWeight: '600', color: T.ink },
  verifySub: { fontSize: 12, color: T.mute, marginTop: 2 },
  managedRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  managedAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: T.accentSoft, justifyContent: 'center', alignItems: 'center' },
  managedAvatarText: { fontSize: 14, fontWeight: '700', color: T.accent },
  managedTitle: { fontSize: 14, fontWeight: '600', color: T.ink, marginBottom: 2 },
  managedSub: { fontSize: 12, color: T.mute },

  // ── Bottom bar ────────────────────────────────────────────────────────────
  bottomBarWrap: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: T.bg,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: T.hair,
  },
  bottomBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 10 },
  bottomCircle: { width: 48, height: 48, borderRadius: 24, borderWidth: 1.2, borderColor: T.hair2, justifyContent: 'center', alignItems: 'center' },
  sendBtn: { flex: 1, height: 48, backgroundColor: T.accent, borderRadius: 100, justifyContent: 'center', alignItems: 'center', shadowColor: T.accent, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 5 },
  sendBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
