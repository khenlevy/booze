import { MOCK_DRINKS } from '@/data/drink-catalog-mock';

/**
 * Normalize barcode string (digits only).
 * @param {string} raw
 */
export function normalizeUpc(raw) {
  return String(raw ?? '').replace(/\D/g, '');
}

/**
 * Find catalog drink by scanned barcode (matches retailer.upc on mock catalog).
 * @param {string} rawBarcode
 * @returns {import('@/data/catalogDrinkSchema').CatalogDrink|null}
 */
export function resolveBarcodeToCatalog(rawBarcode) {
  const n = normalizeUpc(rawBarcode);
  if (!n) return null;

  const hit = MOCK_DRINKS.find((d) => {
    const u = normalizeUpc(d.retailer?.upc);
    if (!u) return false;
    return u === n || n.endsWith(u) || u.endsWith(n);
  });

  return hit ?? null;
}
