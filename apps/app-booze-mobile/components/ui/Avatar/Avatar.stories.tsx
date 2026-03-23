import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { Avatar } from './Avatar';
import { Body } from '../Typography';
import { colors, spacing } from '@/constants/designTokens';

const meta = {
  title: 'Avatar',
  component: Avatar,
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
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  avatarItem: {
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  label: {
    marginTop: spacing[2],
    fontSize: 12,
    color: colors.text.secondary,
  },
  row: {
    flexDirection: 'row',
    gap: spacing[3],
    alignItems: 'center',
    marginBottom: spacing[4],
  },
});

// Initials Variants
export const InitialsSmall: StoryObj = {
  render: () => (
    <View style={styles.avatarItem}>
      <Avatar initials="JD" size="sm" />
      <Body style={styles.label}>Small</Body>
    </View>
  ),
};

export const InitialsMedium: StoryObj = {
  render: () => (
    <View style={styles.avatarItem}>
      <Avatar initials="JD" size="md" />
      <Body style={styles.label}>Medium</Body>
    </View>
  ),
};

export const InitialsLarge: StoryObj = {
  render: () => (
    <View style={styles.avatarItem}>
      <Avatar initials="JD" size="lg" />
      <Body style={styles.label}>Large</Body>
    </View>
  ),
};

export const InitialsExtraLarge: StoryObj = {
  render: () => (
    <View style={styles.avatarItem}>
      <Avatar initials="JD" size="xl" />
      <Body style={styles.label}>Extra Large</Body>
    </View>
  ),
};

// Image Variants
export const ImageSmall: StoryObj = {
  render: () => (
    <View style={styles.avatarItem}>
      <Avatar 
        source={{ uri: 'https://via.placeholder.com/40' }} 
        size="sm" 
      />
      <Body style={styles.label}>Small</Body>
    </View>
  ),
};

export const ImageMedium: StoryObj = {
  render: () => (
    <View style={styles.avatarItem}>
      <Avatar 
        source={{ uri: 'https://via.placeholder.com/56' }} 
        size="md" 
      />
      <Body style={styles.label}>Medium</Body>
    </View>
  ),
};

export const ImageLarge: StoryObj = {
  render: () => (
    <View style={styles.avatarItem}>
      <Avatar 
        source={{ uri: 'https://via.placeholder.com/80' }} 
        size="lg" 
      />
      <Body style={styles.label}>Large</Body>
    </View>
  ),
};

export const ImageExtraLarge: StoryObj = {
  render: () => (
    <View style={styles.avatarItem}>
      <Avatar 
        source={{ uri: 'https://via.placeholder.com/120' }} 
        size="xl" 
      />
      <Body style={styles.label}>Extra Large</Body>
    </View>
  ),
};

// All Sizes with Initials
export const AllSizesInitials: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Avatar Sizes (Initials)</View>
        <View style={styles.avatarGrid}>
          <View style={styles.avatarItem}>
            <Avatar initials="SM" size="sm" />
            <Body style={styles.label}>Small</Body>
          </View>
          <View style={styles.avatarItem}>
            <Avatar initials="MD" size="md" />
            <Body style={styles.label}>Medium</Body>
          </View>
          <View style={styles.avatarItem}>
            <Avatar initials="LG" size="lg" />
            <Body style={styles.label}>Large</Body>
          </View>
          <View style={styles.avatarItem}>
            <Avatar initials="XL" size="xl" />
            <Body style={styles.label}>Extra Large</Body>
          </View>
        </View>
      </View>
    </View>
  ),
};

// Avatar Group
export const AvatarGroup: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Avatar Group</View>
        <View style={styles.row}>
          <Avatar initials="JD" size="md" />
          <Avatar initials="AB" size="md" />
          <Avatar initials="CD" size="md" />
          <Avatar initials="EF" size="md" />
        </View>
      </View>
    </View>
  ),
};

// Placeholder State
export const PlaceholderState: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Placeholder States</View>
        <View style={styles.avatarGrid}>
          <View style={styles.avatarItem}>
            <Avatar initials="?" size="lg" />
            <Body style={styles.label}>Unknown</Body>
          </View>
          <View style={styles.avatarItem}>
            <Avatar initials="+" size="lg" />
            <Body style={styles.label}>Add User</Body>
          </View>
        </View>
      </View>
    </View>
  ),
};

