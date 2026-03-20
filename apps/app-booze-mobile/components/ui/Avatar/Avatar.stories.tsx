/**
 * Avatar Component Stories
 * 
 * Storybook stories for the Avatar component demonstrating all variants,
 * sizes, shapes, and usage patterns.
 * 
 * @module components/ui/Avatar/Avatar.stories
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, type AvatarSize, type AvatarShape } from './Avatar';
import { colors, spacing } from '../../constants/designTokens';

/**
 * Story metadata
 */
export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
      description: 'Shape of the avatar',
    },
    initials: {
      control: { type: 'text' },
      description: 'Initials to display as fallback',
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color for initials',
    },
    textColor: {
      control: { type: 'color' },
      description: 'Text color for initials',
    },
  },
};

/**
 * Default avatar with initials
 */
export const Default = () => (
  <Avatar size="md" initials="JD" />
);

/**
 * Avatar with image source
 */
export const WithImage = () => (
  <Avatar
    size="md"
    source={{
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    }}
  />
);

/**
 * All avatar sizes
 */
export const AllSizes = () => {
  const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <View style={styles.container}>
      {sizes.map((size) => (
        <View key={size} style={styles.sizeRow}>
          <Avatar size={size} initials="A" />
        </View>
      ))}
    </View>
  );
};

/**
 * Avatar shapes
 */
export const Shapes = () => {
  const shapes: AvatarShape[] = ['circle', 'square'];

  return (
    <View style={styles.container}>
      {shapes.map((shape) => (
        <View key={shape} style={styles.shapeRow}>
          <Avatar size="lg" shape={shape} initials="AB" />
        </View>
      ))}
    </View>
  );
};

/**
 * Avatar with custom colors
 */
export const CustomColors = () => (
  <View style={styles.container}>
    <View style={styles.colorRow}>
      <Avatar
        size="lg"
        initials="JD"
        backgroundColor={colors.primary.light}
        textColor={colors.text.inverse}
      />
    </View>
    <View style={styles.colorRow}>
      <Avatar
        size="lg"
        initials="AB"
        backgroundColor={colors.success.light}
        textColor={colors.text.inverse}
      />
    </View>
    <View style={styles.colorRow}>
      <Avatar
        size="lg"
        initials="CD"
        backgroundColor={colors.error.light}
        textColor={colors.text.inverse}
      />
    </View>
  </View>
);

/**
 * Avatar with different initials
 */
export const DifferentInitials = () => (
  <View style={styles.container}>
    <View style={styles.initialsRow}>
      <Avatar size="md" initials="A" />
    </View>
    <View style={styles.initialsRow}>
      <Avatar size="md" initials="AB" />
    </View>
    <View style={styles.initialsRow}>
      <Avatar size="md" initials="ABC" />
    </View>
    <View style={styles.initialsRow}>
      <Avatar size="md" initials="ABCD" />
    </View>
  </View>
);

/**
 * Avatar in a user profile card layout
 */
export const InProfileCard = () => (
  <View style={styles.profileCard}>
    <Avatar size="lg" initials="JD" />
    <View style={styles.profileInfo}>
      <View style={styles.profileName}>John Doe</View>
      <View style={styles.profileEmail}>john.doe@example.com</View>
    </View>
  </View>
);

/**
 * Multiple avatars in a row
 */
export const MultipleAvatars = () => (
  <View style={styles.multipleContainer}>
    <Avatar size="md" initials="A" backgroundColor={colors.primary.light} />
    <Avatar size="md" initials="B" backgroundColor={colors.success.light} />
    <Avatar size="md" initials="C" backgroundColor={colors.warning.light} />
    <Avatar size="md" initials="D" backgroundColor={colors.error.light} />
  </View>
);

/**
 * Avatar with image fallback
 */
export const ImageWithFallback = () => (
  <View style={styles.container}>
    <View style={styles.fallbackRow}>
      <Avatar
        size="lg"
        source={{
          uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        }}
      />
    </View>
    <View style={styles.fallbackRow}>
      <Avatar size="lg" initials="JD" />
    </View>
  </View>
);

/**
 * Avatar interactive example
 */
export const Interactive = () => {
  const [size, setSize] = React.useState<AvatarSize>('md');
  const [shape, setShape] = React.useState<AvatarShape>('circle');

  return (
    <View style={styles.container}>
      <Avatar size={size} shape={shape} initials="JD" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    gap: spacing[4],
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  shapeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  initialsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    backgroundColor: colors.neutral[50],
    borderRadius: 8,
    marginHorizontal: spacing[4],
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  profileEmail: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  multipleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    padding: spacing[4],
  },
  fallbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
});
