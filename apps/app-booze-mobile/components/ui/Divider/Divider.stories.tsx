import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { Divider } from './Divider';
import { Body, Heading } from '../Typography';
import { spacing, colors } from '../../../constants/designTokens';

const meta = {
  title: 'Divider',
  component: Divider,
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
  content: {
    padding: spacing[3],
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
});

// Horizontal Divider
export const HorizontalDivider: StoryObj = {
  render: () => (
    <View style={styles.section}>
      <Body style={{ marginBottom: spacing[3] }}>Content above</Body>
      <Divider orientation="horizontal" />
      <Body style={{ marginTop: spacing[3] }}>Content below</Body>
    </View>
  ),
};

// Vertical Divider
export const VerticalDivider: StoryObj = {
  render: () => (
    <View style={styles.row}>
      <Body>Left content</Body>
      <Divider orientation="vertical" style={{ height: 40 }} />
      <Body>Right content</Body>
    </View>
  ),
};

// Horizontal with Spacing
export const HorizontalWithSpacing: StoryObj = {
  render: () => (
    <View style={styles.section}>
      <Body style={{ marginBottom: spacing[4] }}>Content with spacing</Body>
      <Divider orientation="horizontal" spacing="lg" />
      <Body style={{ marginTop: spacing[4] }}>More content below</Body>
    </View>
  ),
};

// Vertical with Spacing
export const VerticalWithSpacing: StoryObj = {
  render: () => (
    <View style={styles.row}>
      <Body>Left</Body>
      <Divider orientation="vertical" style={{ height: 60 }} spacing="md" />
      <Body>Right</Body>
    </View>
  ),
};

// Divider Separating Content
export const DividerSeparatingContent: StoryObj = {
  render: () => (
    <View style={styles.section}>
      <View style={styles.content}>
        <Heading level={4}>Section 1</Heading>
        <Body style={{ marginTop: spacing[2] }}>First section content</Body>
      </View>
      <Divider orientation="horizontal" spacing="md" />
      <View style={styles.content}>
        <Heading level={4}>Section 2</Heading>
        <Body style={{ marginTop: spacing[2] }}>Second section content</Body>
      </View>
    </View>
  ),
};

// Multiple Horizontal Dividers
export const MultipleHorizontalDividers: StoryObj = {
  render: () => (
    <View style={styles.section}>
      <View style={styles.content}>
        <Body>Item 1</Body>
      </View>
      <Divider orientation="horizontal" spacing="sm" />
      <View style={styles.content}>
        <Body>Item 2</Body>
      </View>
      <Divider orientation="horizontal" spacing="sm" />
      <View style={styles.content}>
        <Body>Item 3</Body>
      </View>
    </View>
  ),
};

// Vertical Dividers in Row
export const VerticalDividersInRow: StoryObj = {
  render: () => (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Body>Column 1</Body>
      </View>
      <Divider orientation="vertical" style={{ height: 80 }} />
      <View style={{ flex: 1 }}>
        <Body>Column 2</Body>
      </View>
      <Divider orientation="vertical" style={{ height: 80 }} />
      <View style={{ flex: 1 }}>
        <Body>Column 3</Body>
      </View>
    </View>
  ),
};

// Different Spacing Values
export const DifferentSpacingValues: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Spacing Variations</View>
        
        <Body style={{ marginBottom: spacing[2] }}>Small spacing</Body>
        <Divider orientation="horizontal" spacing="sm" />
        <Body style={{ marginTop: spacing[2], marginBottom: spacing[3] }}>Content</Body>

        <Body style={{ marginBottom: spacing[2] }}>Medium spacing</Body>
        <Divider orientation="horizontal" spacing="md" />
        <Body style={{ marginTop: spacing[2], marginBottom: spacing[3] }}>Content</Body>

        <Body style={{ marginBottom: spacing[2] }}>Large spacing</Body>
        <Divider orientation="horizontal" spacing="lg" />
        <Body style={{ marginTop: spacing[2] }}>Content</Body>
      </View>
    </View>
  ),
};

// All Divider Types
export const AllDividerTypes: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Horizontal Dividers</View>
        
        <Body style={{ marginBottom: spacing[2] }}>Default</Body>
        <Divider orientation="horizontal" />
        <Body style={{ marginTop: spacing[3], marginBottom: spacing[3] }}>Content</Body>

        <Body style={{ marginBottom: spacing[2] }}>Small spacing</Body>
        <Divider orientation="horizontal" spacing="sm" />
        <Body style={{ marginTop: spacing[3], marginBottom: spacing[3] }}>Content</Body>

        <Body style={{ marginBottom: spacing[2] }}>Large spacing</Body>
        <Divider orientation="horizontal" spacing="lg" />
        <Body style={{ marginTop: spacing[3] }}>Content</Body>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Vertical Dividers</View>
        <View style={styles.row}>
          <Body>Left</Body>
          <Divider orientation="vertical" style={{ height: 60 }} />
          <Body>Right</Body>
        </View>
      </View>
    </View>
  ),
};

// List Separator Pattern
export const ListSeparatorPattern: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>List Items</View>
        
        {[1, 2, 3, 4].map((item, index) => (
          <View key={item}>
            <View style={styles.content}>
              <Heading level={5}>Item {item}</Heading>
              <Body style={{ marginTop: spacing[1] }}>Description for item {item}</Body>
            </View>
            {index < 3 && <Divider orientation="horizontal" spacing="sm" />}
          </View>
        ))}
      </View>
    </View>
  ),
};

// Form Section Divider
export const FormSectionDivider: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Form Sections</View>
        
        <View>
          <Heading level={4}>Personal Information</Heading>
          <Body style={{ marginTop: spacing[2] }}>Name, email, phone</Body>
        </View>
        <Divider orientation="horizontal" spacing="md" />

        <View>
          <Heading level={4}>Address Information</Heading>
          <Body style={{ marginTop: spacing[2] }}>Street, city, state, zip</Body>
        </View>
        <Divider orientation="horizontal" spacing="md" />

        <View>
          <Heading level={4}>Additional Details</Heading>
          <Body style={{ marginTop: spacing[2] }}>Notes and preferences</Body>
        </View>
      </View>
    </View>
  ),
};
