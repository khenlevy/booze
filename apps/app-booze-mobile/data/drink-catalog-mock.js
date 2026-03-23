/**
 * Flat catalog: 15 mock SKUs per primary shelf (Wine, Whiskey, Beer, Spirits).
 * Rich shape from catalogDrinkSchema — ready for search, cold-start, and AI/RAG.
 */

import { MOCK_WINES } from './mock-drinks-wine';
import { MOCK_WHISKEYS } from './mock-drinks-whiskey';
import { MOCK_BEERS } from './mock-drinks-beer';
import { MOCK_SPIRITS } from './mock-drinks-spirits';

/** Assign deterministic 13-digit mock UPCs per shelf for barcode scan demos. */
function attachMockUpcs(items, shelfNum) {
  const shelf = String(shelfNum).padStart(3, '0');
  return items.map((d, i) => {
    const seq = String(i + 1).padStart(4, '0');
    const upc = (`850${shelf}${seq}00` + '0').slice(0, 13);
    return {
      ...d,
      retailer: {
        sku: d.retailer?.sku ?? d.id,
        upc,
      },
    };
  });
}

/** @type {import('./catalogDrinkSchema').CatalogDrink[]} */
export const MOCK_DRINKS = [
  ...attachMockUpcs(MOCK_WINES, 101),
  ...attachMockUpcs(MOCK_WHISKEYS, 102),
  ...attachMockUpcs(MOCK_BEERS, 103),
  ...attachMockUpcs(MOCK_SPIRITS, 104),
];

/**
 * Spirit subtypes when user picks "Spirits" as primary category.
 * Gin & Tequila included for realistic aisle coverage.
 */
export const SPIRIT_CATEGORIES = [
  'Whiskey',
  'Rum',
  'Vodka',
  'Gin',
  'Tequila',
  'Liqueur',
  'Spirits',
];

/**
 * Used by search, cold-start picks, and onboarding.
 * @param {{ category: string }} drink
 * @param {string} primaryCategory Wine | Whiskey | Beer | Spirits | Not sure
 */
export function drinkMatchesPrimaryCategory(drink, primaryCategory) {
  if (!primaryCategory || primaryCategory === 'Not sure') return true;
  if (primaryCategory === 'Spirits') {
    return SPIRIT_CATEGORIES.includes(drink.category);
  }
  if (primaryCategory === 'Wine') {
    return drink.category === 'Wine' || drink.category === 'Sparkling';
  }
  return drink.category === primaryCategory;
}

/**
 * @param {string} query
 * @param {string} [categoryFilter] 'All' or category name
 */
export function searchCatalogDrinks(query, categoryFilter = 'All') {
  const q = (query || '').trim().toLowerCase();
  let list = MOCK_DRINKS;
  if (categoryFilter && categoryFilter !== 'All') {
    if (categoryFilter === 'Spirits') {
      list = list.filter((d) => SPIRIT_CATEGORIES.includes(d.category));
    } else if (categoryFilter === 'Wine') {
      list = list.filter(
        (d) => d.category === 'Wine' || d.category === 'Sparkling',
      );
    } else {
      list = list.filter((d) => d.category === categoryFilter);
    }
  }
  if (!q) return list;
  return list.filter((d) => {
    const hay = [
      d.name,
      d.brand,
      d.category,
      d.subcategory,
      d.style,
      d.desc,
      d.aiSummary,
      d.aiContext,
      ...(d.tasteTags || []),
      ...(d.pairingHints || []),
      ...(d.occasionTags || []),
      d.origin?.country,
      d.origin?.region,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });
}

export function getCatalogDrinkById(id) {
  return MOCK_DRINKS.find((d) => d.id === String(id)) ?? null;
}

/** @returns {Record<string, import('./catalogDrinkSchema').CatalogDrink[]>} */
export function getMockDrinksByShelfCategory() {
  return {
    Wine: MOCK_WINES,
    Whiskey: MOCK_WHISKEYS,
    Beer: MOCK_BEERS,
    Spirits: MOCK_SPIRITS,
  };
}
