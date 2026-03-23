/**
 * Canonical drink shape for catalog, search, cold-start, and future AI / RAG.
 * Keep IDs stable; add fields rather than rename when evolving.
 *
 * @typedef {'Wine'|'Whiskey'|'Beer'|'Rum'|'Vodka'|'Gin'|'Tequila'|'Liqueur'|'Spirits'|'Sparkling'} CatalogCategory
 * @typedef {'value'|'mid'|'premium'} PriceBand — aligns with onboarding budgetTier (value/mid/splurge → map splurge→premium)
 * @typedef {'light'|'medium'|'full'} BodyLevel
 * @typedef {'low'|'medium'|'high'} IntensityLevel
 *
 * @typedef {object} CatalogOrigin
 * @property {string} country ISO or common name
 * @property {string} [region]
 *
 * @typedef {object} CatalogSensory
 * @property {BodyLevel} body
 * @property {string} sweetness dry | off-dry | sweet | neutral
 * @property {IntensityLevel} intensity
 *
 * @typedef {object} CatalogRetailerIds
 * @property {string} [sku] internal / mock SKU
 * @property {string|null} [upc]
 *
 * @typedef {object} CatalogDrink
 * @property {string} id stable slug (e.g. wine-cab-001)
 * @property {string} name display name
 * @property {string} brand
 * @property {CatalogCategory} category shelf taxonomy (used for filters)
 * @property {string} subcategory e.g. Red, White, Sparkling, Bourbon, IPA
 * @property {string} style specific style name for embeddings
 * @property {number} abv
 * @property {CatalogOrigin} origin
 * @property {string[]} tasteTags overlap with onboarding ONBOARDING_TASTE_TAGS where possible
 * @property {PriceBand} priceBand
 * @property {CatalogSensory} sensory
 * @property {string[]} pairingHints short food / occasion phrases
 * @property {string[]} occasionTags casual, gift, dinner, party, etc.
 * @property {string} desc short human description
 * @property {string} aiSummary 1–3 sentences for LLM / retrieval (denormalized narrative)
 * @property {string} [aiContext] optional extra facts for RAG (production method, aging, etc.)
 * @property {CatalogRetailerIds} retailer
 * @property {number} schemaVersion
 * @property {'mock_catalog'} source
 */

/** @type {CatalogDrink['schemaVersion']} */
export const CATALOG_SCHEMA_VERSION = 1;

export const CATALOG_SOURCE_MOCK = 'mock_catalog';

/**
 * @param {Partial<CatalogDrink> & Pick<CatalogDrink, 'id'|'name'|'brand'|'category'|'subcategory'|'style'|'abv'|'tasteTags'|'priceBand'|'desc'>} partial
 * @returns {CatalogDrink}
 */
export function defineCatalogDrink(partial) {
  const {
    id,
    name,
    brand,
    category,
    subcategory,
    style,
    abv,
    tasteTags,
    priceBand,
    desc,
    origin = { country: '', region: '' },
    sensory = { body: 'medium', sweetness: 'neutral', intensity: 'medium' },
    pairingHints = [],
    occasionTags = [],
    retailer = { sku: id, upc: null },
    aiSummary,
    aiContext,
  } = partial;

  const summary =
    aiSummary ||
    `${name} (${brand}) — ${style}. ${desc} Tags: ${(tasteTags || []).join(', ')}.`;

  return {
    id,
    name,
    brand,
    category,
    subcategory,
    style,
    abv,
    origin,
    tasteTags: tasteTags || [],
    priceBand,
    sensory,
    pairingHints,
    occasionTags,
    desc,
    aiSummary: summary,
    aiContext: aiContext || '',
    retailer,
    schemaVersion: CATALOG_SCHEMA_VERSION,
    source: CATALOG_SOURCE_MOCK,
  };
}

/**
 * Map onboarding budget to catalog price band.
 * @param {'value'|'mid'|'splurge'|undefined} tier
 * @returns {PriceBand|undefined}
 */
export function budgetTierToPriceBand(tier) {
  if (tier === 'value') return 'value';
  if (tier === 'mid') return 'mid';
  if (tier === 'splurge') return 'premium';
  return undefined;
}
