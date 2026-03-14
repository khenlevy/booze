# Drink Recommendations API Documentation

## Overview

The Recommendations API provides personalized drink recommendations based on user's drink history, ratings, and taste preferences. The algorithm integrates drink ratings into the recommendation system to suggest drinks the user is likely to enjoy.

## Base URL

```
/api/v1/recommendations
```

## Core Concepts

### Rating-Based Recommendations

The recommendation system uses drink ratings (1-5 stars) as the primary signal for personalization:

- **User Ratings**: Each drink log entry includes a rating (1-5)
- **Aggregation**: Ratings are aggregated across multiple logs of the same drink
- **Scoring**: Recommendations are scored based on average rating and frequency
- **Filtering**: Users can filter recommendations by minimum rating threshold

### Recommendation Score Calculation

```
Recommendation Score = (Average Rating / 5) × 70 + (Frequency × 3) × 30
```

- **Rating Component (70%)**: Higher-rated drinks are prioritized
- **Frequency Component (30%)**: Drinks consumed more often get a boost (capped at 30 points)

## Endpoints

### 1. Get Personalized Recommendations

**GET** `/api/v1/recommendations`

Get personalized drink recommendations based on user's complete drink history and ratings.

**Query Parameters:**

- `userId` (required) - User ID
- `limit` (optional, default: 10) - Maximum number of recommendations to return
- `minRating` (optional, default: 3) - Minimum rating threshold (1-5)
- `tasteTags` (optional) - Comma-separated taste tags to filter by
- `sortBy` (optional, default: 'rating') - Sort field: 'rating', 'frequency', or 'recent'

**Example Request:**

```
GET /api/v1/recommendations?userId=user-123&limit=10&minRating=3&sortBy=rating
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "drinkName": "Whiskey Sour",
      "drinkId": "drink-456",
      "averageRating": 4.5,
      "timesConsumed": 3,
      "lastConsumed": "2024-01-15T20:30:00Z",
      "tasteTags": ["sour", "whiskey", "citrus"],
      "recommendationScore": 85.5,
      "reason": "You rated this 4.5/5 stars (3 times)"
    }
  ],
  "count": 1
}
```

**Response Fields:**

- `drinkName` - Name of the recommended drink
- `drinkId` - Database ID of the drink (if available)
- `averageRating` - Average rating user gave this drink (0-5)
- `timesConsumed` - Number of times user has logged this drink
- `lastConsumed` - ISO 8601 timestamp of last consumption
- `tasteTags` - Array of taste profile tags
- `recommendationScore` - Calculated recommendation score (0-100)
- `reason` - Human-readable explanation for the recommendation

---

### 2. Get Top-Rated Recommendations

**GET** `/api/v1/recommendations/top-rated`

Get recommendations based on the user's highest-rated drinks.

**Query Parameters:**

- `userId` (required) - User ID
- `limit` (optional, default: 10) - Maximum number of recommendations

**Example Request:**

```
GET /api/v1/recommendations/top-rated?userId=user-123&limit=5
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "drinkName": "Margarita",
      "drinkId": "drink-789",
      "averageRating": 5.0,
      "timesConsumed": 2,
      "lastConsumed": "2024-01-20T19:00:00Z",
      "recommendationScore": 96.0,
      "reason": "Your highest-rated drink"
    }
  ],
  "count": 1
}
```

---

### 3. Get Taste-Based Recommendations

**GET** `/api/v1/recommendations/by-taste`

Get recommendations based on matching taste profiles with high ratings.

**Query Parameters:**

- `userId` (required) - User ID
- `tasteTags` (required) - Comma-separated taste tags to match
- `limit` (optional, default: 10) - Maximum number of recommendations
- `minRating` (optional, default: 3) - Minimum rating threshold

**Example Request:**

```
GET /api/v1/recommendations/by-taste?userId=user-123&tasteTags=sweet,fruity&limit=10&minRating=3
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "drinkName": "Piña Colada",
      "drinkId": "drink-101",
      "rating": 4.0,
      "tasteTags": ["sweet", "fruity", "coconut"],
      "consumedAt": "2024-01-18T18:30:00Z",
      "recommendationScore": 80.0,
      "reason": "Matches your taste preferences: sweet, fruity"
    }
  ],
  "count": 1
}
```

---

### 4. Get Rating-Filtered Recommendations

**GET** `/api/v1/recommendations/by-rating`

Get recommendations filtered by a specific rating range.

**Query Parameters:**

- `userId` (required) - User ID
- `minRating` (optional, default: 3) - Minimum rating (1-5)
- `maxRating` (optional, default: 5) - Maximum rating (1-5)
- `limit` (optional, default: 10) - Maximum number of recommendations

**Example Request:**

```
GET /api/v1/recommendations/by-rating?userId=user-123&minRating=4&maxRating=5&limit=10
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "drinkName": "Martini",
      "drinkId": "drink-202",
      "rating": 4.5,
      "consumedAt": "2024-01-19T20:00:00Z",
      "quantity": 1,
      "quantityUnit": "oz",
      "recommendationScore": 90.0,
      "reason": "Rated 4.5/5 stars"
    }
  ],
  "count": 1
}
```

