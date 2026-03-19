/**
 * Typography Component Stories
 * 
 * Storybook stories for Typography components demonstrating all variants,
 * sizes, colors, and usage patterns.
 * 
 * @module components/ui/Typography/Typography.stories
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Heading, Body, Caption, Label } from './Typography';
import { colors, spacing, typography } from '../../constants/designTokens';

/**
 * Story metadata
 */
export default {
  title: 'Typography',
  component: Heading,
};

/**
 * Heading Levels Story
 * Demonstrates all heading levels (H1-H6) with their respective sizes and weights
 */
export function HeadingLevels() {
  return (
    <View style={styles.container}>
      <Heading level={1}>Heading Level 1 (H1)</Heading>
      <Caption>fontSize: 36px, fontWeight: 800, lineHeight: 1.2</Caption>
      
      <View style={styles.spacer} />
      
      <Heading level={2}>Heading Level 2 (H2)</Heading>
      <Caption>fontSize: 30px, fontWeight: 700, lineHeight: 1.2</Caption>
      
      <View style={styles.spacer} />
      
      <Heading level={3}>Heading Level 3 (H3)</Heading>
      <Caption>fontSize: 24px, fontWeight: 700, lineHeight: 1.2</Caption>
      
      <View style={styles.spacer} />
      
      <Heading level={4}>Heading Level 4 (H4)</Heading>
      <Caption>fontSize: 20px, fontWeight: 600, lineHeight: 1.5</Caption>
      
      <View style={styles.spacer} />
      
      <Heading level={5}>Heading Level 5 (H5)</Heading>
      <Caption>fontSize: 18px, fontWeight: 600, lineHeight: 1.5</Caption>
      
      <View style={styles.spacer} />
      
      <Heading level={6}>Heading Level 6 (H6)</Heading>
      <Caption>fontSize: 16px, fontWeight: 600, lineHeight: 1.5</Caption>
    </View>
  );
}

/**
 * Body Text Story
 * Demonstrates body text with various content lengths and line heights
 */
export function BodyText() {
  return (
    <View style={styles.container}>
      <Heading level={2}>Body Text</Heading>
      
      <View style={styles.spacer} />
      
      <Body>
        This is standard body text. It uses a base font size of 16px with normal font weight (400) and a line height of 1.5 for optimal readability.
      </Body>
      
      <View style={styles.spacer} />
      
      <Body>
        Body text can span multiple lines and maintains consistent spacing. It's the primary text style for content, descriptions, and longer form text throughout the application.
      </Body>
      
      <View style={styles.spacer} />
      
      <Body numberOfLines={1}>
        This body text is limited to a single line and will truncate with an ellipsis if it exceeds the available width.
      </Body>
    </View>
  );
}

/**
 * Caption Text Story
 * Demonstrates caption text for secondary information and metadata
 */
export function CaptionText() {
  return (
    <View style={styles.container}>
      <Heading level={2}>Caption Text</Heading>
      
      <View style={styles.spacer} />
      
      <Caption>
        This is caption text. It's smaller (14px) and typically used for secondary information, helper text, or metadata.
      </Caption>
      
      <View style={styles.spacer} />
      
      <Caption>
        Captions are often used below images, for form hints, or to provide additional context without drawing focus.
      </Caption>
      
      <View style={styles.spacer} />
      
      <Caption numberOfLines={1}>
        This caption is limited to a single line and will truncate if needed.
      </Caption>
    </View>
  );
}

/**
 * Label Text Story
 * Demonstrates label text for form fields and UI labels
 */
export function LabelText() {
  return (
    <View style={styles.container}>
      <Heading level={2}>Label Text</Heading>
      
      <View style={styles.spacer} />
      
      <Label>Email Address</Label>
      <View style={styles.inputPlaceholder} />
      
      <View style={styles.spacer} />
      
      <Label>Password</Label>
      <View style={styles.inputPlaceholder} />
      
      <View style={styles.spacer} />
      
      <Label>Confirm Password</Label>
      <View style={styles.inputPlaceholder} />
    </View>
  );
}

/**
 * Text Colors Story
 * Demonstrates typography with different color variants
 */
