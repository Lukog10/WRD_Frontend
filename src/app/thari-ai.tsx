import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { apiService } from '../services/api';
import { outfitSuggestions as initialSuggestions } from '../../constants/data';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.25 * width;

export default function ThariAIScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      const data = await apiService.getOutfitSuggestions();
      if (active) {
        setSuggestions(data);
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, []);

  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0.93, 1],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction: 'right' | 'left') => {
    const x = direction === 'right' ? width + 100 : -width - 100;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'right' | 'left') => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: false,
    }).start();
  };

  const currentSuggestion = currentIndex < suggestions.length ? suggestions[currentIndex] : null;

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <MaterialIcons name="auto-awesome" size={20} color={Colors.secondaryContainer} />
          <Text style={styles.headerTitle}>Thari AI Swipe</Text>
        </View>
        <Pressable style={styles.headerButton}>
          <MaterialIcons name="tune" size={24} color={Colors.primary} />
        </Pressable>
      </View>

      {/* Card Stack Area */}
      <View style={styles.stackArea}>
        {currentSuggestion ? (
          suggestions
            .map((item, i) => {
              if (i < currentIndex) {
                return null;
              }

              if (i === currentIndex) {
                return (
                  <Animated.View
                    key={item.id}
                    style={[
                      styles.card,
                      {
                        transform: [
                          { translateX: position.x },
                          { translateY: position.y },
                          { rotate: rotate },
                        ],
                      },
                    ]}
                    {...panResponder.panHandlers}
                  >
                    {/* Visual Stamp Indicators */}
                    <Animated.View style={[styles.stamp, styles.likeStamp, { opacity: likeOpacity }]}>
                      <Text style={styles.stampTextLike}>LIKE</Text>
                    </Animated.View>
                    <Animated.View style={[styles.stamp, styles.nopeStamp, { opacity: nopeOpacity }]}>
                      <Text style={styles.stampTextNope}>SKIP</Text>
                    </Animated.View>

                    {/* Image */}
                    <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />

                    {/* Details Info Panel */}
                    <View style={styles.cardInfo}>
                      <View style={styles.badgeRow}>
                        <View style={styles.categoryBadge}>
                          <Text style={styles.categoryBadgeText}>{item.category}</Text>
                        </View>
                        <View style={styles.fabricBadge}>
                          <Text style={styles.fabricBadgeText}>{item.fabricTag}</Text>
                        </View>
                      </View>

                      <Text style={styles.cardName}>{item.name}</Text>
                      <Text style={styles.cardDesc}>{item.description}</Text>

                      {/* Occasion / Weather Context */}
                      <View style={styles.contextRow}>
                        <View style={styles.contextItem}>
                          <MaterialIcons name="event" size={16} color={Colors.white} style={styles.contextIcon} />
                          <Text style={styles.contextText}>{item.occasion}</Text>
                        </View>
                        <View style={styles.contextItem}>
                          <MaterialIcons name="wb-sunny" size={16} color={Colors.white} style={styles.contextIcon} />
                          <Text style={styles.contextText}>{item.weather}</Text>
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                );
              }

              // Background card
              return (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.card,
                    styles.bgCard,
                    {
                      transform: [{ scale: nextCardScale }],
                      zIndex: -i,
                    },
                  ]}
                >
                  <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardName}>{item.name}</Text>
                  </View>
                </Animated.View>
              );
            })
            .reverse() // Render lower indices on top
        ) : (
          <View style={styles.emptyStack}>
            <View style={styles.emptyIconBg}>
              <MaterialIcons name="auto-awesome" size={48} color={Colors.secondaryContainer} />
            </View>
            <Text style={styles.emptyTitle}>You've swiped all suggestions!</Text>
            <Text style={styles.emptyDesc}>
              Come back tomorrow or customize your style archetype preferences.
            </Text>
            <Pressable style={styles.refreshButton} onPress={() => setCurrentIndex(0)}>
              <Text style={styles.refreshButtonText}>Start Over</Text>
              <MaterialIcons name="refresh" size={18} color={Colors.onPrimary} />
            </Pressable>
          </View>
        )}
      </View>

      {/* Tinder Actions Row */}
      {currentSuggestion && (
        <View style={styles.actionsRow}>
          <Pressable
            style={({ pressed }) => [styles.actionButton, styles.closeBtn, pressed && styles.btnPressed]}
            onPress={() => forceSwipe('left')}
          >
            <MaterialIcons name="close" size={28} color={Colors.error} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.actionButton, styles.infoBtn, pressed && styles.btnPressed]}
          >
            <MaterialIcons name="info-outline" size={24} color={Colors.tertiary} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.actionButton, styles.favoriteBtn, pressed && styles.btnPressed]}
            onPress={() => forceSwipe('right')}
          >
            <MaterialIcons name="favorite" size={28} color="#4CAF50" />
          </Pressable>
        </View>
      )}
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    ...Typography.titleMd,
    color: Colors.onBackground,
    fontWeight: '700',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.containerPadding,
    marginVertical: 10,
  },
  card: {
    width: width - Spacing.containerPadding * 2,
    height: height * 0.62,
    borderRadius: BorderRadius['3xl'],
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
    overflow: 'hidden',
    position: 'absolute',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  bgCard: {
    shadowOpacity: 0.05,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(50, 18, 0, 0.75)', // Terracotta overlay matching the palette
    padding: 24,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontFamily: 'Manrope-Bold',
    color: Colors.onSecondaryContainer,
    letterSpacing: 0.5,
  },
  fabricBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  fabricBadgeText: {
    fontSize: 10,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.white,
  },
  cardName: {
    fontFamily: 'BeVietnamPro-Bold',
    fontSize: 24,
    color: Colors.white,
    marginBottom: 6,
  },
  cardDesc: {
    ...Typography.bodySm,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 16,
  },
  contextRow: {
    flexDirection: 'row',
    gap: 16,
  },
  contextItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
  },
  contextIcon: {
    marginRight: 6,
  },
  contextText: {
    fontSize: 11,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.white,
  },
  stamp: {
    position: 'absolute',
    top: 40,
    zIndex: 99,
    borderWidth: 4,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
    transform: [{ rotate: '-10deg' }],
  },
  likeStamp: {
    right: 40,
    borderColor: '#4CAF50',
    transform: [{ rotate: '15deg' }],
  },
  nopeStamp: {
    left: 40,
    borderColor: Colors.error,
    transform: [{ rotate: '-15deg' }],
  },
  stampTextLike: {
    fontSize: 28,
    fontFamily: 'Manrope-Bold',
    color: '#4CAF50',
    letterSpacing: 1,
  },
  stampTextNope: {
    fontSize: 28,
    fontFamily: 'Manrope-Bold',
    color: Colors.error,
    letterSpacing: 1,
  },
  emptyStack: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(253, 138, 62, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    ...Typography.titleMd,
    color: Colors.onBackground,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyDesc: {
    ...Typography.bodySm,
    color: Colors.outline,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
  },
  refreshButtonText: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-Bold',
    color: Colors.onPrimary,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingBottom: 36,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
  },
  closeBtn: {
    width: 54,
    height: 54,
  },
  favoriteBtn: {
    width: 54,
    height: 54,
  },
  infoBtn: {
    backgroundColor: Colors.surfaceContainer,
  },
  btnPressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.9,
  },
});
