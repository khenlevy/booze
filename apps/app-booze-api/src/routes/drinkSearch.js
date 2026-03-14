import express from 'express';
import logger from '@booze/se-logger';
import {
  searchDrinks,
  getDrinkById,
  getDrinkCategories,
  getPopularTasteTags,
  validateSearchParams,
} from '../controllers/drinkSearchController.js';
import {
  validateDrinkSearchParams,
  sanitizeSearchInput,
  rateLimitSearch,
} from '../middlewares/searchValidation.js';

const router = express.Router();

// Apply middleware to search endpoint
router.get('/search', rateLimitSearch, sanitizeSearchInput, validateDrinkSearchParams, async (req, res) => {
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
    } = req.query;

    // Parse tasteTags if provided
    let tagsArray = [];
    if (tasteTags) {
      tagsArray = typeof tasteTags === 'string'
        ? tasteTags.split(',').map(tag => tag.trim())
        : Array.isArray(tasteTags)
          ? tasteTags
          : [];
    }

    // Build search query
    const searchQuery = {
      name,
      category,
      abvMin,
      abvMax,
      tasteTags: tagsArray,
      brand,
      limit: parseInt(limit),
      skip: parseInt(skip),
      sortBy,
      sortOrder,
    };

    logger.debug('Drink search request:', searchQuery);

    // Execute search
    const queryBuilder = await searchDrinks(searchQuery);

    // TODO: Execute actual MongoDB query when Drink model is available
    // const drinks = await Drink.find(queryBuilder.query)
    //   .sort(queryBuilder.sort)
    //   .limit(queryBuilder.limit)
    //   .skip(queryBuilder.skip)
    //   .lean();
    //
    // const total = await Drink.countDocuments(queryBuilder.query);

    // Placeholder response structure
    const response = {
      success: true,
      data: [],
      pagination: {
        total: 0,
        limit: queryBuilder.limit,
        skip: queryBuilder.skip,
        hasMore: false,
      },
      filters: {
        name: name || null,
        category: category || null,
        abvRange: {
          min: abvMin ? parseFloat(abvMin) : null,
          max: abvMax ? parseFloat(abvMax) : null,
        },
        tasteTags: tagsArray.length > 0 ? tagsArray : null,
        brand: brand || null,
      },
      sort: {
        field: sortBy,
        order: sortOrder,
      },
    };

    res.json(response);
  } catch (error) {
    logger.error('Error searching drinks:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to search drinks',
    });
  }
});

/**
 * GET /api/v1/drinks/:id
 * Get drink details by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Drink ID is required',
      });
    }

    logger.debug('Fetching drink by ID:', id);

    // TODO: Fetch actual drink from database when Drink model is available
    // const drink = await Drink.findById(id).lean();
    //
    // if (!drink) {
    //   return res.status(404).json({
    //     success: false,
    //     error: 'Not Found',
    //     message: 'Drink not found',
    //   });
    // }

    // Placeholder response
    const response = {
      success: true,
      data: {
        _id: id,
        name: 'Placeholder Drink',
        category: 'Beer',
        brand: 'Sample Brand',
        abv: 5.0,
        description: 'Sample drink description',
        tasteTags: ['Crisp', 'Fruity'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    res.json(response);
  } catch (error) {
    logger.error('Error fetching drink:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch drink',
    });
  }
});

/**
 * GET /api/v1/drinks/categories/list
 * Get available drink categories
 */
router.get('/categories/list', async (req, res) => {
  try {
    logger.debug('Fetching drink categories');

    const categories = await getDrinkCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    logger.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch categories',
    });
  }
});

/**
 * GET /api/v1/drinks/taste-tags/list
 * Get popular taste tags
 */
router.get('/taste-tags/list', async (req, res) => {
  try {
    logger.debug('Fetching popular taste tags');

    const tags = await getPopularTasteTags();

    res.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    logger.error('Error fetching taste tags:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch taste tags',
    });
  }
});

export default router;
