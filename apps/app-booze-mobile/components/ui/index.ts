/**
 * UI Component Library - Main Export
 * 
 * Centralized export point for all UI components in the design system.
 * This barrel file provides a single import location for all shared components
 * and their associated types.
 * 
 * The library is organized into four main categories:
 * - Typography: Text rendering components (Heading, Body, Caption, Label)
 * - Interactive: User interaction components (Button, InputField)
 * - Layout: Container and layout components (Card, ScreenLayout, Divider)
 * - Display: Visual indicator components (Badge, Avatar, IconWrapper)
 * 
 * All components are built with:
 * - TypeScript strict mode compliance
 * - React Native StyleSheet for optimal performance
 * - Accessibility support (ARIA labels, roles, states)
 * - JSDoc documentation
 * - Consistent design tokens from @/constants/designTokens
 * - Light/dark theme support ready
 * 
 * @module components/ui
 * @example
 * ```tsx
 * // Import multiple components
 * import {
 *   Button,
 *   Card,
 *   Heading,
 *   Body,
 *   InputField,
 *   IconWrapper,
 *   Divider,
 *   Badge,
 *   Avatar,
 *   ScreenLayout,
 * } from '@/components/ui';
 * 
 * // Use in your component
 * export function MyScreen() {
 *   return (
 *     <ScreenLayout>
 *       <ScreenLayout.Header>
 *         <Heading level={1}>Welcome</Heading>
 *       </ScreenLayout.Header>
 *       <ScreenLayout.Content>
 *         <Card>
 *           <Card.Body>
 *             <Body>Your content here</Body>
 *           </Card.Body>
 *         </Card>
 *       </ScreenLayout.Content>
 *     </ScreenLayout>
 *   );
 * }
 * ```
 * 
 * @see {@link https://github.com/your-org/app-booze-mobile/tree/main/apps/app-booze-mobile/components/ui} Component Library Documentation
 */

// ============================================================================
// Typography Components
// ============================================================================
// Text rendering components for consistent typography throughout the app
export {
  Heading,
  Body,
  Caption,
  Label,
  type HeadingProps,
  type TypographyProps,
} from './Typography';

// ============================================================================
// Interactive Components
// ============================================================================
// User interaction components with state management and validation

// Button component with multiple variants and sizes
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from './Button';

// Text input component with validation and error states
export {
  InputField,
  type InputFieldProps,
  type InputFieldState,
} from './InputField';

// ============================================================================
// Layout Components
// ============================================================================
// Container and layout components for organizing content

// Card component with optional header and footer slots
export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardBodyProps,
  type CardFooterProps,
} from './Card';

// Screen layout wrapper with safe area handling
export {
  ScreenLayout,
  ScreenLayoutHeader,
  ScreenLayoutContent,
  ScreenLayoutFooter,
  type ScreenLayoutProps,
  type ScreenLayoutHeaderProps,
  type ScreenLayoutContentProps,
  type ScreenLayoutFooterProps,
} from './ScreenLayout';

// Divider component for visual separation
export {
  Divider,
  type DividerProps,
  type DividerOrientation,
} from './Divider';

// ============================================================================
// Display Components
// ============================================================================
// Visual indicator and display components

// Icon wrapper component for consistent icon styling
export {
  IconWrapper,
  type IconWrapperProps,
  type IconSize,
  type IconColor,
} from './Icon';

// Badge/Tag component for labels and status indicators
export {
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
} from './Badge';

// Avatar component for user profile images with fallbacks
export {
  Avatar,
  type AvatarProps,
  type AvatarSize,
  type AvatarShape,
} from './Avatar';

// ============================================================================
// Type Exports
// ============================================================================
// Aggregate type exports for convenience

/**
 * Union type of all component variant types
 * @internal
 */
export type {
  ButtonVariant,
  BadgeVariant,
  DividerOrientation,
  InputFieldState,
  AvatarShape,
} from './index';

/**
 * Union type of all component size types
 * @internal
 */
export type {
  ButtonSize,
  BadgeSize,
  IconSize,
  AvatarSize,
} from './index';