export function TextColors() {
  return (
    <View style={styles.container}>
      <Heading level={2}>Text Colors</Heading>
      
      <View style={styles.spacer} />
      
      <Heading level={4} color={colors.text.primary}>
        Primary Text
      </Heading>
      <Body color={colors.text.primary}>
        This is primary text color, used for main content.
      </Body>
      
      <View style={styles.spacer} />
      
      <Heading level={4} color={colors.text.secondary}>
        Secondary Text
      </Heading>
      <Body color={colors.text.secondary}>
        This is secondary text color, used for less important information.
      </Body>
      
      <View style={styles.spacer} />
      
      <Heading level={4} color={colors.text.tertiary}>
        Tertiary Text
      </Heading>
      <Body color={colors.text.tertiary}>
        This is tertiary text color, used for hints and disabled states.
      </Body>
      
      <View style={styles.spacer} />
      
      <Heading level={4} color={colors.success.light}>
        Success Text
      </Heading>
      <Body color={colors.success.light}>
        This is success text color, used for positive messages.
      </Body>
      
      <View style={styles.spacer} />
      
      <Heading level={4} color={colors.error.light}>
        Error Text
      </Heading>
      <Body color={colors.error.light}>
        This is error text color, used for error messages.
      </Body>
      
      <View style={styles.spacer} />
      
      <Heading level={4} color={colors.warning.light}>
        Warning Text
      </Heading>
      <Body color={colors.warning.light}>
        This is warning text color, used for warning messages.
      </Body>
    </View>
  );
}

/**
 * Font Weights Story
 * Demonstrates different font weights applied to body text
 */
export function FontWeights() {
  return (
    <View style={styles.container}>
      <Heading level={2}>Font Weights</Heading>
      
      <View style={styles.spacer} />
      
      <Body style={{ fontWeight: typography.fontWeight.light }}>
        Light (300) - This text uses a light font weight
      </Body>
      
      <View style={styles.spacer} />
      
      <Body style={{ fontWeight: typography.fontWeight.normal }}>
        Normal (400) - This text uses a normal font weight
      </Body>
      
      <View style={styles.spacer} />
      
      <Body style={{ fontWeight: typography.fontWeight.medium }}>
        Medium (500) - This text uses a medium font weight
      </Body>
      
      <View style={styles.spacer} />
      
      <Body style={{ fontWeight: typography.fontWeight.semibold }}>
        Semibold (600) - This text uses a semibold font weight
      </Body>
      
      <View style={styles.spacer} />
      
      <Body style={{ fontWeight: typography.fontWeight.bold }}>
        Bold (700) - This text uses a bold font weight
      </Body>
      
      <View style={styles.spacer} />
      
      <Body style={{ fontWeight: typography.fontWeight.extrabold }}>
        Extrabold (800) - This text uses an extrabold font weight
      </Body>
    </View>
  );
}

/**
 * Accessibility Story
 * Demonstrates accessibility features like labels and roles
 */
export function Accessibility() {
  return (
    <View style={styles.container}>
      <Heading level={2}>Accessibility Features</Heading>
      
      <View style={styles.spacer} />
      
      <Heading
        level={3}
        accessibilityLabel="Main page heading"
        testID="main-heading"
      >
        Accessible Heading
      </Heading>
      <Body accessibilityLabel="Description of the page content">
        This heading has an accessibility label and test ID for better testing and screen reader support.
      </Body>
      
      <View style={styles.spacer} />
      
      <Label accessibilityLabel="Email input label">
        Email Address
      </Label>
      <View style={styles.inputPlaceholder} />
      
      <View style={styles.spacer} />
      
      <Caption accessibilityLabel="Helper text for email field">
        We'll never share your email with anyone else.
      </Caption>
    </View>
  );
}

/**
 * Real-world Usage Story
 * Demonstrates typography in a realistic UI context
 */
export function RealWorldUsage() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Heading level={2}>Welcome Back!</Heading>
        
        <View style={styles.spacer} />
        
        <Body>
          Sign in to your account to continue exploring and tracking your favorite beverages.
        </Body>
        
        <View style={styles.spacer} />
        
        <Label>Email Address</Label>
        <View style={styles.inputPlaceholder} />
        
        <View style={styles.spacer} />
        
        <Label>Password</Label>
        <View style={styles.inputPlaceholder} />
        
        <View style={styles.spacer} />
        
        <View style={styles.buttonPlaceholder} />
        
        <View style={styles.spacer} />
        
        <Caption>
          Don't have an account? Sign up here.
        </Caption>
      </View>
    </View>
  );
}

/**
 * Styles for stories
 */
const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    backgroundColor: colors.background.primary,
  },
  spacer: {
    height: spacing[4],
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  inputPlaceholder: {
    height: 40,
    backgroundColor: colors.background.tertiary,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border.light,
    marginTop: spacing[2],
  },
  buttonPlaceholder: {
    height: 44,
    backgroundColor: colors.primary.light,
    borderRadius: 4,
    marginTop: spacing[2],
  },
});
