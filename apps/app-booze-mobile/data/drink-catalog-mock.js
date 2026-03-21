/**
 * Catalog fallback until Drink model + /api/v1/drinks/search returns data.
 * Shared by DrinkSelector, Search, and drink detail screens.
 */

export const MOCK_DRINKS = [
  {
    id: '1',
    name: 'Heineken Lager',
    category: 'Beer',
    abv: 5.0,
    tasteTags: ['Crisp', 'Bitter'],
    brand: 'Heineken',
    desc: 'Classic pale lager with a mild hop character.',
  },
  {
    id: '2',
    name: 'Guinness Stout',
    category: 'Beer',
    abv: 4.2,
    tasteTags: ['Roasty', 'Smooth', 'Caramel'],
    brand: 'Guinness',
    desc: 'Irish dry stout with creamy mouthfeel.',
  },
  {
    id: '3',
    name: 'Jameson Irish Whiskey',
    category: 'Whiskey',
    abv: 40.0,
    tasteTags: ['Smooth', 'Vanilla', 'Oak'],
    brand: 'Jameson',
    desc: 'Triple-distilled Irish whiskey — easy sipper for newcomers.',
  },
  {
    id: '4',
    name: 'Bacardi Rum',
    category: 'Rum',
    abv: 37.5,
    tasteTags: ['Sweet', 'Citrus'],
    brand: 'Bacardi',
    desc: 'Light white rum, great for cocktails.',
  },
  {
    id: '5',
    name: 'Smirnoff Vodka',
    category: 'Vodka',
    abv: 40.0,
    tasteTags: ['Crisp', 'Neutral'],
    brand: 'Smirnoff',
    desc: 'Clean neutral spirit.',
  },
  {
    id: '6',
    name: 'Cabernet Sauvignon',
    category: 'Wine',
    abv: 13.5,
    tasteTags: ['Dry', 'Oak', 'Blackberry'],
    brand: 'Various',
    desc: 'Full-bodied red with tannic structure.',
  },
  {
    id: '7',
    name: 'Pinot Grigio',
    category: 'Wine',
    abv: 12.0,
    tasteTags: ['Crisp', 'Citrus', 'Dry'],
    brand: 'Various',
    desc: 'Light white wine, refreshing and food-friendly.',
  },
  {
    id: '8',
    name: 'Champagne',
    category: 'Sparkling',
    abv: 12.0,
    tasteTags: ['Crisp', 'Fruity', 'Dry'],
    brand: 'Various',
    desc: 'Traditional method sparkling wine.',
  },
];

const SPIRIT_CATEGORIES = ['Whiskey', 'Rum', 'Vodka', 'Liqueur', 'Spirits'];

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
    } else {
      list = list.filter((d) => d.category === categoryFilter);
    }
  }
  if (!q) return list;
  return list.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      (d.brand && d.brand.toLowerCase().includes(q)) ||
      (d.desc && d.desc.toLowerCase().includes(q)) ||
      (d.tasteTags || []).some((t) => t.toLowerCase().includes(q)),
  );
}

export function getCatalogDrinkById(id) {
  return MOCK_DRINKS.find((d) => d.id === String(id)) ?? null;
}
