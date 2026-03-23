# Design system (app-booze-mobile)

## Sources of truth

| Layer | Path | Use for |
|-------|------|--------|
| **App brand + layout tokens** | [`constants/parcus-theme.js`](../constants/parcus-theme.js) | Production screens: `colors`, `typography`, **`spacing`**, **`radius`**, **`shadows`**, **`navigation`** (tab bar) |
| **Extended tokens + TS types** | [`constants/designTokens.ts`](../constants/designTokens.ts) | `components/ui/*`, Storybook — **colors are aligned** with parcus-theme |
| **Primitives** | [`components/primitives/`](../components/primitives/) | **AppButton**, **SelectableCard**, **ChoiceChip** — new features and high-traffic CTAs |
| **UI kit** | [`components/ui/`](../components/ui/) | Rich variants, docs, stories; import via `@/constants/designTokens` |

## Rules

1. **New screens** → `@/constants/parcus-theme` + `@/components/primitives` first.
2. **Do not** hardcode hex grays for chrome — use `colors.*` or `navigation.tabBarBackground` / `navigation.tabBarInactive`.
3. **Spacing / radius** → use `spacing.*` and `radius.*` from parcus-theme instead of magic `12`, `14`, `24` where practical.
4. **`components/parcus/`** — legacy shell (BottomBar, SocialButton). `PrimaryButton` is a thin wrapper over `AppButton`.

## Migrating old UI

- Replace one-off `TouchableOpacity` + brand-colored `Text` pairs with **`AppButton`** (`primary` | `secondary` | `outline` | `ghost`).
- Replace large selectable rows with **`SelectableCard`**; tag rows with **`ChoiceChip`**.
