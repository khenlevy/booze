# Drink History Screen Integration Guide

## Overview
This document describes the complete integration of the Drink History Screen with the backend API for displaying user's drink consumption history with filtering, sorting, and management capabilities.

## Architecture

### Frontend (React Native)
- **Screen**: `app/(tabs)/drink-history.jsx` - Main drink history screen
- **List Component**: `components/DrinkHistoryList.jsx` - Container component managing list state
- **List Item Component**: `components/DrinkHistoryListItem.jsx` - Individual drink entry UI
- **API Client**: `utils/drinkLogApi.js` - API communication layer

### Backend (Node.js/Express)
- **Routes**: `apps/app-booze-api/src/routes/drinkLogs.js` - API endpoints
- **Controller**: `apps/app-booze-api/src/controllers/drinkLogController.js` - Business logic
- **Model**: `packages/server/se-db/src/models/DrinkLog.js` - MongoDB schema
- **Database**: MongoDB with proper indexing for performance

## API Endpoints Used

### Get Drink Logs
```
GET /api/v1/drink-logs?userId={userId}&limit=50&skip={skip}&sortBy=consumedAt&sortOrder=desc
```

**Query Parameters:**
- `userId` (required): User ID
- `limit` (optional): Number of results (1-500, default: 50)
- `skip` (optional): Number of results to skip (default: 0)
- `sortBy` (optional): Field to sort by (consumedAt, rating, drinkName, createdAt)
- `sortOrder` (optional): Sort order (asc, desc)
- `startDate` (optional): Start date for filtering (ISO 8601)
- `endDate` (optional): End date for filtering (ISO 8601)
- `minRating` (optional): Minimum rating (1-5)
- `maxRating` (optional): Maximum rating (1-5)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "userId": "...",
      "drinkName": "Beer",
      "consumedAt": "2024-01-15T20:30:00Z",
      "quantity": 500,
      "quantityUnit": "ml",
      "rating": 4,
      "notes": "Great taste",
      "abv": 5.5,
      "tasteTags": ["hoppy", "bitter"],
      "createdAt": "2024-01-15T20:35:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 50,
    "skip": 0,
    "hasMore": true
  }
}
```

### Delete Drink Log
```
DELETE /api/v1/drink-logs/:id?userId={userId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "isArchived": true
  }
}
```

## Component Structure

### DrinkHistoryScreen (`app/(tabs)/drink-history.jsx`)
Main screen component that:
- Displays drink history list
- Manages filter and sort state
- Provides filter UI modal
- Handles navigation to edit/detail screens

**Props:** None (uses internal state)

**Key Features:**
- Pull-to-refresh functionality
- Filter by date range and rating
- Sort by date, rating, or name
- Filter modal with preset options

### DrinkHistoryList (`components/DrinkHistoryList.jsx`)
Container component that:
- Manages drink logs data fetching
- Handles pagination and infinite scroll
- Manages loading, error, and empty states
- Provides refresh and load more functionality

**Props:**
```javascript
{
  userId: string (required),
  onEditDrink: function (optional),
  onDrinkPress: function (optional),
  filters: object (optional),
  sortBy: string (optional, default: 'consumedAt'),
  sortOrder: string (optional, default: 'desc'),
}
```

**Features:**
- Automatic data fetching on mount
- Pull-to-refresh
- Infinite scroll pagination
- Error handling with retry
- Empty state display
- Loading indicators

### DrinkHistoryListItem (`components/DrinkHistoryListItem.jsx`)
Presentational component that:
- Displays individual drink log entry
- Shows drink details (name, date, rating, quantity, ABV, notes, tags)
- Provides edit and delete actions
- Handles delete confirmation

**Props:**
```javascript
{
  drinkLog: object (required),
  onEdit: function (required),
  onDelete: function (required),
  onPress: function (required),
}
```

**Features:**
- Star rating display
- Formatted date/time
- Quantity and ABV display
- Notes and taste tags
- Edit/Delete action buttons
- Delete confirmation dialog

## API Client Usage

### Import
```javascript
import {
  getDrinkLogs,
  deleteDrinkLog,
  getAverageRating,
  getTopRatedDrinks,
  retryWithBackoff,
} from '@/utils/drinkLogApi';
```

### Get Drink Logs
```javascript
// Basic usage
const { data, pagination } = await getDrinkLogs('user-123', {
  limit: 50,
  skip: 0,
  sortBy: 'consumedAt',
  sortOrder: 'desc',
});

// With filtering
const { data, pagination } = await getDrinkLogs('user-123', {
  limit: 50,
  skip: 0,
  sortBy: 'rating',
  sortOrder: 'desc',
  minRating: 4,
  maxRating: 5,
  startDate: '2024-01-01T00:00:00Z',
  endDate: '2024-01-31T23:59:59Z',
});

