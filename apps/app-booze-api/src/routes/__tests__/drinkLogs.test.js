/**
 * Drink Logs API Tests
 * Tests for all drink log endpoints
 */

import request from 'supertest';
import express from 'express';
import drinkLogsRoutes from '../drinkLogs.js';
import { DrinkLog } from '@booze/se-db';

// Mock the DrinkLog model
jest.mock('@booze/se-db', () => ({
  DrinkLog: {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    countDocuments: jest.fn(),
    getAverageRating: jest.fn(),
    getTopRatedDrinks: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/drink-logs', drinkLogsRoutes);

describe('Drink Logs API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /drink-logs', () => {
    it('should create a new drink log successfully', async () => {
      const mockDrinkLog = {
        _id: '507f1f77bcf86cd799439011',
        userId: 'user-123',
        drinkName: 'Craft IPA',
        consumedAt: new Date('2024-01-15T19:30:00Z'),
        quantity: 500,
        quantityUnit: 'ml',
        rating: 4,
        notes: 'Great hoppy flavor',
        abv: 6.5,
        save: jest.fn().mockResolvedValue(true),
      };

      DrinkLog.mockImplementation(() => mockDrinkLog);

      const response = await request(app)
        .post('/drink-logs')
        .send({
          userId: 'user-123',
          drinkName: 'Craft IPA',
          consumedAt: '2024-01-15T19:30:00Z',
          quantity: 500,
          quantityUnit: 'ml',
          rating: 4,
          notes: 'Great hoppy flavor',
          abv: 6.5,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.drinkName).toBe('Craft IPA');
    });

    it('should return 400 if userId is missing', async () => {
      const response = await request(app)
        .post('/drink-logs')
        .send({
          drinkName: 'Craft IPA',
          consumedAt: '2024-01-15T19:30:00Z',
          quantity: 500,
          rating: 4,
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });

    it('should return 400 if rating is invalid', async () => {
      const response = await request(app)
        .post('/drink-logs')
        .send({
          userId: 'user-123',
          drinkName: 'Craft IPA',
          consumedAt: '2024-01-15T19:30:00Z',
          quantity: 500,
          rating: 6, // Invalid: > 5
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });

    it('should return 400 if quantity is invalid', async () => {
      const response = await request(app)
        .post('/drink-logs')
        .send({
          userId: 'user-123',
          drinkName: 'Craft IPA',
          consumedAt: '2024-01-15T19:30:00Z',
          quantity: -100, // Invalid: negative
          rating: 4,
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('GET /drink-logs', () => {
    it('should retrieve user drink logs successfully', async () => {
      const mockDrinkLogs = [
        {
          _id: '507f1f77bcf86cd799439011',
          userId: 'user-123',
          drinkName: 'Craft IPA',
          rating: 4,
          consumedAt: new Date('2024-01-15T19:30:00Z'),
        },
        {
          _id: '507f1f77bcf86cd799439012',
          userId: 'user-123',
          drinkName: 'Lager',
          rating: 3,
          consumedAt: new Date('2024-01-14T19:30:00Z'),
        },
      ];

      DrinkLog.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            skip: jest.fn().mockReturnValue({
              lean: jest.fn().mockResolvedValue(mockDrinkLogs),
            }),
          }),
        }),
      });

      DrinkLog.countDocuments.mockResolvedValue(2);

      const response = await request(app)
        .get('/drink-logs')
        .query({ userId: 'user-123', limit: 50, skip: 0 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(2);
      expect(response.body.pagination.total).toBe(2);
    });

    it('should return 400 if userId is missing', async () => {
      const response = await request(app)
        .get('/drink-logs')
        .query({ limit: 50 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('GET /drink-logs/:id', () => {
    it('should retrieve a specific drink log', async () => {
      const mockDrinkLog = {
        _id: '507f1f77bcf86cd799439011',
        userId: 'user-123',
        drinkName: 'Craft IPA',
        rating: 4,
        consumedAt: new Date('2024-01-15T19:30:00Z'),
      };

      DrinkLog.findOne.mockResolvedValue(mockDrinkLog);

      const response = await request(app)
        .get('/drink-logs/507f1f77bcf86cd799439011')
        .query({ userId: 'user-123' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.drinkName).toBe('Craft IPA');
    });

    it('should return 404 if drink log not found', async () => {
      DrinkLog.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/drink-logs/507f1f77bcf86cd799439011')
        .query({ userId: 'user-123' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    });
  });

  describe('PUT /drink-logs/:id', () => {
    it('should update a drink log successfully', async () => {
      const mockUpdatedDrinkLog = {
        _id: '507f1f77bcf86cd799439011',
        userId: 'user-123',
        drinkName: 'Updated IPA',
        rating: 5,
        consumedAt: new Date('2024-01-15T19:30:00Z'),
      };

      DrinkLog.findOneAndUpdate.mockResolvedValue(mockUpdatedDrinkLog);

      const response = await request(app)
        .put('/drink-logs/507f1f77bcf86cd799439011')
        .send({
          userId: 'user-123',
          drinkName: 'Updated IPA',
          rating: 5,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.drinkName).toBe('Updated IPA');
      expect(response.body.data.rating).toBe(5);
    });

    it('should return 400 if rating is invalid', async () => {
      const response = await request(app)
        .put('/drink-logs/507f1f77bcf86cd799439011')
        .send({
          userId: 'user-123',
          rating: 10, // Invalid
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('DELETE /drink-logs/:id', () => {
    it('should delete a drink log successfully', async () => {
      const mockDeletedDrinkLog = {
        _id: '507f1f77bcf86cd799439011',
        userId: 'user-123',
        isArchived: true,
      };

      DrinkLog.findOneAndUpdate.mockResolvedValue(mockDeletedDrinkLog);

      const response = await request(app)
        .delete('/drink-logs/507f1f77bcf86cd799439011')
        .query({ userId: 'user-123' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.isArchived).toBe(true);
    });

    it('should return 404 if drink log not found', async () => {
      DrinkLog.findOneAndUpdate.mockResolvedValue(null);

      const response = await request(app)
        .delete('/drink-logs/507f1f77bcf86cd799439011')
        .query({ userId: 'user-123' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    });
  });

  describe('GET /drink-logs/stats/average-rating', () => {
    it('should return average rating', async () => {
      DrinkLog.getAverageRating.mockResolvedValue(4.2);

      const response = await request(app)
        .get('/drink-logs/stats/average-rating')
        .query({ userId: 'user-123' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.averageRating).toBe(4.2);
    });
  });

  describe('GET /drink-logs/stats/top-rated', () => {
    it('should return top-rated drinks', async () => {
      const mockTopDrinks = [
        { _id: '1', drinkName: 'Craft IPA', rating: 5 },
        { _id: '2', drinkName: 'Lager', rating: 4 },
      ];

      DrinkLog.getTopRatedDrinks.mockResolvedValue(mockTopDrinks);

      const response = await request(app)
        .get('/drink-logs/stats/top-rated')
        .query({ userId: 'user-123', limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(2);
    });
  });
});
