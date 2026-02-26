# app-booze-mobile

React Native mobile app built with **Expo** and **Expo Router**. Uses file-based routing, shared `cl-` packages for reusable components, and dedicated ESLint/Prettier configs.

---

## Project Structure

```
app-booze-mobile/
├── app/                      # Routes (Expo Router file-based)
│   ├── _layout.jsx           # Root layout
│   ├── index.jsx             # Entry / redirect logic
│   ├── (onboarding)/         # Onboarding flow group
│   │   ├── _layout.jsx
│   │   ├── entrance.jsx
│   │   ├── community-intro.jsx
│   │   └── ...
│   ├── (auth)/               # Auth flow group
│   │   ├── _layout.jsx
│   │   ├── login.jsx
│   │   └── verify-code.jsx
│   ├── (tabs)/               # Main tab screens
│   │   ├── _layout.jsx
│   │   ├── index.jsx
│   │   ├── search.jsx
│   │   └── account.jsx
│   ├── search-results.jsx     # Standalone screens
│   └── result-view.jsx
├── components/               # App-specific components
│   ├── parcus/               # Feature/domain components
│   │   ├── BottomBar.jsx
│   │   ├── PrimaryButton.jsx
│   │   └── SocialButton.jsx
│   ├── ui/                   # Generic UI primitives
│   │   ├── icon-symbol.jsx
│   │   └── collapsible.jsx
│   ├── themed-text.jsx
│   └── themed-view.jsx
├── hooks/                    # Custom hooks
│   ├── useDebounce.js
│   ├── use-theme-color.js
│   └── use-color-scheme.js
├── constants/                # Theme, colors, config
│   ├── parcus-theme.js       # App theme (colors, typography)
│   └── theme.js              # Base theme (light/dark)
├── data/                      # Mock data, fixtures (optional)
├── assets/
│   ├── icons/                # Icon components (react-native-svg)
│   │   ├── LiHome.jsx
│   │   ├── LiSearch.jsx
│   │   └── ...
│   └── svg/                  # SVG illustrations
│       └── ParcusPiggy.jsx
├── scripts/
│   └── reset-project.js
├── eslint.config.js
├── .prettierrc.cjs
└── jsconfig.json             # Path alias @/*
```

---

## How to Add a New Page

### 1. Create the Screen File

Place it in the appropriate route group under `app/`:

```jsx
// app/(tabs)/new-screen.jsx
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar'; // if tab screen

export default function NewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>New Screen</Text>
      </View>
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
  },
});
```

### 2. Register in Layout

Add the screen to the group's `_layout.jsx`:

```jsx
// app/(tabs)/_layout.jsx
<Stack.Screen name="new-screen" />
```

### 3. Navigate to It

```jsx
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/(tabs)/new-screen');
router.replace('/(auth)/login');  // Replace (no back)
```

---

## Routes (Expo Router)

### File-Based Routing

- `app/index.jsx` → `/`
- `app/(tabs)/index.jsx` → `/(tabs)` or `/(tabs)/`
- `app/(tabs)/search.jsx` → `/(tabs)/search`
- `app/(auth)/login.jsx` → `/(auth)/login`
- `app/search-results.jsx` → `/search-results`

### Route Groups

`(groupName)` creates a URL segment without adding to the path:

| Group        | Purpose                    | Screens                          |
|--------------|----------------------------|----------------------------------|
| `(onboarding)`| First-time user flow       | entrance, community-intro, etc. |
| `(auth)`     | Login, verify code         | login, verify-code               |
| `(tabs)`     | Main app (with BottomBar)  | index, search, account           |

### Navigation Helpers

```jsx
import { useRouter, usePathname, useLocalSearchParams } from 'expo-router';

// Navigate
router.push('/(tabs)/search');
router.replace('/(auth)/login');
router.back();

// Current path
const pathname = usePathname();

// Query / dynamic params
const { id, phone } = useLocalSearchParams();
router.push({ pathname: '/(auth)/verify-code', params: { phone: '+123' } });
```

---

## Layouts

### Root Layout (`app/_layout.jsx`)

Wraps the entire app. Must include:

- `SafeAreaProvider`
- `ThemeProvider` (from `@react-navigation/native`)
- `Stack` with `screenOptions`
- `StatusBar`

