/**
 * Recommendations API client — personalized drink suggestions from history.
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

/**
 * @param {string} userId
 * @param {object} [options]
 * @param {number} [options.limit]
 * @param {number} [options.minRating]
 * @param {string[]} [options.tasteTags]
 * @param {'rating'|'frequency'|'recent'} [options.sortBy]
 */
export async function getPersonalizedRecommendations(userId, options = {}) {
  const {
    limit = 10,
    minRating = 3,
    tasteTags = [],
    sortBy = 'rating',
  } = options;
  const params = new URLSearchParams({
    userId,
    limit: String(limit),
    minRating: String(minRating),
    sortBy,
  });
  tasteTags.forEach((t) => params.append('tasteTags', t));
  const response = await fetch(
    `${API_BASE_URL}/recommendations?${params.toString()}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  );
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch recommendations');
  }
  const data = await response.json();
  return data.data || [];
}

/**
 * @param {string} userId
 * @param {number} [limit]
 */
export async function getTopRatedRecommendations(userId, limit = 10) {
  const params = new URLSearchParams({ userId, limit: String(limit) });
  const response = await fetch(
    `${API_BASE_URL}/recommendations/top-rated?${params.toString()}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  );
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch top-rated recommendations');
  }
  const data = await response.json();
  return data.data || [];
}

/**
 * @param {string} userId
 * @param {string[]} tasteTags
 * @param {object} [options]
 */
export async function getTasteBasedRecommendations(
  userId,
  tasteTags,
  options = {},
) {
  const { limit = 10, minRating = 3 } = options;
  const params = new URLSearchParams({
    userId,
    limit: String(limit),
    minRating: String(minRating),
  });
  tasteTags.forEach((t) => params.append('tasteTags', t));
  const response = await fetch(
    `${API_BASE_URL}/recommendations/by-taste?${params.toString()}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  );
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch taste-based recommendations');
  }
  const data = await response.json();
  return data.data || [];
}

/**
 * @param {string} userId
 */
export async function getRecommendationStats(userId) {
  const params = new URLSearchParams({ userId });
  const response = await fetch(
    `${API_BASE_URL}/recommendations/stats?${params.toString()}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  );
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch recommendation stats');
  }
  const data = await response.json();
  return data.data ?? null;
}
