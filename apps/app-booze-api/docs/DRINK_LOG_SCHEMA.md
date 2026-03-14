# Drink Log Database Schema

## Overview

The Drink Log schema represents a user's drink consumption log entry in the app-booze application. It tracks detailed information about each drink consumed, including ratings, tasting notes, and contextual information.

## Collection Name

```
drink_logs
```

## Schema Definition

### Core Fields

#### userId (Required)
- **Type**: ObjectId (Reference to User)
- **Required**: Yes
- **Indexed**: Yes
- **Description**: Reference to the user who logged the drink
- **Example**: `ObjectId("507f1f77bcf86cd799439011")`

#### drinkId (Optional)
- **Type**: ObjectId (Reference to Drink)
- **Required**: No
- **Default**: null
- **Description**: Reference to the drink in the drink catalog (if available)
- **Example**: `ObjectId("507f1f77bcf86cd799439012")`

#### drinkName (Required)
- **Type**: String
- **Required**: Yes
- **Indexed**: Yes
- **Trim**: Yes
- **Description**: Name of the drink consumed
- **Example**: `"Guinness Stout"`

#### consumedAt (Required)
- **Type**: Date (ISO 8601)
- **Required**: Yes
- **Indexed**: Yes
- **Description**: Timestamp when the drink was consumed
- **Example**: `2024-01-15T19:30:00Z`

#### quantity (Required)
- **Type**: Number
- **Required**: Yes
- **Minimum**: 0.1
- **Validation**: Must be greater than 0
- **Description**: Amount of the drink consumed
- **Example**: `500`

#### quantityUnit (Optional)
- **Type**: String (Enum)
- **Required**: No
- **Default**: `"ml"`
- **Allowed Values**: `ml`, `oz`, `shot`, `glass`, `pint`, `bottle`
- **Description**: Unit of measurement for the quantity
- **Example**: `"ml"`

#### rating (Required)
- **Type**: Integer
- **Required**: Yes
- **Indexed**: Yes
- **Minimum**: 1
- **Maximum**: 5
- **Validation**: Must be an integer between 1 and 5
- **Description**: User's rating of the drink (1 = poor, 5 = excellent)
- **Example**: `4`

### Optional Fields

#### notes (Optional)
- **Type**: String
- **Required**: No
- **Default**: null
- **Max Length**: 1000 characters
- **Description**: Additional notes or comments about the drink
- **Example**: `"Great taste, smooth finish"`

#### abv (Optional)
- **Type**: Number
- **Required**: No
- **Default**: null
- **Minimum**: 0
- **Maximum**: 100
- **Validation**: Must be between 0 and 100
- **Description**: Alcohol by volume percentage
- **Example**: `4.2`

#### tasteTags (Optional)
- **Type**: Array of Strings
- **Required**: No
- **Default**: `[]`
- **Description**: Array of taste profile tags
- **Example**: `["hoppy", "bitter", "smooth"]`

#### location (Optional)
- **Type**: String
- **Required**: No
- **Default**: null
- **Trim**: Yes
- **Description**: Location where the drink was consumed
- **Example**: `"The Local Pub"`

#### socialContext (Optional)
- **Type**: String
- **Required**: No
- **Default**: null
- **Trim**: Yes
- **Description**: Social context of consumption (alone, with friends, at bar, etc.)
- **Example**: `"with friends"`

#### mood (Optional)
- **Type**: String
- **Required**: No
- **Default**: null
- **Trim**: Yes
- **Description**: User's mood when consuming the drink
- **Example**: `"relaxed"`

#### photoUrl (Optional)
- **Type**: String
- **Required**: No
- **Default**: null
- **Trim**: Yes
- **Description**: URL to a photo of the drink
- **Example**: `"https://cdn.example.com/photos/drink-123.jpg"`

### System Fields

#### isArchived (Optional)
- **Type**: Boolean
- **Required**: No
- **Default**: `false`
- **Indexed**: Yes
- **Description**: Soft delete flag (true = archived/deleted, false = active)
- **Example**: `false`

#### createdAt (Auto)
- **Type**: Date (ISO 8601)
- **Auto-Generated**: Yes
- **Description**: Timestamp when the record was created
- **Example**: `2024-01-15T19:30:00Z`

#### updatedAt (Auto)
- **Type**: Date (ISO 8601)
- **Auto-Generated**: Yes
- **Description**: Timestamp when the record was last updated
- **Example**: `2024-01-15T20:45:00Z`

## Indexes

### Single Field Indexes

| Field | Purpose |
|-------|---------|
| `userId` | Fast lookup of all drinks by user |
| `consumedAt` | Fast lookup by consumption date |
| `rating` | Fast lookup by rating |
| `drinkName` | Fast lookup by drink name |
| `isArchived` | Fast filtering of active vs archived records |

### Compound Indexes

| Index | Purpose |
|-------|---------|
| `userId + consumedAt (desc)` | Fast retrieval of user's drinks sorted by date |
| `userId + rating (desc)` | Fast retrieval of user's drinks sorted by rating |
| `userId + isArchived` | Fast filtering of user's active drinks |

