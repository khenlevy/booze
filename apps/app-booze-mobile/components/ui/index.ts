/**
 * UI Component Library - Main Export
 * 
 * Centralized export point for all UI components in the design system.
 * This barrel file provides a single import location for all shared components.
 * 
 * @module components/ui
 * @example
 * ```tsx
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
 * ```
 */

// Typography components
export {
  Heading,
  Body,
  Caption,
  Label,
  type HeadingProps,
  type TypographyProps,
} from './Typography';

// Button component
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from './Button';

// Card component
export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardBodyProps,
  type CardFooterProps,
  type CardVariant,
} from './Card';

// InputField component
export {
  InputField,
  type InputFieldProps,
  type InputFieldState,
} from './InputField';

// Icon component
export {
  IconWrapper,
  type IconWrapperProps,
  type IconSize,
  type IconColor,
} from './Icon';

// Divider component
export {
  Divider,
  type DividerProps,
  type DividerOrientation,
} from './Divider';

// Badge component
export {
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
} from './Badge';

// Avatar component
export {
  Avatar,
  type AvatarProps,
  type AvatarSize,
  type AvatarShape,
} from './Avatar';

// ScreenLayout component
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
