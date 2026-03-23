import AsyncStorage from '@react-native-async-storage/async-storage';

export const PREFERENCE_PROFILE_KEY = 'boozePreferenceProfile';
export const ONBOARDING_DRAFT_KEY = 'boozeOnboardingDraft';
export const ONBOARDING_COMPLETED_KEY = 'onboardingCompleted';

/** @typedef {'Wine'|'Whiskey'|'Beer'|'Spirits'|'Not sure'} PrimaryCategory */
/** @typedef {'value'|'mid'|'splurge'} BudgetTier */

/**
 * @typedef {object} PreferenceProfile
 * @property {PrimaryCategory} primaryCategory
 * @property {string[]} tasteTags
 * @property {BudgetTier} [budgetTier]
 * @property {number} version
 * @property {string} [completedAt] ISO date
 */

/**
 * Taste chips — must match strings used in drink-catalog-mock tasteTags for scoring.
 */
export const ONBOARDING_TASTE_TAGS = [
  'Dry',
  'Sweet',
  'Fruity',
  'Smoky',
  'Oak',
  'Smooth',
  'Crisp',
  'Bitter',
];

export const PRIMARY_CATEGORIES = [
  { id: 'Wine', label: 'Wine', hint: 'Red, white, bubbly' },
  { id: 'Whiskey', label: 'Whiskey', hint: 'Bourbon, scotch & more' },
  { id: 'Beer', label: 'Beer', hint: 'Lager, ale, stout' },
  { id: 'Spirits', label: 'Spirits', hint: 'Rum, vodka, etc.' },
  { id: 'Not sure', label: 'Not sure yet', hint: 'Show me a mix' },
];

export const BUDGET_OPTIONS = [
  { id: 'value', label: 'Value picks', sub: 'Great bottles without breaking the bank' },
  { id: 'mid', label: 'Mid-range', sub: 'Balance of quality and price' },
  { id: 'splurge', label: 'Splurge-worthy', sub: 'Special bottle or gift' },
];

const PROFILE_VERSION = 1;

/**
 * @returns {Promise<PreferenceProfile|null>}
 */
export async function loadPreferenceProfile() {
  try {
    const raw = await AsyncStorage.getItem(PREFERENCE_PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      primaryCategory: parsed.primaryCategory ?? 'Not sure',
      tasteTags: Array.isArray(parsed.tasteTags) ? parsed.tasteTags : [],
      budgetTier: parsed.budgetTier,
      version: parsed.version ?? PROFILE_VERSION,
      completedAt: parsed.completedAt,
    };
  } catch {
    return null;
  }
}

/**
 * @param {Omit<PreferenceProfile, 'version'|'completedAt'> & Partial<Pick<PreferenceProfile, 'version'>>} profile
 */
export async function savePreferenceProfile(profile) {
  const full = {
    ...profile,
    version: profile.version ?? PROFILE_VERSION,
    completedAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(PREFERENCE_PROFILE_KEY, JSON.stringify(full));
  return full;
}

/**
 * @returns {Promise<Record<string, unknown>>}
 */
export async function loadOnboardingDraft() {
  try {
    const raw = await AsyncStorage.getItem(ONBOARDING_DRAFT_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

/**
 * @param {Record<string, unknown>} partial
 */
export async function mergeOnboardingDraft(partial) {
  const prev = await loadOnboardingDraft();
  const next = { ...prev, ...partial };
  await AsyncStorage.setItem(ONBOARDING_DRAFT_KEY, JSON.stringify(next));
  return next;
}

export async function clearOnboardingDraft() {
  await AsyncStorage.removeItem(ONBOARDING_DRAFT_KEY);
}

/**
 * Clear onboarding completion so the in-store Q&A flow shows again.
 * Does not remove saved preference profile until the user finishes the flow again.
 */
export async function resetOnboardingProgress() {
  await AsyncStorage.removeItem(ONBOARDING_COMPLETED_KEY);
  await clearOnboardingDraft();
}

/**
 * Finalize onboarding: persist profile, mark onboarding complete, clear draft.
 * @param {object} draft
 * @param {PrimaryCategory} draft.primaryCategory
 * @param {string[]} [draft.tasteTags]
 * @param {BudgetTier} [draft.budgetTier]
 */
export async function completeOnboardingFromDraft(draft) {
  const profile = await savePreferenceProfile({
    primaryCategory: draft.primaryCategory || 'Not sure',
    tasteTags: Array.isArray(draft.tasteTags) ? draft.tasteTags : [],
    budgetTier: draft.budgetTier,
  });
  await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
  await clearOnboardingDraft();
  return profile;
}

/**
 * Map saved primary category to Search filter chip id.
 * @param {PrimaryCategory|string|undefined} primaryCategory
 * @returns {string}
 */
export function primaryCategoryToSearchFilter(primaryCategory) {
  if (!primaryCategory || primaryCategory === 'Not sure') return 'All';
  return primaryCategory;
}
