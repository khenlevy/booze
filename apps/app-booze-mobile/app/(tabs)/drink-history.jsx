import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { parcusTheme } from '../constants/parcus-theme';
import { DrinkHistoryList } from '../components/DrinkHistoryList';

export default function DrinkHistoryScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const drinkHistoryListRef = useRef(null);

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

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    if (drinkHistoryListRef.current) {
      drinkHistoryListRef.current.refresh().finally(() => {
        setRefreshing(false);
      });
    }
  }, []);

  const handleApplyFilters = () => {
    if (drinkHistoryListRef.current) {
      drinkHistoryListRef.current.applyFilters({
        sortBy,
        minRating: selectedRating,
        daysBack: selectedDateRange,
      });
    }
    setFilterModalVisible(false);
  };

  const handleResetFilters = () => {
    setSortBy('newest');
    setSelectedRating(null);
    setSelectedDateRange(null);
    if (drinkHistoryListRef.current) {
      drinkHistoryListRef.current.applyFilters({
        sortBy: 'newest',
        minRating: null,
        daysBack: null,
      });
    }
    setFilterModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: parcusTheme.colors.background }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: parcusTheme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: parcusTheme.colors.border.light,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: parcusTheme.colors.text.primary,
          }}
        >
          Drink History
        </Text>
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: parcusTheme.colors.primary,
          }}
        >
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color={parcusTheme.colors.text.inverse}
          />
        </TouchableOpacity>
      </View>

      {/* Drink History List */}
      <DrinkHistoryList
        ref={drinkHistoryListRef}
        sortBy={sortBy}
        minRating={selectedRating}
        daysBack={selectedDateRange}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={parcusTheme.colors.primary}
          />
        }
      />

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: parcusTheme.colors.surface,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 20,
              maxHeight: '80%',
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Sort Section */}
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: parcusTheme.colors.text.primary,
                  marginBottom: 12,
                  marginTop: 8,
                }}
              >
                Sort By
              </Text>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setSortBy(option.value)}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    marginBottom: 8,
                    borderRadius: 8,
                    backgroundColor:
                      sortBy === option.value
                        ? parcusTheme.colors.primary
                        : parcusTheme.colors.background,
                    borderWidth: 1,
                    borderColor:
                      sortBy === option.value
                        ? parcusTheme.colors.primary
                        : parcusTheme.colors.border.default,
                  }}
                >
                  <Text
                    style={{
                      color:
                        sortBy === option.value
                          ? parcusTheme.colors.text.inverse
                          : parcusTheme.colors.text.primary,
                      fontWeight: '500',
                    }}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Rating Filter Section */}
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: parcusTheme.colors.text.primary,
                  marginBottom: 12,
                  marginTop: 20,
                }}
              >
                Minimum Rating
              </Text>
              {ratingFilters.map((filter) => (
                <TouchableOpacity
                  key={filter.value}
                  onPress={() =>
                    setSelectedRating(
                      selectedRating === filter.value ? null : filter.value
                    )
                  }
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    marginBottom: 8,
                    borderRadius: 8,
                    backgroundColor:
                      selectedRating === filter.value
                        ? parcusTheme.colors.primary
                        : parcusTheme.colors.background,
                    borderWidth: 1,
                    borderColor:
                      selectedRating === filter.value
                        ? parcusTheme.colors.primary
                        : parcusTheme.colors.border.default,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedRating === filter.value
                          ? parcusTheme.colors.text.inverse
                          : parcusTheme.colors.text.primary,
                      fontWeight: '500',
                    }}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Date Range Filter Section */}
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: parcusTheme.colors.text.primary,
                  marginBottom: 12,
                  marginTop: 20,
                }}
              >
                Date Range
              </Text>
              {dateRangeFilters.map((filter) => (
                <TouchableOpacity
                  key={filter.value || 'all-time'}
                  onPress={() =>
                    setSelectedDateRange(
                      selectedDateRange === filter.value ? null : filter.value
                    )
                  }
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    marginBottom: 8,
                    borderRadius: 8,
                    backgroundColor:
                      selectedDateRange === filter.value
                        ? parcusTheme.colors.primary
                        : parcusTheme.colors.background,
                    borderWidth: 1,
                    borderColor:
                      selectedDateRange === filter.value
                        ? parcusTheme.colors.primary
                        : parcusTheme.colors.border.default,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedDateRange === filter.value
                          ? parcusTheme.colors.text.inverse
                          : parcusTheme.colors.text.primary,
                      fontWeight: '500',
                    }}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Action Buttons */}
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  marginTop: 24,
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  onPress={handleResetFilters}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 8,
                    backgroundColor: parcusTheme.colors.background,
                    borderWidth: 1,
                    borderColor: parcusTheme.colors.border.default,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: parcusTheme.colors.text.primary,
                      fontWeight: '600',
                    }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleApplyFilters}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 8,
                    backgroundColor: parcusTheme.colors.primary,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: parcusTheme.colors.text.inverse,
                      fontWeight: '600',
                    }}
                  >
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
