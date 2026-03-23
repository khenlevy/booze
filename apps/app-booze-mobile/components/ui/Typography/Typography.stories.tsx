import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { Heading, Body, Caption, Label } from './Typography';
import { colors, spacing } from '@/constants/designTokens';

const meta = {
  title: 'Typography',
  component: Heading,
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
    marginBottom: spacing[3],
    fontWeight: '600',
  },
});

// Heading Stories
export const Heading1: StoryObj = {
  render: () => <Heading level={1}>Heading Level 1</Heading>,
};

export const Heading2: StoryObj = {
  render: () => <Heading level={2}>Heading Level 2</Heading>,
};

export const Heading3: StoryObj = {
  render: () => <Heading level={3}>Heading Level 3</Heading>,
};

export const Heading4: StoryObj = {
  render: () => <Heading level={4}>Heading Level 4</Heading>,
};

export const Heading5: StoryObj = {
  render: () => <Heading level={5}>Heading Level 5</Heading>,
};

export const Heading6: StoryObj = {
  render: () => <Heading level={6}>Heading Level 6</Heading>,
};

// Body Stories
export const BodyDefault: StoryObj = {
  render: () => <Body>This is default body text. It's used for regular content and descriptions.</Body>,
};

export const BodyLarge: StoryObj = {
  render: () => <Body size="lg">This is large body text. Use it for emphasis or important content.</Body>,
};

export const BodySmall: StoryObj = {
  render: () => <Body size="sm">This is small body text. Use it for secondary information.</Body>,
};

// Caption Stories
export const CaptionDefault: StoryObj = {
  render: () => <Caption>This is caption text. Use it for helper text and metadata.</Caption>,
};

// Label Stories
export const LabelDefault: StoryObj = {
  render: () => <Label>Form Label</Label>,
};

export const LabelRequired: StoryObj = {
  render: () => <Label required>Required Field Label</Label>,
};

// All Typography Components
export const AllTypography: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <Body style={styles.sectionTitle}>Headings</Body>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
        <Heading level={6}>Heading 6</Heading>
      </View>

      <View style={styles.section}>
        <Body style={styles.sectionTitle}>Body Text</Body>
        <Body>Default body text</Body>
        <Body size="lg">Large body text</Body>
        <Body size="sm">Small body text</Body>
      </View>

      <View style={styles.section}>
        <Body style={styles.sectionTitle}>Captions</Body>
        <Caption>Caption text for helper information</Caption>
      </View>

      <View style={styles.section}>
        <Body style={styles.sectionTitle}>Labels</Body>
        <Label>Form Label</Label>
        <Label required>Required Label</Label>
      </View>
    </View>
  ),
};

// Typography System Showcase
export const TypographySystem: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <Heading level={1}>Typography System</Heading>
      <Body style={{ marginTop: spacing[4], marginBottom: spacing[3] }}>
        Complete typography system for the design system
      </Body>

      <View style={styles.section}>
        <Heading level={3}>Heading Hierarchy</Heading>
        <Heading level={1}>H1 - Main Title</Heading>
        <Heading level={2}>H2 - Section Title</Heading>
        <Heading level={3}>H3 - Subsection Title</Heading>
        <Heading level={4}>H4 - Minor Heading</Heading>
        <Heading level={5}>H5 - Small Heading</Heading>
        <Heading level={6}>H6 - Smallest Heading</Heading>
      </View>

      <View style={styles.section}>
        <Heading level={3}>Body Text Variants</Heading>
        <Body>Default body text for regular content</Body>
        <Body size="lg">Large body text for emphasis</Body>
        <Body size="sm">Small body text for secondary info</Body>
      </View>

      <View style={styles.section}>
        <Heading level={3}>Form Elements</Heading>
        <Label>Standard Label</Label>
        <Label required>Required Field Label</Label>
        <Caption>Helper text below form fields</Caption>
      </View>
    </View>
  ),
};
