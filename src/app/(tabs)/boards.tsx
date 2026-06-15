import React from 'react';
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
import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { moodBoards as initialMoodBoards, userProfile as initialProfile } from '../../../constants/data';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.containerPadding * 2 - Spacing.gutter) / 2;

export default function BoardsScreen() {
  const router = useRouter();
  const [boards, setBoards] = useState(initialMoodBoards);
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      const [b, p] = await Promise.all([
        apiService.getMoodBoards(),
        apiService.getUserProfile(),
      ]);
      if (active) {
        setBoards(b);
        setProfile(p);
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
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.push('/profile')}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          </Pressable>
          <View>
            <Text style={styles.titleText}>Mood Boards</Text>
            <Text style={styles.subtitleText}>{boards.length} Boards Created</Text>
          </View>
        </View>
        <Pressable style={styles.addButton}>
          <MaterialIcons name="create-new-folder" size={24} color={Colors.onPrimary} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Banner */}
        <View style={styles.introCard}>
          <View style={styles.introLeft}>
            <Text style={styles.introTitle}>Visualize Your Style</Text>
            <Text style={styles.introDesc}>
              Organize outfits and items by aesthetic, season, or event boards.
            </Text>
          </View>
          <View style={styles.introIconContainer}>
            <MaterialIcons name="auto-awesome-mosaic" size={40} color={Colors.primary} />
          </View>
        </View>

        {/* Boards Grid */}
        <View style={styles.gridContainer}>
          {boards.map((board) => {
            const hasMultipleImages = board.images.length > 1;
            return (
              <Pressable
                key={board.id}
                style={({ pressed }) => [styles.boardCard, pressed && styles.pressed]}
                onPress={() => {
                  // Push to closet or details
                }}
              >
                {/* Images Preview Area */}
                <View style={styles.previewContainer}>
                  {board.images.length === 0 ? (
                    <View style={styles.emptyPreview}>
                      <MaterialIcons name="photo-album" size={36} color={Colors.outlineVariant} />
                    </View>
                  ) : board.images.length === 1 ? (
                    <Image source={{ uri: board.images[0] }} style={styles.singleImage} resizeMode="cover" />
                  ) : (
                    <View style={styles.imagesGrid}>
                      <Image source={{ uri: board.images[0] }} style={styles.gridMainImage} resizeMode="cover" />
                      <View style={styles.gridSideContainer}>
                        {board.images[1] && (
                          <Image source={{ uri: board.images[1] }} style={styles.gridSideImage} resizeMode="cover" />
                        )}
                        {board.images[2] ? (
                          <View style={styles.gridSideImageWrapper}>
                            <Image source={{ uri: board.images[2] }} style={styles.gridSideImage} resizeMode="cover" />
                            {board.overflowCount && board.overflowCount > 0 && (
                              <View style={styles.overlayCount}>
                                <Text style={styles.overlayText}>+{board.overflowCount}</Text>
                              </View>
                            )}
                          </View>
                        ) : (
                          board.overflowCount && board.overflowCount > 0 && (
                            <View style={styles.gridSideImageWrapper}>
                              <View style={[styles.gridSideImage, styles.emptySide]}>
                                <Text style={styles.emptySideText}>+{board.overflowCount}</Text>
                              </View>
                            </View>
                          )
                        )}
                      </View>
                    </View>
                  )}
                </View>

                {/* Info Footer */}
                <View style={styles.cardInfo}>
                  <View style={styles.infoTopRow}>
                    <Text style={styles.boardName} numberOfLines={1}>
                      {board.name}
                    </Text>
                    {board.lastUpdated && (
                      <Text style={styles.timeText}>{board.lastUpdated}</Text>
                    )}
                  </View>
                  <Text style={styles.itemCountText}>
                    {board.itemCount} Items {board.subtitle ? `• ${board.subtitle}` : ''}
                  </Text>
                </View>
              </Pressable>
            );
          })}

          {/* Create New Card */}
          <Pressable
            style={({ pressed }) => [styles.boardCard, styles.createCard, pressed && styles.pressed]}
            onPress={() => {
              // Action for adding new board
            }}
          >
            <View style={styles.createInner}>
              <View style={styles.createIconBg}>
                <MaterialIcons name="add" size={28} color={Colors.primary} />
              </View>
              <Text style={styles.createTitle}>Create Mood Board</Text>
              <Text style={styles.createSubtitle}>Curate new ideas</Text>
            </View>
          </Pressable>
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  scrollContent: {
    paddingHorizontal: Spacing.containerPadding,
  },
  introCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius['3xl'],
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.3)',
    marginBottom: Spacing.stackMd,
  },
  introLeft: {
    flex: 1,
    paddingRight: 8,
  },
  introTitle: {
    ...Typography.titleMd,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro-SemiBold',
    marginBottom: 4,
  },
  introDesc: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },
  introIconContainer: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius['2xl'],
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.gutter,
    justifyContent: 'space-between',
  },
  boardCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
    overflow: 'hidden',
    marginBottom: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  previewContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.9,
    backgroundColor: Colors.surfaceContainer,
  },
  emptyPreview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleImage: {
    width: '100%',
    height: '100%',
  },
  imagesGrid: {
    flex: 1,
    flexDirection: 'row',
    padding: 4,
    gap: 4,
  },
  gridMainImage: {
    flex: 1.2,
    height: '100%',
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
  },
  gridSideContainer: {
    flex: 1,
    gap: 4,
  },
  gridSideImage: {
    flex: 1,
    width: '100%',
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
  },
  gridSideImageWrapper: {
    flex: 1,
    position: 'relative',
  },
  overlayCount: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(50, 18, 0, 0.6)',
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: Colors.white,
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
  },
  emptySide: {
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySideText: {
    color: Colors.onPrimaryContainer,
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
  },
  cardInfo: {
    padding: 12,
  },
  infoTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  boardName: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.onBackground,
    flex: 1,
    marginRight: 4,
  },
  timeText: {
    fontSize: 11,
    fontFamily: 'Manrope-Regular',
    color: Colors.outline,
  },
  itemCountText: {
    fontSize: 11,
    fontFamily: 'Manrope-Regular',
    color: Colors.onSurfaceVariant,
  },
  createCard: {
    height: CARD_WIDTH * 1.3,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
  },
  createInner: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  createIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  createTitle: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-Bold',
    color: Colors.primary,
    textAlign: 'center',
  },
  createSubtitle: {
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    color: Colors.outline,
    textAlign: 'center',
    marginTop: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