## Validation Rules

### Required Fields
- `userId`: Must be a valid ObjectId
- `drinkName`: Must be a non-empty string
- `consumedAt`: Must be a valid ISO 8601 date
- `quantity`: Must be a positive number (> 0)
- `rating`: Must be an integer between 1 and 5

### Optional Field Constraints
- `notes`: Maximum 1000 characters
- `abv`: Must be between 0 and 100 if provided
- `quantity`: Minimum 0.1
- `quantityUnit`: Must be one of the allowed enum values

## Example Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "drinkId": ObjectId("507f1f77bcf86cd799439012"),
  "drinkName": "Guinness Stout",
  "consumedAt": "2024-01-15T19:30:00Z",
  "quantity": 500,
  "quantityUnit": "ml",
  "rating": 4,
  "notes": "Great taste, smooth finish with a nice head",
  "abv": 4.2,
  "tasteTags": ["hoppy", "bitter", "smooth"],
  "location": "The Local Pub",
  "socialContext": "with friends",
  "mood": "relaxed",
  "photoUrl": "https://cdn.example.com/photos/drink-123.jpg",
  "isArchived": false,
  "createdAt": "2024-01-15T19:30:00Z",
  "updatedAt": "2024-01-15T19:30:00Z"
}
```

## Helper Methods

### Static Methods

#### getAverageRating(userId)
Calculates the average rating for all drinks logged by a user.

**Parameters:**
- `userId` (ObjectId): The user's ID

**Returns:** Number (average rating, 0 if no drinks)

**Example:**
```javascript
const avgRating = await DrinkLog.getAverageRating(userId);
// Returns: 4.2
```

#### getByDateRange(userId, startDate, endDate)
Retrieves all drinks logged by a user within a date range.

**Parameters:**
- `userId` (ObjectId): The user's ID
- `startDate` (Date): Start of date range
- `endDate` (Date): End of date range

**Returns:** Array of DrinkLog documents

**Example:**
```javascript
const drinks = await DrinkLog.getByDateRange(
  userId,
  new Date('2024-01-01'),
  new Date('2024-01-31')
);
```

#### getTopRatedDrinks(userId, limit = 10)
Retrieves the top-rated drinks for a user.

**Parameters:**
- `userId` (ObjectId): The user's ID
- `limit` (Number): Maximum number of drinks to return (default: 10)

**Returns:** Array of DrinkLog documents sorted by rating

**Example:**
```javascript
const topDrinks = await DrinkLog.getTopRatedDrinks(userId, 5);
```

### Instance Methods

#### archive()
Soft deletes (archives) a drink log entry.

**Returns:** Promise<DrinkLog>

**Example:**
```javascript
const drinkLog = await DrinkLog.findById(id);
await drinkLog.archive();
```

#### restore()
Restores an archived drink log entry.

**Returns:** Promise<DrinkLog>

**Example:**
```javascript
const drinkLog = await DrinkLog.findById(id);
await drinkLog.restore();
```

### Virtual Properties

#### daysSinceConsumption
Calculates the number of days since the drink was consumed.

**Type:** Number (read-only)

**Example:**
```javascript
const drinkLog = await DrinkLog.findById(id);
console.log(drinkLog.daysSinceConsumption); // 5
```

## Query Examples

### Find all active drinks for a user
```javascript
const drinks = await DrinkLog.find({
  userId: userId,
  isArchived: false
}).sort({ consumedAt: -1 });
```

### Find drinks with rating >= 4
```javascript
const goodDrinks = await DrinkLog.find({
  userId: userId,
  rating: { $gte: 4 },
  isArchived: false
});
```

### Find drinks consumed in the last 7 days
```javascript
const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
const recentDrinks = await DrinkLog.find({
  userId: userId,
  consumedAt: { $gte: sevenDaysAgo },
  isArchived: false
});
```

### Find drinks by taste tag
```javascript
const hoppy = await DrinkLog.find({
  userId: userId,
  tasteTags: "hoppy",
  isArchived: false
});
```

## Performance Considerations

1. **Indexing**: All frequently queried fields are indexed for optimal performance
2. **Compound Indexes**: Queries combining userId with consumedAt or rating use compound indexes
3. **Soft Deletes**: The isArchived flag is indexed to quickly filter active records
4. **Pagination**: Use limit and skip for large result sets
5. **Lean Queries**: Use `.lean()` for read-only queries to improve performance

## Soft Delete Strategy

The schema uses soft deletes via the `isArchived` flag:
- **Deleted records** are marked with `isArchived: true`
- **Active records** have `isArchived: false`
- **Data preservation**: Original data is never removed from the database
- **Recovery**: Archived records can be restored using the `restore()` method

## Related Collections

- **User**: Referenced via `userId` field
- **Drink**: Referenced via `drinkId` field (optional)

## Future Enhancements

- Add geolocation data (latitude/longitude)
- Add food pairing suggestions
- Add weather conditions at time of consumption
- Add social sharing metadata
- Add image storage and processing
- Add recommendation scoring based on ratings and tags
