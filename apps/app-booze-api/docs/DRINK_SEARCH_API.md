# Drink Catalog Search API Documentation

## Overview
The Drink Search API provides comprehensive search and filtering capabilities for discovering drinks in the catalog. Users can search by name, filter by various attributes (category, ABV, taste tags, brand), and customize sorting and pagination.

## Base URL
```
/api/v1/drinks
```

## Authentication
Currently, the Drink Search API does not require authentication. Future versions may require user authentication for personalized recommendations.

## Endpoints

### 1. Search Drinks
**GET** `/api/v1/drinks/search`

Search and filter drinks from the catalog with flexible query parameters.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `name` | string | No | - | Search by drink name or brand (case-insensitive) |
| `category` | string | No | - | Filter by drink category (Beer, Wine, Spirits, etc.) |
| `abvMin` | number | No | - | Minimum alcohol by volume (0-100) |
| `abvMax` | number | No | - | Maximum alcohol by volume (0-100) |
| `tasteTags` | string | No | - | Comma-separated taste tags (e.g., "Fruity,Sweet") |
| `brand` | string | No | - | Filter by brand name (case-insensitive) |
| `limit` | number | No | 20 | Number of results per page (1-100) |
| `skip` | number | No | 0 | Number of results to skip (pagination offset) |
| `sortBy` | string | No | name | Sort field: name, abv, category, popularity, createdAt |
| `sortOrder` | string | No | asc | Sort direction: asc (ascending) or desc (descending) |

#### Example Requests

**Basic search by name:**
```
GET /api/v1/drinks/search?name=Corona
```

**Filter by category and ABV range:**
```
GET /api/v1/drinks/search?category=Beer&abvMin=4&abvMax=6
```

**Search with multiple filters:**
```
GET /api/v1/drinks/search?name=wine&category=Wine&abvMin=12&abvMax=15&tasteTags=Fruity,Dry&limit=50&skip=0&sortBy=popularity&sortOrder=desc
```

**Search with taste tags:**
```
GET /api/v1/drinks/search?tasteTags=Fruity,Sweet,Citrus
```

**Paginated results:**
```
GET /api/v1/drinks/search?limit=20&skip=40
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Corona Extra",
      "category": "Beer",
      "brand": "Corona",
      "abv": 4.6,
      "description": "Light and refreshing Mexican lager",
      "tasteTags": ["Crisp", "Fruity", "Light"],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 20,
    "skip": 0,
    "hasMore": true
  },
  "filters": {
    "name": "Corona",
    "category": null,
    "abvRange": {
      "min": null,
      "max": null
    },
    "tasteTags": null,
    "brand": null
  },
  "sort": {
    "field": "name",
    "order": "asc"
  }
}
```

#### Error Responses

**400 Bad Request - Invalid Parameters:**
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid search parameters",
  "details": [
    "limit must be a number between 1 and 100",
    "abvMin must be less than or equal to abvMax"
  ]
}
```

**429 Too Many Requests - Rate Limited:**
```json
{
  "success": false,
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again later.",
  "retryAfter": 45
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Failed to search drinks"
}
```

---

### 2. Get Drink by ID
**GET** `/api/v1/drinks/:id`

Retrieve detailed information about a specific drink.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | MongoDB ObjectId of the drink |

#### Example Request
```
GET /api/v1/drinks/507f1f77bcf86cd799439011
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Corona Extra",
    "category": "Beer",
    "brand": "Corona",
    "abv": 4.6,
    "description": "Light and refreshing Mexican lager",
    "tasteTags": ["Crisp", "Fruity", "Light"],
    "origin": "Mexico",
    "volume": 355,
    "volumeUnit": "ml",
    "price": 2.99,
    "popularity": 95,
    "rating": 4.2,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Error Responses

