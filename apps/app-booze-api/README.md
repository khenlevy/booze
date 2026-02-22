# Stocks API - Jobs Collection Backend

A simple, clean Express.js API for managing the Jobs collection from the Buydy stocks scanner system.

## Features

- **RESTful API** for Jobs collection CRUD operations
- **Real-time job monitoring** with status tracking
- **Job statistics** and analytics
- **MongoDB integration** using the se-db package
- **Error handling** and validation
- **CORS enabled** for frontend integration
- **Health checks** for monitoring

## API Endpoints

### Jobs Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/jobs` | Get all jobs with filtering and pagination |
| `GET` | `/api/v1/jobs/:id` | Get a specific job by ID |
| `POST` | `/api/v1/jobs` | Create a new job |
| `PUT` | `/api/v1/jobs/:id` | Update job status, progress, or add logs |
| `DELETE` | `/api/v1/jobs/:id` | Delete a job |

### Specialized Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/jobs/stats` | Get job statistics (total, running, completed, failed) |
| `GET` | `/api/v1/jobs/recent` | Get recent jobs (last 24 hours) |
| `GET` | `/api/v1/jobs/running` | Get currently running jobs |
| `GET` | `/api/v1/jobs/failed` | Get failed jobs (optionally since a date) |
| `GET` | `/api/v1/jobs/history/:name` | Get job history for a specific job name |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | API health status |

## Job Document Structure

Based on the se-db Jobs model:

```javascript
{
  _id: ObjectId,
  name: String,              // Job name/identifier (required)
  status: String,            // "scheduled", "running", "completed", "failed"
  scheduledAt: Date,         // When job was scheduled
  startedAt: Date,           // When job started executing
  endedAt: Date,             // When job finished
  progress: Number,          // Progress (0.0 to 1.0)
  result: Mixed,             // Job execution result
  error: String,             // Error message (on failure)
  logs: [{                   // Job execution logs
    ts: Date,
    level: "info" | "warn" | "error",
    msg: String
  }],
  metadata: Mixed            // Job metadata
}
```

## Query Parameters

### GET /api/v1/jobs
- `status` - Filter by job status
- `name` - Filter by job name (partial match)
- `limit` - Number of results (default: 50)
- `skip` - Number of results to skip (default: 0)
- `sortBy` - Field to sort by (default: "scheduledAt")
- `sortOrder` - Sort order: "asc" or "desc" (default: "desc")

### GET /api/v1/jobs/failed
- `since` - ISO date string to filter failed jobs since

### GET /api/v1/jobs/history/:name
- `limit` - Number of historical jobs to return (default: 20)

## Request/Response Examples

### Create a Job
```bash
POST /api/v1/jobs
Content-Type: application/json

{
  "name": "Large Cap Analysis",
  "metadata": {
    "priority": "high",
    "type": "analysis"
  }
}
```

### Update Job Progress
```bash
PUT /api/v1/jobs/64f7b8c9d1234567890abcde
Content-Type: application/json

{
  "progress": 0.75,
  "logMessage": "Processing 75% complete",
  "logLevel": "info"
}
```

### Mark Job as Completed
```bash
PUT /api/v1/jobs/64f7b8c9d1234567890abcde
Content-Type: application/json

{
  "status": "completed",
  "result": {
    "processed": 1250,
    "success": 1200,
    "failed": 50
  }
}
```

### Get Job Statistics
```bash
GET /api/v1/jobs/stats
```

Response:
```json
{
  "stats": {
    "total": 1234,
    "scheduled": 5,
    "running": 3,
    "completed": 1200,
    "failed": 26
  },
  "recentActivity": 45
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
API_PORT=3001
NODE_ENV=development

# Database Configuration (uses se-db defaults)
MONGO_URL=mongodb://localhost:27017
MONGO_DATABASE=buydy_db
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USERNAME=
MONGO_PASSWORD=

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- Access to the Buydy monorepo

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables (see above)

3. Start the development server:
```bash
yarn dev
```

4. The API will be available at `http://localhost:3001`

### Production

```bash
yarn start
```

## Integration with Frontend

This API is designed to work with the `app-stocks-web` React application:

1. **CORS** is configured to allow requests from `http://localhost:3000`
2. **Error handling** returns consistent JSON error responses
3. **Pagination** is built-in for large job lists
4. **Real-time updates** can be achieved by polling the `/running` endpoint

## Development

### Project Structure
```
src/
├── controllers/
│   └── jobsController.js    # Job CRUD operations
├── routes/
│   └── jobs.js             # Job API routes
├── middlewares/
│   └── errorHandler.js     # Error handling middleware
└── index.js                # Express app setup
```

### Adding New Endpoints

1. Add controller function in `jobsController.js`
2. Add route in `routes/jobs.js`
3. Update this README with endpoint documentation

## Monitoring

- Health check endpoint: `GET /health`
- Error logging to console
- Graceful shutdown handling
- Database connection monitoring

## License

Part of the Buydy monorepo.
