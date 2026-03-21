/**
 * Drink catalog search — uses API when available, empty array when no Drink model data.
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

/**
 * @param {object} query
 * @param {string} [query.name]
 * @param {string} [query.category]
 * @param {number} [query.limit]
 * @param {number} [query.skip]
 * @returns {Promise<{ data: object[], pagination: object }>}
 */
export async function searchDrinksApi(query = {}) {
  const params = new URLSearchParams();
  if (query.name) params.append('name', query.name);
  if (query.category) params.append('category', query.category);
  params.append('limit', String(query.limit ?? 50));
  params.append('skip', String(query.skip ?? 0));
  params.append('sortBy', query.sortBy ?? 'name');
  params.append('sortOrder', query.sortOrder ?? 'asc');

  const response = await fetch(
    `${API_BASE_URL}/drinks/search?${params.toString()}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Drink search failed');
  }

  const json = await response.json();
  return {
    data: json.data || [],
    pagination: json.pagination || {
      total: 0,
      limit: query.limit ?? 50,
      skip: query.skip ?? 0,
      hasMore: false,
    },
  };
}