---

### 5. Get Recommendation Statistics

**GET** `/api/v1/recommendations/stats`

Get comprehensive recommendation statistics for a user, including rating distribution and recommendation readiness.

**Query Parameters:**

- `userId` (required) - User ID

**Example Request:**

```
GET /api/v1/recommendations/stats?userId=user-123
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "ratingStats": {
      "averageRating": 3.8,
      "minRating": 2,
      "maxRating": 5,
      "totalLogs": 15,
      "ratingCounts": {
        "1": 1,
        "2": 2,
        "3": 4,
        "4": 5,
        "5": 3
      }
    },
    "topRatedDrinks": [
      {
        "drinkName": "Margarita",
        "averageRating": 5.0,
        "timesConsumed": 2
      }
    ],
    "recommendationReadiness": true
  }
}
```

**Response Fields:**

- `ratingStats.averageRating` - User's average drink rating
- `ratingStats.minRating` - Lowest rating given
- `ratingStats.maxRating` - Highest rating given
- `ratingStats.totalLogs` - Total number of drink logs
- `ratingStats.ratingCounts` - Distribution of ratings (1-5)
- `topRatedDrinks` - User's top 5 rated drinks
- `recommendationReadiness` - Boolean indicating if user has enough data (≥3 logs) for recommendations

---

## Error Responses

### 400 Bad Request

```json
{
  "error": "Validation Error",
  "message": "userId is required"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "Failed to fetch recommendations"
}
```

---

## Integration Examples

### Frontend Integration (React Native)

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1';

// Get personalized recommendations
async function getRecommendations(userId, options = {}) {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommendations`, {
      params: {
        userId,
        limit: options.limit || 10,
        minRating: options.minRating || 3,
        sortBy: options.sortBy || 'rating',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
}

// Get top-rated recommendations
async function getTopRatedRecommendations(userId, limit = 10) {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommendations/top-rated`, {
      params: { userId, limit },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching top-rated recommendations:', error);
    throw error;
  }
}

// Get taste-based recommendations
async function getTasteRecommendations(userId, tasteTags, options = {}) {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommendations/by-taste`, {
      params: {
        userId,
        tasteTags: tasteTags.join(','),
        limit: options.limit || 10,
        minRating: options.minRating || 3,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching taste-based recommendations:', error);
    throw error;
  }
}

// Get recommendation stats
async function getRecommendationStats(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommendations/stats`, {
      params: { userId },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recommendation stats:', error);
    throw error;
  }
}
```

### Usage in Screen Component

```javascript
import { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getRecommendations, getRecommendationStats } from '@/utils/recommendationApi';

export default function RecommendationsScreen({ userId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setIsLoading(true);
        const [recs, stats] = await Promise.all([
          getRecommendations(userId, { limit: 10, minRating: 3 }),
          getRecommendationStats(userId),
        ]);
        setRecommendations(recs);
        setStats(stats);
      } catch (error) {
        console.error('Error loading recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, [userId]);

  return (
    <View>
      {stats && !stats.recommendationReadiness && (
        <Text>Log more drinks to get personalized recommendations</Text>
      )}
      <FlatList
        data={recommendations}
        renderItem={({ item }) => (
          <View>
            <Text>{item.drinkName}</Text>
            <Text>Rating: {item.averageRating}/5</Text>
            <Text>{item.reason}</Text>
          </View>
        )}
        keyExtractor={(item) => item.drinkName}
      />
    </View>
  );
}
```

---

## Algorithm Details

### Recommendation Score Calculation

The recommendation algorithm uses a weighted scoring system:

1. **Rating Score (70% weight)**
   - Normalized from 0-5 to 0-70 points
   - Formula: `(averageRating / 5) × 70`

2. **Frequency Score (30% weight)**
   - Based on number of times drink was consumed
   - Formula: `min(timesConsumed × 3, 30)`
   - Capped at 30 to prevent over-weighting frequent drinks

3. **Final Score**
   - `recommendationScore = ratingScore + frequencyScore`
   - Range: 0-100

### Filtering and Sorting

**Available Sort Options:**

- `rating` (default) - Sort by recommendation score (highest first)
- `frequency` - Sort by number of times consumed (most frequent first)
- `recent` - Sort by last consumption date (most recent first)

**Rating Filters:**

- `minRating` - Only include drinks rated at or above this value
- `maxRating` - Only include drinks rated at or below this value
- `tasteTags` - Only include drinks with matching taste profiles

---

## Best Practices

1. **Minimum Data Requirement**: Recommend to users only after they have logged at least 3 drinks
2. **Rating Threshold**: Use `minRating=3` to focus on drinks the user enjoyed
3. **Taste Matching**: Combine taste tags with ratings for more precise recommendations
4. **Frequency Consideration**: Don't over-weight frequency; balance with rating quality
5. **Regular Updates**: Refresh recommendations after each new drink log

---

## Future Enhancements

- Collaborative filtering (recommend drinks liked by similar users)
- Time-based recommendations (seasonal drinks, time of day)
- Social context recommendations (drinks for different occasions)
- ABV-based recommendations (alcohol content preferences)
- Mood-based recommendations (drinks for different moods)
