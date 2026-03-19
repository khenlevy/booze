/**
 * InputField Component Stories
 * 
 * Comprehensive examples and usage patterns for the InputField component.
 * Demonstrates all validation states, variants, and integration patterns.
 * 
 * @component
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { InputField } from './InputField';
import { Heading, Body } from '../Typography';
import { spacing } from '../../constants/designTokens';

/**
 * Default InputField story
 */
export function DefaultInputField() {
  const [value, setValue] = useState('');

  return (
    <InputField
      label="Username"
      placeholder="Enter your username"
      value={value}
      onChangeText={setValue}
      helperText="Choose a unique username"
    />
  );
}

/**
 * Email input with validation
 */
export function EmailInputField() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Simple email validation
    if (text && !text.includes('@')) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  return (
    <InputField
      label="Email Address"
      placeholder="Enter your email"
      value={email}
      onChangeText={handleEmailChange}
      inputType="email"
      error={error}
      required
      helperText="We'll never share your email"
    />
  );
}

/**
 * Password input with visibility toggle
 */
export function PasswordInputField() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputField
      label="Password"
      placeholder="Enter your password"
      value={password}
      onChangeText={setPassword}
      inputType={showPassword ? 'text' : 'password'}
      required
      helperText="Must be at least 8 characters"
    />
  );
}

/**
 * Success state example
 */
export function SuccessInputField() {
  const [username, setUsername] = useState('john_doe');

  return (
    <InputField
      label="Username"
      placeholder="Enter your username"
      value={username}
      onChangeText={setUsername}
      success="Username is available!"
    />
  );
}

/**
 * Error state example
 */
export function ErrorInputField() {
  const [username, setUsername] = useState('');

  return (
    <InputField
      label="Username"
      placeholder="Enter your username"
      value={username}
      onChangeText={setUsername}
      error="Username is already taken"
      required
    />
  );
}

/**
 * Disabled state example
 */
export function DisabledInputField() {
  return (
    <InputField
      label="Disabled Field"
      placeholder="This field is disabled"
      value="Cannot edit"
      onChangeText={() => {}}
      disabled
      helperText="This input is read-only"
    />
  );
}

/**
 * Phone number input
 */
export function PhoneInputField() {
  const [phone, setPhone] = useState('');

  return (
    <InputField
      label="Phone Number"
      placeholder="Enter your phone number"
      value={phone}
      onChangeText={setPhone}
      inputType="phone"
      required
      helperText="Format: (123) 456-7890"
    />
  );
}

/**
 * Number input
 */
export function NumberInputField() {
  const [quantity, setQuantity] = useState('');

  return (
    <InputField
      label="Quantity"
      placeholder="Enter quantity"
      value={quantity}
      onChangeText={setQuantity}
      inputType="number"
      maxLength={5}
      helperText="Enter a number between 1 and 99999"
    />
  );
}

/**
 * Multiline input
 */
export function MultilineInputField() {
  const [notes, setNotes] = useState('');

  return (
    <InputField
      label="Notes"
      placeholder="Enter your notes here..."
      value={notes}
      onChangeText={setNotes}
      numberOfLines={4}
      maxLength={500}
      helperText="Maximum 500 characters"
    />
  );
}

/**
 * All states showcase
 */
export function AllInputFieldStates() {
  const [defaultValue, setDefaultValue] = useState('');
  const [focusedValue, setFocusedValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [successValue, setSuccessValue] = useState('john_doe');
  const [disabledValue] = useState('Disabled');

  return (
    <ScrollView style={styles.container}>
      <Heading level={2}>InputField Component States</Heading>

      <View style={styles.section}>
        <Body style={styles.sectionTitle}>Default State</Body>
        <InputField
          label="Default Input"
          placeholder="Type something..."
          value={defaultValue}
          onChangeText={setDefaultValue}
          helperText="This is the default state"
        />
      </View>

      <View style={styles.section}>
        <Body style={styles.sectionTitle}>Focused State</Body>
        <InputField
          label="Focused Input"
          placeholder="Click to focus..."
          value={focusedValue}
          onChangeText={setFocusedValue}
          helperText="Border color changes when focused"
        />
      </View>

      <View style={styles.section}>
        <Body style={styles.sectionTitle}>Error State</Body>
        <InputField
          label="Error Input"
          placeholder="This has an error"
          value={errorValue}
          onChangeText={setErrorValue}
          error="This field is required"
          required
        />
      </View>

      <View style={styles.section}>
        <Body style={styles.sectionTitle}>Success State</Body>
        <InputField
          label="Success Input"
          placeholder="Success message"
          value={successValue}
          onChangeText={() => {}}
          success="Validation passed!"
        />
      </View>

      <View style={styles.section}>
        <Body style={styles.sectionTitle}>Disabled State</Body>
        <InputField
          label="Disabled Input"
          placeholder="Cannot edit"
          value={disabledValue}
          onChangeText={() => {}}
          disabled
          helperText="This field is disabled"
        />
      </View>

      <View style={styles.section}>
        <Body style={styles.sectionTitle}>Required Field</Body>
        <InputField
          label="Required Input"
          placeholder="This field is required"
          value=""
          onChangeText={() => {}}
          required
          helperText="Marked with an asterisk (*)"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing[4],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    marginBottom: spacing[3],
    fontWeight: '600',
  },
});

export default {
  title: 'InputField',
  component: InputField,
};
