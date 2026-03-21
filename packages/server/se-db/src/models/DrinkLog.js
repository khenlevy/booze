import mongoose from 'mongoose';
import logger from '@booze/se-logger';

/**
 * DrinkLog Schema
 * Represents a user's drink consumption log entry with ratings
 */
const drinkLogSchema = new mongoose.Schema(
  {
    // Reference to the user who logged the drink
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'User',
    },

    // Reference to the drink (if available)
    drinkId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: 'Drink',
    },

    // Drink name (for cases where drinkId is not available)
    drinkName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // When the drink was consumed
    consumedAt: {
      type: Date,
      required: true,
      index: true,
    },

    // Quantity consumed
    quantity: {
      type: Number,
      required: true,
      min: 0.1,
      validate: {
        validator: function (v) {
          return v > 0;
        },
        message: 'Quantity must be greater than 0',
      },
    },

    // Unit of measurement (ml, oz, shot, glass, pint, bottle)
    quantityUnit: {
      type: String,
      default: 'ml',
      enum: ['ml', 'oz', 'l', 'shot', 'glass', 'pint', 'bottle'],
    },

    // User's rating of the drink (1-5 stars)
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      index: true,
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && v >= 1 && v <= 5;
        },
        message: 'Rating must be an integer between 1 and 5',
      },
    },

    // User's notes about the drink
    notes: {
      type: String,
      default: null,
      trim: true,
      maxlength: 1000,
    },

    // ABV (Alcohol by Volume) if available
    abv: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
      validate: {
        validator: function (v) {
          return v === null || (v >= 0 && v <= 100);
        },
        message: 'ABV must be between 0 and 100',
      },
    },

    // Taste profile tags
    tasteTags: {
      type: [String],
      default: [],
      index: true,
    },

    // Location where the drink was consumed
    location: {
      type: String,
      default: null,
      trim: true,
    },

    // Social context (alone, with friends, at event, etc.)
    socialContext: {
      type: String,
      enum: ['alone', 'with_friends', 'at_event', 'at_bar', 'at_home', null],
      default: null,
    },

    // User's mood when consuming
    mood: {
      type: String,
      default: null,
      trim: true,
    },

    // Photo URL if user uploaded one
    photoUrl: {
      type: String,
      default: null,
      trim: true,
    },

    // Soft delete flag
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'drink_logs',
    autoIndex: true,
  },
);

// Compound indexes for common queries
drinkLogSchema.index({ userId: 1, consumedAt: -1 });
drinkLogSchema.index({ userId: 1, rating: -1 });
drinkLogSchema.index({ userId: 1, isArchived: 1 });
drinkLogSchema.index({ userId: 1, tasteTags: 1 });
drinkLogSchema.index({ drinkName: 1, rating: -1 });

/**
 * Get average rating for a user
 * @param {string} userId - User ID
 * @returns {Promise<number>} - Average rating
 */
drinkLogSchema.statics.getAverageRating = async function (userId) {
  try {
    const result = await this.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          isArchived: false,
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
        },
      },
    ]);

    return result.length > 0 ? result[0].averageRating : 0;
  } catch (error) {
    logger.error('Error calculating average rating:', error);
    throw error;
  }
};

/**
 * Get top-rated drinks for a user (aggregated by drink name)
 * @param {string} userId - User ID
 * @param {number} limit - Number of drinks to return
 * @returns {Promise<Array>} - Top-rated drinks
 */
drinkLogSchema.statics.getTopRatedDrinks = async function (userId, limit = 10) {
  try {
    return await this.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          isArchived: false,
        },
      },
      {
        $group: {
          _id: '$drinkName',
          drinkId: { $first: '$drinkId' },
          averageRating: { $avg: '$rating' },
          count: { $sum: 1 },
          lastConsumed: { $max: '$consumedAt' },
        },
      },
      {
        $sort: { averageRating: -1, count: -1 },
      },
      {
        $limit: limit,
      },
    ]);
  } catch (error) {
    logger.error('Error fetching top-rated drinks:', error);
    throw error;
  }
};

/**
 * Get drinks by date range
 * @param {string} userId - User ID
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Promise<Array>} - Drinks in date range
 */
drinkLogSchema.statics.getByDateRange = async function (userId, startDate, endDate) {
  try {
    return await this.find({
      userId: new mongoose.Types.ObjectId(userId),
      consumedAt: { $gte: startDate, $lte: endDate },
      isArchived: false,
    }).sort({ consumedAt: -1 });
  } catch (error) {
    logger.error('Error fetching drinks by date range:', error);
    throw error;
  }
};

/**
 * High-rated logs whose taste tags overlap the requested tags (recommendations / by-taste).
 * @param {string} userId
 * @param {string[]} tasteTags
 * @param {number} minRating
 * @returns {Promise<Array>} lean documents
 */
drinkLogSchema.statics.getSimilarHighRatedDrinks = async function (
  userId,
  tasteTags = [],
  minRating = 3,
) {
  try {
    const match = {
      userId: new mongoose.Types.ObjectId(userId),
      isArchived: false,
      rating: { $gte: minRating },
    };
    if (tasteTags.length > 0) {
      match.tasteTags = { $in: tasteTags };
    }
    return await this.find(match).sort({ rating: -1, consumedAt: -1 }).lean();
  } catch (error) {
    logger.error('Error fetching similar high-rated drinks:', error);
    throw error;
  }
};

/**
 * Logs in a rating range (recommendations / by-rating).
 */
drinkLogSchema.statics.getDrinksByRatingRange = async function (
  userId,
  minRating,
  maxRating,
) {
  try {
    return await this.find({
      userId: new mongoose.Types.ObjectId(userId),
      isArchived: false,
      rating: { $gte: minRating, $lte: maxRating },
    })
      .sort({ consumedAt: -1 })
      .lean();
  } catch (error) {
    logger.error('Error fetching drinks by rating range:', error);
    throw error;
  }
};

/**
 * Summary stats for recommendation readiness UI.
 */
drinkLogSchema.statics.getRatingStats = async function (userId) {
  try {
    const logs = await this.find({
      userId: new mongoose.Types.ObjectId(userId),
      isArchived: false,
    })
      .select('rating')
      .lean();

    const totalLogs = logs.length;
    if (totalLogs === 0) {
      return { totalLogs: 0, averageRating: 0, byRating: {} };
    }

    let sum = 0;
    const byRating = {};
    for (const log of logs) {
      sum += log.rating;
      const r = log.rating;
      byRating[r] = (byRating[r] || 0) + 1;
    }

    return {
      totalLogs,
      averageRating: sum / totalLogs,
      byRating,
    };
  } catch (error) {
    logger.error('Error computing rating stats:', error);
    throw error;
  }
};

/**
 * Instance method: Soft delete (archive) a drink log entry
 */
drinkLogSchema.methods.archive = async function () {
  try {
    this.isArchived = true;
    return await this.save();
  } catch (error) {
    logger.error('Error archiving drink log:', error);
    throw error;
  }
};

/**
 * Instance method: Restore an archived drink log entry
 */
drinkLogSchema.methods.restore = async function () {
  try {
    this.isArchived = false;
    return await this.save();
  } catch (error) {
    logger.error('Error restoring drink log:', error);
    throw error;
  }
};

/**
 * Virtual for days since consumption
 */
drinkLogSchema.virtual('daysSinceConsumption').get(function () {
  const now = new Date();
  const diff = now - this.consumedAt;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

const DrinkLog = mongoose.model('DrinkLog', drinkLogSchema);

export { DrinkLog };
export default DrinkLog;
