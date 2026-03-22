import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Body, Heading } from '../Typography';
import { spacing, colors } from '../../../constants/designTokens';

const meta = {
  title: 'Card',
  component: Card,
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
  cardContent: {
    padding: spacing[4],
  },
  cardHeader: {
    paddingBottom: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  cardFooter: {
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

// Variant Stories
export const Elevated: StoryObj = {
  render: () => (
    <Card variant="elevated">
      <View style={styles.cardContent}>
        <Heading level={4}>Elevated Card</Heading>
        <Body style={{ marginTop: spacing[2] }}>This card has an elevated shadow effect</Body>
      </View>
    </Card>
  ),
};

export const Outlined: StoryObj = {
  render: () => (
    <Card variant="outlined">
      <View style={styles.cardContent}>
        <Heading level={4}>Outlined Card</Heading>
        <Body style={{ marginTop: spacing[2] }}>This card has a subtle border</Body>
      </View>
    </Card>
  ),
};

export const Filled: StoryObj = {
  render: () => (
    <Card variant="filled">
      <View style={styles.cardContent}>
        <Heading level={4}>Filled Card</Heading>
        <Body style={{ marginTop: spacing[2] }}>This card has a filled background</Body>
      </View>
    </Card>
  ),
};

// Card with Header
export const CardWithHeader: StoryObj = {
  render: () => (
    <Card variant="elevated">
      <View style={[styles.cardContent, styles.cardHeader]}>
        <Heading level={4}>Card Header</Heading>
      </View>
      <View style={styles.cardContent}>
        <Body>This card has a header section with content below</Body>
      </View>
    </Card>
  ),
};

// Card with Footer
export const CardWithFooter: StoryObj = {
  render: () => (
    <Card variant="elevated">
      <View style={styles.cardContent}>
        <Heading level={4}>Card Content</Heading>
        <Body style={{ marginTop: spacing[2] }}>Main content goes here</Body>
      </View>
      <View style={[styles.cardContent, styles.cardFooter]}>
        <Body>Footer information</Body>
      </View>
    </Card>
  ),
};

// Complete Card
export const CompleteCard: StoryObj = {
  render: () => (
    <Card variant="elevated">
      <View style={[styles.cardContent, styles.cardHeader]}>
        <Heading level={4}>Complete Card</Heading>
      </View>
      <View style={styles.cardContent}>
        <Body>This card demonstrates a complete structure with header, body, and footer sections.</Body>
      </View>
      <View style={[styles.cardContent, styles.cardFooter]}>
        <Body>Footer content</Body>
      </View>
    </Card>
  ),
};

// Custom Padding
export const CustomPadding: StoryObj = {
  render: () => (
    <Card variant="outlined" style={{ padding: spacing[6] }}>
      <Heading level={4}>Custom Padding</Heading>
      <Body style={{ marginTop: spacing[2] }}>This card has custom padding applied</Body>
    </Card>
  ),
};

// All Variants Showcase
export const AllVariants: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Card Variants</View>
        
        <Card variant="elevated" style={{ marginBottom: spacing[4] }}>
          <View style={styles.cardContent}>
            <Heading level={4}>Elevated Card</Heading>
            <Body style={{ marginTop: spacing[2] }}>Has shadow effect</Body>
          </View>
        </Card>

        <Card variant="outlined" style={{ marginBottom: spacing[4] }}>
          <View style={styles.cardContent}>
            <Heading level={4}>Outlined Card</Heading>
            <Body style={{ marginTop: spacing[2] }}>Has border</Body>
          </View>
        </Card>

        <Card variant="filled">
          <View style={styles.cardContent}>
            <Heading level={4}>Filled Card</Heading>
            <Body style={{ marginTop: spacing[2] }}>Has background color</Body>
          </View>
        </Card>
      </View>
    </View>
  ),
};

// List Pattern
export const ListPattern: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Card List Pattern</View>
        
        {[1, 2, 3].map((item) => (
          <Card key={item} variant="outlined" style={{ marginBottom: spacing[3] }}>
            <View style={styles.cardContent}>
              <Heading level={5}>Item {item}</Heading>
              <Body style={{ marginTop: spacing[2] }}>Description for item {item}</Body>
            </View>
          </Card>
        ))}
      </View>
    </View>
  ),
};

// Rich Content Example
export const RichContent: StoryObj = {
  render: () => (
    <Card variant="elevated">
      <View style={[styles.cardContent, styles.cardHeader]}>
        <Heading level={3}>Featured Item</Heading>
      </View>
      <View style={styles.cardContent}>
        <Heading level={4}>Title</Heading>
        <Body style={{ marginTop: spacing[2] }}>
          This card demonstrates rich content with multiple text elements and proper spacing.
        </Body>
        <Body size="sm" style={{ marginTop: spacing[3], color: colors.text.secondary }}>
          Secondary information
        </Body>
      </View>
      <View style={[styles.cardContent, styles.cardFooter]}>
        <Body size="sm">Last updated: Today</Body>
      </View>
    </Card>
  ),
};
