# app-booze-api

A RESTful Express.js API for the Booze monorepo. Manages Jobs, stocks data, and related collections with MongoDB via the `@booze/se-db` package.

## Features

- **RESTful API** with versioned routes (`/api/v1/`)
- **MongoDB integration** via `@booze/se-db`
- **Error handling** with consistent JSON responses
- **CORS** for frontend integration
- **Health checks** for monitoring
- **Graceful shutdown** on SIGTERM/SIGINT

---

## API Endpoints Reference

| Resource | Base Path | Description |
|----------|-----------|-------------|
| Jobs | `/api/v1/jobs` | CRUD, stats, recent, running, failed, history |
| Health | `/health` | Service health check |

See `docs/API_DOCUMENTATION.md` for full endpoint details, request/response examples, and query parameters.

---

## Project Structure

```
src/
├── config/
│   └── envLoader.js         # Environment loading (.env.dev, .env.production)
├── controllers/             # Business logic per resource
│   └── jobsController.js
├── middlewares/
│   └── errorHandler.js      # Global error handler (must be last)
├── routes/                  # Express route definitions
│   └── jobs.js
├── index.js                 # App entry, middleware setup, route mounting
└── checkDatabase.js         # DB utilities
```

---

## How to Create a New API Endpoint

### 1. Add a Controller Function

Create or extend a controller in `src/controllers/`.

**Controller conventions:**

- Use `async` handler functions
- Accept `(req, res, next)`
- Pass errors to `next(error)` — never swallow or rethrow
- Return `res.status().json()` for all responses
- Use `return` for early exits (e.g. validation, 404)

```javascript
// src/controllers/exampleController.js
import { getModel } from '@booze/se-db';
import logger from '@booze/se-logger';

/**
 * Get all items with optional filtering and pagination
 */
export const getAllItems = async (req, res, next) => {
  try {
    const { limit = 50, skip = 0 } = req.query;

    const Model = getModel('example');
    const items = await Model.find({})
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .lean();

    const total = await Model.countDocuments();

    res.json({
      items,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: parseInt(skip) + parseInt(limit) < total,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single item by ID
 */
export const getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Model = getModel('example');
    const item = await Model.findById(id).lean();

    if (!item) {
      return res.status(404).json({
        error: 'Not found',
        message: `Item with ID ${id} does not exist`,
      });
    }

    res.json({ item });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new item
 */
export const createItem = async (req, res, next) => {
  try {
    const { name, metadata = {} } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Name is required',
      });
    }

    const Model = getModel('example');
    const item = new Model({ name, metadata });
    await item.save();

    res.status(201).json({ item });
  } catch (error) {
    next(error);
  }
};
```

### 2. Create or Extend Routes

Create a route file in `src/routes/` or add to an existing one.

**Route order matters:** place more specific routes before parameterized ones (`/:id`).

```javascript
// src/routes/example.js
import express from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
} from '../controllers/exampleController.js';

const router = express.Router();

// Specific routes first (e.g. /stats, /recent)
router.get('/stats', getStats);

// CRUD
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
```

### 3. Mount the Route in `index.js`

```javascript
// src/index.js
import exampleRoutes from './routes/example.js';

// API routes
app.use('/api/v1/example', exampleRoutes);
```

### 4. Document the Endpoint

Add the endpoint to this README and to `docs/API_DOCUMENTATION.md` with:

- Method and path
- Query params
- Request body
- Response shape
- Error responses

---

## Routes Conventions

### Route Order

- Static paths first: `/stats`, `/recent`, `/running`, `/failed`
- Then parameterized: `/:id`, `/:name`
- Avoid `/all` conflicting with `/:id` — use `/all` before `/:id` or a different path

### Naming

- Use kebab-case for URLs: `/api/v1/job-types`, `/api/v1/eodhd-usage`
- Use plural nouns for collections: `/jobs`, `/stocks`
- Use camelCase for controller functions: `getAllJobs`, `getJobById`

### URL Structure

```
/api/v1/{resource}           # Collection
/api/v1/{resource}/:id       # Single item
/api/v1/{resource}/stats     # Aggregations
/api/v1/{resource}/:id/run   # Sub-resource actions
```

---

## Middlewares

### When to Use Middleware

| Use case | Where | Example |
|----------|-------|---------|
| Global auth | `index.js` before routes | `app.use(authenticate)` |
| Route-specific auth | `router.get('/admin', auth, adminHandler)` | `app.use('/api/v1/admin', authMiddleware, adminRoutes)` |
| Request validation | Per route | `router.post('/', validateBody(schema), createHandler)` |
| Logging | `index.js` | `app.use(morgan('combined'))` |
| Error handling | `index.js` last | `app.use(errorHandler)` |

