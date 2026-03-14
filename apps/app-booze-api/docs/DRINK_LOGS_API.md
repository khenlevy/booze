# Drink Logs API Documentation

## Overview
The Drink Logs API allows users to log their drink consumption, track ratings, and retrieve drinking history with analytics. All endpoints require a `userId` query parameter for authorization and data filtering.

## Base URL
```
/api/v1/drink-logs
```

## Authentication
All endpoints require the `userId` query parameter to identify the user. In a production environment, this should be replaced with proper JWT authentication.

## Endpoints

### 1. Create Drink Log
**POST** `/api/v1/drink-logs`

Create a new drink log entry.

**Request Body:**
```json
{
  "userId": "string (required)",
  "drinkId": "string (optional, MongoDB ObjectId)",
  "drinkName": "string (required, non-empty)",
  "consumedAt": "ISO 8601 date (required)",
  "quantity": "number (required, > 0)",
  "quantityUnit": "string (optional, default: 'ml')",
  "rating": "integer (required, 1-5)",
  "notes": "string (optional, max 1000 chars)",
  "abv": "number (optional, 0-100)",
  "tasteTags": "array of strings (optional)",
  "location": "string (optional)",
  "socialContext": "string (optional)",
  "mood": "string (optional)",
  "photoUrl": "string (optional)"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Drink log created successfully",
  "data": {
    "_id": "string",
    "userId": "string",
    "drinkId": "string or null",
    "drinkName": "string",
    "consumedAt": "ISO 8601 date",
    "quantity": "number",
    "quantityUnit": "string",
    "rating": "number",
    "notes": "string",
    "abv": "number or null",
    "tasteTags": "array",
    "location": "string or null",
    "socialContext": "string or null",
    "mood": "string or null",
    "photoUrl": "string or null",
    "isArchived": false,
    "createdAt": "ISO 8601 date",
    "updatedAt": "ISO 8601 date"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Server error

---

### 2. Get Drink Logs
**GET** `/api/v1/drink-logs`

Retrieve user's drink logs with optional filtering and pagination.

**Query Parameters:**
- `userId` (required) - User ID
- `startDate` (optional) - Filter logs from this date (ISO 8601)
- `endDate` (optional) - Filter logs until this date (ISO 8601)
- `limit` (optional, default: 50) - Number of results to return
- `skip` (optional, default: 0) - Number of results to skip
- `sortBy` (optional, default: 'consumedAt') - Sort field ('consumedAt' or 'rating')

**Example Request:**
```
GET /api/v1/drink-logs?userId=user-123&limit=20&skip=0&sortBy=consumedAt
```

**Response (200 OK):**
**Example Request:**
```bash
curl -X POST http://localhost:3001/api/v1/drink-logs \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "drinkName": "Craft IPA",
    "consumedAt": "2024-01-15T20:30:00Z",
    "quantity": 500,
    "quantityUnit": "ml",
    "rating": 4,
    "abv": 6.5,
    "tasteTags": ["hoppy", "bitter", "citrus"],
    "location": "Local Brewery",
    "mood": "happy"
  }'
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "user-123",
    "drinkId": null,
    "drinkName": "Craft IPA",
    "consumedAt": "2024-01-15T20:30:00.000Z",
    "quantity": 500,
    "quantityUnit": "ml",
    "rating": 4,
    "notes": null,
    "abv": 6.5,
    "tasteTags": ["hoppy", "bitter", "citrus"],
    "location": "Local Brewery",
    "socialContext": null,
    "mood": "happy",
    "photoUrl": null,
    "isArchived": false,
    "createdAt": "2024-01-15T20:35:00.000Z",
    "updatedAt": "2024-01-15T20:35:00.000Z"
  },
  "message": "Drink log created successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Validation Error",
  "message": "Rating must be an integer between 1 and 5"
}
```

---

### 2. Get Drink Logs (List)
**GET** `/api/v1/drink-logs`

Get user's drink logs with optional filtering and pagination.

**Query Parameters:**
- `userId` (required): User identifier
- `startDate` (optional): ISO 8601 date - filter logs from this date onwards
- `endDate` (optional): ISO 8601 date - filter logs up to this date
- `minRating` (optional): Minimum rating (1-5)
- `maxRating` (optional): Maximum rating (1-5)
- `limit` (optional, default: 50, max: 500): Number of results per page
- `skip` (optional, default: 0): Number of results to skip for pagination
- `sortBy` (optional, default: 'consumedAt'): Field to sort by (consumedAt, rating, drinkName, createdAt)
- `sortOrder` (optional, default: 'desc'): Sort order (asc, desc)

**Example Request:**
```bash
curl "http://localhost:3001/api/v1/drink-logs?userId=user-123&limit=10&skip=0&minRating=3&sortBy=consumedAt&sortOrder=desc"
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "userId": "string",
      "drinkName": "string",
      "consumedAt": "ISO 8601 date",
      "quantity": "number",
      "quantityUnit": "string",
      "rating": "number",
      "notes": "string",
      "createdAt": "ISO 8601 date",
      "updatedAt": "ISO 8601 date"
    }
  ],
  "pagination": {
    "total": "number",
    "limit": "number",
    "skip": "number",
    "hasMore": "boolean"
      "_id": "507f1f77bcf86cd799439011",
      "userId": "user-123",
      "drinkName": "Craft IPA",
      "consumedAt": "2024-01-15T20:30:00.000Z",
      "quantity": 500,
      "quantityUnit": "ml",
      "rating": 4,
      "abv": 6.5,
      "isArchived": false,
      "createdAt": "2024-01-15T20:35:00.000Z",
      "updatedAt": "2024-01-15T20:35:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 10,
    "skip": 0,
    "hasMore": true
  }
}
```

---

### 3. Get Drink Log by ID
**GET** `/api/v1/drink-logs/:id`

Retrieve a specific drink log by ID.

**Query Parameters:**
- `userId` (required) - User ID for authorization

**Example Request:**
```
GET /api/v1/drink-logs/507f1f77bcf86cd799439011?userId=user-123
```

**Response (200 OK):**
### 3. Get Single Drink Log
**GET** `/api/v1/drink-logs/:id`

Get a single drink log by ID.

**Query Parameters:**
- `userId` (required): User identifier for authorization

**Example Request:**
```bash
curl "http://localhost:3001/api/v1/drink-logs/507f1f77bcf86cd799439011?userId=user-123"
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "userId": "string",
    "drinkName": "string",
    "consumedAt": "ISO 8601 date",
    "quantity": "number",
    "quantityUnit": "string",
    "rating": "number",
    "notes": "string",
    "createdAt": "ISO 8601 date",
    "updatedAt": "ISO 8601 date"
    "_id": "507f1f77bcf86cd799439011",
    "userId": "user-123",
    "drinkName": "Craft IPA",
    "consumedAt": "2024-01-15T20:30:00.000Z",
    "quantity": 500,
    "quantityUnit": "ml",
    "rating": 4,
    "notes": "Great hoppy flavor",
    "abv": 6.5,
    "tasteTags": ["hoppy", "bitter", "citrus"],
    "location": "Local Brewery",
    "socialContext": "with friends",
    "mood": "happy",
    "photoUrl": "https://example.com/photo.jpg",
    "isArchived": false,
    "createdAt": "2024-01-15T20:35:00.000Z",
    "updatedAt": "2024-01-15T20:35:00.000Z"
  }
}
```

**Error Responses:**
- `404 Not Found` - Drink log not found
**Error Response (404 Not Found):**
```json
{
  "error": "Not Found",
  "message": "Drink log not found"
}
```

---

### 4. Update Drink Log
**PUT** `/api/v1/drink-logs/:id`

Update an existing drink log entry.
Update a drink log entry. Only the fields provided in the request body will be updated.

**Query Parameters:**
- `userId` (required): User identifier for authorization

**Request Body:**
```json
{
  "userId": "string (required)",
  "drinkName": "string (optional)",
  "consumedAt": "ISO 8601 date (optional)",
  "quantity": "number (optional, > 0)",
  "quantityUnit": "string (optional)",
  "rating": "number (optional, 1-5)",
  "notes": "string (optional)",
  "rating": "integer (optional, 1-5)",
  "notes": "string (optional, max 1000 chars)",
  "abv": "number (optional, 0-100)",
  "tasteTags": "array of strings (optional)",
  "location": "string (optional)",
  "socialContext": "string (optional)",
  "mood": "string (optional)",
  "photoUrl": "string (optional)"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Drink log updated successfully",
  "data": {
    "_id": "string",
    "userId": "string",
    "drinkName": "string",
    "consumedAt": "ISO 8601 date",
    "quantity": "number",
    "quantityUnit": "string",
    "rating": "number",
    "notes": "string",
    "updatedAt": "ISO 8601 date"
  }
**Example Request:**
```bash
curl -X PUT "http://localhost:3001/api/v1/drink-logs/507f1f77bcf86cd799439011?userId=user-123" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "notes": "Even better than I remembered!"
  }'
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "user-123",
    "drinkName": "Craft IPA",
    "consumedAt": "2024-01-15T20:30:00.000Z",
    "quantity": 500,
    "quantityUnit": "ml",
    "rating": 5,
    "notes": "Even better than I remembered!",
    "abv": 6.5,
    "isArchived": false,
    "createdAt": "2024-01-15T20:35:00.000Z",
    "updatedAt": "2024-01-15T21:00:00.000Z"
  },
  "message": "Drink log updated successfully"
}
```

---

### 5. Delete Drink Log
**DELETE** `/api/v1/drink-logs/:id`

Soft delete a drink log entry (archives it).

**Query Parameters:**
- `userId` (required) - User ID for authorization

**Example Request:**
```
DELETE /api/v1/drink-logs/507f1f77bcf86cd799439011?userId=user-123
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Drink log deleted successfully",
  "data": {
    "_id": "string",
    "userId": "string",
    "isArchived": true,
    "updatedAt": "ISO 8601 date"
  }
### 5. Delete Drink Log (Soft Delete)
**DELETE** `/api/v1/drink-logs/:id`

Soft delete (archive) a drink log entry. The record is not permanently deleted but marked as archived.

**Query Parameters:**
- `userId` (required): User identifier for authorization

**Example Request:**
```bash
curl -X DELETE "http://localhost:3001/api/v1/drink-logs/507f1f77bcf86cd799439011?userId=user-123"
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "user-123",
    "drinkName": "Craft IPA",
    "isArchived": true,
    "createdAt": "2024-01-15T20:35:00.000Z",
    "updatedAt": "2024-01-15T21:05:00.000Z"
  },
  "message": "Drink log deleted successfully"
}
```

---

### 6. Get Average Rating
**GET** `/api/v1/drink-logs/stats/average-rating`

Get user's average drink rating.

**Query Parameters:**
- `userId` (required) - User ID

**Example Request:**
```
GET /api/v1/drink-logs/stats/average-rating?userId=user-123
```

**Response (200 OK):**
### 6. Restore Drink Log
**POST** `/api/v1/drink-logs/:id/restore`

Restore a previously archived drink log entry.

**Query Parameters:**
- `userId` (required): User identifier for authorization

**Example Request:**
```bash
curl -X POST "http://localhost:3001/api/v1/drink-logs/507f1f77bcf86cd799439011/restore?userId=user-123"
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "averageRating": "number (0-5)"
  }
    "_id": "507f1f77bcf86cd799439011",
    "userId": "user-123",
    "drinkName": "Craft IPA",
    "isArchived": false,
    "createdAt": "2024-01-15T20:35:00.000Z",
    "updatedAt": "2024-01-15T21:10:00.000Z"
  },
  "message": "Drink log restored successfully"
}
```

---

### 7. Get Top-Rated Drinks
**GET** `/api/v1/drink-logs/stats/top-rated`

Get user's top-rated drinks.

**Query Parameters:**
- `userId` (required) - User ID
- `limit` (optional, default: 10) - Maximum number of drinks to return

**Example Request:**
```
GET /api/v1/drink-logs/stats/top-rated?userId=user-123&limit=10
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "userId": "string",
      "drinkName": "string",
      "rating": "number",
      "consumedAt": "ISO 8601 date",
      "quantity": "number",
      "quantityUnit": "string"
    }
  ]
