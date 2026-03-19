/**
 * Typography Components
 * 
 * A set of text components for consistent typography throughout the application.
 * Includes Heading, Body, Caption, and Label components with predefined styles.
 * 
 * @component
 * @example
 * ```tsx
 * <Heading level={1}>Main Title</Heading>
 * <Body>Regular body text</Body>
 * <Caption>Small caption text</Caption>
 * <Label>Form label</Label>
 * ```
 */

import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, typography } from '../../constants/designTokens';

/**
 * Base typography component props
 */
export interface TypographyProps {
  /** Text content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: TextStyle;
  
  /** Text color */
  color?: string;
  
  /** Number of lines to display */
  numberOfLines?: number;
  
  /** Allow font scaling */
  allowFontScaling?: boolean;
  
  /** Accessibility label */
  accessibilityLabel?: string;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Heading component props
 */
export interface HeadingProps extends TypographyProps {
  /** Heading level (1-6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Heading component
 * 
 * Renders semantic heading elements with appropriate sizing
 */
export const Heading = React.forwardRef<Text, HeadingProps>(
  (
    {
      children,
      level = 1,
      style,
      color = colors.text.primary,
      numberOfLines,
      allowFontScaling = false,
      accessibilityLabel,
      testID,
    },
    ref,
  ) => {
    const headingStyles = getHeadingStyles(level);

    return (
      <Text
        ref={ref}
        style={[
          headingStyles,
          { color },
          style,
        ]}
        numberOfLines={numberOfLines}
        allowFontScaling={allowFontScaling}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="header"
        testID={testID}
      >
        {children}
      </Text>
    );
  },
);

Heading.displayName = 'Heading';

/**
 * Body component
 * 
 * Renders regular body text with standard sizing
 */
export const Body = React.forwardRef<Text, TypographyProps>(
  (
    {
      children,
      style,
      color = colors.text.primary,
      numberOfLines,
      allowFontScaling = false,
      accessibilityLabel,
      testID,
    },
    ref,
  ) => (
    <Text
      ref={ref}
      style={[
        styles.body,
        { color },
        style,
      ]}
      numberOfLines={numberOfLines}
      allowFontScaling={allowFontScaling}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {children}
    </Text>
  ),
);

Body.displayName = 'Body';

/**
 * Caption component
 * 
 * Renders small caption text, typically for secondary information
 */
export const Caption = React.forwardRef<Text, TypographyProps>(
  (
    {
      children,
      style,
      color = colors.text.secondary,
      numberOfLines,
      allowFontScaling = false,
      accessibilityLabel,
      testID,
    },
    ref,
  ) => (
    <Text
      ref={ref}
      style={[
        styles.caption,
        { color },
        style,
      ]}
      numberOfLines={numberOfLines}
      allowFontScaling={allowFontScaling}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {children}
    </Text>
  ),
);

Caption.displayName = 'Caption';

/**
 * Label component
 * 
 * Renders form labels with appropriate styling
 */
export const Label = React.forwardRef<Text, TypographyProps>(
  (
    {
      children,
      style,
      color = colors.text.primary,
      numberOfLines,
      allowFontScaling = false,
      accessibilityLabel,
      testID,
    },
    ref,
  ) => (
    <Text
      ref={ref}
      style={[
        styles.label,
        { color },
        style,
      ]}
      numberOfLines={numberOfLines}
      allowFontScaling={allowFontScaling}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {children}
    </Text>
  ),
);

Label.displayName = 'Label';

/**
 * Get heading styles based on level
 */
function getHeadingStyles(level: number): TextStyle {
  const headingMap: Record<number, TextStyle> = {
    1: {
      fontSize: typography.fontSize['4xl'],
      fontWeight: typography.fontWeight.extrabold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    2: {
      fontSize: typography.fontSize['3xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    3: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.normal,
    },
    4: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.normal,
      letterSpacing: typography.letterSpacing.normal,
    },
    5: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.normal,
      letterSpacing: typography.letterSpacing.normal,
    },
    6: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.normal,
      letterSpacing: typography.letterSpacing.wide,
    },
  };

  return headingMap[level] || headingMap[1];
}

const styles = StyleSheet.create({
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  caption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.wide,
  },
});

export { Heading, Body, Caption, Label };
export type { HeadingProps, TypographyProps };
