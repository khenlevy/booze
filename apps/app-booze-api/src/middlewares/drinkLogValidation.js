import logger from '@booze/se-logger';

/**
 * Validate drink log creation request
 */
export const validateCreateDrinkLog = (req, res, next) => {
  try {
    const { userId, drinkName, consumedAt, quantity, rating } = req.body;

    // Check required fields
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId is required and must be a non-empty string',
      });
    }

    if (!drinkName || typeof drinkName !== 'string' || drinkName.trim() === '') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'drinkName is required and must be a non-empty string',
      });
    }

    if (!consumedAt) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'consumedAt is required (ISO 8601 date format)',
      });
    }

    // Validate consumedAt is a valid date
    const consumedDate = new Date(consumedAt);
    if (isNaN(consumedDate.getTime())) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'consumedAt must be a valid ISO 8601 date',
      });
    }

    if (quantity === undefined || quantity === null) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'quantity is required',
      });
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'quantity must be a positive number',
      });
    }

    if (!rating) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'rating is required',
      });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'rating must be an integer between 1 and 5',
      });
    }

    // Validate optional fields if provided
    if (req.body.abv !== undefined) {
      if (typeof req.body.abv !== 'number' || req.body.abv < 0 || req.body.abv > 100) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'abv must be a number between 0 and 100',
        });
      }
    }

    if (req.body.notes !== undefined) {
      if (typeof req.body.notes !== 'string' || req.body.notes.length > 1000) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'notes must be a string with maximum 1000 characters',
        });
      }
    }

    if (req.body.quantityUnit !== undefined) {
      const validUnits = ['ml', 'oz', 'shot', 'glass', 'pint', 'bottle'];
      if (!validUnits.includes(req.body.quantityUnit)) {
        return res.status(400).json({
          error: 'Validation Error',
          message: `quantityUnit must be one of: ${validUnits.join(', ')}`,
        });
      }
    }

    if (req.body.tasteTags !== undefined) {
      if (!Array.isArray(req.body.tasteTags)) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'tasteTags must be an array',
        });
      }
    }

    next();
  } catch (error) {
    logger.error('Error in validateCreateDrinkLog middleware:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Validation middleware error',
    });
  }
};

/**
 * Validate drink log update request
 */
export const validateUpdateDrinkLog = (req, res, next) => {
  try {
    const updateData = req.body;

    // Validate rating if provided
    if (updateData.rating !== undefined) {
      if (!Number.isInteger(updateData.rating) || updateData.rating < 1 || updateData.rating > 5) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'rating must be an integer between 1 and 5',
        });
      }
    }

    // Validate quantity if provided
    if (updateData.quantity !== undefined) {
      if (typeof updateData.quantity !== 'number' || updateData.quantity <= 0) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'quantity must be a positive number',
        });
      }
    }

    // Validate consumedAt if provided
    if (updateData.consumedAt !== undefined) {
      const consumedDate = new Date(updateData.consumedAt);
      if (isNaN(consumedDate.getTime())) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'consumedAt must be a valid ISO 8601 date',
        });
      }
    }

    // Validate drinkName if provided
    if (updateData.drinkName !== undefined) {
      if (typeof updateData.drinkName !== 'string' || updateData.drinkName.trim() === '') {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'drinkName must be a non-empty string',
        });
      }
    }

    // Validate ABV if provided
    if (updateData.abv !== undefined) {
      if (typeof updateData.abv !== 'number' || updateData.abv < 0 || updateData.abv > 100) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'abv must be a number between 0 and 100',
        });
      }
    }

    // Validate notes if provided
    if (updateData.notes !== undefined) {
      if (typeof updateData.notes !== 'string' || updateData.notes.length > 1000) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'notes must be a string with maximum 1000 characters',
        });
      }
    }

    // Validate quantityUnit if provided
    if (updateData.quantityUnit !== undefined) {
      const validUnits = ['ml', 'oz', 'shot', 'glass', 'pint', 'bottle'];
      if (!validUnits.includes(updateData.quantityUnit)) {
        return res.status(400).json({
          error: 'Validation Error',
          message: `quantityUnit must be one of: ${validUnits.join(', ')}`,
        });
      }
    }

    // Validate tasteTags if provided
    if (updateData.tasteTags !== undefined) {
      if (!Array.isArray(updateData.tasteTags)) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'tasteTags must be an array',
        });
      }
    }

    // Prevent updating userId and isArchived
    if (updateData.userId !== undefined || updateData.isArchived !== undefined) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'userId and isArchived cannot be updated',
      });
    }

    next();
  } catch (error) {
    logger.error('Error in validateUpdateDrinkLog middleware:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Validation middleware error',
    });
  }
};

/**
 * Validate drink log query parameters
 */
export const validateDrinkLogQuery = (req, res, next) => {
  try {
    const { limit, skip, minRating, maxRating, startDate, endDate } = req.query;

    // Validate limit
    if (limit !== undefined) {
      const limitNum = parseInt(limit, 10);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 500) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'limit must be a number between 1 and 500',
        });
      }
    }

    // Validate skip
    if (skip !== undefined) {
      const skipNum = parseInt(skip, 10);
      if (isNaN(skipNum) || skipNum < 0) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'skip must be a non-negative number',
        });
      }
    }

    // Validate minRating
    if (minRating !== undefined) {
      const minRatingNum = parseInt(minRating, 10);
      if (isNaN(minRatingNum) || minRatingNum < 1 || minRatingNum > 5) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'minRating must be an integer between 1 and 5',
        });
      }
    }

    // Validate maxRating
    if (maxRating !== undefined) {
      const maxRatingNum = parseInt(maxRating, 10);
      if (isNaN(maxRatingNum) || maxRatingNum < 1 || maxRatingNum > 5) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'maxRating must be an integer between 1 and 5',
        });
      }
    }

    // Validate startDate
    if (startDate !== undefined) {
      const startDateObj = new Date(startDate);
      if (isNaN(startDateObj.getTime())) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'startDate must be a valid ISO 8601 date',
        });
      }
    }

    // Validate endDate
    if (endDate !== undefined) {
      const endDateObj = new Date(endDate);
      if (isNaN(endDateObj.getTime())) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'endDate must be a valid ISO 8601 date',
        });
      }
    }

    next();
  } catch (error) {
    logger.error('Error in validateDrinkLogQuery middleware:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Validation middleware error',
    });
  }
};
