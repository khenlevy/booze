import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography } from '@/constants/parcus-theme';
import DrinkHistoryList from '@/components/DrinkHistoryList';
import { useAuth } from '@/contexts/AuthContext';

function mapSort(sortOption) {
  switch (sortOption) {
    case 'newest':
      return { sortBy: 'consumedAt', sortOrder: 'desc' };
    case 'oldest':
      return { sortBy: 'consumedAt', sortOrder: 'asc' };
    case 'highest-rated':
      return { sortBy: 'rating', sortOrder: 'desc' };
    case 'lowest-rated':
      return { sortBy: 'rating', sortOrder: 'asc' };
    default:
      return { sortBy: 'consumedAt', sortOrder: 'desc' };
  }
}

export default function DrinkHistoryScreen() {
  const router = useRouter();
  const { userId } = useAuth();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState('newest');
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const [appliedSort, setAppliedSort] = useState('newest');
  const [appliedRating, setAppliedRating] = useState(null);
  const [appliedDateRange, setAppliedDateRange] = useState(null);

  const { sortBy, sortOrder } = useMemo(
    () => mapSort(appliedSort),
    [appliedSort],
  );

  const listFilters = useMemo(() => {
    const f = {};
    if (appliedRating != null) {
      f.minRating = appliedRating;
    }
    if (appliedDateRange != null) {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - appliedDateRange);
      f.startDate = start.toISOString();
      f.endDate = end.toISOString();
    }
    return f;
  }, [appliedRating, appliedDateRange]);

  const sortOptions = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
    { label: 'Highest Rated', value: 'highest-rated' },
    { label: 'Lowest Rated', value: 'lowest-rated' },
  ];

  const ratingFilters = [
    { label: '4+ Stars', value: 4 },
    { label: '3+ Stars', value: 3 },
    { label: '2+ Stars', value: 2 },
    { label: '1+ Stars', value: 1 },
  ];

  const dateRangeFilters = [
    { label: 'Last 7 Days', value: 7 },
    { label: 'Last 30 Days', value: 30 },
    { label: 'Last 3 Months', value: 90 },
    { label: 'All Time', value: null },
  ];

  const handleApplyFilters = () => {
    setAppliedSort(sortOption);
    setAppliedRating(selectedRating);
    setAppliedDateRange(selectedDateRange);
    setFilterModalVisible(false);
  };

  const handleResetFilters = () => {
    setSortOption('newest');
    setSelectedRating(null);
    setSelectedDateRange(null);
    setAppliedSort('newest');
    setAppliedRating(null);
    setAppliedDateRange(null);
    setFilterModalVisible(false);
  };

  const openModal = () => {
    setSortOption(appliedSort);
    setSelectedRating(appliedRating);
    setSelectedDateRange(appliedDateRange);
    setFilterModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Go back"
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Drink History</Text>
        <TouchableOpacity onPress={openModal} style={styles.filterBtn}>
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color={colors.text.inverse}
          />
        </TouchableOpacity>
      </View>

      <DrinkHistoryList
        userId={userId}
        sortBy={sortBy}
        sortOrder={sortOrder}
        filters={listFilters}
      />

      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionLabel}>Sort By</Text>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setSortOption(option.value)}
                  style={[
                    styles.optionRow,
                    sortOption === option.value && styles.optionRowActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      sortOption === option.value && styles.optionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}

              <Text style={[styles.sectionLabel, styles.sectionSpacer]}>
                Minimum Rating
              </Text>
              {ratingFilters.map((filter) => (
                <TouchableOpacity
                  key={filter.value}
                  onPress={() =>
                    setSelectedRating(
                      selectedRating === filter.value ? null : filter.value,
                    )
                  }
                  style={[
                    styles.optionRow,
                    selectedRating === filter.value && styles.optionRowActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedRating === filter.value &&
                        styles.optionTextActive,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}

              <Text style={[styles.sectionLabel, styles.sectionSpacer]}>
                Date Range
              </Text>
              {dateRangeFilters.map((filter) => (
                <TouchableOpacity
                  key={filter.value ?? 'all'}
                  onPress={() =>
                    setSelectedDateRange(
                      selectedDateRange === filter.value ? null : filter.value,
                    )
                  }
                  style={[
                    styles.optionRow,
                    selectedDateRange === filter.value &&
                      styles.optionRowActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedDateRange === filter.value &&
                        styles.optionTextActive,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}

              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={handleResetFilters}
                  style={styles.resetBtn}
                >
                  <Text style={styles.resetBtnText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleApplyFilters}
                  style={styles.applyBtn}
                >
                  <Text style={styles.applyBtnText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    padding: 8,
    width: 44,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  filterBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.brand.primary,
    width: 44,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    maxHeight: '80%',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionSpacer: {
    marginTop: 20,
  },
  optionRow: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  optionRowActive: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  optionText: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '500',
  },
  optionTextActive: {
    color: colors.text.inverse,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 20,
  },
  resetBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  resetBtnText: {
    textAlign: 'center',
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '600',
  },
  applyBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.brand.primary,
  },
  applyBtnText: {
    textAlign: 'center',
    ...typography.body1,
    color: colors.text.inverse,
    fontWeight: '600',
  },
});
