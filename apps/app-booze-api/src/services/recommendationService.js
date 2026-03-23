import logger from '@booze/se-logger';
import { DrinkLog } from '@booze/se-db';

/**
 * Recommendation Service
 * Provides drink recommendations based on user preferences and drink ratings
 */

/**
 * Get personalized drink recommendations for a user
 * @param {string} userId - User ID
 * @param {Object} options - Recommendation options
 * @param {number} options.limit - Number of recommendations (default: 10)
 * @param {number} options.minRating - Minimum rating filter (1-5)
 * @param {Array<string>} options.tasteTags - Taste tags to filter by
 * @param {string} options.sortBy - Sort field: 'rating', 'frequency', 'recent' (default: 'rating')
 * @returns {Promise<Array>} - Recommended drinks
 */
export async function getPersonalizedRecommendations(userId, options = {}) {
  try {
    const {
      limit = 10,
      minRating = 3,
      tasteTags = [],
      sortBy = 'rating',
    } = options;

    logger.info(`Getting personalized recommendations for user ${userId}`, {
      limit,
      minRating,
      tasteTags,
      sortBy,
    });

    // Get user's drink history with ratings
    const userDrinkHistory = await DrinkLog.find({
      userId,
      isArchived: false,
      rating: { $gte: minRating },
    })
      .lean()
      .sort({ rating: -1, consumedAt: -1 });

    if (userDrinkHistory.length === 0) {
      logger.info(`No drink history found for user ${userId}`);
      return [];
    }

    // Build recommendations based on user's top-rated drinks
    const recommendations = buildRecommendationsFromHistory(
      userDrinkHistory,
      { limit, tasteTags, sortBy }
    );

    logger.info(`Generated ${recommendations.length} recommendations for user ${userId}`);
    return recommendations;
  } catch (error) {
    logger.error('Error getting personalized recommendations:', error);
    throw error;
  }
}

/**
 * Get recommendations based on top-rated drinks
 * @param {string} userId - User ID
 * @param {Object} options - Options
 * @param {number} options.limit - Number of recommendations
 * @returns {Promise<Array>} - Top-rated drink recommendations
 */
export async function getTopRatedRecommendations(userId, options = {}) {
  try {
    const { limit = 10 } = options;

    logger.info(`Getting top-rated recommendations for user ${userId}`, { limit });

    const topRatedDrinks = await DrinkLog.getTopRatedDrinks(userId, limit);

    const recommendations = topRatedDrinks.map((drink) => ({
      drinkName: drink._id,
      drinkId: drink.drinkId,
      averageRating: parseFloat(drink.averageRating.toFixed(2)),
      timesConsumed: drink.count,
      lastConsumed: drink.lastConsumed,
      recommendationScore: calculateRecommendationScore(drink),
      reason: 'Top-rated drink in your history',
    }));

    return recommendations;
  } catch (error) {
    logger.error('Error getting top-rated recommendations:', error);
    throw error;
  }
}

/**
 * Get recommendations based on taste profile
 * @param {string} userId - User ID
 * @param {Array<string>} tasteTags - Taste tags to match
 * @param {Object} options - Options
 * @param {number} options.limit - Number of recommendations
 * @param {number} options.minRating - Minimum rating threshold
 * @returns {Promise<Array>} - Taste-based recommendations
 */
export async function getTasteBasedRecommendations(userId, tasteTags = [], options = {}) {
  try {
    const { limit = 10, minRating = 3 } = options;

    logger.info(`Getting taste-based recommendations for user ${userId}`, {
      tasteTags,
      limit,
      minRating,
    });

    if (tasteTags.length === 0) {
      logger.warn('No taste tags provided for taste-based recommendations');
      return [];
    }

    const similarDrinks = await DrinkLog.getSimilarHighRatedDrinks(
      userId,
      tasteTags,
      minRating
    );

    const recommendations = similarDrinks.map((drink) => ({
      drinkName: drink.drinkName,
      drinkId: drink.drinkId,
      rating: drink.rating,
      tasteTags: drink.tasteTags,
      consumedAt: drink.consumedAt,
      recommendationScore: calculateDrinkScore(drink),
      reason: `Matches your taste preferences: ${(drink.tasteTags || []).join(', ')}`,
    }));

    return recommendations.slice(0, limit);
  } catch (error) {
    logger.error('Error getting taste-based recommendations:', error);
    throw error;
  }
}

/**
 * Get recommendations with rating-based filtering
 * @param {string} userId - User ID
 * @param {Object} options - Filtering options
 * @param {number} options.minRating - Minimum rating (1-5)
 * @param {number} options.maxRating - Maximum rating (1-5)
 * @param {number} options.limit - Number of recommendations
 * @returns {Promise<Array>} - Filtered recommendations
 */