### 7. Get Drink Log Statistics
**GET** `/api/v1/drink-logs/stats/summary`

Get aggregated statistics for a user's drink logs.

**Query Parameters:**
- `userId` (required): User identifier
- `startDate` (optional): ISO 8601 date - filter logs from this date onwards
- `endDate` (optional): ISO 8601 date - filter logs up to this date

**Example Request:**
```bash
curl "http://localhost:3001/api/v1/drink-logs/stats/summary?userId=user-123&startDate=2024-01-01&endDate=2024-01-31"
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalLogs": 15,
      "averageRating": 4.2,
      "minRating": 2,
      "maxRating": 5,
      "totalQuantity": 7500,
      "averageQuantity": 500,
      "averageAbv": 5.8
    },
    "topDrinks": [
      {
        "_id": "Craft IPA",
        "count": 5,
        "averageRating": 4.6
      },
      {
        "_id": "Lager",
        "count": 3,
        "averageRating": 3.8
      }
    ],
    "ratingDistribution": [
      {
        "_id": 2,
        "count": 1
      },
      {
        "_id": 3,
        "count": 2
      },
      {
        "_id": 4,
        "count": 7
      },
      {
        "_id": 5,
        "count": 5
      }
    ]
  }
}
```

---

## Data Models

### DrinkLog Schema
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| userId | ObjectId | Yes | Reference to user |
| drinkId | ObjectId | No | Reference to drink |
| drinkName | String | Yes | Name of the drink |
| consumedAt | Date | Yes | When drink was consumed |
| quantity | Number | Yes | Amount consumed (> 0) |
| quantityUnit | String | No | Unit of measurement (ml, oz, shot, glass, pint, bottle) |
| rating | Number | Yes | User rating (1-5) |
| notes | String | No | Optional notes (max 1000 chars) |
| abv | Number | No | Alcohol by volume (0-100) |
| tasteTags | Array | No | Taste profile tags |
| location | String | No | Where drink was consumed |
| socialContext | String | No | Social context (alone, with_friends, at_event, at_bar, at_home) |
| mood | String | No | User's mood/feeling |
| photoUrl | String | No | Photo reference |
| isArchived | Boolean | No | Soft delete flag |
| createdAt | Date | Auto | Creation timestamp |
| updatedAt | Date | Auto | Last update timestamp |

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Validation Error | Invalid request data |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

