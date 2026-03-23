# Mock drink catalog (AI-ready)

Temporary catalog: **15 SKUs per shelf** — `mock-drinks-wine.js`, `mock-drinks-whiskey.js`, `mock-drinks-beer.js`, `mock-drinks-spirits.js` — merged in `drink-catalog-mock.js` as `MOCK_DRINKS` (60 rows).

## Schema

See `data/catalogDrinkSchema.js` (`defineCatalogDrink`, JSDoc `CatalogDrink`). Highlights for future models:

| Area | Fields |
|------|--------|
| Identity | `id`, `retailer.sku`, `retailer.upc` |
| Taxonomy | `category`, `subcategory`, `style` |
| Sensory / shelf | `tasteTags`, `sensory.body`, `sensory.sweetness`, `sensory.intensity` |
| Commercial | `priceBand` (`value` \| `mid` \| `premium`) — maps from onboarding `budgetTier` |
| Geo | `origin.country`, `origin.region` |
| Narrative | `desc`, `aiSummary` (embedding-friendly paragraph), `aiContext` (extra RAG facts) |
| Meta | `schemaVersion`, `source: 'mock_catalog'` |

## Flows

- **Onboarding** → `your-picks` shows top cold-start match + runners-up (`utils/coldStartPicks.js`).
- **Home “Starter picks”** uses the same scoring.
- **Search** falls back to `searchCatalogDrinks` over full text + tags + `aiSummary` / `aiContext`.

When the real API is wired, keep the same shape where possible so cold-start and RAG can swap data sources without UI changes.
