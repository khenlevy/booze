/**
 * Design Tokens Usage Examples
 * 
 * This file demonstrates practical usage patterns for design tokens
 * in component styling and layout composition.
 * 
 * @module constants/designTokens.examples
 */

import { StyleSheet } from 'react-native';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  animation,
  opacity,
} from './designTokens';

/**
 * Example 1: Basic Button Component
 * Demonstrates color, spacing, and border radius tokens
 */
export const buttonExamples = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary.light,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  secondary: {
    backgroundColor: colors.secondary.light,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
  },
  secondaryText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  disabled: {
    backgroundColor: colors.neutral[300],
    opacity: opacity[50],
  },
});

/**
 * Example 2: Card Component
 * Demonstrates shadows, spacing, and background colors
 */
export const cardExamples = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[4],
    ...shadows.md,
  },
  header: {
    marginBottom: spacing[3],
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  content: {
    marginBottom: spacing[3],
  },
  text: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.relaxed,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: spacing[3],
    marginTop: spacing[3],
  },
});

/**
 * Example 3: Input Field Component
 * Demonstrates border colors, spacing, and typography
 */
export const inputExamples = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  inputFocused: {
    borderColor: colors.primary.light,
    backgroundColor: colors.background.secondary,
  },
  inputError: {
    borderColor: colors.error.light,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.error.light,
    marginTop: spacing[1],
  },
  helperText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },
});

/**
 * Example 4: Badge/Tag Component
 * Demonstrates semantic colors and small spacing
 */
export const badgeExamples = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  badge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePrimary: {
    backgroundColor: colors.primary.light,
  },
  badgeSuccess: {
    backgroundColor: colors.success.light,
  },
  badgeError: {
    backgroundColor: colors.error.light,
  },
  badgeWarning: {
    backgroundColor: colors.warning.light,
  },
  badgeInfo: {
    backgroundColor: colors.info.light,
  },
  badgeNeutral: {
    backgroundColor: colors.neutral[200],
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.inverse,
  },
});

/**
 * Example 5: Modal/Dialog Component
 * Demonstrates z-index, shadows, and spacing
 */
export const modalExamples = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.neutral[900],
    opacity: opacity[50],
    zIndex: zIndex.backdrop,
  },
  container: {
    position: 'absolute',
    zIndex: zIndex.modal,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.xl,
    padding: spacing[6],
    ...shadows.xl,
  },
  header: {
    marginBottom: spacing[4],
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  content: {
    marginBottom: spacing[6],
  },
  contentText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.relaxed,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing[3],
    justifyContent: 'flex-end',
  },
});

/**
 * Example 6: List Item Component
 * Demonstrates semantic spacing and border colors
 */
export const listItemExamples = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  action: {
    marginLeft: spacing[3],
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing[2],
  },
});

/**
 * Example 7: Alert/Toast Component
 * Demonstrates semantic colors and shadows
 */
export const alertExamples = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    padding: spacing[4],
    marginBottom: spacing[3],
    ...shadows.sm,
  },
  success: {
    backgroundColor: colors.success.light,
  },
  error: {
    backgroundColor: colors.error.light,
  },
  warning: {
    backgroundColor: colors.warning.light,
  },
  info: {
    backgroundColor: colors.info.light,
  },
  text: {
    fontSize: typography.fontSize.base,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.medium,
  },
});

/**
 * Example 8: Header Component
 * Demonstrates typography hierarchy and spacing
 */
export const headerExamples = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing[2],
    marginTop: spacing[3],
  },
});

/**
 * Example 9: Divider Component
 * Demonstrates border colors and spacing
 */
export const dividerExamples = StyleSheet.create({
  horizontal: {
    height: 1,
    backgroundColor: colors.border.medium,
    marginVertical: spacing[4],
  },
  vertical: {
    width: 1,
    backgroundColor: colors.border.medium,
    marginHorizontal: spacing[4],
  },
  withText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[4],
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.light,
  },
  text: {
    marginHorizontal: spacing[3],
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
});

/**
 * Example 10: Screen Layout
 * Demonstrates full-screen layout with safe area and spacing
 */
export const screenExamples = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  scrollContent: {
    paddingBottom: spacing[6],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[3],
  },
  footer: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.secondary,
  },
});

/**
 * Example 11: Responsive Layout
 * Demonstrates spacing adjustments for different screen sizes
 */
export const responsiveExamples = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  containerLarge: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[6],
  },
  grid: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  gridLarge: {
    gap: spacing[4],
  },
  item: {
    flex: 1,
  },
});

/**
 * Example 12: Text Styles
 * Demonstrates typography combinations
 */
export const textExamples = StyleSheet.create({
  h1: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.tight,
  },
  h2: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.tight,
  },
  h3: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.normal,
  },
  body: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.relaxed,
  },
  bodySmall: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal,
  },
  caption: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    lineHeight: typography.lineHeight.normal,
  },
  mono: {
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
});

/**
 * Example 13: Interactive States
 * Demonstrates how to handle different component states
 */
export const stateExamples = StyleSheet.create({
  button: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary.light,
  },
  buttonHovered: {
    opacity: opacity[80],
  },
  buttonPressed: {
    opacity: opacity[60],
  },
  buttonDisabled: {
    backgroundColor: colors.neutral[300],
    opacity: opacity[50],
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  inputFocused: {
    borderColor: colors.primary.light,
    ...shadows.sm,
  },
  inputError: {
    borderColor: colors.error.light,
  },
  inputDisabled: {
    backgroundColor: colors.neutral[100],
    opacity: opacity[50],
  },
});

/**
 * Example 14: Spacing Patterns
 * Demonstrates common spacing patterns
 */
export const spacingPatterns = {
  // Tight spacing (compact layouts)
  tight: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    gap: spacing[1],
  },
  
  // Normal spacing (default layouts)
  normal: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[2],
  },
  
  // Loose spacing (spacious layouts)
  loose: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[5],
    gap: spacing[4],
  },
  
  // Section spacing
  section: {
    marginBottom: spacing[6],
  },
  
  // Component spacing
  component: {
    marginBottom: spacing[4],
  },
};

/**
 * Example 15: Shadow Patterns
 * Demonstrates different elevation levels
 */
export const shadowPatterns = {
  // Subtle shadow for interactive elements
  subtle: shadows.sm,
  
  // Default shadow for cards
  card: shadows.md,
  
  // Elevated shadow for modals
  elevated: shadows.lg,
  
  // Maximum shadow for important overlays
  maximum: shadows.xl,
};
