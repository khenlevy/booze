import express from 'express';
import logger from '@booze/se-logger';
import {
  getPersonalizedRecommendations,
  getTopRatedRecommendations,
  getTasteBasedRecommendations,
  getRatingFilteredRecommendations,
  getRecommendationStats,
} from '../services/recommendationService.js';

const router = express.Router();

/**
 * GET /api/v1/recommendations
 * Get personalized drink recommendations based on user's drink history and ratings
 */
router.get('/', async (req, res) => {
  try {
    const {
      userId,
      limit = 10,
      minRating = 3,
      tasteTags,
      sortBy = 'rating',
    } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    const tasteTagsArray = tasteTags
      ? (Array.isArray(tasteTags) ? tasteTags : [tasteTags])
      : [];

    const recommendations = await getPersonalizedRecommendations(userId, {
      limit: parseInt(limit, 10),
      minRating: parseInt(minRating, 10),
      tasteTags: tasteTagsArray,
      sortBy,
    });

    res.json({
      success: true,
      data: recommendations,
      count: recommendations.length,
    });
  } catch (error) {
    logger.error('Error fetching personalized recommendations:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch recommendations',
    });
  }
});

/**
 * GET /api/v1/recommendations/top-rated
 * Get recommendations based on user's top-rated drinks
 */
router.get('/top-rated', async (req, res) => {
  try {
    const { userId, limit = 10 } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    const recommendations = await getTopRatedRecommendations(userId, {
      limit: parseInt(limit, 10),
    });

    res.json({
      success: true,
      data: recommendations,
      count: recommendations.length,
    });
  } catch (error) {
    logger.error('Error fetching top-rated recommendations:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch top-rated recommendations',
    });
  }
});

/**
 * GET /api/v1/recommendations/by-taste
 * Get recommendations based on taste profile matching
 */
router.get('/by-taste', async (req, res) => {
  try {
    const {
      userId,
      tasteTags,
      limit = 10,
      minRating = 3,
    } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    if (!tasteTags) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'tasteTags is required',
      });
    }

    const tasteTagsArray = Array.isArray(tasteTags) ? tasteTags : [tasteTags];

    const recommendations = await getTasteBasedRecommendations(userId, tasteTagsArray, {
      limit: parseInt(limit, 10),
      minRating: parseInt(minRating, 10),
    });

    res.json({
      success: true,
      data: recommendations,
      count: recommendations.length,
    });
  } catch (error) {
    logger.error('Error fetching taste-based recommendations:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch taste-based recommendations',
    });
  }
});

/**
 * GET /api/v1/recommendations/by-rating
 * Get recommendations filtered by rating range
 */
router.get('/by-rating', async (req, res) => {
  try {
    const {
      userId,
      minRating = 3,
      maxRating = 5,
      limit = 10,
    } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    const min = parseInt(minRating, 10);
    const max = parseInt(maxRating, 10);

    if (min < 1 || min > 5 || max < 1 || max > 5 || min > max) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'minRating and maxRating must be between 1 and 5, and minRating <= maxRating',
      });
    }

    const recommendations = await getRatingFilteredRecommendations(userId, {
      minRating: min,
      maxRating: max,
      limit: parseInt(limit, 10),
    });

    res.json({
      success: true,
      data: recommendations,
      count: recommendations.length,
    });
  } catch (error) {
    logger.error('Error fetching rating-filtered recommendations:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch rating-filtered recommendations',
    });
  }
});

/**
 * GET /api/v1/recommendations/stats
 * Get recommendation statistics for a user
 */
router.get('/stats', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    const stats = await getRecommendationStats(userId);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    logger.error('Error fetching recommendation stats:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch recommendation statistics',
    });
  }
});

export default router;
