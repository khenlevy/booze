/**
 * Card Component
 * 
 * A container component for grouping related content with optional header and footer.
 * Provides elevation and consistent spacing.
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
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../constants/designTokens';

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
  
  /** Whether to show shadow */
  elevated?: boolean;
  
  /** Background color */
  backgroundColor?: string;
}

/**
 * Card Header component props
 */
export interface CardHeaderProps {
  /** Header content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Card Body component props
 */
export interface CardBodyProps {
  /** Body content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Card Footer component props
 */
export interface CardFooterProps {
  /** Footer content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Card Header component
 */
const CardHeader = React.forwardRef<View, CardHeaderProps>(
  ({ children, style }, ref) => (
    <View
      ref={ref}
      style={[styles.header, style]}
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
  ({ children, style }, ref) => (
    <View
      ref={ref}
      style={[styles.body, style]}
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
  ({ children, style }, ref) => (
    <View
      ref={ref}
      style={[styles.footer, style]}
    >
      {children}
    </View>
  ),
);

CardFooter.displayName = 'Card.Footer';

/**
 * Card component
 */
const Card = React.forwardRef<View, CardProps>(
  (
    {
      children,
      style,
      padding = spacing[4],
      elevated = true,
      backgroundColor = colors.background.primary,
    },
    ref,
  ) => (
    <View
      ref={ref}
      style={[
        styles.container,
        {
          padding,
          backgroundColor,
          ...(elevated && shadows.md),
        },
        style,
      ]}
    >
      {children}
    </View>
  ),
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
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps };
export default Card;
