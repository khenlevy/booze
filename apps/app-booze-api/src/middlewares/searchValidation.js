import logger from '@booze/se-logger';

/**
 * Validate drink search query parameters
 * Ensures all search parameters are valid before processing
 */
export function validateDrinkSearchParams(req, res, next) {
  try {
    const {
      name,
      category,
      abvMin,
      abvMax,
      tasteTags,
      brand,
      limit,
      skip,
      sortBy,
      sortOrder,
    } = req.query;

    const errors = [];

    // Validate limit
    if (limit !== undefined) {
      const limitNum = parseInt(limit);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        errors.push('limit must be a number between 1 and 100');
      }
    }

    // Validate skip
    if (skip !== undefined) {
      const skipNum = parseInt(skip);
      if (isNaN(skipNum) || skipNum < 0) {
        errors.push('skip must be a non-negative number');
      }
    }

    // Validate ABV range
    if (abvMin !== undefined) {
      const abvMinNum = parseFloat(abvMin);
      if (isNaN(abvMinNum) || abvMinNum < 0 || abvMinNum > 100) {
        errors.push('abvMin must be a number between 0 and 100');
      }
    }

    if (abvMax !== undefined) {
      const abvMaxNum = parseFloat(abvMax);
      if (isNaN(abvMaxNum) || abvMaxNum < 0 || abvMaxNum > 100) {
        errors.push('abvMax must be a number between 0 and 100');
      }
    }

    // Validate ABV range consistency
    if (abvMin !== undefined && abvMax !== undefined) {
      const min = parseFloat(abvMin);
      const max = parseFloat(abvMax);
      if (min > max) {
        errors.push('abvMin must be less than or equal to abvMax');
      }
    }

    // Validate sortBy
    if (sortBy !== undefined) {
      const validSortFields = ['name', 'abv', 'category', 'popularity', 'createdAt'];
      if (!validSortFields.includes(sortBy)) {
        errors.push(
          `sortBy must be one of: ${validSortFields.join(', ')}`,
        );
      }
    }

    // Validate sortOrder
    if (sortOrder !== undefined) {
      if (!['asc', 'desc'].includes(sortOrder)) {
        errors.push('sortOrder must be either "asc" or "desc"');
      }
    }

    // Validate string parameters (sanitize)
    if (name && typeof name !== 'string') {
      errors.push('name must be a string');
    }

    if (category && typeof category !== 'string') {
      errors.push('category must be a string');
    }

    if (brand && typeof brand !== 'string') {
      errors.push('brand must be a string');
    }

    // If there are validation errors, return 400
    if (errors.length > 0) {
      logger.warn('Drink search validation failed:', { errors, query: req.query });
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Invalid search parameters',
        details: errors,
      });
    }

    // Validation passed, continue to next middleware
    next();
  } catch (error) {
    logger.error('Error in search validation middleware:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Error validating search parameters',
    });
  }
}

/**
 * Sanitize search input to prevent injection attacks
 */
export function sanitizeSearchInput(req, res, next) {
  try {
    const { name, brand, category } = req.query;

    // Remove potentially dangerous characters
    if (name) {
      req.query.name = name.replace(/[<>\"']/g, '');
    }

    if (brand) {
      req.query.brand = brand.replace(/[<>\"']/g, '');
    }

    if (category) {
      req.query.category = category.replace(/[<>\"']/g, '');
    }

    next();
  } catch (error) {
    logger.error('Error in sanitization middleware:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Error processing search input',
    });
  }
}

/**
 * Rate limiting for search endpoints
 * Prevents abuse of search functionality
 */
const searchRequestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;

export function rateLimitSearch(req, res, next) {
  try {
    // Get client IP
    const clientIp = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    // Initialize or get request count for this IP
    if (!searchRequestCounts.has(clientIp)) {
      searchRequestCounts.set(clientIp, []);
    }

    const requests = searchRequestCounts.get(clientIp);

    // Remove old requests outside the window
    const recentRequests = requests.filter(
      timestamp => now - timestamp < RATE_LIMIT_WINDOW,
    );

    // Check if limit exceeded
    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
      logger.warn('Rate limit exceeded for search endpoint', {
        clientIp,
        requestCount: recentRequests.length,
      });
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil(
          (recentRequests[0] + RATE_LIMIT_WINDOW - now) / 1000,
        ),
      });
    }

    // Add current request timestamp
    recentRequests.push(now);
    searchRequestCounts.set(clientIp, recentRequests);

    // Clean up old entries periodically
    if (searchRequestCounts.size > 1000) {
      const ips = Array.from(searchRequestCounts.keys());
      ips.forEach(ip => {
        const timestamps = searchRequestCounts.get(ip);
        const recent = timestamps.filter(
          timestamp => now - timestamp < RATE_LIMIT_WINDOW,
        );
        if (recent.length === 0) {
          searchRequestCounts.delete(ip);
        } else {
          searchRequestCounts.set(ip, recent);
        }
      });
    }

    next();
  } catch (error) {
    logger.error('Error in rate limiting middleware:', error);
    // Don't block on rate limit errors, just log and continue
    next();
  }
}
