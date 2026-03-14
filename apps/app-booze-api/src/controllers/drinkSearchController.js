import logger from '@booze/se-logger';

/**
 * Drink Search Controller
 * Handles searching and filtering drinks from the catalog
 */

/**
 * Search drinks with flexible filtering and pagination
 * @param {Object} query - Search query parameters
 * @returns {Promise<Object>} Search results with pagination metadata
 */
export async function searchDrinks(query = {}) {
  try {
    const {
      name,
      category,
      abvMin,
      abvMax,
      tasteTags,
      brand,
      limit = 20,
      skip = 0,
      sortBy = 'name',
      sortOrder = 'asc',
    } = query;

    // Build MongoDB query
    const mongoQuery = {};

    // Text search on name and brand
    if (name) {
      mongoQuery.$or = [
        { name: { $regex: name, $options: 'i' } },
        { brand: { $regex: name, $options: 'i' } },
      ];
    }

    // Category filter
    if (category) {
      mongoQuery.category = category;
    }

    // ABV range filter
    if (abvMin !== undefined || abvMax !== undefined) {
      mongoQuery.abv = {};
      if (abvMin !== undefined) {
        mongoQuery.abv.$gte = parseFloat(abvMin);
      }
      if (abvMax !== undefined) {
        mongoQuery.abv.$lte = parseFloat(abvMax);
      }
    }

    // Taste tags filter (match any tag)
    if (tasteTags && Array.isArray(tasteTags) && tasteTags.length > 0) {
      mongoQuery.tasteTags = { $in: tasteTags };
    }

    // Brand filter
    if (brand) {
      mongoQuery.brand = { $regex: brand, $options: 'i' };
    }

    // Build sort object
    const sortObj = {};
    const validSortFields = ['name', 'abv', 'category', 'popularity', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
    const sortDir = sortOrder === 'desc' ? -1 : 1;
    sortObj[sortField] = sortDir;

    logger.debug('Drink search query:', {
      mongoQuery,
      sortObj,
      limit: parseInt(limit),
      skip: parseInt(skip),
    });

    // This would be called with actual Drink model
    // For now, return structure for integration
    return {
      query: mongoQuery,
      sort: sortObj,
      limit: parseInt(limit),
      skip: parseInt(skip),
    };
  } catch (error) {
    logger.error('Error building drink search query:', error);
    throw error;
  }
}

/**
 * Get drink by ID
 * @param {string} drinkId - Drink ID
 * @returns {Promise<Object>} Drink details
 */
export async function getDrinkById(drinkId) {
  try {
    if (!drinkId) {
      throw new Error('Drink ID is required');
    }

    logger.debug('Fetching drink by ID:', drinkId);

    // This would be called with actual Drink model
    return {
      id: drinkId,
    };
  } catch (error) {
    logger.error('Error fetching drink:', error);
    throw error;
  }
}

/**
 * Get drink categories
 * @returns {Promise<Array>} List of available categories
 */
export async function getDrinkCategories() {
  try {
    // Standard drink categories
    const categories = [
      'Beer',
      'Wine',
      'Spirits',
      'Liqueur',
      'Cocktail',
      'Non-Alcoholic',
      'Cider',
      'Sake',
      'Other',
    ];

    return categories;
  } catch (error) {
    logger.error('Error fetching drink categories:', error);
    throw error;
  }
}

/**
 * Get popular taste tags
 * @returns {Promise<Array>} List of popular taste tags
 */
export async function getPopularTasteTags() {
  try {
    // Common taste tags
    const tags = [
      'Sweet',
      'Dry',
      'Bitter',
      'Fruity',
      'Floral',
      'Spicy',
      'Herbal',
      'Smoky',
      'Citrus',
      'Vanilla',
      'Chocolate',
      'Caramel',
      'Oak',
      'Crisp',
      'Smooth',
    ];

    return tags;
  } catch (error) {
    logger.error('Error fetching taste tags:', error);
    throw error;
  }
}

/**
 * Validate search parameters
 * @param {Object} params - Search parameters to validate
 * @returns {Object} Validation result with errors if any
 */
export function validateSearchParams(params) {
  const errors = [];

  if (params.limit) {
    const limit = parseInt(params.limit);
    if (isNaN(limit) || limit < 1 || limit > 100) {
      errors.push('limit must be a number between 1 and 100');
    }
  }

  if (params.skip) {
    const skip = parseInt(params.skip);
    if (isNaN(skip) || skip < 0) {
      errors.push('skip must be a non-negative number');
    }
  }

  if (params.abvMin) {
    const abv = parseFloat(params.abvMin);
    if (isNaN(abv) || abv < 0 || abv > 100) {
      errors.push('abvMin must be a number between 0 and 100');
    }
  }

  if (params.abvMax) {
    const abv = parseFloat(params.abvMax);
    if (isNaN(abv) || abv < 0 || abv > 100) {
      errors.push('abvMax must be a number between 0 and 100');
    }
  }

  if (params.abvMin && params.abvMax) {
    const min = parseFloat(params.abvMin);
    const max = parseFloat(params.abvMax);
    if (min > max) {
      errors.push('abvMin must be less than or equal to abvMax');
    }
  }

  if (params.sortBy) {
    const validSortFields = ['name', 'abv', 'category', 'popularity', 'createdAt'];
    if (!validSortFields.includes(params.sortBy)) {
      errors.push(
        `sortBy must be one of: ${validSortFields.join(', ')}`,
      );
    }
  }

  if (params.sortOrder) {
    if (!['asc', 'desc'].includes(params.sortOrder)) {
      errors.push('sortOrder must be either "asc" or "desc"');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
