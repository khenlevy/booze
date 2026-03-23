/**
 * IconWrapper Component
 * 
 * A wrapper component for displaying icons with consistent sizing and styling.
 * Supports color variants and sizing options.
 * 
 * @component
 * @example
 * ```tsx
 * <IconWrapper size="md" color="primary">
 *   <SomeIcon />
 * </IconWrapper>
 * ```
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '@/constants/designTokens';

/**
 * Icon size types
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Icon color types
 */
export type IconColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit';

/**
 * IconWrapper component props
 */
export interface IconWrapperProps {
  /** Icon element to wrap */
  children: React.ReactNode;
  
  /** Size of the icon */
  size?: IconSize;
  
  /** Color of the icon */
  color?: IconColor;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Get icon size in pixels
 */
function getIconSize(size: IconSize): number {
  const sizeMap: Record<IconSize, number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  };
  return sizeMap[size];
}

/**
 * Get icon color
 */
function getIconColor(color: IconColor): string {
  const colorMap: Record<IconColor, string> = {
    primary: colors.primary.light,
    secondary: colors.secondary.light,
    success: colors.success.light,
    error: colors.error.light,
    warning: colors.warning.light,
    info: colors.info.light,
    inherit: 'currentColor',
  };
  return colorMap[color];
}

/**
 * IconWrapper component
 */
export const IconWrapper = React.forwardRef<View, IconWrapperProps>(
  (
    {
      children,
      size = 'md',
      color = 'inherit',
      style,
      testID,
    },
    ref,
  ) => {
    const iconSize = getIconSize(size);
    const iconColor = getIconColor(color);

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          {
            width: iconSize,
            height: iconSize,
            tintColor: color !== 'inherit' ? iconColor : undefined,
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

IconWrapper.displayName = 'IconWrapper';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconWrapper;
