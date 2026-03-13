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

    // Quantity of the drink consumed
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

    // Unit of measurement for quantity
    quantityUnit: {
      type: String,
      enum: ['ml', 'oz', 'shot', 'glass', 'pint', 'bottle'],
      default: 'ml',
    },

    // User's rating of the drink (1-5)
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && v >= 1 && v <= 5;
        },
        message: 'Rating must be an integer between 1 and 5',
      },
      index: true,
    },

    // Additional notes about the drink
    notes: {
      type: String,
      default: null,
      trim: true,
      maxlength: 1000,
    },

    // Alcohol by volume percentage
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
    },

    // Location where the drink was consumed
    location: {
      type: String,
      default: null,
      trim: true,
    },

    // Social context (alone, with friends, at bar, etc.)
    socialContext: {
      type: String,
      default: null,
      trim: true,
    },

    // User's mood when consuming the drink
    mood: {
      type: String,
      default: null,
      trim: true,
    },

    // URL to a photo of the drink
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
    // Collection name
    collection: 'drink_logs',

    // Enable automatic timestamps
    timestamps: true,

    // Ensure indexes
    autoIndex: true,
  }
);

// Compound indexes for better query performance
drinkLogSchema.index({ userId: 1, consumedAt: -1 });
drinkLogSchema.index({ userId: 1, rating: -1 });
drinkLogSchema.index({ userId: 1, isArchived: 1 });
drinkLogSchema.index({ userId: 1, tasteTags: 1 });
drinkLogSchema.index({ drinkName: 1, rating: -1 });

/**
 * Helper method: Get average rating for a user
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
 * Helper method: Get drinks by date range
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
 * Helper method: Get top-rated drinks for a user
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
 * Helper method: Get drinks by rating range
 * @param {string} userId - User ID
 * @param {number} minRating - Minimum rating (1-5)
 * @param {number} maxRating - Maximum rating (1-5)
 * @returns {Promise<Array>} - Drinks in rating range
 */
drinkLogSchema.statics.getDrinksByRatingRange = async function (userId, minRating = 1, maxRating = 5) {
  try {
    return await this.find({
      userId: new mongoose.Types.ObjectId(userId),
      rating: { $gte: minRating, $lte: maxRating },
      isArchived: false,
    })
      .sort({ rating: -1, consumedAt: -1 })
      .lean();
  } catch (error) {
    logger.error('Error fetching drinks by rating range:', error);
    throw error;
  }
};

/**
 * Helper method: Get rating statistics for a user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Rating statistics
 */
drinkLogSchema.statics.getRatingStats = async function (userId) {
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
          minRating: { $min: '$rating' },
          maxRating: { $max: '$rating' },
          totalLogs: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating',
          },
        },
      },
      {
        $project: {
          _id: 0,
          averageRating: { $round: ['$averageRating', 2] },
          minRating: 1,
          maxRating: 1,
          totalLogs: 1,
          ratingCounts: {
            $reduce: {
              input: '$ratingDistribution',
              initialValue: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
              in: {
                1: {
                  $cond: [{ $eq: ['$$this', 1] }, { $add: ['$$value.1', 1] }, '$$value.1'],
                },
                2: {
                  $cond: [{ $eq: ['$$this', 2] }, { $add: ['$$value.2', 1] }, '$$value.2'],
                },
                3: {
                  $cond: [{ $eq: ['$$this', 3] }, { $add: ['$$value.3', 1] }, '$$value.3'],
                },
                4: {
                  $cond: [{ $eq: ['$$this', 4] }, { $add: ['$$value.4', 1] }, '$$value.4'],
                },
                5: {
                  $cond: [{ $eq: ['$$this', 5] }, { $add: ['$$value.5', 1] }, '$$value.5'],
                },
              },
            },
          },
        },
      },
    ]);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    logger.error('Error fetching rating statistics:', error);
    throw error;
  }
};

/**
 * Helper method: Get drinks with similar taste profiles and high ratings
 * @param {string} userId - User ID
 * @param {Array<string>} tasteTags - Taste tags to match
 * @param {number} minRating - Minimum rating threshold
 * @returns {Promise<Array>} - Similar drinks with high ratings
 */
drinkLogSchema.statics.getSimilarHighRatedDrinks = async function (userId, tasteTags = [], minRating = 3) {
  try {
    const query = {
      userId: new mongoose.Types.ObjectId(userId),
      rating: { $gte: minRating },
      isArchived: false,
    };

    if (tasteTags.length > 0) {
      query.tasteTags = { $in: tasteTags };
    }

    return await this.find(query)
      .sort({ rating: -1, consumedAt: -1 })
      .lean();
  } catch (error) {
    logger.error('Error fetching similar high-rated drinks:', error);
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

// Create and export the model
export const DrinkLog = mongoose.model('DrinkLog', drinkLogSchema);

export default DrinkLog;
