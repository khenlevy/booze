import express from 'express';
import {
  createDrinkLog,
  getDrinkLog,
  getDrinkLogs,
  updateDrinkLog,
  deleteDrinkLog,
  restoreDrinkLog,
  getDrinkLogStats,
} from '../controllers/drinkLogController.js';

const router = express.Router();

/**
 * GET /api/v1/drink-logs/stats/summary
 * Get drink log statistics for a user
 * Must be before /:id route to avoid route conflicts
 */
router.get('/stats/summary', getDrinkLogStats);

/**
 * POST /api/v1/drink-logs
 * Create a new drink log entry
 */
router.post('/', createDrinkLog);

/**
 * GET /api/v1/drink-logs
 * Get user's drink logs with optional filtering and pagination
 */
router.get('/', getDrinkLogs);

/**
 * GET /api/v1/drink-logs/:id
 * Get a single drink log by ID
 */
router.get('/:id', getDrinkLog);

/**
 * PUT /api/v1/drink-logs/:id
 * Update a drink log entry
 */
router.put('/:id', updateDrinkLog);

/**
 * DELETE /api/v1/drink-logs/:id
 * Soft delete a drink log entry (archive)
 */
router.delete('/:id', deleteDrinkLog);

/**
 * POST /api/v1/drink-logs/:id/restore
 * Restore an archived drink log entry
 */
router.post('/:id/restore', restoreDrinkLog);

export default router;