// Different Initials
export const DifferentInitials: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Different Initials</View>
        <View style={styles.avatarGrid}>
          <View style={styles.avatarItem}>
            <Avatar initials="JD" size="lg" />
            <Body style={styles.label}>JD</Body>
          </View>
          <View style={styles.avatarItem}>
            <Avatar initials="AB" size="lg" />
            <Body style={styles.label}>AB</Body>
          </View>
          <View style={styles.avatarItem}>
            <Avatar initials="CD" size="lg" />
            <Body style={styles.label}>CD</Body>
          </View>
          <View style={styles.avatarItem}>
            <Avatar initials="EF" size="lg" />
            <Body style={styles.label}>EF</Body>
          </View>
          <View style={styles.avatarItem}>
            <Avatar initials="GH" size="lg" />
            <Body style={styles.label}>GH</Body>
          </View>
          <View style={styles.avatarItem}>
            <Avatar initials="IJ" size="lg" />
            <Body style={styles.label}>IJ</Body>
          </View>
        </View>
      </View>
    </View>
  ),
};

// Avatar in User List
export const AvatarInUserList: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>User List</View>
        
        {[
          { name: 'John Doe', initials: 'JD' },
          { name: 'Alice Brown', initials: 'AB' },
          { name: 'Charlie Davis', initials: 'CD' },
        ].map((user, index) => (
          <View key={index} style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            paddingVertical: spacing[2],
            borderBottomWidth: index < 2 ? 1 : 0,
            borderBottomColor: colors.border.light,
          }}>
            <Avatar initials={user.initials} size="md" />
            <Body style={{ marginLeft: spacing[3] }}>{user.name}</Body>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Avatar Sizes Comparison
export const AvatarSizesComparison: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Size Comparison</View>
        
        <View style={{ marginBottom: spacing[4] }}>
          <Body style={{ marginBottom: spacing[2], fontWeight: '600' }}>Initials</Body>
          <View style={styles.row}>
            <Avatar initials="SM" size="sm" />
            <Avatar initials="MD" size="md" />
            <Avatar initials="LG" size="lg" />
            <Avatar initials="XL" size="xl" />
          </View>
        </View>

        <View>
          <Body style={{ marginBottom: spacing[2], fontWeight: '600' }}>Images</Body>
          <View style={styles.row}>
            <Avatar 
              source={{ uri: 'https://via.placeholder.com/40' }} 
              size="sm" 
            />
            <Avatar 
              source={{ uri: 'https://via.placeholder.com/56' }} 
              size="md" 
            />
            <Avatar 
              source={{ uri: 'https://via.placeholder.com/80' }} 
              size="lg" 
            />
            <Avatar 
              source={{ uri: 'https://via.placeholder.com/120' }} 
              size="xl" 
            />
          </View>
        </View>
      </View>
    </View>
  ),
};

// Avatar with Status Indicator
export const AvatarWithStatus: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Avatar with Status</View>
        <View style={styles.avatarGrid}>
          <View style={styles.avatarItem}>
            <View style={{ position: 'relative' }}>
              <Avatar initials="JD" size="lg" />
              <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: colors.success.primary,
                borderWidth: 2,
                borderColor: colors.background.primary,
              }} />
            </View>
            <Body style={styles.label}>Online</Body>
          </View>
          <View style={styles.avatarItem}>
            <View style={{ position: 'relative' }}>
              <Avatar initials="AB" size="lg" />
              <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: colors.warning.primary,
                borderWidth: 2,
                borderColor: colors.background.primary,
              }} />
            </View>
            <Body style={styles.label}>Away</Body>
          </View>
          <View style={styles.avatarItem}>
            <View style={{ position: 'relative' }}>
              <Avatar initials="CD" size="lg" />
              <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: colors.text.secondary,
                borderWidth: 2,
                borderColor: colors.background.primary,
              }} />
            </View>
            <Body style={styles.label}>Offline</Body>
          </View>
        </View>
      </View>
    </View>
  ),
};
