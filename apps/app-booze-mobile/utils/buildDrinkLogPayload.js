/**
 * Payload builders for simplified drink logs (taste vs purchase).
 */

/**
 * @param {object} o
 * @param {string} o.userId
 * @param {string} o.drinkName
 * @param {string} [o.catalogDrinkId]
 * @param {string} [o.scanUpc]
 * @param {'love'|'ok'|'dislike'} o.sentiment
 * @param {number} [o.abv]
 * @param {string[]} [o.tasteTags]
 */
export function buildTasteLogPayload({
  userId,
  drinkName,
  catalogDrinkId,
  scanUpc,
  sentiment,
  abv,
  tasteTags,
}) {
  return {
    userId,
    drinkName,
    entryType: 'taste_log',
    sentiment,
    consumedAt: new Date().toISOString(),
    quantity: 1,
    quantityUnit: 'bottle',
    ...(catalogDrinkId ? { catalogDrinkId } : {}),
    ...(scanUpc ? { scanUpc } : {}),
    ...(abv != null && !Number.isNaN(Number(abv)) ? { abv: Number(abv) } : {}),
    ...(tasteTags?.length ? { tasteTags } : {}),
  };
}

/**
 * @param {object} o
 * @param {string} o.userId
 * @param {string} o.drinkName
 * @param {string} [o.catalogDrinkId]
 * @param {number} [o.abv]
 * @param {string[]} [o.tasteTags]
 */
export function buildPurchasePayload({
  userId,
  drinkName,
  catalogDrinkId,
  abv,
  tasteTags,
}) {
  return {
    userId,
    drinkName,
    entryType: 'purchase',
    consumedAt: new Date().toISOString(),
    quantity: 1,
    quantityUnit: 'bottle',
    ...(catalogDrinkId ? { catalogDrinkId } : {}),
    ...(abv != null && !Number.isNaN(Number(abv)) ? { abv: Number(abv) } : {}),
    ...(tasteTags?.length ? { tasteTags } : {}),
  };
}

/** Map stored rating to sentiment label for UI. */
export function ratingToSentiment(rating) {
  if (rating === 5) return 'love';
  if (rating === 3) return 'ok';
  if (rating === 1) return 'dislike';
  return null;
}

export function sentimentLabel(sentiment) {
  if (sentiment === 'love') return 'Loved it';
  if (sentiment === 'ok') return 'OK';
  if (sentiment === 'dislike') return "Didn't love it";
  return '';
}
