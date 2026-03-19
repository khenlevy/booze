# Design Tokens Documentation

## Overview

The Design Tokens system provides a centralized, consistent set of design values for the app-booze-mobile application. These tokens ensure visual consistency, maintainability, and scalability across all UI components.

## Token Categories

### 1. Colors

The color system is organized by semantic purpose with light and dark theme variants.

#### Primary & Secondary Colors
```typescript
colors.primary.light    // '#6366F1' - Indigo
colors.primary.dark     // '#818CF8'
colors.secondary.light  // '#EC4899' - Pink
colors.secondary.dark   // '#F472B6'
```

#### Semantic Colors
```typescript
colors.success.light    // '#10B981' - Emerald
colors.error.light      // '#EF4444' - Red
colors.warning.light    // '#F59E0B' - Amber
colors.info.light       // '#3B82F6' - Blue
```

#### Neutral Grayscale
```typescript
colors.neutral[50]      // '#F9FAFB' - Lightest
colors.neutral[500]     // '#6B7280' - Mid-tone
colors.neutral[900]     // '#111827' - Darkest
```

#### Semantic Color Groups
```typescript
colors.text.primary     // '#111827'
colors.text.secondary   // '#6B7280'
colors.text.tertiary    // '#9CA3AF'
colors.text.inverse     // '#FFFFFF'

colors.background.primary   // '#FFFFFF'
colors.background.secondary // '#F9FAFB'
colors.background.tertiary  // '#F3F4F6'

colors.border.light     // '#E5E7EB'
colors.border.medium    // '#D1D5DB'
colors.border.dark      // '#9CA3AF'
```

### 2. Typography

The typography system defines font families, sizes, weights, and line heights for consistent text styling.

#### Font Families
```typescript
typography.fontFamily.primary   // 'System'
typography.fontFamily.mono      // 'Courier New'
```

#### Font Sizes (in pixels)
```typescript
typography.fontSize.xs      // 12px
typography.fontSize.sm      // 14px
typography.fontSize.base    // 16px
typography.fontSize.lg      // 18px
typography.fontSize.xl      // 20px
typography.fontSize['2xl']  // 24px
typography.fontSize['3xl']  // 30px
typography.fontSize['4xl']  // 36px
```

#### Font Weights
```typescript
typography.fontWeight.light      // '300'
typography.fontWeight.normal     // '400'
typography.fontWeight.medium     // '500'
typography.fontWeight.semibold   // '600'
typography.fontWeight.bold       // '700'
typography.fontWeight.extrabold  // '800'
```

#### Line Heights
```typescript
typography.lineHeight.tight      // 1.2
typography.lineHeight.normal     // 1.5
typography.lineHeight.relaxed    // 1.75
typography.lineHeight.loose      // 2
```

#### Letter Spacing
```typescript
typography.letterSpacing.tight   // -0.5
typography.letterSpacing.normal  // 0
typography.letterSpacing.wide    // 0.5
```

### 3. Spacing

The spacing scale is based on an 8px base unit for consistent, predictable spacing.

```typescript
spacing[0]   // 0px
spacing[1]   // 4px
spacing[2]   // 8px
spacing[3]   // 12px
spacing[4]   // 16px
spacing[5]   // 20px
spacing[6]   // 24px
spacing[8]   // 32px
spacing[10]  // 40px
spacing[12]  // 48px
spacing[16]  // 64px
spacing[20]  // 80px
spacing[24]  // 96px
spacing[32]  // 128px
spacing[48]  // 192px
spacing[64]  // 256px
spacing[96]  // 384px
```

### 4. Border Radius

Consistent border radius values for rounded corners.

```typescript
borderRadius.none       // 0
borderRadius.xs         // 2px
borderRadius.sm         // 4px
borderRadius.base       // 6px
borderRadius.md         // 8px
borderRadius.lg         // 12px
borderRadius.xl         // 16px
borderRadius['2xl']     // 20px
borderRadius['3xl']     // 24px
borderRadius.full       // 9999px (fully rounded)
```

### 5. Shadows

Elevation-based shadow system for depth and visual hierarchy. Includes both iOS and Android properties.

```typescript
shadows.none    // 'none'
shadows.sm      // Small shadow (elevation: 2)
shadows.base    // Base shadow (elevation: 4)
shadows.md      // Medium shadow (elevation: 6)
shadows.lg      // Large shadow (elevation: 8)
shadows.xl      // Extra large shadow (elevation: 12)
shadows['2xl']  // 2x large shadow (elevation: 16)
```

