import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ScreenLayout } from './ScreenLayout';
import { Button } from '../Button';
import { Card } from '../Card';
import { InputField } from '../InputField';
import { Label, Heading, Body } from '../Typography';
import { spacing, colors } from '../../../constants/designTokens';

const meta = {
  title: 'ScreenLayout',
  component: ScreenLayout,
  decorators: [
    (Story) => <Story />,
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: spacing[4],
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  footer: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  section: {
    marginBottom: spacing[4],
  },
  sectionTitle: {
    marginBottom: spacing[3],
  },
});

// Basic Layout
export const BasicLayout: StoryObj = {
  render: () => (
    <ScreenLayout>
      <View style={styles.content}>
        <Heading level={2}>Basic Screen Layout</Heading>
        <Body style={{ marginTop: spacing[2] }}>
          This is a simple screen with basic content
        </Body>
      </View>
    </ScreenLayout>
  ),
};

// Layout with Header
export const LayoutWithHeader: StoryObj = {
  render: () => (
    <ScreenLayout>
      <View style={styles.header}>
        <Heading level={3}>Screen Header</Heading>
      </View>
      <View style={styles.content}>
        <Body>Content below the header</Body>
      </View>
    </ScreenLayout>
  ),
};

// Layout with Footer
export const LayoutWithFooter: StoryObj = {
  render: () => (
    <ScreenLayout>
      <View style={styles.content}>
        <Heading level={3}>Content Area</Heading>
        <Body style={{ marginTop: spacing[2] }}>
          Main content goes here
        </Body>
      </View>
      <View style={styles.footer}>
        <Button fullWidth>Action Button</Button>
      </View>
    </ScreenLayout>
  ),
};

// Layout with Header and Footer
export const LayoutWithHeaderAndFooter: StoryObj = {
  render: () => (
    <ScreenLayout>
      <View style={styles.header}>
        <Heading level={3}>Header</Heading>
      </View>
      <View style={styles.content}>
        <Body>Content between header and footer</Body>
      </View>
      <View style={styles.footer}>
        <Button fullWidth>Submit</Button>
      </View>
    </ScreenLayout>
  ),
};

// Scrollable Content
export const ScrollableContent: StoryObj = {
  render: () => (
    <ScreenLayout>
      <View style={styles.header}>
        <Heading level={3}>Scrollable Screen</Heading>
      </View>
      <ScrollView style={styles.content}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Card key={item} variant="outlined" style={{ marginBottom: spacing[3] }}>
            <View style={{ padding: spacing[3] }}>
              <Heading level={4}>Item {item}</Heading>
              <Body style={{ marginTop: spacing[2] }}>
                This is content for item {item}. The screen is scrollable to accommodate multiple items.
              </Body>
            </View>
          </Card>
        ))}
      </ScrollView>
    </ScreenLayout>
  ),
};

// Form Pattern
export const FormPattern: StoryObj = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      message: '',
    });

    return (
      <ScreenLayout>
        <View style={styles.header}>
          <Heading level={3}>Contact Form</Heading>
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Label required>Full Name</Label>
            <InputField 
              placeholder="Enter your name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.section}>
            <Label required>Email</Label>
            <InputField 
              placeholder="name@example.com"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>

          <View style={styles.section}>
            <Label required>Message</Label>
            <InputField 
              placeholder="Enter your message"
              multiline
              numberOfLines={4}
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Button fullWidth variant="primary">Send Message</Button>
        </View>
      </ScreenLayout>
    );
  },
};

// List Pattern
export const ListPattern: StoryObj = {
  render: () => (
    <ScreenLayout>
      <View style={styles.header}>
        <Heading level={3}>Items List</Heading>
      </View>
      <ScrollView style={styles.content}>
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <View key={item}>
            <View style={{ 
              paddingVertical: spacing[3],
              borderBottomWidth: index < 5 ? 1 : 0,
              borderBottomColor: colors.border.light,
            }}>
              <Heading level={5}>Item {item}</Heading>
              <Body style={{ marginTop: spacing[1], color: colors.text.secondary }}>
                Description for item {item}
              </Body>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenLayout>
  ),
};

