# Onboarding preferences — phase 2 (server)

v1 stores the preference profile only on the device (`AsyncStorage`, key `boozePreferenceProfile` — see `utils/preferenceProfile.js`).

**Future work (when you need cross-device sync or admin analytics):**

1. **API** — e.g. `PATCH /api/v1/users/me/preferences` with body matching `PreferenceProfile` (minus `completedAt` or with server timestamps).
2. **Persistence** — Mongo document keyed by `userId` (or embed on User).
3. **Cold start** — extend `recommendationService` to return catalog-based suggestions when `DrinkLog` count is zero, merging stored server preferences with the Drink catalog.
4. **Mobile** — after login, `GET` preferences and call `savePreferenceProfile` to hydrate offline; on onboarding complete, `PATCH` then local save.

Until then, clearing app data or reinstalling will reset onboarding answers.
