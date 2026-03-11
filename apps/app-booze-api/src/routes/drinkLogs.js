import express from 'express';
import logger from '@booze/se-logger';
import { DrinkLog } from '@booze/se-db';

const router = express.Router();

/**
 * POST /api/v1/drink-logs
 * Create a new drink log entry
 */
router.post('/', async (req, res) => {
  try {
    const { userId, drinkId, drinkName, consumedAt, quantity, quantityUnit, rating, notes, abv, tasteTags, location, socialContext, mood, photoUrl } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    if (!drinkName || drinkName.trim() === '') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'drinkName is required',
      });
    }

    if (!consumedAt) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'consumedAt is required',
      });
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'quantity must be a positive number',
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'rating must be between 1 and 5',
      });
    }

    // Create new drink log
    const drinkLog = new DrinkLog({
      userId,
      drinkId: drinkId || null,
      drinkName,
      consumedAt: new Date(consumedAt),
      quantity: parseFloat(quantity),
      quantityUnit: quantityUnit || 'ml',
      rating: parseInt(rating),
      notes: notes || '',
      abv: abv ? parseFloat(abv) : null,
      tasteTags: tasteTags || [],
      location: location || null,
      socialContext: socialContext || null,
      mood: mood || null,
      photoUrl: photoUrl || null,
    });

    await drinkLog.save();

    logger.business(`Drink log created for user ${userId}:`, {
      drinkLogId: drinkLog._id,
      drinkName: drinkLog.drinkName,
      rating: drinkLog.rating,
    });

    res.status(201).json({
      success: true,
      message: 'Drink log created successfully',
      data: drinkLog,
    });
  } catch (error) {
    logger.error('Error creating drink log:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create drink log',
    });
  }
});

/**
 * GET /api/v1/drink-logs
 * Get user's drink logs with optional filtering
 */
router.get('/', async (req, res) => {
  try {
    const { userId, startDate, endDate, limit = 50, skip = 0, sortBy = 'consumedAt' } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    // Build query
    const query = {
      userId,
      isArchived: false,
    };

    // Add date range filter if provided
    if (startDate || endDate) {
      query.consumedAt = {};
      if (startDate) {
        query.consumedAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.consumedAt.$lte = new Date(endDate);
      }
    }

    // Determine sort order
    const sortOrder = sortBy === 'rating' ? -1 : -1; // Default descending by date
    const sortField = sortBy === 'rating' ? 'rating' : 'consumedAt';

    // Execute query
    const drinkLogs = await DrinkLog.find(query)
      .sort({ [sortField]: sortOrder })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .lean();

    // Get total count
    const total = await DrinkLog.countDocuments(query);

    logger.business(`Retrieved ${drinkLogs.length} drink logs for user ${userId}`);

    res.json({
      success: true,
      data: drinkLogs,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: parseInt(skip) + drinkLogs.length < total,
      },
    });
  } catch (error) {
    logger.error('Error fetching drink logs:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch drink logs',
    });
  }
});

/**
 * GET /api/v1/drink-logs/:id
 * Get a specific drink log by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    const drinkLog = await DrinkLog.findOne({
      _id: id,
      userId,
      isArchived: false,
    });

    if (!drinkLog) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Drink log not found',
      });
    }

    res.json({
      success: true,
      data: drinkLog,
    });
  } catch (error) {
    logger.error('Error fetching drink log:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch drink log',
    });
  }
});

/**
 * PUT /api/v1/drink-logs/:id
 * Update a drink log entry
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, drinkName, consumedAt, quantity, quantityUnit, rating, notes, abv, tasteTags, location, socialContext, mood, photoUrl } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'rating must be between 1 and 5',
      });
    }

    // Validate quantity if provided
    if (quantity && quantity <= 0) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'quantity must be a positive number',
      });
    }

    // Build update object
    const updateData = {};
    if (drinkName) updateData.drinkName = drinkName;
    if (consumedAt) updateData.consumedAt = new Date(consumedAt);
    if (quantity) updateData.quantity = parseFloat(quantity);
    if (quantityUnit) updateData.quantityUnit = quantityUnit;
    if (rating) updateData.rating = parseInt(rating);
    if (notes !== undefined) updateData.notes = notes;
    if (abv !== undefined) updateData.abv = abv ? parseFloat(abv) : null;
    if (tasteTags) updateData.tasteTags = tasteTags;
    if (location !== undefined) updateData.location = location;
    if (socialContext !== undefined) updateData.socialContext = socialContext;
    if (mood !== undefined) updateData.mood = mood;
    if (photoUrl !== undefined) updateData.photoUrl = photoUrl;

    const drinkLog = await DrinkLog.findOneAndUpdate(
      { _id: id, userId, isArchived: false },
      updateData,
      { new: true, runValidators: true },
    );

    if (!drinkLog) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Drink log not found',
      });
    }

    logger.business(`Drink log updated: ${id}`, {
      userId,
      drinkName: drinkLog.drinkName,
    });

    res.json({
      success: true,
      message: 'Drink log updated successfully',
      data: drinkLog,
    });
  } catch (error) {
    logger.error('Error updating drink log:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update drink log',
    });
  }
});

/**
 * DELETE /api/v1/drink-logs/:id
 * Soft delete a drink log entry (archive it)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    const drinkLog = await DrinkLog.findOneAndUpdate(
      { _id: id, userId, isArchived: false },
      { isArchived: true },
      { new: true },
    );

    if (!drinkLog) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Drink log not found',
      });
    }

    logger.business(`Drink log archived: ${id}`, { userId });

    res.json({
      success: true,
      message: 'Drink log deleted successfully',
      data: drinkLog,
    });
  } catch (error) {
    logger.error('Error deleting drink log:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete drink log',
    });
  }
});

/**
 * GET /api/v1/drink-logs/stats/average-rating
 * Get user's average drink rating
 */
router.get('/stats/average-rating', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    const averageRating = await DrinkLog.getAverageRating(userId);

    res.json({
      success: true,
      data: {
        userId,
        averageRating: parseFloat(averageRating.toFixed(2)),
      },
    });
  } catch (error) {
    logger.error('Error fetching average rating:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch average rating',
    });
  }
});

/**
 * GET /api/v1/drink-logs/stats/top-rated
 * Get user's top-rated drinks
 */
router.get('/stats/top-rated', async (req, res) => {
  try {
    const { userId, limit = 10 } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required',
      });
    }

    const topRatedDrinks = await DrinkLog.getTopRatedDrinks(userId, parseInt(limit));

    res.json({
      success: true,
      data: topRatedDrinks,
    });
  } catch (error) {
    logger.error('Error fetching top-rated drinks:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch top-rated drinks',
    });
  }
});

export default router;
