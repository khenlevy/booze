import {
  MOCK_DRINKS,
  drinkMatchesPrimaryCategory,
} from '@/data/drink-catalog-mock';
import { budgetTierToPriceBand } from '@/data/catalogDrinkSchema';

/**
 * Rank catalog drinks for cold start (no drink history yet).
 * @param {import('./preferenceProfile').PreferenceProfile | null} profile
 * @param {number} [limit]
 * @returns {Array<(typeof MOCK_DRINKS)[0] & { _coldScore: number, _matchReason?: string }>}
 */
export function getColdStartPicks(profile, limit = 8) {
  if (!profile) return [];

  let drinks = MOCK_DRINKS.filter((d) =>
    drinkMatchesPrimaryCategory(d, profile.primaryCategory),
  );

  if (drinks.length === 0) {
    drinks = [...MOCK_DRINKS];
  }

  const tags = profile.tasteTags || [];
  const budgetTier = profile.budgetTier;
  const targetBand = budgetTierToPriceBand(budgetTier);

  const scored = drinks.map((d) => {
    let score = 0;
    const dt = d.tasteTags || [];

    if (tags.length === 0) {
      score += 3;
    } else {
      const overlap = tags.filter((t) => dt.includes(t)).length;
      score += overlap * 6;
    }

    if (targetBand && d.priceBand === targetBand) {
      score += 8;
    } else if (targetBand && d.priceBand) {
      const order = { value: 0, mid: 1, premium: 2 };
      const diff = Math.abs(
        (order[d.priceBand] ?? 1) - (order[targetBand] ?? 1),
      );
      score += Math.max(0, 4 - diff * 2);
    }

    if (budgetTier === 'value' && d.priceBand === 'value') {
      score += 2;
    }
    if (budgetTier === 'splurge' && d.priceBand === 'premium') {
      score += 2;
    }

    const overlapTags = tags.filter((t) => dt.includes(t));
    let reason = 'Fits your aisle and budget';
    if (overlapTags.length > 0) {
      reason = `Matches your flavors: ${overlapTags.join(', ')}`;
    } else if (tags.length === 0) {
      reason = 'Popular pick in this section';
    }
    if (targetBand && d.priceBand === targetBand) {
      reason += ` · ${d.priceBand} tier`;
    }

    return { ...d, _coldScore: score, _matchReason: reason };
  });

  scored.sort((a, b) => b._coldScore - a._coldScore);
  return scored.slice(0, limit);
}
