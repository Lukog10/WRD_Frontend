import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../../constants/theme';
import { apiService } from '../../services/api';
import {
  closetItems as initialClosetItems,
  closetFilters as initialClosetFilters,
  recommendationWidget as initialRecWidget,
  userProfile as initialProfile,
} from '../../../constants/data';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - Spacing.containerPadding * 2 - Spacing.gutter) / 2;

export default function ClosetScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['1', '3']); // initial pre-liked items

  const [items, setItems] = useState(initialClosetItems);
  const [filters, setFilters] = useState(initialClosetFilters);
  const [widget, setWidget] = useState(initialRecWidget);
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      const [i, f, w, p] = await Promise.all([
        apiService.getClosetItems(),
        apiService.getClosetFilters(),
        apiService.getRecommendationWidget(),
        apiService.getUserProfile(),
      ]);
      if (active) {
        setItems(i);
        setFilters(f);
        setWidget(w);
        setProfile(p);
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCategoryKey = (filterName: string) => {
    switch (filterName) {
      case 'Indian Wear': return 'indian';
      case 'Western Wear': return 'western';
      case 'Footwear': return 'footwear';
      case 'Accessories': return 'accessories';
      default: return 'all';
    }
  };

  const filteredItems = items.filter((item) => {
    const categoryMatch =
      selectedFilter === 'All' || item.category === getCategoryKey(selectedFilter);
    const searchMatch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.occasion.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.push('/profile')}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          </Pressable>
          <View>
            <Text style={styles.titleText}>Digital Closet</Text>
            <Text style={styles.subtitleText}>{items.length} Items Total</Text>
          </View>
        </View>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push('/outfit-builder')}
        >
          <MaterialIcons name="add" size={24} color={Colors.onPrimary} />
        </Pressable>
      </View>

      {/* Main Content ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={22} color={Colors.outline} />
          <TextInput
            placeholder="Search fabrics, occasions, styles..."
            placeholderTextColor={Colors.outline}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={20} color={Colors.outline} />
            </Pressable>
          )}
        </View>

        {/* Filter Chips Horizontally */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <Pressable
                key={filter}
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipSelected,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextSelected,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Grid of closet items */}
        {filteredItems.length > 0 ? (
          <View style={styles.gridContainer}>
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <View key={item.id} style={styles.card}>
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
                    <Pressable
                      style={styles.favoriteButton}
                      onPress={() => toggleFavorite(item.id)}
                    >
                      <MaterialIcons
                        name={isFav ? 'favorite' : 'favorite-border'}
                        size={20}
                        color={isFav ? Colors.error : Colors.primary}
                      />
                    </Pressable>
                  </View>
                  <View style={styles.cardDetails}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.itemMeta}>{item.fabric}</Text>
                      <View style={styles.metaDot} />
                      <Text style={styles.itemMeta}>{item.occasion}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="checkroom" size={60} color={Colors.outlineVariant} />
            <Text style={styles.emptyText}>No items match your search or filter.</Text>
          </View>
        )}

        {/* Missing Something Widget */}
        <View style={styles.recommendationCard}>
          <View style={styles.recTextSection}>
            <Text style={styles.recTitle}>{widget.title}</Text>
            <Text style={styles.recDesc}>
              {widget.description}{' '}
              <Text style={styles.recHighlight}>{widget.highlightText}</Text>{' '}
              {widget.suffix}
            </Text>
            <Pressable style={styles.recButton}>
              <Text style={styles.recButtonText}>Shop Match</Text>
              <MaterialIcons name="arrow-forward" size={16} color={Colors.onTertiary} />
            </Pressable>
          </View>
          <Image source={{ uri: widget.image }} style={styles.recImage} resizeMode="contain" />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.3)',
    marginBottom: Spacing.stackSm,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: Colors.onBackground,
    ...Typography.bodySm,
  },
  filterScroll: {
    marginBottom: Spacing.stackMd,
  },
  filterContent: {
    gap: 8,
    paddingRight: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.3)',
  },
  filterChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.onSurfaceVariant,
  },
  filterChipTextSelected: {
    color: Colors.onPrimary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.gutter,
    justifyContent: 'space-between',
    marginBottom: Spacing.stackMd,
  },
  card: {
    width: COLUMN_WIDTH,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageWrapper: {
    width: '100%',
    height: COLUMN_WIDTH * 1.2,
    backgroundColor: Colors.white,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDetails: {
    padding: 12,
  },
  itemName: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.onBackground,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemMeta: {
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    color: Colors.onSurfaceVariant,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.outlineVariant,
    marginHorizontal: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    ...Typography.bodySm,
    color: Colors.outline,
    textAlign: 'center',
  },
  recommendationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.onTertiaryContainer,
    borderRadius: BorderRadius['3xl'],
    padding: Spacing.stackMd,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,72,79,0.1)',
  },
  recTextSection: {
    flex: 1,
    paddingRight: 12,
  },
  recTitle: {
    ...Typography.labelCaps,
    color: Colors.tertiary,
    marginBottom: 6,
  },
  recDesc: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 12,
  },
  recHighlight: {
    fontFamily: 'Manrope-Bold',
    color: Colors.tertiary,
  },
  recButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tertiary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    gap: 6,
  },
  recButtonText: {
    fontSize: 12,
    fontFamily: 'Manrope-Bold',
    color: Colors.onTertiary,
  },
  recImage: {
    width: 80,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
  },
});