---

## Examples

### Create a Drink Log
```bash
curl -X POST http://localhost:3001/api/v1/drink-logs \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "drinkName": "Craft IPA",
    "consumedAt": "2024-01-15T19:30:00Z",
    "quantity": 500,
    "quantityUnit": "ml",
    "rating": 4,
    "notes": "Great hoppy flavor",
    "abv": 6.5
  }'
```

### Get User's Drink Logs
```bash
curl http://localhost:3001/api/v1/drink-logs?userId=user-123&limit=10
```

### Get Average Rating
```bash
curl http://localhost:3001/api/v1/drink-logs/stats/average-rating?userId=user-123
```

---

## Integration Notes

- All timestamps are in ISO 8601 format
- Soft deletes are used (isArchived flag)
- Pagination is supported for large datasets
- Compound indexes on (userId, consumedAt) and (userId, rating) for performance
- All endpoints require userId for authorization
## Error Codes

| Code | Error | Description |
|------|-------|-------------|
| 400 | Validation Error | Invalid request parameters or body |
| 404 | Not Found | Drink log not found |
| 500 | Internal Server Error | Server error during processing |

## Validation Rules

### Required Fields
- `userId`: Non-empty string
- `drinkName`: Non-empty string
- `consumedAt`: Valid ISO 8601 date
- `quantity`: Positive number
- `rating`: Integer between 1 and 5

