/**
 * Card Component
 * 
 * A container component for grouping related content with optional header and footer.
 * Provides elevation and consistent spacing with support for multiple variants.
 * 
 * @component
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>Title</Card.Header>
 *   <Card.Body>Content</Card.Body>
 *   <Card.Footer>Footer</Card.Footer>
 * </Card>
 * ```
 * 
 * @example
 * ```tsx
 * // With custom styling
 * <Card elevated={false} padding={spacing[3]}>
 *   <Card.Body>
 *     <Body>Flat card without shadow</Body>
 *   </Card.Body>
 * </Card>
 * ```
 * 
 * @example
 * ```tsx
 * // With variant
 * <Card variant="outlined">
 *   <Card.Header>
 *     <Heading level={3}>Outlined Card</Heading>
 *   </Card.Header>
 *   <Card.Body>
 *     <Body>Card with border instead of shadow</Body>
 *   </Card.Body>
 * </Card>
 * ```
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../constants/designTokens';

/**
 * Card variant types
 * - elevated: Default card with shadow elevation
 * - outlined: Card with border instead of shadow
 * - filled: Card with subtle background color
 */
export type CardVariant = 'elevated' | 'outlined' | 'filled';

/**
 * Card component props
 */
export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Padding inside the card */
  padding?: number;
  
  /** Whether to show shadow (deprecated: use variant instead) */
  elevated?: boolean;
  
  /** Background color */
  backgroundColor?: string;
  
  /** Card variant style */
  variant?: CardVariant;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Card Header component props
 */
export interface CardHeaderProps {
  /** Header content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Card Body component props
 */
export interface CardBodyProps {
  /** Body content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Card Footer component props
 */
export interface CardFooterProps {
  /** Footer content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Card Header component
 * 
 * @param props - Card header props
 * @returns Rendered card header
 */
const CardHeader = React.forwardRef<View, CardHeaderProps>(
  ({ children, style, testID }, ref) => (
    <View
      ref={ref}
      style={[styles.header, style]}
      testID={testID}
    >
      {children}
    </View>
  ),
);

CardHeader.displayName = 'Card.Header';

/**
 * Card Body component
 * 
 * @param props - Card body props
 * @returns Rendered card body
 */
const CardBody = React.forwardRef<View, CardBodyProps>(
  ({ children, style, testID }, ref) => (
    <View
      ref={ref}
      style={[styles.body, style]}
      testID={testID}
    >
      {children}
    </View>
  ),
);

CardBody.displayName = 'Card.Body';

/**
 * Card Footer component
 * 
 * @param props - Card footer props
 * @returns Rendered card footer
 */
const CardFooter = React.forwardRef<View, CardFooterProps>(
  ({ children, style, testID }, ref) => (
    <View
      ref={ref}
      style={[styles.footer, style]}
      testID={testID}
    >
      {children}
    </View>
  ),
);

CardFooter.displayName = 'Card.Footer';

/**
 * Card component
 * 
 * A flexible container for grouping related content with optional header and footer slots.
 * Supports multiple visual variants and customizable styling.
 * 
 * @param props - Card component props
 * @returns Rendered card component
 */
const Card = React.forwardRef<View, CardProps>(
  (
    {
      children,
      style,
      padding = spacing[4],
      elevated = true,
      backgroundColor = colors.background.primary,
      variant = 'elevated',
      testID,
    },
    ref,
  ) => {
    // Determine variant styles
    const getVariantStyles = () => {
      switch (variant) {
        case 'outlined':
          return {
            borderWidth: 1,
            borderColor: colors.border.light,
            backgroundColor,
          };
        case 'filled':
          return {
            backgroundColor: colors.background.secondary,
          };
        case 'elevated':
        default:
          return {
            backgroundColor,
            ...(elevated && shadows.md),
          };
      }
    };

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          {
            padding,
            ...getVariantStyles(),
          },
          style,
        ]}
        testID={testID}
      >
        {children}
      </View>
    );
  },
);

Card.displayName = 'Card';

// Attach sub-components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    marginBottom: spacing[3],
    paddingBottom: spacing[3],
  },
  body: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    marginTop: spacing[3],
    paddingTop: spacing[3],
  },
});

export { Card, CardHeader, CardBody, CardFooter };
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps, CardVariant };
export default Card;