### Global Middleware Order (index.js)

1. `helmet()` — security headers
2. `cors()` — CORS
3. `morgan()` — request logging
4. `express.json()` — body parsing
5. Routes
6. 404 handler
7. `errorHandler` — must be last

### Creating a New Middleware

```javascript
// src/middlewares/validateBody.js
export const validateBody = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.details.map((d) => d.message).join(', '),
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
```

Usage:

```javascript
router.post('/', validateBody(createJobSchema), createJob);
```

---

## Error Handling

### Controller Pattern

Always use `try/catch` and `next(error)`:

```javascript
export const myHandler = async (req, res, next) => {
  try {
    // ... logic
    res.json({ data });
  } catch (error) {
    next(error);
  }
};
```

### Returning Errors in Controllers

For validation or 404, return early and do not call `next`:

```javascript
if (!name) {
  return res.status(400).json({
    error: 'Validation Error',
    message: 'Name is required',
  });
}

if (!job) {
  return res.status(404).json({
    error: 'Not found',
    message: `Job with ID ${id} does not exist`,
  });
}
```

For unexpected errors, use `next(error)` so the global error handler can respond.

### Error Response Format

All errors go through `errorHandler.js` and return:

```json
{
  "error": "Error message",
  "details": "Optional details (dev only in production)",
  "timestamp": "2025-02-26T12:00:00.000Z",
  "path": "/api/v1/jobs"
}
```

### Handled Error Types

| Error | Status | Notes |
|-------|--------|-------|
| `ValidationError` (Mongoose) | 400 | Validation Error |
| `CastError` (invalid ObjectId) | 400 | Invalid ID format |
| `err.code === 11000` | 409 | Duplicate entry |
| `err.statusCode` | Custom | Use `err.statusCode` |
| Other | 500 | Internal Server Error (details hidden in production) |

### Custom Status Codes

Throw errors with `statusCode`:

```javascript
const err = new Error('Job already running');
err.statusCode = 409;
next(err);
```

---

## API Standards

### Response Shapes

- **Single item:** `{ item }` or `{ job }`
- **List:** `{ items }` or `{ jobs }`
- **Paginated:** `{ items, pagination: { total, limit, skip, hasMore } }`
- **Stats:** `{ stats: {...}, recentActivity?: number }`

### HTTP Status Codes

- `200` — Success
- `201` — Created
- `400` — Bad Request (validation)
- `404` — Not Found
- `409` — Conflict (duplicate, already running)
- `500` — Internal Server Error

### Query Parameters

- `limit` — default 50
- `skip` — default 0
- `sortBy` — default by resource
- `sortOrder` — `asc` / `desc`

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `API_PORT` | Server port | `3001` |
| `NODE_ENV` | `development` / `production` | `development` |
| `MONGO_URL` | MongoDB connection string | — |
| `MONGO_DATABASE` | Database name | — |
| `FRONTEND_URL` | CORS origin | `http://localhost:3000` |

Env files: `.env.dev` (development), `.env.production` (production), `.env` fallback.

---

## Getting Started

```bash
yarn install
yarn dev   # Development
yarn start # Production
```

Health check: `GET http://localhost:3001/health`

---

## For AI Coding Agents

### Before Starting

1. Read this README
2. Check `docs/API_DOCUMENTATION.md` for existing endpoints
3. Inspect `src/controllers/` and `src/routes/` for patterns

### When Adding Endpoints

1. Add controller in `src/controllers/{resource}Controller.js`
2. Add route in `src/routes/{resource}.js` (order: specific before `/:id`)
3. Mount `app.use('/api/v1/{resource}', routes)` in `index.js`
4. Update `docs/API_DOCUMENTATION.md` and this README

### When Adding Middleware

1. Create in `src/middlewares/`
2. Use `(req, res, next)` signature
3. Call `next()` or `next(error)` for errors
4. Global middleware: add in `index.js` before routes
5. Route-specific: pass as second arg, e.g. `router.get('/path', middleware, handler)`

### Error Handling Rules

- Always `try/catch` in async controllers
- Use `next(error)` for unexpected errors
- Use `return res.status(404).json(...)` for validation/not-found
- Do not add custom error handling in routes; let `errorHandler` format responses

### Code Style

- Use `@booze/se-logger` for logging
- Use `@booze/se-db` for models (`getModel`, `Jobs`, etc.)
- Use `.lean()` for read-only queries
- Use JSDoc for exported functions

### Checklist for New Features

- [ ] Controller in `controllers/`
- [ ] Route in `routes/`
- [ ] Route mounted in `index.js`
- [ ] Docs updated
- [ ] Error cases handled (404, 400, 409)
- [ ] Pagination for list endpoints