### Optional Field Constraints
- `abv`: Number between 0 and 100
- `notes`: String with maximum 1000 characters
- `quantity`: Minimum 0.1
- `quantityUnit`: One of: ml, oz, shot, glass, pint, bottle
- `tasteTags`: Array of strings

## Pagination

All list endpoints support pagination using `limit` and `skip` parameters:
- `limit`: Number of results per page (default: 50, max: 500)
- `skip`: Number of results to skip (default: 0)

The response includes a `pagination` object with:
- `total`: Total number of matching records
- `limit`: Current page limit
- `skip`: Current skip value
- `hasMore`: Boolean indicating if more records exist

## Sorting

List endpoints support sorting via `sortBy` and `sortOrder` parameters:
- `sortBy`: Field to sort by (consumedAt, rating, drinkName, createdAt)
- `sortOrder`: Sort direction (asc, desc)

## Soft Delete Strategy

Drink logs are soft-deleted using an `isArchived` flag:
- Deleted logs are not returned in list queries
- Deleted logs can be restored using the restore endpoint
- All historical data is preserved in the database

## Rate Limiting

Currently, no rate limiting is implemented. In production, implement rate limiting to prevent abuse.

## Future Enhancements

- JWT authentication instead of userId query parameter
- Rate limiting per user
- Export drink logs to CSV/PDF
- Social sharing features
- Integration with drink recommendation engine
- Advanced analytics and reporting
- Batch operations for multiple drink logs
