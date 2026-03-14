import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import drinkSearchRoutes from '../drinkSearch.js';
import * as drinkSearchController from '../../controllers/drinkSearchController.js';

// Mock the controller
vi.mock('../../controllers/drinkSearchController.js');

describe('Drink Search API Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/drinks', drinkSearchRoutes);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/v1/drinks/search', () => {
    it('should return search results with default parameters', async () => {
      const mockResults = {
        query: {},
        sort: { name: 1 },
        limit: 20,
        skip: 0,
      };

      drinkSearchController.searchDrinks.mockResolvedValue(mockResults);

      const response = await request(app)
        .get('/api/v1/drinks/search')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.pagination.limit).toBe(20);
      expect(response.body.pagination.skip).toBe(0);
    });

    it('should filter by drink name', async () => {
      const mockResults = {
        query: {
          $or: [
            { name: { $regex: 'beer', $options: 'i' } },
            { brand: { $regex: 'beer', $options: 'i' } },
          ],
        },
        sort: { name: 1 },
        limit: 20,
        skip: 0,
      };

      drinkSearchController.searchDrinks.mockResolvedValue(mockResults);

      const response = await request(app)
        .get('/api/v1/drinks/search?name=beer')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.filters.name).toBe('beer');
    });

    it('should filter by category', async () => {
      const mockResults = {
        query: { category: 'Wine' },
        sort: { name: 1 },
        limit: 20,
        skip: 0,
      };

      drinkSearchController.searchDrinks.mockResolvedValue(mockResults);

      const response = await request(app)
        .get('/api/v1/drinks/search?category=Wine')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.filters.category).toBe('Wine');
    });

    it('should filter by ABV range', async () => {
      const mockResults = {
        query: { abv: { $gte: 5, $lte: 10 } },
        sort: { name: 1 },
        limit: 20,
        skip: 0,
      };

      drinkSearchController.searchDrinks.mockResolvedValue(mockResults);

      const response = await request(app)
        .get('/api/v1/drinks/search?abvMin=5&abvMax=10')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.filters.abvRange.min).toBe(5);
      expect(response.body.filters.abvRange.max).toBe(10);
    });

    it('should filter by taste tags', async () => {
      const mockResults = {
        query: { tasteTags: { $in: ['Fruity', 'Sweet'] } },
        sort: { name: 1 },
        limit: 20,
        skip: 0,
      };

      drinkSearchController.searchDrinks.mockResolvedValue(mockResults);

      const response = await request(app)
        .get('/api/v1/drinks/search?tasteTags=Fruity,Sweet')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.filters.tasteTags).toContain('Fruity');
      expect(response.body.filters.tasteTags).toContain('Sweet');
    });

    it('should support pagination with limit and skip', async () => {
      const mockResults = {
        query: {},
        sort: { name: 1 },
        limit: 50,
        skip: 100,
      };

      drinkSearchController.searchDrinks.mockResolvedValue(mockResults);

      const response = await request(app)
        .get('/api/v1/drinks/search?limit=50&skip=100')
        .expect(200);

      expect(response.body.pagination.limit).toBe(50);
      expect(response.body.pagination.skip).toBe(100);
    });

    it('should support custom sorting', async () => {
      const mockResults = {
        query: {},
        sort: { abv: -1 },
        limit: 20,
        skip: 0,
      };

      drinkSearchController.searchDrinks.mockResolvedValue(mockResults);

      const response = await request(app)
        .get('/api/v1/drinks/search?sortBy=abv&sortOrder=desc')
        .expect(200);

      expect(response.body.sort.field).toBe('abv');
      expect(response.body.sort.order).toBe('desc');
    });

    it('should reject invalid limit', async () => {
      const response = await request(app)
        .get('/api/v1/drinks/search?limit=200')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation Error');
      expect(response.body.details).toContain(
        'limit must be a number between 1 and 100',
      );
    });

    it('should reject invalid ABV range', async () => {
      const response = await request(app)
        .get('/api/v1/drinks/search?abvMin=150')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.details).toContain(
        'abvMin must be a number between 0 and 100',
      );
    });

    it('should reject invalid sort field', async () => {
      const response = await request(app)
        .get('/api/v1/drinks/search?sortBy=invalid')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.details.length).toBeGreaterThan(0);
    });

    it('should reject when abvMin > abvMax', async () => {
      const response = await request(app)
        .get('/api/v1/drinks/search?abvMin=20&abvMax=10')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.details).toContain(
        'abvMin must be less than or equal to abvMax',
      );
    });
  });

  describe('GET /api/v1/drinks/:id', () => {
    it('should return drink details by ID', async () => {
      const response = await request(app)
        .get('/api/v1/drinks/507f1f77bcf86cd799439011')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe('507f1f77bcf86cd799439011');
      expect(response.body.data.name).toBeDefined();
      expect(response.body.data.category).toBeDefined();
    });

    it('should reject missing drink ID', async () => {
      const response = await request(app)
        .get('/api/v1/drinks/')
        .expect(404);
    });
  });

  describe('GET /api/v1/drinks/categories/list', () => {
    it('should return list of drink categories', async () => {
      drinkSearchController.getDrinkCategories.mockResolvedValue([
        'Beer',
        'Wine',
        'Spirits',
      ]);

      const response = await request(app)
        .get('/api/v1/drinks/categories/list')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/v1/drinks/taste-tags/list', () => {
    it('should return list of popular taste tags', async () => {
      drinkSearchController.getPopularTasteTags.mockResolvedValue([
        'Sweet',
        'Dry',
        'Fruity',
      ]);

      const response = await request(app)
        .get('/api/v1/drinks/taste-tags/list')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
});

describe('Drink Search Controller', () => {
  describe('validateSearchParams', () => {
    it('should validate correct parameters', () => {
      const { validateSearchParams } = drinkSearchController;
      const params = {
        limit: 20,
        skip: 0,
        abvMin: 5,
        abvMax: 10,
        sortBy: 'name',
        sortOrder: 'asc',
      };

      const result = validateSearchParams(params);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid limit', () => {
      const { validateSearchParams } = drinkSearchController;
      const params = { limit: 200 };

      const result = validateSearchParams(params);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject invalid ABV range', () => {
      const { validateSearchParams } = drinkSearchController;
      const params = { abvMin: 20, abvMax: 10 };

      const result = validateSearchParams(params);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'abvMin must be less than or equal to abvMax',
      );
    });

    it('should reject invalid sort field', () => {
      const { validateSearchParams } = drinkSearchController;
      const params = { sortBy: 'invalid' };

      const result = validateSearchParams(params);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
