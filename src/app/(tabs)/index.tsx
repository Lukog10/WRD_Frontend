import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius } from '../../../constants/theme';
import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import {
  userProfile as initialProfile,
  todayOutfit as initialOutfit,
  weatherData as initialWeather,
  sustainabilityStats as initialStats,
} from '../../../constants/data';

const { width } = Dimensions.get('window');

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning,';
  if (hour < 17) return 'Good Afternoon,';
  return 'Good Evening,';
}

export default function HomeScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [outfit, setOutfit] = useState(initialOutfit);
  const [weather, setWeather] = useState(initialWeather);
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      const [p, o, w, s] = await Promise.all([
        apiService.getUserProfile(),
        apiService.getTodayOutfit(),
        apiService.getWeatherData(),
        apiService.getSustainabilityStats(),
      ]);
      if (active) {
        setProfile(p);
        setOutfit(o);
        setWeather(w);
        setStats(s);
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.push('/profile')}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          </Pressable>
          <Text style={styles.brandName}>WRD</Text>
        </View>
        <Pressable style={styles.notifButton}>
          <MaterialIcons name="notifications-none" size={28} color={Colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>{getGreeting()}</Text>
          <Text style={styles.greetingName}>{profile.name}</Text>
          <Text style={styles.greetingSubtitle}>Ready to look your best today?</Text>
        </View>

        {/* Today's Outfit Card */}
        <Pressable style={styles.outfitCard}>
          <View style={styles.outfitInfo}>
            <View style={styles.outfitLabel}>
              <MaterialIcons name="checkroom" size={18} color={Colors.secondary} />
              <Text style={styles.outfitLabelText}>TODAY'S OUTFIT</Text>
            </View>
            <Text style={styles.outfitTitle}>{outfit.name}</Text>
          </View>
          <View style={styles.outfitImages}>
            <View style={[styles.outfitImageCard, { transform: [{ rotate: '-6deg' }], zIndex: 1 }]}>
              <Image source={{ uri: outfit.items[0].image }} style={styles.outfitImage} resizeMode="contain" />
            </View>
            <View style={[styles.outfitImageCard, { transform: [{ rotate: '4deg' }], zIndex: 2, marginLeft: -40 }]}>
              <Image source={{ uri: outfit.items[1].image }} style={styles.outfitImage} resizeMode="contain" />
            </View>
          </View>
        </Pressable>

        {/* Weather Widget */}
        <LinearGradient
          colors={['#9FF0FB', '#FFF9F0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.weatherCard}
        >
          <View style={styles.weatherBlob} />
          <View style={{ zIndex: 10 }}>
            <View style={styles.weatherLocation}>
              <MaterialIcons name="location-on" size={18} color={Colors.primary} />
              <Text style={styles.weatherLocationText}>{weather.location}</Text>
            </View>
            <View style={styles.weatherTempRow}>
              <Text style={styles.weatherTemp}>{weather.temperature}°C</Text>
              <Text style={styles.weatherCondition}>{weather.condition}</Text>
            </View>
            <Text style={styles.weatherDetail}>
              {weather.humidity}% Humidity • Feels like {weather.feelsLike}°C
            </Text>
          </View>
          <View style={styles.weatherTip}>
            <MaterialIcons name="lightbulb-outline" size={18} color={Colors.primary} />
            <Text style={styles.weatherTipText}>{weather.tip}</Text>
          </View>
        </LinearGradient>

        {/* Action Buttons Row */}
        <View style={styles.actionRow}>
          <Pressable
            style={({ pressed }) => [styles.actionCard, styles.actionAI, pressed && styles.pressed]}
            onPress={() => router.push('/thari-ai')}
          >
            <View>
              <Text style={styles.actionLabel}>DISCOVER</Text>
              <Text style={styles.actionTitle}>AI Outfit Suggestion</Text>
            </View>
            <MaterialIcons name="auto-awesome" size={32} color={Colors.tertiary} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.actionCard, styles.actionDraft, pressed && styles.pressed]}
            onPress={() => router.push('/outfit-builder')}
          >
            <View>
              <Text style={[styles.actionLabel, { color: 'rgba(50,18,0,0.6)' }]}>CANVAS</Text>
              <Text style={[styles.actionTitle, { color: Colors.onPrimaryFixed }]}>Draft your own outfit</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={32} color={Colors.onPrimaryFixed} />
          </Pressable>
        </View>

        {/* Sustainability Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Sustainability Stats</Text>
            <Pressable>
              <Text style={styles.statsLink}>View Details</Text>
            </Pressable>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statTop}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(108,47,0,0.1)' }]}>
                  <MaterialIcons name="sync" size={22} color={Colors.primary} />
                </View>
                <Text style={[styles.statChange, { color: Colors.secondary }]}>
                  {stats.repetitionScore.change}
                </Text>
              </View>
              <Text style={styles.statLabel}>REPETITION SCORE</Text>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>{stats.repetitionScore.value}</Text>
                <Text style={styles.statUnit}>{stats.repetitionScore.unit}</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statTop}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(0,72,79,0.1)' }]}>
                  <MaterialIcons name="payments" size={22} color={Colors.tertiary} />
                </View>
                <Text style={[styles.statChange, { color: Colors.tertiary }]}>
                  {stats.costPerWear.level}
                </Text>
              </View>
              <Text style={styles.statLabel}>COST PER WEAR</Text>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>{stats.costPerWear.value}</Text>
                <Text style={styles.statUnit}>{stats.costPerWear.unit}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.containerPadding,
    paddingTop: 50,
    paddingBottom: Spacing.stackSm,
    backgroundColor: Colors.background,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primaryFixed,
  },
  brandName: {
    ...Typography.headlineLgMobile,
    color: Colors.primary,
    fontWeight: '700',
  },
  notifButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: { paddingHorizontal: Spacing.containerPadding, paddingBottom: 80 },

  // Greeting
  greeting: { marginBottom: Spacing.stackMd },
  greetingText: { ...Typography.displayLg, color: Colors.onBackground },
  greetingName: { ...Typography.displayLg, color: Colors.primary },
  greetingSubtitle: { ...Typography.bodyLg, color: Colors.onSurfaceVariant, marginTop: 4 },

  // Outfit Card
  outfitCard: {
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius['3xl'],
    padding: Spacing.stackMd,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.3)',
    marginBottom: Spacing.gutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outfitInfo: { flex: 1 },
  outfitLabel: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  outfitLabelText: {
    ...Typography.labelCaps,
    color: Colors.onSurfaceVariant,
  },
  outfitTitle: { ...Typography.titleMd, color: Colors.onBackground },
  outfitImages: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  outfitImageCard: {
    width: 100,
    height: 126,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.1)',
  },
  outfitImage: { width: '100%', height: '100%' },

  // Weather
  weatherCard: {
    borderRadius: BorderRadius['3xl'],
    padding: Spacing.stackMd,
    minHeight: 220,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
    marginBottom: Spacing.gutter,
    overflow: 'hidden',
  },
  weatherBlob: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(253,138,62,0.3)',
  },
  weatherLocation: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  weatherLocationText: { ...Typography.labelCaps, color: Colors.onSurface },
  weatherTempRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 4 },
  weatherTemp: {
    fontFamily: 'BeVietnamPro-Bold',
    fontSize: 48,
    lineHeight: 52,
    color: Colors.onBackground,
  },
  weatherCondition: { ...Typography.titleMd, color: Colors.onSurfaceVariant, marginBottom: 6 },
  weatherDetail: { ...Typography.bodySm, color: Colors.onSurfaceVariant },
  weatherTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: BorderRadius.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    marginTop: 16,
  },
  weatherTipText: {
    ...Typography.bodySm,
    color: Colors.onPrimaryFixedVariant,
    fontFamily: 'Manrope-SemiBold',
    fontStyle: 'italic',
    flex: 1,
  },

  // Actions
  actionRow: { gap: Spacing.gutter, marginBottom: Spacing.gutter },
  actionCard: {
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.stackMd,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionAI: { backgroundColor: Colors.onTertiaryContainer },
  actionDraft: { backgroundColor: Colors.primaryFixed },
  actionLabel: {
    ...Typography.labelCaps,
    color: 'rgba(0,72,79,0.6)',
    marginBottom: 4,
  },
  actionTitle: { ...Typography.titleMd, color: Colors.tertiary },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },

  // Stats
  statsSection: { marginTop: Spacing.gutter },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.gutter,
  },
  statsTitle: { ...Typography.titleMd, color: Colors.onBackground },
  statsLink: {
    ...Typography.labelCaps,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  statsRow: { flexDirection: 'row', gap: Spacing.gutter },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius['2xl'],
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
  },
  statTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statChange: { ...Typography.bodySm, fontFamily: 'Manrope-Bold' },
  statLabel: { ...Typography.labelCaps, color: Colors.onSurfaceVariant, marginBottom: 4 },
  statValueRow: { flexDirection: 'row', alignItems: 'baseline' },
  statValue: { ...Typography.headlineLg, color: Colors.onBackground },
  statUnit: { ...Typography.bodyLg, color: Colors.onSurfaceVariant, marginLeft: 4 },
});
