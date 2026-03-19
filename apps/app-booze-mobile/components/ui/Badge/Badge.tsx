/**
 * Badge Component
 * 
 * A small component for displaying labels, tags, or status indicators.
 * Supports various variants and sizes.
 * 
 * @component
 * @example
 * ```tsx
 * <Badge variant="primary" size="md">New</Badge>
 * <Badge variant="success">Active</Badge>
 * ```
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../constants/designTokens';

/**
 * Badge variant types
 */
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

/**
 * Badge size types
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge component props
 */
export interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;
  
  /** Visual variant of the badge */
  variant?: BadgeVariant;
  
  /** Size of the badge */
  size?: BadgeSize;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Custom text style overrides */
  textStyle?: TextStyle;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Badge component
 */
export const Badge = React.forwardRef<View, BadgeProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      style,
      textStyle,
      testID,
    },
    ref,
  ) => {
    const badgeStyles = getBadgeStyles(variant, size);

    return (
      <View
        ref={ref}
        style={[badgeStyles.container, style]}
        testID={testID}
      >
        <Text
          style={[badgeStyles.text, textStyle]}
          numberOfLines={1}
          allowFontScaling={false}
        >
          {children}
        </Text>
      </View>
    );
  },
);

Badge.displayName = 'Badge';

/**
 * Get badge styles based on variant and size
 */
function getBadgeStyles(variant: BadgeVariant, size: BadgeSize) {
  const variantMap: Record<BadgeVariant, { backgroundColor: string; textColor: string }> = {
    primary: {
      backgroundColor: colors.primary.light,
      textColor: colors.text.inverse,
    },
    secondary: {
      backgroundColor: colors.secondary.light,
      textColor: colors.text.inverse,
    },
    success: {
      backgroundColor: colors.success.light,
      textColor: colors.text.inverse,
    },
    error: {
      backgroundColor: colors.error.light,
      textColor: colors.text.inverse,
    },
    warning: {
      backgroundColor: colors.warning.light,
      textColor: colors.text.inverse,
    },
    info: {
      backgroundColor: colors.info.light,
      textColor: colors.text.inverse,
    },
    neutral: {
      backgroundColor: colors.neutral[200],
      textColor: colors.text.primary,
    },
  };

  const sizeMap: Record<BadgeSize, { padding: number; fontSize: number }> = {
    sm: {
      padding: spacing[1],
      fontSize: typography.fontSize.xs,
    },
    md: {
      padding: spacing[2],
      fontSize: typography.fontSize.sm,
    },
    lg: {
      padding: spacing[3],
      fontSize: typography.fontSize.base,
    },
  };

  const variantStyle = variantMap[variant];
  const sizeStyle = sizeMap[size];

  return {
    container: {
      backgroundColor: variantStyle.backgroundColor,
      paddingHorizontal: sizeStyle.padding * 1.5,
      paddingVertical: sizeStyle.padding,
      borderRadius: borderRadius.full,
      alignSelf: 'flex-start',
    },
    text: {
      color: variantStyle.textColor,
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.tight,
    },
  };
}

export default Badge;
