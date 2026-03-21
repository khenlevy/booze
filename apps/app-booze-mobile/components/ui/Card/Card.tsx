/**
 * Card Component
 * 
 * A container component for grouping related content with optional header and footer.
 * Supports multiple variants (elevated, outlined, filled) and consistent spacing.
 * 
 * @component
 * @example
 * ```tsx
 * <Card variant="elevated">
 *   <Card.Header testID="card-header">Title</Card.Header>
 *   <Card.Body testID="card-body">Content</Card.Body>
 *   <Card.Footer testID="card-footer">Footer</Card.Footer>
 * </Card>
 * ```
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../constants/designTokens';

/**
 * Card variant type
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
  
  /** Card variant style */
  variant?: CardVariant;
  
  /** Background color (overrides variant default) */
  backgroundColor?: string;
  
  /** Test identifier for testing */
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
  
  /** Test identifier for testing */
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
  
  /** Test identifier for testing */
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
  
  /** Test identifier for testing */
  testID?: string;
}

/**
 * Card Header component
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
 * Get variant-specific styles
 */
const getVariantStyles = (variant: CardVariant = 'elevated'): ViewStyle => {
  switch (variant) {
    case 'outlined':
      return {
        borderWidth: 1,
        borderColor: colors.border.light,
      };
    case 'filled':
      return {
        backgroundColor: colors.background.secondary,
      };
    case 'elevated':
    default:
      return {
        ...shadows.md,
      };
  }
};

/**
 * Card component
 */
const Card = React.forwardRef<View, CardProps>(
  (
    {
      children,
      style,
      padding = spacing[4],
      variant = 'elevated',
      backgroundColor,
      testID,
    },
    ref,
  ) => {
    const variantStyles = getVariantStyles(variant);
    const bgColor = backgroundColor || colors.background.primary;

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          {
            padding,
            backgroundColor: bgColor,
          },
          variantStyles,
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
