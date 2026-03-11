import mongoose from 'mongoose';
import logger from '@booze/se-logger';

/**
 * DrinkLog Schema
 * Represents a user's drink consumption log entry
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
      min: 0,
      validate: {
        validator: function (v) {
          return v > 0;
        },
        message: 'Quantity must be greater than 0',
      },
    },

    // Unit of measurement (ml, oz, shot, glass, etc.)
    quantityUnit: {
      type: String,
      required: true,
      enum: ['ml', 'oz', 'shot', 'glass', 'pint', 'bottle'],
      default: 'ml',
    },

    // User's rating of the drink (1-5 stars)
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
    },

    // Optional notes about the drink or experience
    notes: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1000,
    },

    // ABV (Alcohol by Volume) if available
    abv: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
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

    // Social context (alone, with friends, at event, etc.)
    socialContext: {
      type: String,
      enum: ['alone', 'with_friends', 'at_event', 'at_bar', 'at_home', null],
      default: null,
    },

    // Mood/feeling when consuming
    mood: {
      type: String,
      default: null,
      trim: true,
    },

    // Photo/image reference if available
    photoUrl: {
      type: String,
      default: null,
    },

    // Whether this entry is archived
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'drink_logs',
  },
);

// Compound index for efficient querying by user and date
drinkLogSchema.index({ userId: 1, consumedAt: -1 });

// Index for rating queries
drinkLogSchema.index({ userId: 1, rating: 1 });

// Index for archived status
drinkLogSchema.index({ userId: 1, isArchived: 1 });

// Pre-save middleware to update updatedAt
drinkLogSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for calculating days since consumption
drinkLogSchema.virtual('daysSinceConsumption').get(function () {
  const now = new Date();
  const consumed = new Date(this.consumedAt);
  const diffTime = Math.abs(now - consumed);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Method to get user's average rating
drinkLogSchema.statics.getAverageRating = async function (userId) {
  try {
    const result = await this.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), isArchived: false } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } },
    ]);
    return result.length > 0 ? result[0].averageRating : 0;
  } catch (error) {
    logger.error('Error calculating average rating:', error);
    throw error;
  }
};

// Method to get user's drink logs by date range
drinkLogSchema.statics.getByDateRange = async function (userId, startDate, endDate) {
  try {
    return await this.find({
      userId: new mongoose.Types.ObjectId(userId),
      consumedAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      isArchived: false,
    }).sort({ consumedAt: -1 });
  } catch (error) {
    logger.error('Error fetching drink logs by date range:', error);
    throw error;
  }
};

// Method to get top-rated drinks
drinkLogSchema.statics.getTopRatedDrinks = async function (userId, limit = 10) {
  try {
    return await this.find({
      userId: new mongoose.Types.ObjectId(userId),
      isArchived: false,
    })
      .sort({ rating: -1 })
      .limit(limit);
  } catch (error) {
    logger.error('Error fetching top-rated drinks:', error);
    throw error;
  }
};

// Create and export the model
const DrinkLog = mongoose.model('DrinkLog', drinkLogSchema);

export default DrinkLog;