```jsx
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="search-results" options={{ headerShown: true, title: 'Search' }} />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

### Group Layouts

Each `(group)/_layout.jsx` defines a `Stack` for that group:

```jsx
// app/(tabs)/_layout.jsx
import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="account" />
    </Stack>
  );
}
```

### Screen Options

- `headerShown: false` — hide header
- `headerShown: true` — show header with `title`
- `headerStyle`, `headerShadowVisible` — styling

---

## How to Add Components

### App-Specific Components

Place in `components/` when used only in this app:

```
components/
├── parcus/          # Feature components (Parcus domain)
├── ui/              # Generic UI (icon-symbol, collapsible)
```

**Pattern:**

```jsx
// components/parcus/PrimaryButton.jsx
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography } from '@/constants/parcus-theme';

export default function PrimaryButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.brand.primary,
    paddingVertical: 18,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    ...typography.button,
  },
});
```

### When to Use `cl-` Packages

Use `packages/client/cl-*` when:

- Component is reusable across **multiple apps** (web, mobile, etc.)
- Component has clear API and variants
- You want shared versioning and tests

**Example:** `@booze/cl-button` — web Button with variants (primary, secondary, etc.).

---

## Creating a New `cl-` Package (e.g. cl-button)

### Package Structure

```
packages/client/cl-button/
├── package.json
├── README.md
└── src/
    ├── index.js           # Re-exports
    └── components/
        └── Button.jsx
```

### package.json

```json
{
  "name": "@booze/cl-button",
  "version": "1.0.0",
  "type": "module",
  "main": "src/index.js",
  "exports": { ".": "./src/index.js" },
  "peerDependencies": { "react": "^18.0.0" },
  "scripts": { "prettier-lint": "dv-prettier-lint-runner" }
}
```

### Component (Web Example)

```jsx
// cl-button uses HTML + Tailwind for web
const Button = ({ children, onClick, variant = 'primary', size = 'md', ...props }) => {
  const variantClasses = { primary: 'bg-blue-600 text-white', ... };
  return (
    <button onClick={onClick} className={variantClasses[variant]} {...props}>
      {children}
    </button>
  );
};
export default Button;
```

### React Native Variant

For RN, create `cl-button-rn` or `cl-buttons` with RN primitives:

```jsx
// Use TouchableOpacity, StyleSheet, not HTML/Tailwind
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
```

### Usage in App

```bash
yarn add @booze/cl-button   # or workspace:*
```

```jsx
import { Button } from '@booze/cl-button';
```

---

## Hooks

### Location

`hooks/` at app root.

### Pattern

```javascript
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

### Theme Hook

```javascript
// hooks/use-theme-color.js
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(props, colorName) {
  const theme = useColorScheme() ?? 'light';
  return props[theme] ?? Colors[theme][colorName];
}
```

### When to Create a Hook

- Reusable state logic
- Debounce, throttle, form state
- Theme/color scheme
- API/data fetching (consider `useEffect` + state or a data library)

---

## Assets

### Icons (`assets/icons/`)

Use `react-native-svg` for vector icons:

```jsx
// assets/icons/LiHome.jsx
import Svg, { Path } from 'react-native-svg';

export default function LiHome({ width = 25, height = 24, color = 'currentColor', style }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none" style={style}>
      <Path fillRule="evenodd" d="..." fill={color} />
    </Svg>
  );
}
```

### SVG Illustrations (`assets/svg/`)

Same pattern — export a component that accepts `width`, `height`, `color`, `style`.

### Usage

```jsx
import LiHome from '@/assets/icons/LiHome';
import ParcusPiggy from '@/assets/svg/ParcusPiggy';

<LiHome width={25} height={24} color={colors.brand.primary} />
<ParcusPiggy width={213} height={189} />
```

---

## Constants

### Theme Constants (`constants/parcus-theme.js`)

