/**
 * ScreenLayout Component
 * 
 * A wrapper component for consistent screen layout with safe area handling,
 * padding, and optional header/footer support.
 * 
 * @component
 * @example
 * ```tsx
 * <ScreenLayout>
 *   <ScreenLayout.Header>Title</ScreenLayout.Header>
 *   <ScreenLayout.Content>Content</ScreenLayout.Content>
 *   <ScreenLayout.Footer>Footer</ScreenLayout.Footer>
 * </ScreenLayout>
 * ```
 */

import React from 'react';
import {
  View,
  ScrollView,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/designTokens';

/**
 * ScreenLayout component props
 */
export interface ScreenLayoutProps extends Omit<ScrollViewProps, 'children'> {
  /** Screen content */
  children: React.ReactNode;
  
  /** Whether to use ScrollView or View */
  scrollable?: boolean;
  
  /** Padding inside the screen */
  padding?: number;
  
  /** Background color */
  backgroundColor?: string;
  
  /** Whether to apply safe area insets */
  useSafeArea?: boolean;
  
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * ScreenLayout Header component props
 */
export interface ScreenLayoutHeaderProps {
  /** Header content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * ScreenLayout Content component props
 */
export interface ScreenLayoutContentProps {
  /** Content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * ScreenLayout Footer component props
 */
export interface ScreenLayoutFooterProps {
  /** Footer content */
  children: React.ReactNode;
  
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * ScreenLayout Header component
 */
const ScreenLayoutHeader = React.forwardRef<View, ScreenLayoutHeaderProps>(
  ({ children, style }, ref) => (
    <View
      ref={ref}
      style={[
        {
          paddingBottom: spacing[4],
          borderBottomWidth: 1,
          borderBottomColor: colors.border.light,
        },
        style,
      ]}
    >
      {children}
    </View>
  ),
);

ScreenLayoutHeader.displayName = 'ScreenLayout.Header';

/**
 * ScreenLayout Content component
 */
const ScreenLayoutContent = React.forwardRef<View, ScreenLayoutContentProps>(
  ({ children, style }, ref) => (
    <View
      ref={ref}
      style={[
        {
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  ),
);

ScreenLayoutContent.displayName = 'ScreenLayout.Content';

/**
 * ScreenLayout Footer component
 */
const ScreenLayoutFooter = React.forwardRef<View, ScreenLayoutFooterProps>(
  ({ children, style }, ref) => (
    <View
      ref={ref}
      style={[
        {
          paddingTop: spacing[4],
          borderTopWidth: 1,
          borderTopColor: colors.border.light,
        },
        style,
      ]}
    >
      {children}
    </View>
  ),
);

ScreenLayoutFooter.displayName = 'ScreenLayout.Footer';

/**
 * ScreenLayout component
 */
const ScreenLayout = React.forwardRef<ScrollView, ScreenLayoutProps>(
  (
    {
      children,
      scrollable = true,
      padding = spacing[4],
      backgroundColor = colors.background.primary,
      useSafeArea = true,
      style,
      ...scrollViewProps
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();

    const containerStyle: ViewStyle = {
      flex: 1,
      backgroundColor,
      paddingHorizontal: padding,
      paddingTop: useSafeArea ? Math.max(padding, insets.top) : padding,
      paddingBottom: useSafeArea ? Math.max(padding, insets.bottom) : padding,
    };

    if (scrollable) {
      return (
        <ScrollView
          ref={ref}
          style={[containerStyle, style]}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      );
    }

    return (
      <View
        style={[containerStyle, style]}
      >
        {children}
      </View>
    );
  },
);

ScreenLayout.displayName = 'ScreenLayout';

// Attach sub-components
ScreenLayout.Header = ScreenLayoutHeader;
ScreenLayout.Content = ScreenLayoutContent;
ScreenLayout.Footer = ScreenLayoutFooter;

export {
  ScreenLayout,
  ScreenLayoutHeader,
  ScreenLayoutContent,
  ScreenLayoutFooter,
};
export type {
  ScreenLayoutProps,
  ScreenLayoutHeaderProps,
  ScreenLayoutContentProps,
  ScreenLayoutFooterProps,
};
export default ScreenLayout;