// With retry logic
const result = await retryWithBackoff(
  () => getDrinkLogs('user-123', { limit: 50 }),
  3, // maxRetries
  1000 // delay in ms
);
```

### Delete Drink Log
```javascript
try {
  await deleteDrinkLog('user-123', 'drink-log-id');
  // Update UI to remove deleted item
} catch (error) {
  console.error('Failed to delete:', error);
}
```

### Get Statistics
```javascript
const avgRating = await getAverageRating('user-123');
const topDrinks = await getTopRatedDrinks('user-123', 10);
```

## Styling

All components use the Parcus theme for consistent styling:

**Colors:**
- Primary: `#5572C3` (brand.primary)
- Background: `#F9F6FF` (background.primary)
- Text Primary: `#32253C` (text.primary)
- Text Secondary: `#666666` (text.secondary)
- Success: `#4CAF50` (state.success)
- Error: `#F44336` (state.error)

**Typography:**
- h1: 32px, bold
- h2: 24px, 600 weight
- body1: 16px, 400 weight
- body2: 14px, 400 weight
- button: 16px, 600 weight

## Features Implemented

### Core Features
✅ Display drink history list with pagination
✅ Pull-to-refresh functionality
✅ Infinite scroll pagination
✅ Delete drink logs with confirmation
✅ Edit drink logs (navigation to edit screen)
✅ View drink details (navigation to detail screen)

### Filtering
✅ Filter by date range (startDate, endDate)
✅ Filter by rating range (minRating, maxRating)
✅ Preset filter options in modal

### Sorting
✅ Sort by date (newest/oldest)
✅ Sort by rating (highest/lowest)
✅ Sort by name (A-Z)
✅ Sort by creation date

### UI/UX
✅ Loading state with spinner
✅ Error state with retry button
✅ Empty state message
✅ Loading indicator for pagination
✅ Star rating display
✅ Formatted date/time display
✅ Taste tags display
✅ Notes display
✅ Quantity and ABV display
✅ Delete confirmation dialog
✅ Filter modal with preset options
✅ Responsive design

## Error Handling

The components handle various error scenarios:

1. **Network Errors**: Display error message with retry button
2. **API Errors**: Show error message from API response
3. **Empty State**: Display "No drinks logged yet" message
4. **Timeout**: Implement retry logic with exponential backoff
5. **Delete Errors**: Show error alert and allow retry

## Performance Optimizations

1. **Pagination**: Load 50 items per page to reduce initial load time
2. **Lazy Loading**: Load more items as user scrolls (infinite scroll)
3. **Memoization**: Use useCallback for event handlers
4. **Efficient Re-renders**: Only update affected items on delete
5. **Indexed Queries**: Backend uses indexes on userId, consumedAt, rating

## Testing

### Unit Tests
Test individual components:
```bash
npm test -- components/DrinkHistoryListItem.test.js
npm test -- components/DrinkHistoryList.test.js
npm test -- app/(tabs)/drink-history.test.js
```

### Integration Tests
Test API integration:
```bash
npm test -- utils/drinkLogApi.test.js
```

### Manual Testing
1. Navigate to Drink History screen
2. Verify list loads with drink entries
3. Test pull-to-refresh
4. Test infinite scroll pagination
5. Test filtering by date and rating
6. Test sorting options
7. Test edit navigation
8. Test delete with confirmation
9. Test error handling (disable network)
10. Test empty state (no drinks logged)

## Future Enhancements

1. **Search**: Add search by drink name
2. **Export**: Export drink history as CSV/PDF
3. **Statistics**: Show charts and analytics
4. **Favorites**: Mark favorite drinks
5. **Sharing**: Share drink logs with friends
6. **Notifications**: Remind user to log drinks
7. **Offline Support**: Cache data for offline access
8. **Advanced Filters**: Filter by location, social context, etc.

## Troubleshooting

### List not loading
- Check userId is provided correctly
- Verify API endpoint is accessible
- Check network connectivity
- Review API response in console

### Pagination not working
- Ensure hasMore flag is true in pagination object
- Check skip and limit values
- Verify API returns pagination metadata

### Delete not working
- Confirm userId matches logged-in user
- Check delete endpoint is accessible
- Verify drink log exists before delete

### Filters not applying
- Ensure filter values are passed to getDrinkLogs
- Check date format is ISO 8601
- Verify rating values are 1-5

## Related Documentation

- [Drink Log API Documentation](../app-booze-api/docs/DRINK_LOGS_API.md)
- [Drink Log Integration Guide](./DRINK_LOG_INTEGRATION.md)
- [Parcus Theme Documentation](./constants/parcus-theme.js)
