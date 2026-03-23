/**
 * InputField Component
 * 
 * A text input component with validation states, labels, and error messages.
 * Supports various input types and accessibility features.
 * 
 * @component
 * @example
 * ```tsx
 * <InputField
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 *   error={emailError}
 * />
 * ```
 */

import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  colors,
  spacing,
  typography,
  borderRadius,
} from '@/constants/designTokens';

/**
 * InputField validation state
 */
export type InputFieldState = 'default' | 'focused' | 'error' | 'success' | 'disabled';

/**
 * InputField component props
 */
export interface InputFieldProps {
  /** Input label */
  label?: string;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Input value */
  value: string;
  
  /** Callback when text changes */
  onChangeText: (text: string) => void;
  
  /** Input type */
  inputType?: 'text' | 'email' | 'password' | 'number' | 'phone';
  
  /** Error message to display */
  error?: string;
  
  /** Success message to display */
  success?: string;
  
  /** Whether the input is disabled */
  disabled?: boolean;
  
  /** Whether the input is required */
  required?: boolean;
  
  /** Helper text */
  helperText?: string;
  
  /** Maximum character length */
  maxLength?: number;
  
  /** Number of lines (for multiline input) */
  numberOfLines?: number;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Custom input style overrides */
  inputStyle?: TextStyle;
  
  /** Callback when input is focused */
  onFocus?: () => void;
  
  /** Callback when input is blurred */
  onBlur?: () => void;
  
  /** Accessibility label */
  accessibilityLabel?: string;
  
  /** Test ID for testing */
  testID?: string;
  
  /** Icon element to display before input */
  iconLeft?: React.ReactNode;
  
  /** Icon element to display after input */
  iconRight?: React.ReactNode;
}

/**
 * InputField component
 */
export const InputField = React.forwardRef<TextInput, InputFieldProps>(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      inputType = 'text',
      error,
      success,
      disabled = false,
      required = false,
      helperText,
      maxLength,
      numberOfLines = 1,
      style,
      inputStyle,
      onFocus,
      onBlur,
      accessibilityLabel,
      testID,
      iconLeft,
      iconRight,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    const state: InputFieldState = disabled
      ? 'disabled'
      : error
        ? 'error'
        : success
          ? 'success'
          : isFocused
            ? 'focused'
            : 'default';

    const inputStyles = getInputStyles(state);
    const borderColor = getBorderColor(state);

    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    const keyboardType = getKeyboardType(inputType);
    const secureTextEntry = inputType === 'password';

    return (
      <View style={[styles.container, style]}>
        {label && (
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}

        <View
          style={[
            styles.inputWrapper,
            inputStyles.wrapper,
            { borderColor },
          ]}
        >
          {iconLeft && (
            <View style={styles.iconLeft}>
              {iconLeft}
            </View>
          )}

          <TextInput
            ref={ref}
            style={[styles.input, inputStyles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={colors.text.tertiary}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            maxLength={maxLength}
            numberOfLines={numberOfLines}
            multiline={numberOfLines > 1}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            accessibilityLabel={accessibilityLabel || label}
            accessibilityState={{ disabled }}
            testID={testID}
            allowFontScaling={false}
          />

          {iconRight && (
            <View style={styles.iconRight}>
              {iconRight}
            </View>
          )}
        </View>

        {(error || success || helperText) && (
          <Text
            style={[
              styles.helperText,
              error && styles.errorText,
              success && styles.successText,
            ]}
          >
            {error || success || helperText}
          </Text>
        )}
      </View>
    );
  },
);

InputField.displayName = 'InputField';

/**
 * Get input styles based on state
 */
function getInputStyles(state: InputFieldState) {
  const stateMap: Record<InputFieldState, { wrapper: ViewStyle; input: TextStyle }> = {
    default: {
      wrapper: {
        borderColor: colors.border.light,
      },
      input: {
        color: colors.text.primary,
      },
    },
    focused: {
      wrapper: {
        borderColor: colors.primary.light,
        borderWidth: 2,
      },
      input: {
        color: colors.text.primary,
      },
    },
    error: {
      wrapper: {
        borderColor: colors.error.light,
        borderWidth: 2,
      },
      input: {
        color: colors.text.primary,
      },
    },
    success: {
      wrapper: {
        borderColor: colors.success.light,
        borderWidth: 2,
      },
      input: {
        color: colors.text.primary,
      },
    },
    disabled: {
      wrapper: {
        borderColor: colors.border.light,
        backgroundColor: colors.neutral[100],
      },
      input: {
        color: colors.text.tertiary,
      },
    },
  };

  return stateMap[state];
}

/**
 * Get border color based on state
 */
function getBorderColor(state: InputFieldState): string {
  switch (state) {
    case 'error':
      return colors.error.light;
    case 'success':
      return colors.success.light;
    case 'focused':
      return colors.primary.light;
    default:
      return colors.border.light;
  }
}

/**
 * Get keyboard type based on input type
 */
function getKeyboardType(inputType: string) {
  switch (inputType) {
    case 'email':
      return 'email-address';
    case 'number':
      return 'numeric';
    case 'phone':
      return 'phone-pad';
    default:
      return 'default';
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing[2],
    letterSpacing: typography.letterSpacing.wide,
  },
  required: {
    color: colors.error.light,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing[3],
    backgroundColor: colors.background.primary,
    minHeight: 44,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[2],
  },
  iconLeft: {
    marginRight: spacing[2],
  },
  iconRight: {
    marginLeft: spacing[2],
  },
  helperText: {
    fontSize: typography.fontSize.xs,
    marginTop: spacing[1],
    color: colors.text.secondary,
  },
  errorText: {
    color: colors.error.light,
  },
  successText: {
    color: colors.success.light,
  },
});

export default InputField;
