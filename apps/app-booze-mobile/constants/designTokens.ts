/**
 * Design Tokens for app-booze-mobile
 * 
 * Centralized design system tokens including colors, typography, spacing,
 * shadows, and other design constants. Supports light and dark themes.
 * 
 * Usage:
 * ```typescript
 * import { colors, typography, spacing, shadows, zIndex } from '@/constants/designTokens';
 * 
 * // Use in StyleSheet
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: colors.background.primary,
 *     padding: spacing[4],
 *     borderRadius: borderRadius.md,
 *     ...shadows.md,
 *   },
 *   text: {
 *     color: colors.text.primary,
 *     fontSize: typography.fontSize.base,
 *     fontWeight: typography.fontWeight.medium,
 *     lineHeight: typography.lineHeight.normal,
 *   },
 * });
 * ```
 * 
 * @module constants/designTokens
 */

/**
 * Color palette for the application
 * Organized by semantic purpose with light and dark theme variants
 * 
 * @example
 * // Primary brand color
 * const primaryColor = colors.primary.light; // '#6366F1'
 * 
 * // Semantic colors
 * const successColor = colors.success.light; // '#10B981'
 * 
 * // Text colors
 * const textColor = colors.text.primary; // '#111827'
 * 
 * // Neutral grayscale
 * const borderColor = colors.neutral[300]; // '#D1D5DB'
 */
export const colors = {
  // Primary brand colors
  primary: {
    light: '#6366F1', // Indigo
    dark: '#818CF8',
  },
  
  // Secondary brand colors
  secondary: {
    light: '#EC4899', // Pink
    dark: '#F472B6',
  },
  
  // Semantic colors
  success: {
    light: '#10B981', // Emerald
    dark: '#34D399',
  },
  
  error: {
    light: '#EF4444', // Red
    dark: '#F87171',
  },
  
  warning: {
    light: '#F59E0B', // Amber
    dark: '#FBBF24',
  },
  
  info: {
    light: '#3B82F6', // Blue
    dark: '#60A5FA',
  },
  
  // Neutral colors (grayscale)
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Transparent variants
  transparent: 'transparent',
  
  // Text colors
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },
  
  // Border colors
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },
};

/**
 * Typography scale
 * Defines font families, sizes, weights, and line heights
 * 
 * @example
 * // Font size
 * const fontSize = typography.fontSize.base; // 16
 * 
 * // Font weight
 * const fontWeight = typography.fontWeight.semibold; // '600'
 * 
 * // Line height
 * const lineHeight = typography.lineHeight.normal; // 1.5
 * 
 * // Letter spacing
 * const letterSpacing = typography.letterSpacing.wide; // 0.5
 */
export const typography = {
  // Font families
  fontFamily: {
    primary: 'System',
    mono: 'Courier New',
  },
  
  // Font sizes (in pixels)
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

/**
 * Spacing scale
 * Based on 8px base unit for consistent spacing
 * 
 * @example
 * // Small spacing
 * const smallPadding = spacing[2]; // 8
 * 
 * // Medium spacing
 * const mediumPadding = spacing[4]; // 16
 * 
 * // Large spacing
 * const largePadding = spacing[8]; // 32
 */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
};

/**
 * Border radius scale
 * For consistent rounded corners across the application
 * 
 * @example
 * // Small radius
 * const smallRadius = borderRadius.sm; // 4
 * 
 * // Medium radius
 * const mediumRadius = borderRadius.md; // 8
 * 
 * // Fully rounded
 * const fullRadius = borderRadius.full; // 9999
 */
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  base: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

/**
 * Shadow definitions
 * Elevation-based shadow system for depth and visual hierarchy
 * Includes both iOS (shadowColor, shadowOffset, shadowOpacity, shadowRadius)
 * and Android (elevation) properties for cross-platform compatibility
 * 
 * @example
 * // Small shadow for subtle depth
 * const smallShadow = shadows.sm;
 * // { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, ... }
 * 
 * // Large shadow for prominent elements
 * const largeShadow = shadows.lg;
 * // { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, ... }
 */
export const shadows = {
  none: 'none',
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16,
  },
};

/**
 * Z-index scale
 * For managing stacking context and layering of UI elements
 * 
 * @example
 * // Base layer
 * const baseZIndex = zIndex.base; // 0
 * 
 * // Modal overlay
 * const modalZIndex = zIndex.modal; // 1050
 * 
 * // Tooltip (highest)
 * const tooltipZIndex = zIndex.tooltip; // 1070
 */
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

/**
 * Animation/Transition durations (in milliseconds)
 * Use for consistent animation timing across the app
 * 
 * @example
 * // Fast animation
 * const fastDuration = animation.fast; // 150ms
 * 
 * // Slow animation
 * const slowDuration = animation.slow; // 300ms
 */
export const animation = {
  fast: 150,
  base: 200,
  slow: 300,
  slower: 500,
  slowest: 1000,
};

/**
 * Opacity scale
 * For transparency effects and disabled states
 * 
 * @example
 * // Fully transparent
 * const transparent = opacity[0]; // 0
 * 
 * // Half transparent
 * const halfTransparent = opacity[50]; // 0.5
 * 
 * // Fully opaque
 * const opaque = opacity[100]; // 1
 */
export const opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1,
};

/**
 * Breakpoints for responsive design
 * Mobile-first approach for responsive layouts
 * 
 * @example
 * // Mobile
 * const mobileBreakpoint = breakpoints.xs; // 0
 * 
 * // Tablet
 * const tabletBreakpoint = breakpoints.md; // 768
 * 
 * // Desktop
 * const desktopBreakpoint = breakpoints.lg; // 1024
 */
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Default theme configuration
 * Combines all design tokens into a single theme object
 * Can be extended or overridden per theme variant (light/dark)
 * 
 * @example
 * import { defaultTheme } from '@/constants/designTokens';
 * 
 * // Access all tokens
 * const theme = defaultTheme;
 * const primaryColor = theme.colors.primary.light;
 */
export const defaultTheme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  animation,
  opacity,
  breakpoints,
};

/**
 * Type definition for design tokens
 * Use this type when creating theme variants or custom theme objects
 * 
 * @example
 * import type { DesignTokens } from '@/constants/designTokens';
 * 
 * const customTheme: DesignTokens = {
 *   ...defaultTheme,
 *   colors: { ...defaultTheme.colors, primary: { ... } },
 * };
 */
export type DesignTokens = typeof defaultTheme;
