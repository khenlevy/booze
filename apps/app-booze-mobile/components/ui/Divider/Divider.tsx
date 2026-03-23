/**
 * Divider Component
 * 
 * A simple divider component for separating content.
 * Supports horizontal and vertical orientations.
 * 
 * @component
 * @example
 * ```tsx
 * <Divider orientation="horizontal" />
 * <Divider orientation="vertical" />
 * ```
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '@/constants/designTokens';

/**
 * Divider orientation types
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider component props
 */
export interface DividerProps {
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  
  /** Color of the divider */
  color?: string;
  
  /** Thickness of the divider in pixels */
  thickness?: number;
  
  /** Margin around the divider */
  margin?: number;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Divider component
 */
export const Divider = React.forwardRef<View, DividerProps>(
  (
    {
      orientation = 'horizontal',
      color = colors.border.light,
      thickness = 1,
      margin = spacing[4],
      style,
      testID,
    },
    ref,
  ) => {
    const isHorizontal = orientation === 'horizontal';

    return (
      <View
        ref={ref}
        style={[
          isHorizontal ? styles.horizontal : styles.vertical,
          {
            backgroundColor: color,
            ...(isHorizontal
              ? {
                  height: thickness,
                  marginVertical: margin,
                }
              : {
                  width: thickness,
                  marginHorizontal: margin,
                }),
          },
          style,
        ]}
        testID={testID}
      />
    );
  },
);

Divider.displayName = 'Divider';

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
});

export default Divider;
