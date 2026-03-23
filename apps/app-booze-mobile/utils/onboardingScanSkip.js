import {
  loadOnboardingDraft,
  completeOnboardingFromDraft,
} from '@/utils/preferenceProfile';

/** Login reads this to land on scan + manual entry after sign-in. */
export const AFTER_LOGIN_SCAN_PARAM = 'scan';

/**
 * Skip remaining onboarding: persist whatever is in the draft (defaults if empty), then sign in
 * with redirect to scanner. Preserves aisle + flavor answers if the user already chose them.
 * @param {import('expo-router').Router} router
 */
export async function skipOnboardingThenGoToScanLogin(router) {
  const draft = await loadOnboardingDraft();
  await completeOnboardingFromDraft({
    primaryCategory: draft.primaryCategory || 'Not sure',
    tasteTags: Array.isArray(draft.tasteTags) ? draft.tasteTags : [],
    budgetTier: draft.budgetTier,
  });
  router.replace({
    pathname: '/(auth)/login',
    params: { afterLogin: AFTER_LOGIN_SCAN_PARAM },
  });
}

/**
 * User already finished onboarding (e.g. on Your picks) — only need sign-in then scanner.
 * @param {import('expo-router').Router} router
 */
export function goToLoginThenScan(router) {
  router.replace({
    pathname: '/(auth)/login',
    params: { afterLogin: AFTER_LOGIN_SCAN_PARAM },
  });
}
