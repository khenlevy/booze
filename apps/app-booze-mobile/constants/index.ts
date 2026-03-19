/**
 * Constants barrel export
 * 
 * Centralized export point for all application constants including
 * design tokens, themes, and other configuration values.
 * 
 * @module constants
 * 
 * @example
 * // Import design tokens
 * import {
 *   colors,
 *   typography,
 *   spacing,
 *   borderRadius,
 *   shadows,
 *   zIndex,
 *   animation,
 *   opacity,
 *   breakpoints,
 *   defaultTheme,
 *   type DesignTokens,
 * } from '@/constants';
 * 
 * // Use in component
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: colors.background.primary,
 *     padding: spacing[4],
 *     borderRadius: borderRadius.md,
 *     ...shadows.md,
 *   },
 * });
 */

// Design tokens - primary export
export {
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
} from './designTokens';

// Theme configurations
export { default as theme } from './theme';
export { default as parcusTheme } from './parcus-theme';

// Design tokens examples (for reference and documentation)
export {
  buttonExamples,
  cardExamples,
  inputExamples,
  badgeExamples,
  modalExamples,
  listItemExamples,
  alertExamples,
  headerExamples,
  dividerExamples,
  screenExamples,
  responsiveExamples,
  textExamples,
  stateExamples,
  spacingPatterns,
  shadowPatterns,
} from './designTokens.examples';
