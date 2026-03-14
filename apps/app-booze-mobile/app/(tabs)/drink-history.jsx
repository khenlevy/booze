import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import DrinkHistoryList from '@/components/DrinkHistoryList';

/**
 * Drink History Screen
 * Displays user's drink history with filtering and sorting options
 */
export default function DrinkHistoryScreen() {
  const router = useRouter();
  const [userId] = useState('user-123'); // TODO: Get from auth context
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('consumedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    minRating: null,
    maxRating: null,
  });

  /**
   * Handle edit drink
   */
  const handleEditDrink = useCallback((drinkLog) => {
    // Navigate to edit screen or open edit modal
    router.push({
      pathname: '/drink-log',
      params: { drinkLogId: drinkLog._id, mode: 'edit' },
    });
  }, [router]);

  /**
   * Handle drink press
   */
  const handleDrinkPress = useCallback((drinkLog) => {
    // Navigate to detail screen
    router.push({
      pathname: '/drink-detail',
      params: { drinkLogId: drinkLog._id },
    });
  }, [router]);

  /**
   * Toggle filter visibility
   */
  const toggleFilters = useCallback(() => {
    setShowFilters(!showFilters);
  }, [showFilters]);

  /**
   * Reset filters
   */
  const resetFilters = useCallback(() => {
    setFilters({
      startDate: null,
      endDate: null,
      minRating: null,
      maxRating: null,
    });
    setSortBy('consumedAt');
    setSortOrder('desc');
  }, []);

  /**
   * Update filter
   */
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Drink History</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={toggleFilters}
        >
          <Text style={styles.filterButtonText}>⚙️ Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Panel */}
      <Modal
        visible={showFilters}
        transparent
        animationType="slide"
        onRequestClose={toggleFilters}
      >
        <SafeAreaView style={styles.filterModal}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filters & Sorting</Text>
            <TouchableOpacity onPress={toggleFilters}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterContent}>
            {/* Sort By */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              <View style={styles.sortOptions}>
                {[
                  { label: 'Date (Newest)', value: 'consumedAt', order: 'desc' },
                  { label: 'Date (Oldest)', value: 'consumedAt', order: 'asc' },
                  { label: 'Rating (Highest)', value: 'rating', order: 'desc' },
                  { label: 'Rating (Lowest)', value: 'rating', order: 'asc' },
                  { label: 'Name (A-Z)', value: 'drinkName', order: 'asc' },
                ].map(option => (
                  <TouchableOpacity
                    key={`${option.value}-${option.order}`}
                    style={[
                      styles.sortOption,
                      sortBy === option.value && sortOrder === option.order
                        ? styles.sortOptionActive
                        : null,
                    ]}
                    onPress={() => {
                      setSortBy(option.value);
                      setSortOrder(option.order);
                    }}
                  >
                    <Text
                      style={[
                        styles.sortOptionText,
                        sortBy === option.value && sortOrder === option.order
                          ? styles.sortOptionTextActive
                          : null,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Rating Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Rating Range</Text>
              <View style={styles.ratingFilterRow}>
                <View style={styles.ratingFilterItem}>
                  <Text style={styles.ratingFilterLabel}>Min Rating</Text>
                  <View style={styles.ratingButtons}>
                    {[null, 1, 2, 3, 4, 5].map(rating => (
                      <TouchableOpacity
                        key={`min-${rating}`}
                        style={[
                          styles.ratingButton,
                          filters.minRating === rating
                            ? styles.ratingButtonActive
                            : null,
                        ]}
                        onPress={() => updateFilter('minRating', rating)}
                      >
                        <Text
                          style={[
                            styles.ratingButtonText,
                            filters.minRating === rating
                              ? styles.ratingButtonTextActive
                              : null,
                          ]}
                        >
                          {rating === null ? 'Any' : rating}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.ratingFilterItem}>
                  <Text style={styles.ratingFilterLabel}>Max Rating</Text>
                  <View style={styles.ratingButtons}>
                    {[null, 1, 2, 3, 4, 5].map(rating => (
                      <TouchableOpacity
                        key={`max-${rating}`}
                        style={[
                          styles.ratingButton,
                          filters.maxRating === rating
                            ? styles.ratingButtonActive
                            : null,
                        ]}
                        onPress={() => updateFilter('maxRating', rating)}
                      >
                        <Text
                          style={[
                            styles.ratingButtonText,
                            filters.maxRating === rating
                              ? styles.ratingButtonTextActive
                              : null,
                          ]}
                        >
                          {rating === null ? 'Any' : rating}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity
            style={styles.applyButton}
            onPress={toggleFilters}
          >
            <Text style={styles.applyButtonText}>Apply & Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Drink History List */}
      <View style={styles.listContainer}>
        <DrinkHistoryList
          userId={userId}
          onEditDrink={handleEditDrink}
          onDrinkPress={handleDrinkPress}
          filters={filters}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </View>

      {/* Bottom Navigation */}
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.brand.primary,
    borderRadius: 6,
  },
  filterButtonText: {
    ...typography.button,
    fontSize: 14,
    color: colors.text.inverse,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  filterModal: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  filterTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  closeButton: {
    fontSize: 24,
    color: colors.text.secondary,
  },
  filterContent: {
    flex: 1,
    padding: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    ...typography.h2,
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 12,
  },
  sortOptions: {
    gap: 8,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: colors.background.secondary,
  },
  sortOptionActive: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  sortOptionText: {
    ...typography.body2,
    color: colors.text.primary,
  },
  sortOptionTextActive: {
    color: colors.text.inverse,
    fontWeight: '600',
  },
  ratingFilterRow: {
    gap: 16,
  },
  ratingFilterItem: {
    marginBottom: 12,
  },
  ratingFilterLabel: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: 8,
    fontWeight: '600',
  },
  ratingButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  ratingButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: colors.background.secondary,
  },
  ratingButtonActive: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  ratingButtonText: {
    ...typography.body2,
    fontSize: 12,
    color: colors.text.primary,
  },
  ratingButtonTextActive: {
    color: colors.text.inverse,
    fontWeight: '600',
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.state.error,
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  resetButtonText: {
    ...typography.button,
    fontSize: 14,
    color: colors.state.error,
    textAlign: 'center',
  },
  applyButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: colors.brand.primary,
  },
  applyButtonText: {
    ...typography.button,
    color: colors.text.inverse,
    textAlign: 'center',
  },
});