Each shadow includes:
- `shadowColor`: '#000'
- `shadowOffset`: { width, height }
- `shadowOpacity`: opacity value
- `shadowRadius`: blur radius
- `elevation`: Android elevation level

### 6. Z-Index

Stacking context management for layered UI elements.

```typescript
zIndex.hide         // -1
zIndex.base         // 0
zIndex.dropdown     // 1000
zIndex.sticky       // 1020
zIndex.fixed        // 1030
zIndex.backdrop     // 1040
zIndex.modal        // 1050
zIndex.popover      // 1060
zIndex.tooltip      // 1070
```

### 7. Animation

Transition duration values for consistent animation timing.

```typescript
animation.fast      // 150ms
animation.base      // 200ms
animation.slow      // 300ms
animation.slower    // 500ms
animation.slowest   // 1000ms
```

### 8. Opacity

Transparency scale for opacity effects and disabled states.

```typescript
opacity[0]      // 0 (fully transparent)
opacity[10]     // 0.1
opacity[25]     // 0.25
opacity[50]     // 0.5 (half transparent)
opacity[75]     // 0.75
opacity[100]    // 1 (fully opaque)
```

### 9. Breakpoints

Responsive design breakpoints using mobile-first approach.

```typescript
breakpoints.xs      // 0px
breakpoints.sm      // 640px
breakpoints.md      // 768px
breakpoints.lg      // 1024px
breakpoints.xl      // 1280px
breakpoints['2xl']  // 1536px
```

## Usage Examples

### Basic Component Styling

```typescript
import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '@/constants/designTokens';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    padding: spacing[4],
    borderRadius: borderRadius.md,
    ...shadows.md,
  },
  heading: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.normal,
  },
  text: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.relaxed,
  },
  button: {
    backgroundColor: colors.primary.light,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.lg,
  },
  buttonText: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold,
  },
});
```

### Semantic Color Usage

```typescript
import { colors } from '@/constants/designTokens';

// Success state
const successStyle = {
  backgroundColor: colors.success.light,
  borderColor: colors.success.light,
};

// Error state
const errorStyle = {
  backgroundColor: colors.error.light,
  borderColor: colors.error.light,
};

// Warning state
const warningStyle = {
  backgroundColor: colors.warning.light,
  borderColor: colors.warning.light,
};
```

### Responsive Spacing

```typescript
import { spacing } from '@/constants/designTokens';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],  // 16px
    paddingVertical: spacing[6],    // 24px
    marginBottom: spacing[8],       // 32px
    gap: spacing[3],                // 12px
  },
});
```

### Shadow Elevation

```typescript
import { shadows } from '@/constants/designTokens';

const styles = StyleSheet.create({
  card: {
    ...shadows.md,  // Medium elevation
  },
  modal: {
    ...shadows.xl,  // High elevation
  },
  subtle: {
    ...shadows.sm,  // Subtle elevation
  },
});
```

### Animation Timing

```typescript
import { animation } from '@/constants/designTokens';
import { Animated } from 'react-native';

const fadeIn = Animated.timing(opacity, {
  toValue: 1,
  duration: animation.base,  // 200ms
  useNativeDriver: true,
});
```

## Theme Variants

The design tokens support theme variants (light/dark). Access theme-specific colors:

```typescript
import { colors } from '@/constants/designTokens';

// Light theme
const lightPrimary = colors.primary.light;

// Dark theme
const darkPrimary = colors.primary.dark;
```

## Best Practices

1. **Always use design tokens** instead of hardcoded values
2. **Prefer semantic colors** (success, error, warning) over raw colors
3. **Use spacing scale** for consistent margins and padding
4. **Combine tokens** for complex styles
5. **Reference tokens in JSDoc** for component documentation
6. **Update tokens centrally** when design changes occur
7. **Use TypeScript** for type-safe token access

## Adding New Tokens

To add new tokens:

1. Add the token to the appropriate category in `designTokens.ts`
2. Update the JSDoc comments with examples
3. Export the token from `constants/index.ts`
4. Document the token in this README
5. Update components to use the new token

## Exporting Tokens

All tokens are exported from `@/constants`:

```typescript
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  animation,
  opacity,
  breakpoints,
  defaultTheme,
  type DesignTokens,
} from '@/constants';
```

## Type Safety

Use the `DesignTokens` type for custom theme objects:

```typescript
import type { DesignTokens } from '@/constants';

const customTheme: DesignTokens = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: { light: '#FF0000', dark: '#CC0000' },
  },
};
```

## Maintenance

- Review tokens quarterly for consistency
- Update tokens when design system changes
- Keep documentation in sync with code
- Test tokens across iOS and Android
- Validate accessibility (color contrast, font sizes)
