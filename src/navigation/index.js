import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path, Circle } from 'react-native-svg';
import { T, FONTS } from '../theme';

// Auth screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import EmailSignupScreen from '../screens/auth/EmailSignupScreen';
import PhoneSignupScreen from '../screens/auth/PhoneSignupScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Profile screens
import NameDOBScreen from '../screens/profile/NameDOBScreen';
import GenderScreen from '../screens/profile/GenderScreen';
import USLocationScreen from '../screens/profile/USLocationScreen';
import IndiaOriginScreen from '../screens/profile/IndiaOriginScreen';
import ReligionScreen from '../screens/profile/ReligionScreen';
import EducationScreen from '../screens/profile/EducationScreen';
import VisaScreen from '../screens/profile/VisaScreen';
import FamilyScreen from '../screens/profile/FamilyScreen';
import HoroscopeScreen from '../screens/profile/HoroscopeScreen';
import DietScreen from '../screens/profile/DietScreen';
import PhotosScreen from '../screens/profile/PhotosScreen';
import AboutScreen from '../screens/profile/AboutScreen';
import PreferencesScreen from '../screens/profile/PreferencesScreen';
import VerifyScreen from '../screens/profile/VerifyScreen';

// Browse screens
import MatchesScreen from '../screens/browse/MatchesScreen';
import MatchDetailScreen from '../screens/browse/MatchDetailScreen';
import SearchScreen from '../screens/browse/SearchScreen';
import FiltersScreen from '../screens/browse/FiltersScreen';

// Messaging screens
import InboxScreen from '../screens/messaging/InboxScreen';
import ChatScreen from '../screens/messaging/ChatScreen';
import CallScreen from '../screens/messaging/CallScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab icons
function HomeIcon({ focused }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 12L12 4L21 12V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V12Z"
        stroke={focused ? T.ink : T.mute}
        strokeWidth={focused ? 2.2 : 1.6}
        fill={focused ? T.field : 'none'}
      />
    </Svg>
  );
}

function DiscoverIcon({ focused }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="8" stroke={focused ? T.ink : T.mute} strokeWidth={focused ? 2.2 : 1.6} />
      <Path d="M21 21l-4.35-4.35" stroke={focused ? T.ink : T.mute} strokeWidth={focused ? 2.2 : 1.6} strokeLinecap="round" />
    </Svg>
  );
}

function MatchesIcon({ focused }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        stroke={focused ? T.accent : T.mute}
        strokeWidth={focused ? 2.2 : 1.6}
        fill={focused ? T.accent : 'none'}
      />
    </Svg>
  );
}

function InboxIcon({ focused }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
        stroke={focused ? T.ink : T.mute}
        strokeWidth={focused ? 2.2 : 1.6}
        fill={focused ? T.field : 'none'}
      />
    </Svg>
  );
}

function ProfileIcon({ focused }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={focused ? T.ink : T.mute} strokeWidth={focused ? 2.2 : 1.6} fill={focused ? T.field : 'none'} />
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={focused ? T.ink : T.mute} strokeWidth={focused ? 2.2 : 1.6} strokeLinecap="round" />
    </Svg>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  const TAB_CONFIG = [
    { key: 'Home', icon: HomeIcon, label: 'Home' },
    { key: 'Discover', icon: DiscoverIcon, label: 'Discover' },
    { key: 'Matches', icon: MatchesIcon, label: 'Matches' },
    { key: 'Inbox', icon: InboxIcon, label: 'Inbox' },
    { key: 'Profile', icon: ProfileIcon, label: 'Profile' },
  ];

  return (
    <View style={tabStyles.tabBar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const config = TAB_CONFIG.find(c => c.key === route.name) || TAB_CONFIG[0];
        const IconComponent = config.icon;

        return (
          <TouchableOpacity
            key={route.key}
            style={tabStyles.tabItem}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}
          >
            <IconComponent focused={focused} />
            <Text style={[tabStyles.tabLabel, focused && tabStyles.tabLabelActive]}>
              {config.label}
            </Text>
            {focused && <View style={tabStyles.tabDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function HomePlaceholder() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: T.bg }}>
      <Text style={{ fontFamily: FONTS.display, fontSize: 28, color: T.ink }}>Home</Text>
      <Text style={{ fontSize: 14, color: T.mute, marginTop: 8 }}>Coming soon</Text>
    </View>
  );
}

function ProfilePlaceholder() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: T.bg }}>
      <Text style={{ fontFamily: FONTS.display, fontSize: 28, color: T.ink }}>My Profile</Text>
      <Text style={{ fontSize: 14, color: T.mute, marginTop: 8 }}>Anika Reddy</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomePlaceholder} />
      <Tab.Screen name="Discover" component={SearchScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfilePlaceholder} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          }),
        }}
      >
        {/* Auth */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="EmailSignup" component={EmailSignupScreen} />
        <Stack.Screen name="PhoneSignup" component={PhoneSignupScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        {/* Profile creation */}
        <Stack.Screen name="NameDOB" component={NameDOBScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="USLocation" component={USLocationScreen} />
        <Stack.Screen name="IndiaOrigin" component={IndiaOriginScreen} />
        <Stack.Screen name="Religion" component={ReligionScreen} />
        <Stack.Screen name="Education" component={EducationScreen} />
        <Stack.Screen name="Visa" component={VisaScreen} />
        <Stack.Screen name="Family" component={FamilyScreen} />
        <Stack.Screen name="Horoscope" component={HoroscopeScreen} />
        <Stack.Screen name="Diet" component={DietScreen} />
        <Stack.Screen name="Photos" component={PhotosScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Preferences" component={PreferencesScreen} />
        <Stack.Screen name="Verify" component={VerifyScreen} />

        {/* Main app */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="MatchDetail" component={MatchDetailScreen} />
        <Stack.Screen name="Filters" component={FiltersScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Call" component={CallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const tabStyles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: T.bg,
    borderTopWidth: 1,
    borderTopColor: T.hair,
    paddingTop: 8,
    paddingBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 4,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 10,
    color: T.mute,
    fontWeight: '400',
  },
  tabLabelActive: {
    color: T.ink,
    fontWeight: '700',
  },
  tabDot: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: T.accent,
  },
});
