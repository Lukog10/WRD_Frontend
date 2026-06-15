import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { apiService } from '../services/api';
import { builderItems as initialBuilderItems, builderFilters as initialBuilderFilters } from '../../constants/data';

const { width, height } = Dimensions.get('window');

export default function OutfitBuilderScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [items, setItems] = useState(initialBuilderItems);
  const [filters, setFilters] = useState(initialBuilderFilters);
  const [canvasItems, setCanvasItems] = useState<typeof initialBuilderItems>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      const [i, f] = await Promise.all([
        apiService.getBuilderItems(),
        apiService.getBuilderFilters(),
      ]);
      if (active) {
        setItems(i);
        setFilters(f);
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, []);

  const filterCategory = (filter: string) => {
    switch (filter) {
      case 'TOP': return 'indian'; // Kurta / Shirt
      case 'BOTTOM': return 'western'; // Chinos / Denim
      case 'ETHNIC': return 'indian';
      case 'ACCESSORIES': return 'accessories';
      default: return 'all';
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'TOP') return item.category === 'indian' && !item.name.toLowerCase().includes('peshawari') && !item.name.toLowerCase().includes('stole');
    if (selectedFilter === 'BOTTOM') return item.category === 'western';
    if (selectedFilter === 'ETHNIC') return item.category === 'indian' || item.name.toLowerCase().includes('peshawari');
    if (selectedFilter === 'ACCESSORIES') return item.category === 'accessories' || item.category === 'footwear';
    return true;
  });

  const addToCanvas = (item: typeof initialBuilderItems[0]) => {
    if (canvasItems.some((c) => c.id === item.id)) {
      Alert.alert('Item already on canvas');
      return;
    }
    setCanvasItems((prev) => [...prev, item]);
  };

  const removeFromCanvas = (id: string) => {
    setCanvasItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    if (canvasItems.length === 0) {
      Alert.alert('Add items to canvas first');
      return;
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setCanvasItems([]);
      router.back();
    }, 1800);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="close" size={24} color={Colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Outfit Builder</Text>
        <Pressable
          style={[styles.saveButton, canvasItems.length === 0 && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={canvasItems.length === 0}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>

      {/* Canvas Area */}
      <View style={styles.canvasContainer}>
        {canvasItems.length === 0 ? (
          <View style={styles.canvasPlaceholder}>
            <MaterialIcons name="grid-on" size={48} color={Colors.outlineVariant} />
            <Text style={styles.placeholderTitle}>Tap items below to add to canvas</Text>
            <Text style={styles.placeholderDesc}>
              Mix traditional Indian styles with contemporary Western basics.
            </Text>
          </View>
        ) : (
          <View style={styles.canvasGrid}>
            {canvasItems.map((item) => (
              <View key={item.id} style={styles.canvasItemCard}>
                <Image source={{ uri: item.image }} style={styles.canvasItemImage} resizeMode="contain" />
                <Text style={styles.canvasItemName} numberOfLines={1}>{item.name}</Text>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => removeFromCanvas(item.id)}
                >
                  <MaterialIcons name="cancel" size={20} color={Colors.primary} />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Selector Container */}
      <View style={styles.selectorContainer}>
        {/* Category Header */}
        <View style={styles.selectorHeader}>
          <Text style={styles.selectorTitle}>Select items</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {filters.map((filter) => {
              const isSelected = selectedFilter === filter;
              return (
                <Pressable
                  key={filter}
                  style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Closet Grid */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.closetGridContent}
        >
          <View style={styles.closetGrid}>
            {filteredItems.map((item) => {
              const isOnCanvas = canvasItems.some((c) => c.id === item.id);
              return (
                <Pressable
                  key={item.id}
                  style={[styles.closetCard, isOnCanvas && styles.closetCardActive]}
                  onPress={() => addToCanvas(item)}
                >
                  <View style={styles.closetImageContainer}>
                    <Image source={{ uri: item.image }} style={styles.closetImage} resizeMode="contain" />
                    {isOnCanvas && (
                      <View style={styles.checkOverlay}>
                        <MaterialIcons name="check-circle" size={24} color={Colors.secondaryContainer} />
                      </View>
                    )}
                  </View>
                  <Text style={styles.closetItemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.closetItemMeta}>{item.fabric} • {item.occasion}</Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Success Modal Overlay */}
      {isSaved && (
        <View style={styles.successOverlay}>
          <View style={styles.successBox}>
            <MaterialIcons name="check-circle" size={60} color={Colors.secondaryContainer} />
            <Text style={styles.successTitle}>Outfit Saved</Text>
            <Text style={styles.successDesc}>Added to your wardrobe outfits list.</Text>
          </View>
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
    borderBottomWidth: 1,
    borderColor: 'rgba(218,194,182,0.1)',
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
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
  },
  saveButtonDisabled: {
    backgroundColor: Colors.surfaceVariant,
  },
  saveButtonText: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-Bold',
    color: Colors.onPrimary,
  },
  canvasContainer: {
    height: height * 0.35,
    margin: Spacing.containerPadding,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius['3xl'],
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  canvasPlaceholder: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  placeholderTitle: {
    ...Typography.bodySm,
    fontFamily: 'Manrope-Bold',
    color: Colors.onSurface,
    textAlign: 'center',
    marginTop: 12,
  },
  placeholderDesc: {
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    color: Colors.outline,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  canvasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    padding: 16,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasItemCard: {
    width: (width - Spacing.containerPadding * 2 - 60) / 2,
    height: 120,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
  },
  canvasItemImage: {
    width: '100%',
    height: '75%',
  },
  canvasItemName: {
    fontSize: 11,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.onBackground,
    marginTop: 4,
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  selectorContainer: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderTopLeftRadius: BorderRadius['3xl'],
    borderTopRightRadius: BorderRadius['3xl'],
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.2)',
  },
  selectorHeader: {
    padding: Spacing.containerPadding,
    borderBottomWidth: 1,
    borderColor: 'rgba(218,194,182,0.1)',
  },
  selectorTitle: {
    ...Typography.bodyLg,
    fontFamily: 'Manrope-Bold',
    color: Colors.onBackground,
    marginBottom: 12,
  },
  filterScroll: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.1)',
    marginRight: 6,
  },
  filterChipSelected: {
    backgroundColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontFamily: 'Manrope-Bold',
    color: Colors.onSurfaceVariant,
  },
  filterChipTextSelected: {
    color: Colors.onPrimary,
  },
  closetGridContent: {
    padding: Spacing.containerPadding,
  },
  closetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.gutter,
    justifyContent: 'space-between',
  },
  closetCard: {
    width: (width - Spacing.containerPadding * 2 - Spacing.gutter) / 2,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius['2xl'],
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(218,194,182,0.1)',
    marginBottom: 4,
  },
  closetCardActive: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  closetImageContainer: {
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  closetImage: {
    width: '100%',
    height: '100%',
  },
  checkOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  closetItemName: {
    fontSize: 12,
    fontFamily: 'Manrope-SemiBold',
    color: Colors.onBackground,
    marginBottom: 2,
  },
  closetItemMeta: {
    fontSize: 10,
    fontFamily: 'Manrope-Regular',
    color: Colors.outline,
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(50, 18, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  successBox: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius['3xl'],
    padding: 32,
    alignItems: 'center',
    width: width * 0.8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  successTitle: {
    ...Typography.titleMd,
    fontFamily: 'BeVietnamPro-Bold',
    color: Colors.onBackground,
    marginTop: 16,
    marginBottom: 4,
  },
  successDesc: {
    ...Typography.bodySm,
    color: Colors.outline,
    textAlign: 'center',
  },
});
