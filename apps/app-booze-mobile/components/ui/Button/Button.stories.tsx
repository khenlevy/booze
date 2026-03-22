import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';
import { spacing, colors } from '../../../constants/designTokens';

const meta = {
  title: 'Button',
  component: Button,
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
  row: {
    flexDirection: 'row',
    gap: spacing[2],
    marginBottom: spacing[3],
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing[3],
    color: colors.text.primary,
  },
});

// Variant Stories
export const Primary: StoryObj = {
  render: () => <Button variant="primary">Primary Button</Button>,
};

export const Secondary: StoryObj = {
  render: () => <Button variant="secondary">Secondary Button</Button>,
};

export const Success: StoryObj = {
  render: () => <Button variant="success">Success Button</Button>,
};

export const Error: StoryObj = {
  render: () => <Button variant="error">Error Button</Button>,
};

export const Warning: StoryObj = {
  render: () => <Button variant="warning">Warning Button</Button>,
};

export const Outline: StoryObj = {
  render: () => <Button variant="outline">Outline Button</Button>,
};

export const Ghost: StoryObj = {
  render: () => <Button variant="ghost">Ghost Button</Button>,
};

// Size Stories
export const SizeSmall: StoryObj = {
  render: () => <Button size="sm">Small Button</Button>,
};

export const SizeMedium: StoryObj = {
  render: () => <Button size="md">Medium Button</Button>,
};

export const SizeLarge: StoryObj = {
  render: () => <Button size="lg">Large Button</Button>,
};

export const SizeExtraLarge: StoryObj = {
  render: () => <Button size="xl">Extra Large Button</Button>,
};

// State Stories
export const Disabled: StoryObj = {
  render: () => <Button disabled>Disabled Button</Button>,
};

export const Loading: StoryObj = {
  render: () => <Button loading>Loading Button</Button>,
};

export const FullWidth: StoryObj = {
  render: () => <Button fullWidth>Full Width Button</Button>,
};

// All Variants Showcase
export const AllVariants: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Variants</View>
        <View style={styles.row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </View>
        <View style={styles.row}>
          <Button variant="success">Success</Button>
          <Button variant="error">Error</Button>
        </View>
        <View style={styles.row}>
          <Button variant="warning">Warning</Button>
          <Button variant="outline">Outline</Button>
        </View>
        <View style={styles.row}>
          <Button variant="ghost">Ghost</Button>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Sizes</View>
        <View style={styles.row}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
        </View>
        <View style={styles.row}>
          <Button size="lg">Large</Button>
          <Button size="xl">XL</Button>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>States</View>
        <View style={styles.row}>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
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
        <View style={styles.sectionTitle as any}>Button Sizes</View>
        <Button size="sm">Small Button</Button>
        <Button size="md" style={{ marginTop: spacing[3] }}>Medium Button</Button>
        <Button size="lg" style={{ marginTop: spacing[3] }}>Large Button</Button>
        <Button size="xl" style={{ marginTop: spacing[3] }}>Extra Large Button</Button>
      </View>
    </View>
  ),
};

// Button States Showcase
export const ButtonStates: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Button States</View>
        <Button variant="primary">Default State</Button>
        <Button variant="primary" disabled style={{ marginTop: spacing[3] }}>Disabled State</Button>
        <Button variant="primary" loading style={{ marginTop: spacing[3] }}>Loading State</Button>
      </View>
    </View>
  ),
};

// Interactive Button
export const InteractiveButton: StoryObj = {
  render: () => {
    const [count, setCount] = React.useState(0);
    return (
      <View style={styles.container}>
        <Button onPress={() => setCount(count + 1)}>
          Clicked {count} times
        </Button>
      </View>
    );
  },
};
