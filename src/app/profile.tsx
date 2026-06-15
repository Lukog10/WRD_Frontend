import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { userProfile as initialProfile } from '../../constants/data';

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      const data = await apiService.getUserProfile();
      if (active) {
        setProfile(data);
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <Image source={{ uri: profile.avatar }} style={styles.largeAvatar} />
          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.userEmail}>{profile.email}</Text>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color={Colors.outline} />
            <Text style={styles.userLocation}>{profile.location}</Text>
          </View>
        </View>

        {/* Stats Summary Widgets */}
        <View style={styles.statsSummaryGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNum}>{profile.totalItems}</Text>
            <Text style={styles.statBoxLabel}>CLOSET ITEMS</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNum}>{profile.outfitsCreated}</Text>
            <Text style={styles.statBoxLabel}>OUTFITS DRAFTED</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNum}>{profile.boardsCount}</Text>
            <Text style={styles.statBoxLabel}>MOOD BOARDS</Text>
          </View>
        </View>

        {/* Menu Items List */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionHeader}>Preferences & Style</Text>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(108,47,0,0.1)' }]}>
                <MaterialIcons name="favorite" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.menuItemText}>My Favorites</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.outline} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(0,72,79,0.1)' }]}>
                <MaterialIcons name="eco" size={20} color={Colors.tertiary} />
              </View>
              <Text style={styles.menuItemText}>Sustainability Goals</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.outline} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(253,138,62,0.1)' }]}>
                <MaterialIcons name="palette" size={20} color={Colors.secondaryContainer} />
              </View>
              <Text style={styles.menuItemText}>Style Archetype</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.outline} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                <MaterialIcons name="settings" size={20} color={Colors.onBackground} />
              </View>
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.outline} />
          </Pressable>
        </View>

        {/* Brand/Placeholder details */}
        <View style={styles.brandDetails}>
          <Text style={styles.brandText}>WRD Mobile App</Text>
          <Text style={styles.versionText}>Version 1.0.0 (Expo Dev Build)</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.containerPadding,
    paddingTop: 50,
    paddingBottom: Spacing.stackSm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...Typography.titleMd,
    color: Colors.onBackground,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: Spacing.containerPadding,
    alignItems: 'center',
  },
  userCard: {
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius['3xl'],
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
    padding: 24,
    width: '100%',
    marginBottom: Spacing.stackMd,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.primaryFixed,
    marginBottom: 16,
  },
  userName: {
    ...Typography.headlineLgMobile,
    color: Colors.onBackground,
    marginBottom: 4,
  },
  userEmail: {
    ...Typography.bodySm,
    color: Colors.outline,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userLocation: {
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    color: Colors.onSurfaceVariant,
  },
  statsSummaryGrid: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: Spacing.stackMd,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statBoxNum: {
    ...Typography.titleMd,
    fontSize: 22,
    color: Colors.primary,
    fontWeight: '700',
  },
  statBoxLabel: {
    fontSize: 10,
    fontFamily: 'Manrope-Bold',
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  menuContainer: {
    width: '100%',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius['3xl'],
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
    padding: 20,
    marginBottom: Spacing.stackMd,
  },
  sectionHeader: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-Bold',
    color: Colors.onSurfaceVariant,
    marginBottom: Spacing.stackSm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(218,194,182,0.1)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.onBackground,
  },
  brandDetails: {
    alignItems: 'center',
    marginTop: Spacing.stackSm,
  },
  brandText: {
    fontFamily: 'BeVietnamPro-SemiBold',
    fontSize: 16,
    color: Colors.primary,
  },
  versionText: {
    fontSize: 11,
    fontFamily: 'Manrope-Regular',
    color: Colors.outline,
    marginTop: 4,
  },
});