export async function getRatingFilteredRecommendations(userId, options = {}) {
  try {
    const {
      minRating = 3,
      maxRating = 5,
      limit = 10,
    } = options;

    logger.info(`Getting rating-filtered recommendations for user ${userId}`, {
      minRating,
      maxRating,
      limit,
    });

    const drinks = await DrinkLog.getDrinksByRatingRange(userId, minRating, maxRating);

    const recommendations = drinks.map((drink) => ({
      drinkName: drink.drinkName,
      drinkId: drink.drinkId,
      rating: drink.rating,
      consumedAt: drink.consumedAt,
      quantity: drink.quantity,
      quantityUnit: drink.quantityUnit,
      recommendationScore: calculateDrinkScore(drink),
      reason: `Rated ${drink.rating}/5 stars`,
    }));

    return recommendations.slice(0, limit);
  } catch (error) {
    logger.error('Error getting rating-filtered recommendations:', error);
    throw error;
  }
}

/**
 * Get comprehensive recommendation statistics
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Recommendation statistics
 */
export async function getRecommendationStats(userId) {
  try {
    logger.info(`Getting recommendation stats for user ${userId}`);

    const ratingStats = await DrinkLog.getRatingStats(userId);
    const topRatedDrinks = await DrinkLog.getTopRatedDrinks(userId, 5);

    return {
      ratingStats,
      topRatedDrinks: topRatedDrinks.map((drink) => ({
        drinkName: drink._id,
        averageRating: parseFloat(drink.averageRating.toFixed(2)),
        timesConsumed: drink.count,
      })),
      recommendationReadiness:
        ratingStats && (ratingStats.tasteLogs ?? ratingStats.totalLogs) >= 3,
    };
  } catch (error) {
    logger.error('Error getting recommendation stats:', error);
    throw error;
  }
}

/**
 * Build recommendations from user's drink history
 * @private
 */
function buildRecommendationsFromHistory(drinkHistory, options) {
  const { limit, tasteTags, sortBy } = options;

  // Group drinks by name and calculate aggregate scores
  const drinkMap = new Map();

  drinkHistory.forEach((drink) => {
    const key = drink.drinkName;
    if (!drinkMap.has(key)) {
      drinkMap.set(key, {
        drinkName: drink.drinkName,
        drinkId: drink.drinkId,
        ratings: [],
        tasteTags: drink.tasteTags || [],
        lastConsumed: drink.consumedAt,
        count: 0,
      });
    }

    const entry = drinkMap.get(key);
    entry.ratings.push(drink.rating);
    entry.count += 1;
    entry.lastConsumed = new Date(drink.consumedAt) > new Date(entry.lastConsumed)
      ? drink.consumedAt
      : entry.lastConsumed;
  });

  // Convert to array and calculate scores
  let recommendations = Array.from(drinkMap.values()).map((drink) => {
    const avgRating = drink.ratings.reduce((a, b) => a + b, 0) / drink.ratings.length;
    return {
      drinkName: drink.drinkName,
      drinkId: drink.drinkId,
      averageRating: parseFloat(avgRating.toFixed(2)),
      timesConsumed: drink.count,
      lastConsumed: drink.lastConsumed,
      tasteTags: drink.tasteTags,
      recommendationScore: calculateAggregateScore(avgRating, drink.count),
      reason: `You rated this ${avgRating.toFixed(1)}/5 stars (${drink.count} times)`,
    };
  });

  // Filter by taste tags if provided
  if (tasteTags.length > 0) {
    recommendations = recommendations.filter((rec) =>
      tasteTags.some((tag) => rec.tasteTags.includes(tag))
    );
  }

  // Sort based on sortBy option
  if (sortBy === 'frequency') {
    recommendations.sort((a, b) => b.timesConsumed - a.timesConsumed);
  } else if (sortBy === 'recent') {
    recommendations.sort((a, b) => new Date(b.lastConsumed) - new Date(a.lastConsumed));
  } else {
    // Default: sort by recommendation score
    recommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);
  }

  return recommendations.slice(0, limit);
}

/**
 * Calculate recommendation score for a drink
 * @private
 */
function calculateDrinkScore(drink) {
  // Score based on rating (0-5 scale)
  const ratingScore = (drink.rating / 5) * 100;
  return parseFloat(ratingScore.toFixed(2));
}

/**
 * Calculate aggregate recommendation score
 * @private
 */
function calculateAggregateScore(averageRating, frequency) {
  // Combine rating and frequency
  // Rating weight: 70%, Frequency weight: 30%
  const ratingScore = (averageRating / 5) * 70;
  const frequencyScore = Math.min(frequency * 3, 30); // Cap frequency at 30 points

  return parseFloat((ratingScore + frequencyScore).toFixed(2));
}

export default {
  getPersonalizedRecommendations,
  getTopRatedRecommendations,
  getTasteBasedRecommendations,
  getRatingFilteredRecommendations,
  getRecommendationStats,
};
