import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../../constants/theme';
import { apiService } from '../../services/api';
import { calendarDays as initialCalendarDays, userProfile as initialProfile } from '../../../constants/data';

export default function CalendarScreen() {
  const router = useRouter();
  const [days, setDays] = useState(initialCalendarDays);
  const [profile, setProfile] = useState(initialProfile);
  const [selectedDayId, setSelectedDayId] = useState(initialCalendarDays[3].id);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      const [d, p] = await Promise.all([
        apiService.getCalendarDays(),
        apiService.getUserProfile(),
      ]);
      if (active) {
        setDays(d);
        setProfile(p);
        if (d && d.length > 3 && !d.some((item) => item.id === selectedDayId)) {
          setSelectedDayId(d[3].id);
        }
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, []);

  const selectedDay = days.find((d) => d.id === selectedDayId) || days[3] || initialCalendarDays[3];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.push('/profile')}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          </Pressable>
          <View>
            <Text style={styles.titleText}>Style Planner</Text>
            <Text style={styles.subtitleText}>October 2024</Text>
          </View>
        </View>
        <Pressable
          style={styles.headerButton}
          onPress={() => router.push('/outfit-builder')}
        >
          <MaterialIcons name="event-note" size={24} color={Colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Horizontal Calendar strip */}
        <View style={styles.calendarStripContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.calendarStrip}
          >
            {days.map((day) => {
              const isSelected = day.id === selectedDayId;
              return (
                <Pressable
                  key={day.id}
                  style={[
                    styles.dateCard,
                    isSelected && styles.dateCardSelected,
                  ]}
                  onPress={() => setSelectedDayId(day.id)}
                >
                  <Text style={[styles.dayLabel, isSelected && styles.dayLabelSelected]}>
                    {day.dayLabel}
                  </Text>
                  <Text style={[styles.dateNum, isSelected && styles.dateNumSelected]}>
                    {day.dateNum}
                  </Text>
                  {day.hasEvent && (
                    <View
                      style={[
                        styles.eventIndicator,
                        isSelected && styles.eventIndicatorSelected,
                      ]}
                    />
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Selected Day Agenda */}
        <View style={styles.agendaSection}>
          <Text style={styles.agendaTitle}>
            Agenda for Oct {selectedDay.dateNum}, {selectedDay.dayLabel}
          </Text>

          {selectedDay.hasEvent && selectedDay.outfit ? (
            <View style={styles.eventContainer}>
              {/* Event Header Banner */}
              <View style={styles.eventHeader}>
                <View style={styles.eventTagContainer}>
                  <MaterialIcons name="local-fire-department" size={16} color={Colors.onSecondaryContainer} />
                  <Text style={styles.eventTagText}>{selectedDay.eventTag || 'SCHEDULED EVENT'}</Text>
                </View>
                <Text style={styles.eventTime}>Evening • 6:30 PM</Text>
              </View>

              {/* Scheduled Outfit Card */}
              <View style={styles.outfitDetailCard}>
                <Image source={{ uri: selectedDay.outfit.image }} style={styles.outfitImage} resizeMode="contain" />
                <View style={styles.outfitInfo}>
                  <Text style={styles.outfitName}>{selectedDay.outfit.name}</Text>
                  <Text style={styles.outfitOccasion}>{selectedDay.outfit.occasion}</Text>

                  {/* Metadata chips */}
                  <View style={styles.metaRow}>
                    <View style={styles.metaChip}>
                      <MaterialIcons name="opacity" size={14} color={Colors.outline} />
                      <Text style={styles.metaChipText}>{selectedDay.outfit.fabric}</Text>
                    </View>
                    <View style={styles.metaChip}>
                      <MaterialIcons name="auto-awesome" size={14} color={Colors.outline} />
                      <Text style={styles.metaChipText}>{selectedDay.outfit.careLevel}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Quick Actions for this schedule */}
              <View style={styles.actionRow}>
                <Pressable style={styles.secondaryActionBtn}>
                  <MaterialIcons name="edit" size={18} color={Colors.primary} />
                  <Text style={styles.secondaryActionText}>Modify</Text>
                </Pressable>
                <Pressable style={styles.primaryActionBtn}>
                  <MaterialIcons name="done" size={18} color={Colors.onPrimary} />
                  <Text style={styles.primaryActionText}>Mark Worn</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.emptyAgendaCard}>
              <View style={styles.emptyIconBg}>
                <MaterialIcons name="calendar-today" size={36} color={Colors.outline} />
              </View>
              <Text style={styles.emptyTitle}>Nothing scheduled yet</Text>
              <Text style={styles.emptyDesc}>
                Plan your style ahead. Make morning choices quick and effortless.
              </Text>
              <Pressable
                style={styles.scheduleButton}
                onPress={() => router.push('/outfit-builder')}
              >
                <Text style={styles.scheduleButtonText}>Schedule Outfit</Text>
                <MaterialIcons name="add" size={18} color={Colors.onPrimary} />
              </Pressable>
            </View>
          )}
        </View>

        {/* AI Suggestions for planner */}
        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsTitle}>Suggested for Your Week</Text>
          <View style={styles.suggestionCard}>
            <MaterialIcons name="wb-sunny" size={24} color={Colors.secondary} />
            <View style={styles.suggestionContent}>
              <Text style={styles.suggestionHeader}>Sunny weather upcoming</Text>
              <Text style={styles.suggestionText}>
                Temperatures average 31°C this week. We suggest scheduling lightweight linens for Wednesday and Friday.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 60 }} />
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primaryFixed,
  },
  titleText: {
    ...Typography.titleMd,
    color: Colors.onBackground,
    fontWeight: '700',
  },
  subtitleText: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: Spacing.containerPadding,
  },
  calendarStripContainer: {
    marginHorizontal: -Spacing.containerPadding,
    marginBottom: Spacing.stackMd,
  },
  calendarStrip: {
    paddingHorizontal: Spacing.containerPadding,
    gap: 12,
    paddingBottom: 4,
  },
  dateCard: {
    width: 64,
    height: 90,
    borderRadius: BorderRadius['2xl'],
    backgroundColor: Colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    position: 'relative',
  },
  dateCardSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  dayLabel: {
    fontSize: 12,
    fontFamily: 'Manrope-Bold',
    color: Colors.outline,
  },
  dayLabelSelected: {
    color: Colors.primaryFixedDim,
  },
  dateNum: {
    fontSize: 22,
    fontFamily: 'BeVietnamPro-Bold',
    color: Colors.onBackground,
  },
  dateNumSelected: {
    color: Colors.white,
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondaryContainer,
    position: 'absolute',
    bottom: 8,
  },
  eventIndicatorSelected: {
    backgroundColor: Colors.white,
  },
  agendaSection: {
    marginBottom: Spacing.stackMd,
  },
  agendaTitle: {
    ...Typography.titleMd,
    color: Colors.onBackground,
    marginBottom: Spacing.gutter,
  },
  eventContainer: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius['3xl'],
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
  },
  eventTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  eventTagText: {
    fontSize: 11,
    fontFamily: 'Manrope-Bold',
    color: Colors.onSecondaryFixed,
    letterSpacing: 0.5,
  },
  eventTime: {
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    color: Colors.outline,
  },
  outfitDetailCard: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 16,
  },
  outfitImage: {
    width: 100,
    height: 120,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.1)',
  },
  outfitInfo: {
    flex: 1,
  },
  outfitName: {
    ...Typography.titleMd,
    fontSize: 18,
    color: Colors.onBackground,
    marginBottom: 4,
  },
  outfitOccasion: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
  },
  metaChipText: {
    fontSize: 11,
    fontFamily: 'Manrope-Regular',
    color: Colors.onSurfaceVariant,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  secondaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
  },
  secondaryActionText: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-Bold',
    color: Colors.primary,
  },
  primaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
  },
  primaryActionText: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-Bold',
    color: Colors.onPrimary,
  },
  emptyAgendaCard: {
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius['3xl'],
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
    padding: 32,
  },
  emptyIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    ...Typography.titleMd,
    color: Colors.onBackground,
    marginBottom: 8,
  },
  emptyDesc: {
    ...Typography.bodySm,
    color: Colors.outline,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
  },
  scheduleButtonText: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-Bold',
    color: Colors.onPrimary,
  },
  suggestionsSection: {
    marginTop: Spacing.stackSm,
  },
  suggestionsTitle: {
    ...Typography.titleMd,
    color: Colors.onBackground,
    marginBottom: Spacing.gutter,
  },
  suggestionCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius['2xl'],
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionHeader: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-Bold',
    color: Colors.onBackground,
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },
});
