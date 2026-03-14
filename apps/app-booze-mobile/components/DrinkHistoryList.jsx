import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors, typography } from '@/constants/parcus-theme';
import DrinkHistoryListItem from './DrinkHistoryListItem';
import {
  getDrinkLogs,
  deleteDrinkLog,
} from '@/utils/drinkLogApi';

/**
 * DrinkHistoryList Component
 * Container component for managing drink history list state and data fetching
 */
const DrinkHistoryList = ({
  userId,
  onEditDrink,
  onDrinkPress,
  filters = {},
  sortBy = 'consumedAt',
  sortOrder = 'desc',
}) => {
  const [drinkLogs, setDrinkLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 50,
    skip: 0,
    hasMore: false,
  });
  const [loadingMore, setLoadingMore] = useState(false);

  /**
   * Fetch drink logs from API
   */
  const fetchDrinkLogs = useCallback(
    async (skip = 0, isRefresh = false) => {
      try {
        if (!isRefresh) {
          setLoading(true);
        }
        setError(null);

        const options = {
          limit: 50,
          skip,
          sortBy,
          sortOrder,
          ...filters,
        };

        const response = await getDrinkLogs(userId, options);

        if (isRefresh) {
          setDrinkLogs(response.data);
        } else if (skip === 0) {
          setDrinkLogs(response.data);
        } else {
          setDrinkLogs(prev => [...prev, ...response.data]);
        }

        setPagination(response.pagination);
      } catch (err) {
        console.error('Error fetching drink logs:', err);
        setError(err.message || 'Failed to load drink history');
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [userId, sortBy, sortOrder, filters]
  );

  /**
   * Initial load
   */
  useEffect(() => {
    fetchDrinkLogs(0, false);
  }, [fetchDrinkLogs]);

  /**
   * Handle pull-to-refresh
   */
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDrinkLogs(0, true);
  }, [fetchDrinkLogs]);

  /**
   * Handle load more (pagination)
   */
  const handleLoadMore = useCallback(() => {
    if (pagination.hasMore && !loadingMore && !loading) {
      setLoadingMore(true);
      fetchDrinkLogs(pagination.skip + pagination.limit, false);
    }
  }, [pagination, loadingMore, loading, fetchDrinkLogs]);

  /**
   * Handle delete drink log
   */
  const handleDeleteDrink = useCallback(
    async (drinkLogId) => {
      try {
        await deleteDrinkLog(userId, drinkLogId);
        setDrinkLogs(prev => prev.filter(log => log._id !== drinkLogId));
        setPagination(prev => ({
          ...prev,
          total: Math.max(0, prev.total - 1),
        }));
      } catch (err) {
        console.error('Error deleting drink log:', err);
        throw err;
      }
    },
    [userId]
  );

  /**
   * Handle edit drink log
   */
  const handleEditDrink = useCallback(
    (drinkLog) => {
      if (onEditDrink) {
        onEditDrink(drinkLog);
      }
    },
    [onEditDrink]
  );

  /**
   * Handle drink item press
   */
  const handleDrinkPress = useCallback(
    (drinkLog) => {
      if (onDrinkPress) {
        onDrinkPress(drinkLog);
      }
    },
    [onDrinkPress]
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Drinks Logged Yet</Text>
      <Text style={styles.emptyText}>
        Start tracking your drinks to see your history here
      </Text>
    </View>
  );

  /**
   * Render error state
   */
  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => fetchDrinkLogs(0, false)}
      >
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Render loading state
   */
  if (loading && drinkLogs.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.brand.primary} />
        <Text style={styles.loadingText}>Loading your drink history...</Text>
      </View>
    );
  }

  /**
   * Render error state
   */
  if (error && drinkLogs.length === 0) {
    return renderErrorState();
  }

  /**
   * Render list
   */
  return (
    <FlatList
      data={drinkLogs}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <DrinkHistoryListItem
          drinkLog={item}
          onEdit={handleEditDrink}
          onDelete={handleDeleteDrink}
          onPress={() => handleDrinkPress(item)}
        />
      )}
      ListEmptyComponent={renderEmptyState}
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.loadMoreContainer}>
            <ActivityIndicator size="small" color={colors.brand.primary} />
          </View>
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.brand.primary}
        />
      }
      scrollEnabled={true}
      nestedScrollEnabled={true}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  loadingText: {
    ...typography.body2,
    color: colors.text.secondary,
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  errorTitle: {
    ...typography.h2,
    color: colors.state.error,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: colors.brand.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    ...typography.button,
    color: colors.text.inverse,
  },
  loadMoreContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});

export default DrinkHistoryList;
