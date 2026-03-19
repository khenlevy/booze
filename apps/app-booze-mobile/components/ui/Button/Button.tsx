/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states.
 * Supports loading state, disabled state, and icon integration.
 * 
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onPress={() => {}}>
 *   Click me
 * </Button>
 * ```
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/designTokens';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'outline' | 'ghost';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Button component props
 */
export interface ButtonProps {
  /** Button text or content */
  children: React.ReactNode;
  
  /** Visual variant of the button */
  variant?: ButtonVariant;
  
  /** Size of the button */
  size?: ButtonSize;
  
  /** Whether the button is disabled */
  disabled?: boolean;
  
  /** Whether the button is in loading state */
  loading?: boolean;
  
  /** Callback when button is pressed */
  onPress?: () => void | Promise<void>;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Custom text style overrides */
  textStyle?: TextStyle;
  
  /** Accessibility label */
  accessibilityLabel?: string;
  
  /** Test ID for testing */
  testID?: string;
  
  /** Icon element to display before text */
  iconLeft?: React.ReactNode;
  
  /** Icon element to display after text */
  iconRight?: React.ReactNode;
  
  /** Full width button */
  fullWidth?: boolean;
}

/**
 * Button component
 * 
 * @param props - Button component props
 * @returns Rendered button component
 */
export const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      onPress,
      style,
      textStyle,
      accessibilityLabel,
      testID,
      iconLeft,
      iconRight,
      fullWidth = false,
    },
    ref,
  ) => {
    const styles = getStyles(variant, size, disabled, fullWidth);
    const isDisabled = disabled || loading;

    return (
      <TouchableOpacity
        ref={ref}
        style={[styles.container, style]}
        onPress={onPress}
        disabled={isDisabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        testID={testID}
      >
        {loading && (
          <ActivityIndicator
            size="small"
            color={getTextColor(variant, disabled)}
            style={styles.loader}
          />
        )}
        
        {!loading && iconLeft && (
          <View style={styles.iconLeft}>
            {iconLeft}
          </View>
        )}
        
        {!loading && (
          <Text
            style={[styles.text, textStyle]}
            numberOfLines={1}
            allowFontScaling={false}
          >
            {children}
          </Text>
        )}
        
        {!loading && iconRight && (
          <View style={styles.iconRight}>
            {iconRight}
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

Button.displayName = 'Button';

/**
 * Get button styles based on variant, size, and state
 */
function getStyles(
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  fullWidth: boolean,
) {
  const baseStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.md,
      ...shadows.base,
    },
    text: {
      fontFamily: typography.fontFamily.primary,
      fontWeight: typography.fontWeight.semibold,
      textAlign: 'center',
    },
    loader: {
      marginRight: spacing[2],
    },
    iconLeft: {
      marginRight: spacing[2],
    },
    iconRight: {
      marginLeft: spacing[2],
    },
  });

  const variantStyles = getVariantStyles(variant, disabled);
  const sizeStyles = getSizeStyles(size);

  return StyleSheet.create({
    container: [
      baseStyles.container,
      variantStyles.container,
      sizeStyles.container,
      fullWidth && { width: '100%' },
      disabled && { opacity: 0.6 },
    ],
    text: [baseStyles.text, variantStyles.text, sizeStyles.text],
    loader: baseStyles.loader,
    iconLeft: baseStyles.iconLeft,
    iconRight: baseStyles.iconRight,
  });
}

/**
 * Get variant-specific styles
 */
function getVariantStyles(variant: ButtonVariant, disabled: boolean) {
  const variantMap: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
    primary: {
      container: {
        backgroundColor: disabled ? colors.neutral[300] : colors.primary.light,
      },
      text: {
        color: colors.text.inverse,
      },
    },
    secondary: {
      container: {
        backgroundColor: disabled ? colors.neutral[300] : colors.secondary.light,
      },
      text: {
        color: colors.text.inverse,
      },
    },
    success: {
      container: {
        backgroundColor: disabled ? colors.neutral[300] : colors.success.light,
      },
      text: {
        color: colors.text.inverse,
      },
    },
    error: {
      container: {
        backgroundColor: disabled ? colors.neutral[300] : colors.error.light,
      },
      text: {
        color: colors.text.inverse,
      },
    },
    warning: {
      container: {
        backgroundColor: disabled ? colors.neutral[300] : colors.warning.light,
      },
      text: {
        color: colors.text.inverse,
      },
    },
    outline: {
      container: {
        backgroundColor: colors.transparent,
        borderWidth: 2,
        borderColor: disabled ? colors.neutral[300] : colors.primary.light,
      },
      text: {
        color: disabled ? colors.neutral[400] : colors.primary.light,
      },
    },
    ghost: {
      container: {
        backgroundColor: colors.transparent,
      },
      text: {
        color: disabled ? colors.neutral[400] : colors.primary.light,
      },
    },
  };

  return variantMap[variant];
}

/**
 * Get size-specific styles
 */
function getSizeStyles(size: ButtonSize) {
  const sizeMap: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
    sm: {
      container: {
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[1],
        minHeight: 32,
      },
      text: {
        fontSize: typography.fontSize.sm,
        lineHeight: typography.lineHeight.normal,
      },
    },
    md: {
      container: {
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[2],
        minHeight: 40,
      },
      text: {
        fontSize: typography.fontSize.base,
        lineHeight: typography.lineHeight.normal,
      },
    },
    lg: {
      container: {
        paddingHorizontal: spacing[5],
        paddingVertical: spacing[3],
        minHeight: 48,
      },
      text: {
        fontSize: typography.fontSize.lg,
        lineHeight: typography.lineHeight.normal,
      },
    },
    xl: {
      container: {
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[4],
        minHeight: 56,
      },
      text: {
        fontSize: typography.fontSize.xl,
        lineHeight: typography.lineHeight.normal,
      },
    },
  };

  return sizeMap[size];
}

/**
 * Get text color based on variant and disabled state
 */
function getTextColor(variant: ButtonVariant, disabled: boolean): string {
  if (disabled) return colors.neutral[400];
  
  switch (variant) {
    case 'outline':
    case 'ghost':
      return colors.primary.light;
    default:
      return colors.text.inverse;
  }
}

export default Button;
