# Drink Log Integration Guide

## Overview
This document describes the complete integration of the Track Drinking Screen with the backend API for drink logging functionality.

## Architecture

### Frontend (React Native)
- **Screen**: `app/(tabs)/drink-log.jsx` - Main drink logging screen
- **Form Component**: `components/DrinkLogEntryForm.jsx` - Form UI
- **API Client**: `utils/drinkLogApi.js` - API communication layer
- **Validation**: `utils/formValidation.js` - Form validation logic

### Backend (Node.js/Express)
- **Routes**: `apps/app-booze-api/src/routes/drinkLogs.js` - API endpoints
- **Model**: `packages/server/se-db/src/models/DrinkLog.js` - MongoDB schema
- **Database**: MongoDB with proper indexing for performance

## API Endpoints

### Create Drink Log
```
POST /api/v1/drink-logs
```
Creates a new drink log entry with validation.

**Request:**
```json
{
  "userId": "user-123",
  "drinkId": "drink-456",
  "drinkName": "Craft IPA",
  "consumedAt": "2024-01-15T19:30:00Z",
  "quantity": 500,
  "quantityUnit": "ml",
  "rating": 4,
  "notes": "Great hoppy flavor"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Drink log created successfully",
  "data": {
    "_id": "log-789",
    "userId": "user-123",
    "drinkName": "Craft IPA",
    "rating": 4,
    "createdAt": "2024-01-15T19:30:00Z"
  }
}
```

### Get Drink Logs
```
GET /api/v1/drink-logs?userId=user-123&limit=50&skip=0
```
Retrieves user's drink logs with pagination and filtering.

### Get Average Rating
```
GET /api/v1/drink-logs/stats/average-rating?userId=user-123
```
Returns user's average drink rating.

### Get Top-Rated Drinks
```
GET /api/v1/drink-logs/stats/top-rated?userId=user-123&limit=10
```
Returns user's top-rated drinks.

### Update Drink Log
```
PUT /api/v1/drink-logs/:id
```
Updates an existing drink log entry.

### Delete Drink Log
```
DELETE /api/v1/drink-logs/:id?userId=user-123
```
Soft deletes (archives) a drink log entry.

## Frontend Integration

### 1. API Client Usage
```javascript
import { createDrinkLog, getDrinkLogs, retryWithBackoff } from '@/utils/drinkLogApi';

// Create a drink log with retry logic
const drinkLog = await retryWithBackoff(
  () => createDrinkLog(payload),
  3, // maxRetries
  1000 // delay in ms
);

// Get user's drink logs
const { data, pagination } = await getDrinkLogs('user-123', {
  limit: 50,
  skip: 0,
  sortBy: 'consumedAt'
});

// Get average rating
const avgRating = await getAverageRating('user-123');

// Get top-rated drinks
const topDrinks = await getTopRatedDrinks('user-123', 10);
```

### 2. Form Submission Flow
1. User fills out the drink log form
2. Form validation occurs on blur and submit
3. On submit, form data is validated
4. If valid, API call is made with retry logic
5. On success, form is reset and user is notified
6. On error, user is shown error message

### 3. Error Handling
- Network errors are retried with exponential backoff
- Validation errors are shown inline on the form
- API errors are displayed as alerts
- User-friendly error messages are provided

## Backend Integration

### 1. Database Schema
The DrinkLog model includes:
- User reference (userId)
- Drink information (drinkId, drinkName, abv)
- Consumption details (consumedAt, quantity, quantityUnit)
- User feedback (rating, notes, tasteTags)
- Context information (location, socialContext, mood)
- Media (photoUrl)
- Soft delete flag (isArchived)

### 2. Validation
- Required fields: userId, drinkName, consumedAt, quantity, rating
- Rating must be 1-5
- Quantity must be positive
- Proper error messages for each validation failure

### 3. Performance Optimizations
- Compound indexes on (userId, consumedAt) and (userId, rating)
- Lean queries for list endpoints
- Pagination support for large datasets
- Soft deletes to preserve data

## Configuration

### Environment Variables
Add to your `.env` file:
```
EXPO_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Database Setup
Ensure MongoDB is running and the DrinkLog model is initialized:
```javascript
import { DrinkLog } from '@booze/se-db';
```

## Testing

### Unit Tests
Run the drink logs API tests:
```bash
npm test -- apps/app-booze-api/src/routes/__tests__/drinkLogs.test.js
```

### Integration Tests
1. Start the backend server
2. Run the mobile app
3. Test the drink logging flow:
   - Fill out the form
   - Submit the form
   - Verify success message
   - Check database for new entry

### Manual Testing
1. Create a drink log entry
2. Verify it appears in the list
3. Update the entry
4. Delete the entry
5. Check statistics endpoints

## Future Enhancements

### Phase 2
- [ ] Photo upload for drink logs
- [ ] Drink database integration
- [ ] Taste profile analytics
- [ ] Social sharing features
- [ ] Drinking trends analysis

### Phase 3
- [ ] Real-time sync with cloud
- [ ] Offline support with local storage
- [ ] Advanced filtering and search
- [ ] Export functionality
- [ ] Integration with health apps

## Troubleshooting

### API Connection Issues
- Verify API_URL environment variable
- Check backend server is running
- Verify CORS settings
- Check network connectivity

### Validation Errors
- Ensure all required fields are filled
- Check rating is between 1-5
- Verify quantity is positive
- Check date format

### Database Issues
- Verify MongoDB connection
- Check indexes are created
- Verify user ID is valid
- Check for duplicate entries

## Support

For issues or questions:
1. Check the API documentation: `apps/app-booze-api/docs/DRINK_LOGS_API.md`
2. Review the form validation: `apps/app-booze-mobile/utils/formValidation.js`
3. Check the API client: `apps/app-booze-mobile/utils/drinkLogApi.js`
4. Review the backend routes: `apps/app-booze-api/src/routes/drinkLogs.js`