```javascript
export const colors = {
  brand: { primary: '#5572C3', background: '#F9F6FF' },
  text: { primary: '#32253C', secondary: '#666666', inverse: '#ffffff' },
  background: { primary: '#F9F6FF', secondary: '#ffffff', card: '#ffffff' },
  state: { success: '#4CAF50', error: '#F44336', warning: '#FFC107', info: '#2196F3' },
  common: { white: '#ffffff', black: '#000000', transparent: 'transparent' },
};

export const typography = {
  h1: { fontSize: 32, lineHeight: 40, fontWeight: 'bold' },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: '600' },
  body1: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  body2: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  button: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
};
```

### Usage

```jsx
import { colors, typography } from '@/constants/parcus-theme';

// In styles
title: {
  ...typography.h1,
  color: colors.text.primary,
},
```

### Data & Mocks

For mock data or fixtures, use `data/`:

```javascript
// data/search-mock.js
export const MOCK_SEARCH_DATA = [...];
export const searchItems = [...];
```

```jsx
import { MOCK_SEARCH_DATA, searchItems } from '@/data/search-mock';
```

### Adding Constants

- Colors/typography → `constants/parcus-theme.js` or `constants/theme.js`
- App config (API URLs, keys) → `constants/config.js`
- Storage keys → define in the module that uses them or in `constants/storage.js`

---

## ESLint & Prettier

### ESLint (`eslint.config.js`)

- Extends `@booze/dv-prettier-lint/config/client` and `eslint-config-expo`
- Path alias `@` → `.` for `@/components`, `@/constants`, etc.
- Ignores `dist/*`

```javascript
// Extends base + expo
const baseConfig = compat.config(
  require('@booze/dv-prettier-lint/config/client/.eslintrc.cjs'),
);
module.exports = defineConfig([...baseConfig, expoConfig, { ignores: ['dist/*'] }, ...]);
```

### Prettier (`.prettierrc.cjs`)

- Extends `@booze/dv-prettier-lint/config/client`
- Override only when needed:

```javascript
module.exports = {
  ...require('@booze/dv-prettier-lint/config/client/.prettierrc.cjs'),
  // Mobile-specific overrides
};
```

### Commands

```bash
yarn lint          # ESLint
yarn prettier-lint  # Prettier (via dv-prettier-lint-runner)
```

---

## Path Aliases

`jsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

Use `@/` for app-root imports:

```jsx
import { colors } from '@/constants/parcus-theme';
import PrimaryButton from '@/components/parcus/PrimaryButton';
import LiHome from '@/assets/icons/LiHome';
```

---

## For AI Coding Agents

### Before Starting

1. Read this README
2. Inspect `app/`, `components/`, `constants/` for patterns
3. Check `packages/client/` for existing `cl-` components

### When Adding a Page

1. Create `app/(group)/screen-name.jsx`
2. Add `<Stack.Screen name="screen-name" />` to group `_layout.jsx`
3. Use `SafeAreaView`, `colors`, `typography` from constants
4. Add `BottomBar` for tab screens

### When Adding a Component

- **App-only** → `components/parcus/` or `components/ui/`
- **Reusable across apps** → new `packages/client/cl-*` package
- Use `StyleSheet.create`, `TouchableOpacity`/`Pressable` for RN
- Import theme from `@/constants/parcus-theme`

### When Adding a Hook

1. Create `hooks/useName.js`
2. Export named function
3. Use `@/hooks/useName` in components

### When Adding Assets

- Icons → `assets/icons/ComponentName.jsx` (react-native-svg)
- Illustrations → `assets/svg/ComponentName.jsx`
- Props: `width`, `height`, `color`, `style`

### When Adding Constants

- Theme → `constants/parcus-theme.js` or `theme.js`
- Config → `constants/config.js`

### Code Style

- Use `StyleSheet.create` for styles
- Use `colors` and `typography` from constants
- Use `@/` path alias
- Run `yarn lint` and `yarn prettier-lint`

### Checklist for New Features

- [ ] Page in correct `app/(group)/`
- [ ] Screen registered in `_layout.jsx`
- [ ] Components in `components/` or `cl-` package
- [ ] Constants in `constants/`
- [ ] Icons/assets in `assets/`
- [ ] Lint and Prettier pass

---

## Getting Started

```bash
yarn install
yarn start    # Expo dev server
yarn android  # Android
yarn ios      # iOS
yarn web      # Web
```

### Reset Project

```bash
yarn reset-project
```

Moves starter code to `app-example/` and creates a blank `app/` directory.