// Empty State
export const EmptyState: StoryObj = {
  render: () => (
    <ScreenLayout>
      <View style={styles.header}>
        <Heading level={3}>Empty State</Heading>
      </View>
      <View style={[styles.content, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <Heading level={4} style={{ textAlign: 'center' }}>No Items Found</Heading>
        <Body style={{ marginTop: spacing[2], textAlign: 'center', color: colors.text.secondary }}>
          There are no items to display at this time
        </Body>
      </View>
      <View style={styles.footer}>
        <Button fullWidth variant="primary">Create New Item</Button>
      </View>
    </ScreenLayout>
  ),
};

// Complex Layout
export const ComplexLayout: StoryObj = {
  render: () => (
    <ScreenLayout>
      <View style={styles.header}>
        <Heading level={2}>Dashboard</Heading>
        <Body style={{ marginTop: spacing[1], color: colors.text.secondary }}>
          Welcome back!
        </Body>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Heading level={4} style={styles.sectionTitle}>Quick Stats</Heading>
          <Card variant="elevated" style={{ marginBottom: spacing[3] }}>
            <View style={{ padding: spacing[3] }}>
              <Body>Total Items: 42</Body>
              <Body style={{ marginTop: spacing[1] }}>Completed: 28</Body>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Heading level={4} style={styles.sectionTitle}>Recent Activity</Heading>
          {[1, 2, 3].map((item) => (
            <Card key={item} variant="outlined" style={{ marginBottom: spacing[2] }}>
              <View style={{ padding: spacing[3] }}>
                <Body>Activity {item}</Body>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button fullWidth variant="primary">View All</Button>
      </View>
    </ScreenLayout>
  ),
};

// Settings Pattern
export const SettingsPattern: StoryObj = {
  render: () => (
    <ScreenLayout>
      <View style={styles.header}>
        <Heading level={3}>Settings</Heading>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Heading level={5} style={styles.sectionTitle}>Account</Heading>
          {['Profile', 'Password', 'Email'].map((item, index) => (
            <View key={item} style={{
              paddingVertical: spacing[3],
              borderBottomWidth: index < 2 ? 1 : 0,
              borderBottomColor: colors.border.light,
            }}>
              <Body>{item}</Body>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Heading level={5} style={styles.sectionTitle}>Preferences</Heading>
          {['Notifications', 'Theme', 'Language'].map((item, index) => (
            <View key={item} style={{
              paddingVertical: spacing[3],
              borderBottomWidth: index < 2 ? 1 : 0,
              borderBottomColor: colors.border.light,
            }}>
              <Body>{item}</Body>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Heading level={5} style={styles.sectionTitle}>About</Heading>
          {['Version', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
            <View key={item} style={{
              paddingVertical: spacing[3],
              borderBottomWidth: index < 2 ? 1 : 0,
              borderBottomColor: colors.border.light,
            }}>
              <Body>{item}</Body>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenLayout>
  ),
};

// Detail View Pattern
export const DetailViewPattern: StoryObj = {
  render: () => (
    <ScreenLayout>
      <View style={styles.header}>
        <Heading level={3}>Item Details</Heading>
      </View>
      <ScrollView style={styles.content}>
        <Card variant="elevated" style={{ marginBottom: spacing[4] }}>
          <View style={{ padding: spacing[4] }}>
            <Heading level={3}>Item Title</Heading>
            <Body style={{ marginTop: spacing[2], color: colors.text.secondary }}>
              Category • 2 hours ago
            </Body>
            <Body style={{ marginTop: spacing[3] }}>
              This is the detailed description of the item. It can contain multiple paragraphs and provide comprehensive information about the item.
            </Body>
          </View>
        </Card>

        <View style={styles.section}>
          <Heading level={5} style={styles.sectionTitle}>Additional Information</Heading>
          <Card variant="outlined">
            <View style={{ padding: spacing[3] }}>
              <Body>Status: Active</Body>
              <Body style={{ marginTop: spacing[2] }}>Created: Jan 1, 2024</Body>
              <Body style={{ marginTop: spacing[2] }}>Updated: Today</Body>
            </View>
          </Card>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', gap: spacing[2] }}>
          <Button variant="secondary" style={{ flex: 1 }}>Edit</Button>
          <Button variant="error" style={{ flex: 1 }}>Delete</Button>
        </View>
      </View>
    </ScreenLayout>
  ),
};