**400 Bad Request - Missing ID:**
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Drink ID is required"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Drink not found"
}
```

---

### 3. Get Drink Categories
**GET** `/api/v1/drinks/categories/list`

Retrieve the list of available drink categories for filtering.

#### Example Request
```
GET /api/v1/drinks/categories/list
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    "Beer",
    "Wine",
    "Spirits",
    "Liqueur",
    "Cocktail",
    "Non-Alcoholic",
    "Cider",
    "Sake",
    "Other"
  ]
}
```

---

### 4. Get Popular Taste Tags
**GET** `/api/v1/drinks/taste-tags/list`

Retrieve the list of popular taste tags for filtering.

#### Example Request
```
GET /api/v1/drinks/taste-tags/list
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    "Sweet",
    "Dry",
    "Bitter",
    "Fruity",
    "Floral",
    "Spicy",
    "Herbal",
    "Smoky",
    "Citrus",
    "Vanilla",
    "Chocolate",
    "Caramel",
    "Oak",
    "Crisp",
    "Smooth"
  ]
}
```

---

## Search Filters

### Category Filter
Available categories:
- Beer
- Wine
- Spirits
- Liqueur
- Cocktail
- Non-Alcoholic
- Cider
- Sake
- Other

### ABV (Alcohol by Volume) Range
- Minimum: 0%
- Maximum: 100%
- Typical ranges:
  - Light beers: 2-4%
  - Standard beers: 4-6%
  - IPAs: 6-8%
  - Wines: 12-15%
  - Spirits: 40-50%

### Taste Tags
Common taste profiles:
- Sweet, Dry, Bitter
- Fruity, Floral, Herbal
- Spicy, Smoky
- Citrus, Vanilla, Chocolate, Caramel, Oak
- Crisp, Smooth

---

## Sorting Options

| Field | Description |
|-------|-------------|
| `name` | Alphabetical order by drink name |
| `abv` | Alcohol by volume (ascending/descending) |
| `category` | Alphabetical order by category |
| `popularity` | Most to least popular drinks |
| `createdAt` | Newest to oldest drinks |

---

## Pagination

The API supports cursor-based pagination using `limit` and `skip` parameters.

**Example: Get page 3 with 20 results per page**
```
GET /api/v1/drinks/search?limit=20&skip=40
```

The response includes pagination metadata:
```json
{
  "pagination": {
    "total": 1500,
    "limit": 20,
    "skip": 40,
    "hasMore": true
  }
}
```

---

## Rate Limiting

The search endpoint is rate-limited to prevent abuse:
- **Limit**: 30 requests per minute per IP address
- **Response**: 429 Too Many Requests when exceeded
- **Retry-After**: Included in response headers

---

## Error Handling

### Common Error Codes

| Status | Error | Description |
|--------|-------|-------------|
| 400 | Validation Error | Invalid query parameters |
| 404 | Not Found | Drink or resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |

### Validation Rules

1. **limit**: Must be between 1 and 100
2. **skip**: Must be non-negative
3. **abvMin/abvMax**: Must be between 0 and 100
4. **abvMin**: Must be ≤ abvMax
5. **sortBy**: Must be one of: name, abv, category, popularity, createdAt
6. **sortOrder**: Must be "asc" or "desc"

---

## Usage Examples

### Frontend Integration (JavaScript/React)

```javascript
// Basic search
async function searchDrinks(query) {
  const params = new URLSearchParams({
    name: query,
    limit: 20,
    skip: 0,
  });
  
  const response = await fetch(`/api/v1/drinks/search?${params}`);
  return response.json();
}

// Advanced search with filters
async function advancedSearch(filters) {
  const params = new URLSearchParams({
    name: filters.name || '',
    category: filters.category || '',
    abvMin: filters.abvMin || '',
    abvMax: filters.abvMax || '',
    tasteTags: filters.tasteTags?.join(',') || '',
    limit: filters.limit || 20,
    skip: filters.skip || 0,
    sortBy: filters.sortBy || 'name',
    sortOrder: filters.sortOrder || 'asc',
  });
  
  const response = await fetch(`/api/v1/drinks/search?${params}`);
  return response.json();
}

// Get drink details
async function getDrinkDetails(drinkId) {
  const response = await fetch(`/api/v1/drinks/${drinkId}`);
  return response.json();
}

// Get filter options
async function getFilterOptions() {
  const [categories, tags] = await Promise.all([
    fetch('/api/v1/drinks/categories/list').then(r => r.json()),
    fetch('/api/v1/drinks/taste-tags/list').then(r => r.json()),
  ]);
  
  return {
    categories: categories.data,
    tasteTags: tags.data,
  };
}
```

---

## Future Enhancements

1. **Full-text Search**: Implement MongoDB text indexes for better search performance
2. **Faceted Search**: Return filter counts for available options
3. **Recommendations**: Personalized drink recommendations based on user history
4. **Advanced Filters**: Price range, origin country, vintage year (for wines)
5. **Search Analytics**: Track popular searches and trending drinks
6. **Autocomplete**: Suggest drink names and brands as user types
7. **Similar Drinks**: Find drinks similar to a selected drink
8. **User Ratings**: Integrate user ratings and reviews

---

## Database Schema

The Drink model includes the following fields:

```javascript
{
  _id: ObjectId,
  name: String (required, indexed),
  category: String (indexed),
  brand: String (indexed),
  abv: Number (0-100),
  description: String,
  tasteTags: [String] (indexed),
  origin: String,
  volume: Number,
  volumeUnit: String,
  price: Number,
  popularity: Number,
  rating: Number,
  createdAt: Date,
  updatedAt: Date,
  isArchived: Boolean (default: false)
}
```

### Indexes
- `name` (text index for search)
- `category`
- `brand`
- `tasteTags`
- `abv`
- `createdAt`

---

## Support

For issues or questions about the Drink Search API, please refer to:
- GitHub Issues: [app-booze-api issues](https://github.com/your-org/app-booze/issues)
- Documentation: [API Documentation](./DRINK_SEARCH_API.md)
