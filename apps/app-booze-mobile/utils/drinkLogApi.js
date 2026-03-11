/**
 * Drink Log API Client
 * Handles all API calls related to drink logging
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

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
 * Get user's drink logs
 * @param {string} userId - The user ID
 * @param {Object} options - Query options (startDate, endDate, limit, skip, sortBy)
 * @returns {Promise<Object>} - The drink logs and pagination info
 */
export const getDrinkLogs = async (userId, options = {}) => {
  try {
    const queryParams = new URLSearchParams({
      userId,
      ...options,
    });

    const response = await fetch(`${API_BASE_URL}/drink-logs?${queryParams}`, {
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
    return data;
  } catch (error) {
    console.error('Error fetching drink logs:', error);
    throw error;
  }
};

/**
 * Get a specific drink log by ID
 * @param {string} drinkLogId - The drink log ID
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} - The drink log
 */
export const getDrinkLogById = async (drinkLogId, userId) => {
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
 * @param {string} drinkLogId - The drink log ID
 * @param {Object} updateData - The data to update
 * @returns {Promise<Object>} - The updated drink log
 */
export const updateDrinkLog = async (drinkLogId, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/drink-logs/${drinkLogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
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
 * Delete a drink log entry (soft delete)
 * @param {string} drinkLogId - The drink log ID
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} - The deleted drink log
 */
export const deleteDrinkLog = async (drinkLogId, userId) => {
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
 * Get user's average drink rating
 * @param {string} userId - The user ID
 * @returns {Promise<number>} - The average rating
 */
export const getAverageRating = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/drink-logs/stats/average-rating?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch average rating');
    }

    const data = await response.json();
    return data.data.averageRating;
  } catch (error) {
    console.error('Error fetching average rating:', error);
    throw error;
  }
};

/**
 * Get user's top-rated drinks
 * @param {string} userId - The user ID
 * @param {number} limit - Maximum number of drinks to return
 * @returns {Promise<Array>} - Array of top-rated drinks
 */
export const getTopRatedDrinks = async (userId, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/drink-logs/stats/top-rated?userId=${userId}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch top-rated drinks');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching top-rated drinks:', error);
    throw error;
  }
};

/**
 * Retry logic for failed requests
 * @param {Function} fn - The async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in milliseconds
 * @returns {Promise} - The result of the function
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
