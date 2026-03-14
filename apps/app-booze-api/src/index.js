// Load environment variables FIRST before any other imports that depend on them
import { loadEnvironmentVariables } from './config/envLoader.js';
loadEnvironmentVariables();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ensureConnected, closeDatabase } from '@booze/se-db';
import logger from '@booze/se-logger';
import jobsRoutes from './routes/jobs.js';
import jobTypesRoutes from './routes/jobTypes.js';
import stocksRoutes from './routes/stocks.js';
import eodhdUsageRoutes from './routes/eodhdUsage.js';
import heatmapRoutes from './routes/heatmap.js';
import rankingRoutes from './routes/ranking.js';
import recommendationsRoutes from './routes/recommendations.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const API_PORT = process.env.API_PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'app-booze-api',
  });
});

// API routes
app.use('/api/v1/jobs', jobsRoutes);
app.use('/api/v1/job-types', jobTypesRoutes);
app.use('/api/v1/stocks', stocksRoutes);
app.use('/api/v1/eodhd-usage', eodhdUsageRoutes);
app.use('/api/v1/metrics/heatmap', heatmapRoutes);
app.use('/api/v1/ranking', rankingRoutes);
app.use('/api/v1/recommendations', recommendationsRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.business('SIGTERM received, shutting down gracefully');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.business('SIGINT received, shutting down gracefully');
  await closeDatabase();
  process.exit(0);
});

// Start server
async function startServer() {
  try {
    // Ensure database connection - MongoDB is required
    await ensureConnected();
    logger.business('✅ Database connected');

    app.listen(API_PORT, () => {
      logger.business(`🚀 Server running on port ${API_PORT}`);
      logger.business(
        `📊 Jobs API available at http://localhost:${API_PORT}/api/v1/jobs`,
      );
      logger.business(
        `📋 Job Types API available at http://localhost:${API_PORT}/api/v1/job-types`,
      );
      logger.business(
        `📈 Stocks API available at http://localhost:${API_PORT}/api/v1/stocks`,
      );
      logger.business(
        `📊 EODHD Usage API available at http://localhost:${API_PORT}/api/v1/eodhd-usage`,
      );
      logger.business(
        `🗺️  Metrics Heatmap API available at http://localhost:${API_PORT}/api/v1/metrics/heatmap`,
      );
      logger.business(
        `📊 Ranking API available at http://localhost:${API_PORT}/api/v1/ranking`,
      );
      logger.business(
        `🍹 Recommendations API available at http://localhost:${API_PORT}/api/v1/recommendations`,
      );
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
