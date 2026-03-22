import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { InputField } from './InputField';
import { Label, Body } from '../Typography';
import { spacing, colors } from '../../../constants/designTokens';

const meta = {
  title: 'InputField',
  component: InputField,
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
  inputWrapper: {
    marginBottom: spacing[4],
  },
  label: {
    marginBottom: spacing[2],
  },
  helperText: {
    marginTop: spacing[1],
    fontSize: 12,
    color: colors.text.secondary,
  },
});

// Basic Input
export const DefaultInput: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label>Email Address</Label>
      <InputField placeholder="Enter your email" />
    </View>
  ),
};

// Input with Placeholder
export const InputWithPlaceholder: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label>Username</Label>
      <InputField placeholder="Enter username" />
    </View>
  ),
};

// Email Input
export const EmailInput: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label>Email</Label>
      <InputField 
        placeholder="name@example.com"
        keyboardType="email-address"
      />
    </View>
  ),
};

// Password Input
export const PasswordInput: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label>Password</Label>
      <InputField 
        placeholder="Enter password"
        secureTextEntry
      />
    </View>
  ),
};

// Number Input
export const NumberInput: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label>Phone Number</Label>
      <InputField 
        placeholder="(555) 123-4567"
        keyboardType="phone-pad"
      />
    </View>
  ),
};

// Error State
export const ErrorState: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label>Email</Label>
      <InputField 
        placeholder="Enter email"
        state="error"
      />
      <Body style={styles.helperText}>Invalid email format</Body>
    </View>
  ),
};

// Success State
export const SuccessState: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label>Email</Label>
      <InputField 
        placeholder="Enter email"
        state="success"
        defaultValue="user@example.com"
      />
      <Body style={styles.helperText}>Email verified</Body>
    </View>
  ),
};

// Disabled State
export const DisabledState: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label>Disabled Field</Label>
      <InputField 
        placeholder="This field is disabled"
        editable={false}
      />
    </View>
  ),
};

// Required Field
export const RequiredField: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label required>Full Name</Label>
      <InputField placeholder="Enter your full name" />
    </View>
  ),
};

// Helper Text
export const HelperText: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label>Password</Label>
      <InputField placeholder="Enter password" />
      <Body style={styles.helperText}>
        Password must be at least 8 characters long
      </Body>
    </View>
  ),
};

// Max Length with Character Counter
export const MaxLengthCounter: StoryObj = {
  render: () => {
    const [text, setText] = React.useState('');
    const maxLength = 50;
    return (
      <View style={styles.inputWrapper}>
        <Label>Bio ({text.length}/{maxLength})</Label>
        <InputField 
          placeholder="Tell us about yourself"
          maxLength={maxLength}
          value={text}
          onChangeText={setText}
          multiline
        />
      </View>
    );
  },
};

// Multiline Input
export const MultilineInput: StoryObj = {
  render: () => (
    <View style={styles.inputWrapper}>
      <Label>Message</Label>
      <InputField 
        placeholder="Enter your message"
        multiline
        numberOfLines={4}
      />
    </View>
  ),
};

// All Input Types Showcase
export const AllInputTypes: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Input Types</View>
        
        <View style={styles.inputWrapper}>
          <Label>Text Input</Label>
          <InputField placeholder="Enter text" />
        </View>

        <View style={styles.inputWrapper}>
          <Label>Email Input</Label>
          <InputField 
            placeholder="name@example.com"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Label>Password Input</Label>
          <InputField 
            placeholder="Enter password"
            secureTextEntry
          />
        </View>

        <View style={styles.inputWrapper}>
          <Label>Phone Number</Label>
          <InputField 
            placeholder="(555) 123-4567"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Label>Number Input</Label>
          <InputField 
            placeholder="Enter number"
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  ),
};

// Form Pattern
export const FormPattern: StoryObj = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      password: '',
    });

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionTitle as any}>Login Form</View>
          
          <View style={styles.inputWrapper}>
            <Label required>Full Name</Label>
            <InputField 
              placeholder="Enter your name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Label required>Email</Label>
            <InputField 
              placeholder="name@example.com"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Label required>Password</Label>
            <InputField 
              placeholder="Enter password"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            <Body style={styles.helperText}>
              Password must be at least 8 characters
            </Body>
          </View>
        </View>
      </View>
    );
  },
};

// Input States Showcase
export const InputStates: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionTitle as any}>Input States</View>
        
        <View style={styles.inputWrapper}>
          <Label>Default State</Label>
          <InputField placeholder="Default input" />
        </View>

        <View style={styles.inputWrapper}>
          <Label>Error State</Label>
          <InputField 
            placeholder="Error input"
            state="error"
          />
          <Body style={styles.helperText}>Error message</Body>
        </View>

        <View style={styles.inputWrapper}>
          <Label>Success State</Label>
          <InputField 
            placeholder="Success input"
            state="success"
            defaultValue="Valid input"
          />
          <Body style={styles.helperText}>Success message</Body>
        </View>

        <View style={styles.inputWrapper}>
          <Label>Disabled State</Label>
          <InputField 
            placeholder="Disabled input"
            editable={false}
          />
        </View>
      </View>
    </View>
  ),
};
