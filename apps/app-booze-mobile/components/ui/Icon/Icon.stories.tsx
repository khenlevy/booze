import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { IconWrapper } from './Icon';
import { Body, Heading } from '../Typography';
import { spacing, colors } from '../../../constants/designTokens';

const meta = {
  title: 'Icon',
  component: IconWrapper,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing[4],
    backgroundColor: colors.background.primary,
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing[3],
    color: colors.text.primary,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  iconItem: {
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  iconLabel: {
    marginTop: spacing[2],
    fontSize: 12,
    color: colors.text.secondary,
  },
});

// Size Stories
export const SizeSmall: StoryObj = {
  render: () => (
    <View style={styles.iconItem}>
      <IconWrapper name="home" size="sm" />
      <Body style={styles.iconLabel}>Small</Body>
    </View>
  ),
};

export const SizeMedium: StoryObj = {
  render: () => (
    <View style={styles.iconItem}>
      <IconWrapper name="home" size="md" />
      <Body style={styles.iconLabel}>Medium</Body>
    </View>
  ),
};

export const SizeLarge: StoryObj = {
  render: () => (
    <View style={styles.iconItem}>
      <IconWrapper name="home" size="lg" />
      <Body style={styles.iconLabel}>Large</Body>
    </View>
  ),
};

export const SizeExtraLarge: StoryObj = {
  render: () => (
    <View style={styles.iconItem}>
      <IconWrapper name="home" size="xl" />
      <Body style={styles.iconLabel}>Extra Large</Body>
    </View>
  ),
};

// Color Variants
export const ColorPrimary: StoryObj = {
  render: () => (
    <View style={styles.iconItem}>
      <IconWrapper name="home" color="primary" />
      <Body style={styles.iconLabel}>Primary</Body>
    </View>
  ),
};

export const ColorSuccess: StoryObj = {
  render: () => (
    <View style={styles.iconItem}>
      <IconWrapper name="check-circle" color="success" />
      <Body style={styles.iconLabel}>Success</Body>
    </View>
  ),
};

export const ColorError: StoryObj = {
  render: () => (
    <View style={styles.iconItem}>
      <IconWrapper name="alert-circle" color="error" />
      <Body style={styles.iconLabel}>Error</Body>
    </View>
  ),
};

export const ColorWarning: StoryObj = {
  render: () => (
    <View style={styles.iconItem}>
      <IconWrapper name="alert" color="warning" />
      <Body style={styles.iconLabel}>Warning</Body>
    </View>
  ),
};

// All Sizes Comparison
export const AllSizes: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Icon Sizes</View>
        <View style={styles.iconGrid}>
          <View style={styles.iconItem}>
            <IconWrapper name="home" size="sm" />
            <Body style={styles.iconLabel}>Small</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="home" size="md" />
            <Body style={styles.iconLabel}>Medium</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="home" size="lg" />
            <Body style={styles.iconLabel}>Large</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="home" size="xl" />
            <Body style={styles.iconLabel}>Extra Large</Body>
          </View>
        </View>
      </View>
    </View>
  ),
};

// All Color Variants
export const AllColors: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Icon Colors</View>
        <View style={styles.iconGrid}>
          <View style={styles.iconItem}>
            <IconWrapper name="home" color="primary" size="lg" />
            <Body style={styles.iconLabel}>Primary</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="check-circle" color="success" size="lg" />
            <Body style={styles.iconLabel}>Success</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="alert-circle" color="error" size="lg" />
            <Body style={styles.iconLabel}>Error</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="alert" color="warning" size="lg" />
            <Body style={styles.iconLabel}>Warning</Body>
          </View>
        </View>
      </View>
    </View>
  ),
};

// Common Icons Showcase
export const CommonIcons: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <Heading level={2}>Common Icons</Heading>
        <View style={styles.iconGrid}>
          <View style={styles.iconItem}>
            <IconWrapper name="home" size="lg" />
            <Body style={styles.iconLabel}>Home</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="search" size="lg" />
            <Body style={styles.iconLabel}>Search</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="settings" size="lg" />
            <Body style={styles.iconLabel}>Settings</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="user" size="lg" />
            <Body style={styles.iconLabel}>User</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="bell" size="lg" />
            <Body style={styles.iconLabel}>Notifications</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="mail" size="lg" />
            <Body style={styles.iconLabel}>Mail</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="check" size="lg" color="success" />
            <Body style={styles.iconLabel}>Check</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="x" size="lg" color="error" />
            <Body style={styles.iconLabel}>Close</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="arrow-right" size="lg" />
            <Body style={styles.iconLabel}>Arrow</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="menu" size="lg" />
            <Body style={styles.iconLabel}>Menu</Body>
          </View>
        </View>
      </View>
    </View>
  ),
};

// Icon with Text
export const IconWithText: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Icons with Text</View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing[4] }}>
          <IconWrapper name="check-circle" color="success" size="md" />
          <Body style={{ marginLeft: spacing[2] }}>Success message</Body>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing[4] }}>
          <IconWrapper name="alert-circle" color="error" size="md" />
          <Body style={{ marginLeft: spacing[2] }}>Error message</Body>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconWrapper name="alert" color="warning" size="md" />
          <Body style={{ marginLeft: spacing[2] }}>Warning message</Body>
        </View>
      </View>
    </View>
  ),
};

// Status Icons
export const StatusIcons: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Status Icons</View>
        
        <View style={styles.iconGrid}>
          <View style={styles.iconItem}>
            <IconWrapper name="check-circle" color="success" size="lg" />
            <Body style={styles.iconLabel}>Completed</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="alert-circle" color="error" size="lg" />
            <Body style={styles.iconLabel}>Error</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="alert" color="warning" size="lg" />
            <Body style={styles.iconLabel}>Warning</Body>
          </View>
          <View style={styles.iconItem}>
            <IconWrapper name="info" color="primary" size="lg" />
            <Body style={styles.iconLabel}>Info</Body>
          </View>
        </View>
      </View>
    </View>
  ),
};
