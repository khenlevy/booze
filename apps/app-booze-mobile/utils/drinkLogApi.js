/**
 * Drink Log API Client
 * Handles all API calls related to drink logging and history
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

/**
 * Retry logic with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise} - Result of the function
 */
export const retryWithBackoff = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  throw lastError;
};

/**
 * Create a new drink log entry
 * @param {Object} drinkLogData - The drink log data to submit
 * @returns {Promise<Object>} - The created drink log
 */
export const createDrinkLog = async (drinkLogData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/drink-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(drinkLogData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create drink log');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating drink log:', error);
    throw error;
  }
};

/**
 * Get user's drink logs with optional filtering and pagination
 * @param {string} userId - The user ID
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of results to return (1-500)
 * @param {number} options.skip - Number of results to skip
 * @param {string} options.sortBy - Field to sort by (consumedAt, rating, drinkName, createdAt)
 * @param {string} options.sortOrder - Sort order (asc, desc)
 * @param {string} options.startDate - Start date for filtering (ISO 8601)
 * @param {string} options.endDate - End date for filtering (ISO 8601)
 * @param {number} options.minRating - Minimum rating (1-5)
 * @param {number} options.maxRating - Maximum rating (1-5)
 * @returns {Promise<Object>} - Drink logs and pagination info
 */
export const getDrinkLogs = async (userId, options = {}) => {
  try {
    const {
      limit = 50,
      skip = 0,
      sortBy = 'consumedAt',
      sortOrder = 'desc',
      startDate,
      endDate,
      minRating,
      maxRating,
    } = options;

    const params = new URLSearchParams({
      userId,
      limit: Math.min(Math.max(limit, 1), 500),
      skip: Math.max(skip, 0),
      sortBy,
      sortOrder,
    });

    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (minRating !== undefined) params.append('minRating', minRating);
    if (maxRating !== undefined) params.append('maxRating', maxRating);

    const response = await fetch(`${API_BASE_URL}/drink-logs?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch drink logs');
    }

    const data = await response.json();
    return {
      data: data.data || [],
      pagination: data.pagination || { total: 0, limit, skip, hasMore: false },
    };
  } catch (error) {
    console.error('Error fetching drink logs:', error);
    throw error;
  }
};

/**
 * Get a single drink log by ID
 * @param {string} userId - The user ID
 * @param {string} drinkLogId - The drink log ID
 * @returns {Promise<Object>} - The drink log
 */
export const getDrinkLog = async (userId, drinkLogId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/drink-logs/${drinkLogId}?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch drink log');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching drink log:', error);
    throw error;
  }
};

/**
 * Update a drink log entry
 * @param {string} userId - The user ID
 * @param {string} drinkLogId - The drink log ID
 * @param {Object} updates - The fields to update
 * @returns {Promise<Object>} - The updated drink log
 */
export const updateDrinkLog = async (userId, drinkLogId, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/drink-logs/${drinkLogId}?userId=${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update drink log');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating drink log:', error);
    throw error;
  }
};

/**
 * Delete (archive) a drink log entry
 * @param {string} userId - The user ID
 * @param {string} drinkLogId - The drink log ID
 * @returns {Promise<Object>} - The archived drink log
 */
export const deleteDrinkLog = async (userId, drinkLogId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/drink-logs/${drinkLogId}?userId=${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete drink log');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error deleting drink log:', error);
    throw error;
  }
};

/**
 * Restore an archived drink log entry
 * @param {string} userId - The user ID
 * @param {string} drinkLogId - The drink log ID
 * @returns {Promise<Object>} - The restored drink log
 */
export const restoreDrinkLog = async (userId, drinkLogId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/drink-logs/${drinkLogId}/restore?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to restore drink log');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error restoring drink log:', error);
    throw error;
  }
};

/**
 * Get drink log statistics
 * @param {string} userId - The user ID
 * @param {Object} options - Query options
 * @param {string} options.startDate - Start date for filtering (ISO 8601)
 * @param {string} options.endDate - End date for filtering (ISO 8601)
 * @returns {Promise<Object>} - Statistics data
 */
export const getDrinkLogStats = async (userId, options = {}) => {
  try {
    const { startDate, endDate } = options;

    const params = new URLSearchParams({ userId });
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await fetch(`${API_BASE_URL}/drink-logs/stats/summary?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch statistics');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

/**
 * Get average rating for user's drinks
 * @param {string} userId - The user ID
 * @returns {Promise<number>} - Average rating
 */
export const getAverageRating = async (userId) => {
  try {
    const stats = await getDrinkLogStats(userId);
    const summary = stats?.summary;
    return summary?.averageRating ?? 0;
  } catch (error) {
    console.error('Error getting average rating:', error);
    return 0;
  }
};

/**
 * Get top-rated drinks
 * @param {string} userId - The user ID
 * @param {number} limit - Number of drinks to return
 * @returns {Promise<Array>} - Top-rated drinks
 */
export const getTopRatedDrinks = async (userId, limit = 10) => {
  try {
    const stats = await getDrinkLogStats(userId);
    const topDrinks = stats?.topDrinks || [];
    return topDrinks.slice(0, limit);
  } catch (error) {
    console.error('Error getting top-rated drinks:', error);
    return [];
  }
};
