/**
 * Avatar Component
 * 
 * A component for displaying user avatars with image or initials fallback.
 * Supports various sizes and shapes.
 * 
 * @component
 * @example
 * ```tsx
 * <Avatar size="md" source={{ uri: 'https://...' }} />
 * <Avatar size="md" initials="JD" />
 * ```
 */

import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../constants/designTokens';

/**
 * Avatar size types
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Avatar shape types
 */
export type AvatarShape = 'circle' | 'square';

/**
 * Avatar component props
 */
export interface AvatarProps {
  /** Size of the avatar */
  size?: AvatarSize;
  
  /** Shape of the avatar */
  shape?: AvatarShape;
  
  /** Image source */
  source?: ImageSourcePropType;
  
  /** Initials to display as fallback */
  initials?: string;
  
  /** Background color for initials */
  backgroundColor?: string;
  
  /** Text color for initials */
  textColor?: string;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Custom text style overrides */
  textStyle?: TextStyle;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Get avatar size in pixels
 */
function getAvatarSize(size: AvatarSize): number {
  const sizeMap: Record<AvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
  };
  return sizeMap[size];
}

/**
 * Get font size based on avatar size
 */
function getFontSize(size: AvatarSize): number {
  const sizeMap: Record<AvatarSize, number> = {
    xs: typography.fontSize.xs,
    sm: typography.fontSize.sm,
    md: typography.fontSize.base,
    lg: typography.fontSize.lg,
    xl: typography.fontSize.xl,
  };
  return sizeMap[size];
}

/**
 * Avatar component
 */
export const Avatar = React.forwardRef<View, AvatarProps>(
  (
    {
      size = 'md',
      shape = 'circle',
      source,
      initials,
      backgroundColor = colors.primary.light,
      textColor = colors.text.inverse,
      style,
      textStyle,
      testID,
    },
    ref,
  ) => {
    const avatarSize = getAvatarSize(size);
    const fontSize = getFontSize(size);
    const isCircle = shape === 'circle';

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: isCircle ? avatarSize / 2 : borderRadius.md,
            backgroundColor: source ? colors.neutral[100] : backgroundColor,
          },
          style,
        ]}
        testID={testID}
      >
        {source ? (
          <Image
            source={source}
            style={[
              styles.image,
              {
                borderRadius: isCircle ? avatarSize / 2 : borderRadius.md,
              },
            ]}
          />
        ) : initials ? (
          <Text
            style={[
              styles.initials,
              {
                fontSize,
                color: textColor,
              },
              textStyle,
            ]}
            numberOfLines={1}
            allowFontScaling={false}
          >
            {initials.toUpperCase()}
          </Text>
        ) : null}
      </View>
    );
  },
);

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
  },
});

export default Avatar;
