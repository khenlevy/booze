import logger from '@booze/se-logger';
import { getModel } from '@booze/se-db';

const DrinkLog = getModel('drink_logs');

/**
 * Create a new drink log entry
 * POST /api/v1/drink-logs
 */
export const createDrinkLog = async (req, res) => {
  try {
    const {
      userId,
      drinkId,
      drinkName,
      consumedAt,
      quantity,
      quantityUnit = 'ml',
      rating,
      notes,
      abv,
      tasteTags,
      location,
      socialContext,
      mood,
      photoUrl,
    } = req.body;

    // Validate required fields
    if (!userId || !drinkName || !consumedAt || !quantity || !rating) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Missing required fields: userId, drinkName, consumedAt, quantity, rating',
      });
    }

    // Validate rating is between 1-5
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Rating must be an integer between 1 and 5',
      });
    }

    // Validate quantity is positive
    if (quantity <= 0) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Quantity must be greater than 0',
      });
    }

    // Validate ABV if provided
    if (abv !== undefined && (abv < 0 || abv > 100)) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'ABV must be between 0 and 100',
      });
    }

    // Create new drink log
    const drinkLog = new DrinkLog({
      userId,
      drinkId,
      drinkName,
      consumedAt: new Date(consumedAt),
      quantity,
      quantityUnit,
      rating,
      notes,
      abv,
      tasteTags,
      location,
      socialContext,
      mood,
      photoUrl,
      isArchived: false,
    });

    await drinkLog.save();

    logger.info(`Drink log created for user ${userId}`, {
      drinkLogId: drinkLog._id,
      drinkName,
      rating,
    });

    res.status(201).json({
      success: true,
      data: drinkLog,
      message: 'Drink log created successfully',
    });
  } catch (error) {
    logger.error('Error creating drink log:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create drink log',
    });
  }
};

/**
 * Get a single drink log by ID
 * GET /api/v1/drink-logs/:id
 */
export const getDrinkLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId query parameter is required',
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
};

/**
 * Get user's drink logs with optional filtering and pagination
 * GET /api/v1/drink-logs
 */
export const getDrinkLogs = async (req, res) => {
  try {
    const {
      userId,
      startDate,
      endDate,
      minRating,
      maxRating,
      limit = 50,
      skip = 0,
      sortBy = 'consumedAt',
      sortOrder = 'desc',
    } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId query parameter is required',
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

    // Add rating filter if provided
    if (minRating || maxRating) {
      query.rating = {};
      if (minRating) {
        query.rating.$gte = parseInt(minRating, 10);
      }
      if (maxRating) {
        query.rating.$lte = parseInt(maxRating, 10);
      }
    }

    // Parse pagination parameters
    const pageLimit = Math.min(parseInt(limit, 10) || 50, 500);
    const pageSkip = parseInt(skip, 10) || 0;

    // Build sort object
    const sortObj = {};
    const validSortFields = ['consumedAt', 'rating', 'drinkName', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'consumedAt';
    const order = sortOrder === 'asc' ? 1 : -1;
    sortObj[sortField] = order;

    // Execute query
    const [drinkLogs, total] = await Promise.all([
      DrinkLog.find(query).sort(sortObj).limit(pageLimit).skip(pageSkip),
      DrinkLog.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: drinkLogs,
      pagination: {
        total,
        limit: pageLimit,
        skip: pageSkip,
        hasMore: pageSkip + pageLimit < total,
      },
    });
  } catch (error) {
    logger.error('Error fetching drink logs:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch drink logs',
    });
  }
};

/**
 * Update a drink log entry
 * PUT /api/v1/drink-logs/:id
 */
export const updateDrinkLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const updateData = req.body;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId query parameter is required',
      });
    }

    // Validate rating if provided
    if (updateData.rating !== undefined) {
      if (updateData.rating < 1 || updateData.rating > 5 || !Number.isInteger(updateData.rating)) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'Rating must be an integer between 1 and 5',
        });
      }
    }

    // Validate quantity if provided
    if (updateData.quantity !== undefined && updateData.quantity <= 0) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Quantity must be greater than 0',
      });
    }

    // Validate ABV if provided
    if (updateData.abv !== undefined && (updateData.abv < 0 || updateData.abv > 100)) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'ABV must be between 0 and 100',
      });
    }

    // Prevent updating userId and isArchived
    delete updateData.userId;
    delete updateData.isArchived;

    // Find and update
    const drinkLog = await DrinkLog.findOneAndUpdate(
      {
        _id: id,
        userId,
        isArchived: false,
      },
      updateData,
      { new: true, runValidators: true },
    );

    if (!drinkLog) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Drink log not found',
      });
    }

    logger.info(`Drink log updated for user ${userId}`, {
      drinkLogId: id,
    });

    res.json({
      success: true,
      data: drinkLog,
      message: 'Drink log updated successfully',
    });
  } catch (error) {
    logger.error('Error updating drink log:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update drink log',
    });
  }
};

/**
 * Soft delete a drink log entry (archive)
 * DELETE /api/v1/drink-logs/:id
 */
export const deleteDrinkLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId query parameter is required',
      });
    }

    const drinkLog = await DrinkLog.findOneAndUpdate(
      {
        _id: id,
        userId,
        isArchived: false,
      },
      { isArchived: true },
      { new: true },
    );

    if (!drinkLog) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Drink log not found',
      });
    }

    logger.info(`Drink log archived for user ${userId}`, {
      drinkLogId: id,
    });

    res.json({
      success: true,
      data: drinkLog,
      message: 'Drink log deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting drink log:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete drink log',
    });
  }
};

/**
 * Restore an archived drink log entry
 * POST /api/v1/drink-logs/:id/restore
 */
export const restoreDrinkLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId query parameter is required',
      });
    }

    const drinkLog = await DrinkLog.findOneAndUpdate(
      {
        _id: id,
        userId,
        isArchived: true,
      },
      { isArchived: false },
      { new: true },
    );

    if (!drinkLog) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Archived drink log not found',
      });
    }

    logger.info(`Drink log restored for user ${userId}`, {
      drinkLogId: id,
    });

    res.json({
      success: true,
      data: drinkLog,
      message: 'Drink log restored successfully',
    });
  } catch (error) {
    logger.error('Error restoring drink log:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to restore drink log',
    });
  }
};

/**
 * Get drink log statistics for a user
 * GET /api/v1/drink-logs/stats/summary
 */
export const getDrinkLogStats = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId query parameter is required',
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

    // Get statistics
    const stats = await DrinkLog.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalLogs: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          minRating: { $min: '$rating' },
          maxRating: { $max: '$rating' },
          totalQuantity: { $sum: '$quantity' },
          averageQuantity: { $avg: '$quantity' },
          averageAbv: { $avg: '$abv' },
        },
      },
    ]);

    // Get top rated drinks
    const topDrinks = await DrinkLog.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$drinkName',
          count: { $sum: 1 },
          averageRating: { $avg: '$rating' },
        },
      },
      { $sort: { averageRating: -1 } },
      { $limit: 10 },
    ]);

    // Get rating distribution
    const ratingDistribution = await DrinkLog.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const summary = stats.length > 0 ? stats[0] : {
      totalLogs: 0,
      averageRating: 0,
      minRating: 0,
      maxRating: 0,
      totalQuantity: 0,
      averageQuantity: 0,
      averageAbv: 0,
    };

    res.json({
      success: true,
      data: {
        summary,
        topDrinks,
        ratingDistribution,
      },
    });
  } catch (error) {
    logger.error('Error fetching drink log stats:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch drink log statistics',
    });
  }
};
