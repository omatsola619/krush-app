import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { typography, fontFamily } from '../constants/typography';
import Svg, { Path } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      
      {/* Top Language Bar */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} style={styles.langBtn}>
          <Feather name="globe" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.langText}>English</Text>
        </TouchableOpacity>
      </View>

      {/* Center Branding Content */}
      <View style={styles.content}>
        {/* Cute Heart Logo */}
        <Image 
          source={require('../assets/images/krush_heart_logo.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        
        {/* Bold App Name */}
        <Text style={styles.appName}>Krush</Text>
        
        {/* Wavy Translucent Banner in pure code */}
        <View style={styles.bannerContainer}>
          <Svg width={300} height={100} viewBox="0 0 280 100" style={styles.bannerSvg}>
            <Path 
              d="M 0 30 C 70 5, 210 55, 280 20 L 280 60 C 210 95, 70 45, 0 70 Z" 
              fill="rgba(255, 255, 255, 0.25)" 
            />
          </Svg>
          <Text style={styles.bannerText}>personality first.</Text>
        </View>
      </View>

      {/* Action Buttons & Legal Footer */}
      <View style={styles.footer}>
        {/* I'm new here CTA (White Button) */}
        <TouchableOpacity 
          activeOpacity={0.9} 
          style={styles.primaryBtn}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={styles.primaryBtnText}>I'm new here</Text>
        </TouchableOpacity>

        {/* I've been here before CTA (Dark Indigo Button) */}
        <TouchableOpacity 
          activeOpacity={0.9} 
          style={styles.secondaryBtn}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.secondaryBtnText}>I've been here before</Text>
        </TouchableOpacity>

        {/* Immersive Legal Links */}
        <Text style={styles.legalText}>
          By continuing you agree to our{' '}
          <Text style={styles.legalLink}>Terms of Service</Text> and{' '}
          <Text style={styles.legalLink}>Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C3CE1',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'flex-end',
    paddingVertical: 12,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  langText: {
    ...typography.bodySm,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20, // Slightly offsets up for perfect optical vertical alignment!
  },
  logo: {
    width: '100%',
    height: 150,
    marginBottom: 16,
  },
  appName: {
    fontFamily: typography.display.fontFamily,
    fontSize: 52,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  bannerContainer: {
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    position: 'relative',
  },
  bannerSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bannerText: {
    fontFamily: typography.display.fontFamily,
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    transform: [{ rotate: '-3deg' }, { translateY: -4 }],
  },
  footer: {
    gap: 16,
    paddingBottom: 24,
  },
  primaryBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryBtnText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: '#6C3CE1',
  },
  secondaryBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#201560',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  secondaryBtnText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  legalText: {
    ...typography.bodySm,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
  legalLink: {
    textDecorationLine: 'underline',
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
