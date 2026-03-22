import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { Badge } from './Badge';
import { Body, Heading } from '../Typography';
import { spacing, colors } from '../../../constants/designTokens';

const meta = {
  title: 'Badge',
  component: Badge,
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
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  badgeItem: {
    marginBottom: spacing[2],
  },
  label: {
    marginTop: spacing[1],
    fontSize: 12,
    color: colors.text.secondary,
  },
});

// Variant Stories
export const Primary: StoryObj = {
  render: () => (
    <View style={styles.badgeItem}>
      <Badge variant="primary">Primary</Badge>
    </View>
  ),
};

export const Secondary: StoryObj = {
  render: () => (
    <View style={styles.badgeItem}>
      <Badge variant="secondary">Secondary</Badge>
    </View>
  ),
};

export const Success: StoryObj = {
  render: () => (
    <View style={styles.badgeItem}>
      <Badge variant="success">Success</Badge>
    </View>
  ),
};

export const Error: StoryObj = {
  render: () => (
    <View style={styles.badgeItem}>
      <Badge variant="error">Error</Badge>
    </View>
  ),
};

export const Warning: StoryObj = {
  render: () => (
    <View style={styles.badgeItem}>
      <Badge variant="warning">Warning</Badge>
    </View>
  ),
};

// Size Stories
export const SizeSmall: StoryObj = {
  render: () => (
    <View style={styles.badgeItem}>
      <Badge size="sm">Small</Badge>
    </View>
  ),
};

export const SizeMedium: StoryObj = {
  render: () => (
    <View style={styles.badgeItem}>
      <Badge size="md">Medium</Badge>
    </View>
  ),
};

export const SizeLarge: StoryObj = {
  render: () => (
    <View style={styles.badgeItem}>
      <Badge size="lg">Large</Badge>
    </View>
  ),
};

// All Variants Showcase
export const AllVariants: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Badge Variants</View>
        <View style={styles.badgeGrid}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
        </View>
      </View>
    </View>
  ),
};

// All Sizes Showcase
export const AllSizes: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Badge Sizes</View>
        <View style={styles.badgeGrid}>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </View>
      </View>
    </View>
  ),
};

// Status Badges
export const StatusBadges: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Status Badges</View>
        <View style={styles.badgeGrid}>
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="error">Inactive</Badge>
          <Badge variant="primary">New</Badge>
        </View>
      </View>
    </View>
  ),
};

// Tag-like Badges
export const TagBadges: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Tag Badges</View>
        <View style={styles.badgeGrid}>
          <Badge variant="primary">JavaScript</Badge>
          <Badge variant="secondary">React Native</Badge>
          <Badge variant="success">TypeScript</Badge>
          <Badge variant="warning">Design System</Badge>
          <Badge variant="error">UI Components</Badge>
        </View>
      </View>
    </View>
  ),
};

// Badge with Count
export const BadgeWithCount: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Badges with Numbers</View>
        <View style={styles.badgeGrid}>
          <Badge variant="primary">5 items</Badge>
          <Badge variant="success">12 completed</Badge>
          <Badge variant="error">3 errors</Badge>
          <Badge variant="warning">2 warnings</Badge>
        </View>
      </View>
    </View>
  ),
};

// Badge Combinations
export const BadgeCombinations: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Size & Variant Combinations</View>
        
        <View style={{ marginBottom: spacing[4] }}>
          <Body style={{ marginBottom: spacing[2], fontWeight: '600' }}>Small</Body>
          <View style={styles.badgeGrid}>
            <Badge size="sm" variant="primary">Primary</Badge>
            <Badge size="sm" variant="success">Success</Badge>
            <Badge size="sm" variant="error">Error</Badge>
          </View>
        </View>

        <View style={{ marginBottom: spacing[4] }}>
          <Body style={{ marginBottom: spacing[2], fontWeight: '600' }}>Medium</Body>
          <View style={styles.badgeGrid}>
            <Badge size="md" variant="primary">Primary</Badge>
            <Badge size="md" variant="success">Success</Badge>
            <Badge size="md" variant="error">Error</Badge>
          </View>
        </View>

        <View>
          <Body style={{ marginBottom: spacing[2], fontWeight: '600' }}>Large</Body>
          <View style={styles.badgeGrid}>
            <Badge size="lg" variant="primary">Primary</Badge>
            <Badge size="lg" variant="success">Success</Badge>
            <Badge size="lg" variant="error">Error</Badge>
          </View>
        </View>
      </View>
    </View>
  ),
};

// Badge in List
export const BadgeInList: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Badges in List</View>
        
        {[
          { title: 'Feature Request', status: 'primary' },
          { title: 'Bug Fix', status: 'error' },
          { title: 'Documentation', status: 'success' },
          { title: 'Enhancement', status: 'warning' },
        ].map((item, index) => (
          <View key={index} style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingVertical: spacing[2],
            borderBottomWidth: index < 3 ? 1 : 0,
            borderBottomColor: colors.border.light,
          }}>
            <Body>{item.title}</Body>
            <Badge variant={item.status as any}>{item.status}</Badge>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Badge Density
export const BadgeDensity: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Badge Density</View>
        
        <View style={{ marginBottom: spacing[4] }}>
          <Body style={{ marginBottom: spacing[2], fontWeight: '600' }}>Compact</Body>
          <View style={{ flexDirection: 'row', gap: spacing[1], flexWrap: 'wrap' }}>
            <Badge size="sm" variant="primary">Tag</Badge>
            <Badge size="sm" variant="secondary">Tag</Badge>
            <Badge size="sm" variant="success">Tag</Badge>
            <Badge size="sm" variant="error">Tag</Badge>
          </View>
        </View>

        <View>
          <Body style={{ marginBottom: spacing[2], fontWeight: '600' }}>Spacious</Body>
          <View style={{ flexDirection: 'row', gap: spacing[3], flexWrap: 'wrap' }}>
            <Badge size="lg" variant="primary">Tag</Badge>
            <Badge size="lg" variant="secondary">Tag</Badge>
            <Badge size="lg" variant="success">Tag</Badge>
            <Badge size="lg" variant="error">Tag</Badge>
          </View>
        </View>
      </View>
    </View>
  ),
};
