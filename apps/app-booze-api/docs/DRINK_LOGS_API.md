# Drink Logs API Documentation

## Overview
The Drink Logs API allows users to log their drink consumption, track ratings, and retrieve drinking history with analytics.

## Base URL
```
/api/v1/drink-logs
```

## Endpoints

### 1. Create Drink Log
**POST** `/api/v1/drink-logs`

Create a new drink log entry.

**Request Body:**
```json
{
  "userId": "string (required)",
  "drinkId": "string (optional)",
  "drinkName": "string (required)",
  "consumedAt": "ISO 8601 date (required)",
  "quantity": "number (required, > 0)",
  "quantityUnit": "string (optional, default: 'ml')",
  "rating": "number (required, 1-5)",
  "notes": "string (optional)",
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
  }
}
```

**Error Responses:**
- `404 Not Found` - Drink log not found

---

### 4. Update Drink Log
**PUT** `/api/v1/drink-logs/:id`

Update an existing drink log entry.

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
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "averageRating": "number (0-5)"
  }
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
