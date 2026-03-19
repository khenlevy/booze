/**
 * Mock search data for development.
 * Replace with drink search API integration when ready.
 */

export const MOCK_SEARCH_DATA = [
  {
    id: '1',
    name: 'Craft IPA',
    desc: 'Hoppy American IPA with citrus notes',
    type: 'business',
  },
  {
    id: '2',
    name: 'Local Brewery',
    desc: 'Craft beer taproom and bottle shop',
    type: 'business',
  },
  {
    id: '3',
    name: 'Wine Bar Downtown',
    desc: 'Selection of wines by the glass',
    type: 'business',
  },
  {
    id: '4',
    name: '$10 Beer Flight',
    desc: 'Sample 4 craft beers of your choice',
    type: 'gift_card',
  },
  {
    id: '5',
    name: 'Happy Hour Deal',
    desc: '20% off all drinks 4–6pm',
    type: 'coupon',
  },
  {
    id: '6',
    name: 'Margarita Special',
    desc: 'House margarita half price on Tuesdays',
    type: 'coupon',
  },
];

/**
 * Filter mock data by search query (case-insensitive)
 * @param {string} query - Search term
 * @returns {Array} Matching items
 */
export function searchItems(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return MOCK_SEARCH_DATA.filter(
    (item) =>
      item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q),
  );
}
