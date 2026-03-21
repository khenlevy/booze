# InputField Component Integration Guide

## Overview

The `InputField` component is a fully-featured text input wrapper for React Native that provides validation states, labels, error messages, and accessibility support. It's designed to be used across all screens in the app-booze-mobile application.

## Features

✅ **Validation States**: default, focused, error, success, disabled
✅ **Input Types**: text, email, password, number, phone
✅ **Accessibility**: ARIA labels, accessibility states, test IDs
✅ **Design Tokens**: Uses centralized colors, spacing, and typography
✅ **TypeScript**: Full type safety with strict mode compliance
✅ **Flexible**: Supports icons, helper text, multiline input, and more

## Basic Usage

```tsx
import { InputField } from '@/components/ui';
import { useState } from 'react';

export function MyForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <InputField
      label="Email Address"
      placeholder="Enter your email"
      value={email}
      onChangeText={setEmail}
      inputType="email"
      error={error}
      required
      helperText="We'll never share your email"
    />
  );
}
```

## Props Reference

### Required Props

- **`value: string`** - Current input value
- **`onChangeText: (text: string) => void`** - Callback when text changes

### Optional Props

#### Labels & Text
- **`label?: string`** - Input label displayed above the field
- **`placeholder?: string`** - Placeholder text
- **`helperText?: string`** - Helper text displayed below the input
- **`error?: string`** - Error message (shows error state)
- **`success?: string`** - Success message (shows success state)

#### Input Configuration
- **`inputType?: 'text' | 'email' | 'password' | 'number' | 'phone'`** - Input type (default: 'text')
- **`maxLength?: number`** - Maximum character length
- **`numberOfLines?: number`** - Number of lines for multiline input (default: 1)
- **`disabled?: boolean`** - Disable the input (default: false)
- **`required?: boolean`** - Mark as required with asterisk (default: false)

#### Icons & Styling
- **`iconLeft?: React.ReactNode`** - Icon element before input
- **`iconRight?: React.ReactNode`** - Icon element after input
- **`style?: ViewStyle`** - Custom container style
- **`inputStyle?: TextStyle`** - Custom input style

#### Callbacks
- **`onFocus?: () => void`** - Called when input is focused
- **`onBlur?: () => void`** - Called when input is blurred

#### Accessibility
- **`accessibilityLabel?: string`** - Accessibility label (defaults to label prop)
- **`testID?: string`** - Test ID for testing

## Validation States

### Default State
```tsx
<InputField
  label="Username"
  placeholder="Enter username"
  value={username}
  onChangeText={setUsername}
/>
```

### Focused State
Automatically applied when the input is focused. Border color changes to primary color.

### Error State
```tsx
<InputField
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  error="Invalid email format"
/>
```

### Success State
```tsx
<InputField
  label="Username"
  placeholder="Enter username"
  value={username}
  onChangeText={setUsername}
  success="Username is available!"
/>
```

### Disabled State
```tsx
<InputField
  label="Read-only field"
  value="Cannot edit"
  onChangeText={() => {}}
  disabled
/>
```

## Input Types

### Email
```tsx
<InputField
  inputType="email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
/>
```

### Password
```tsx
<InputField
  inputType="password"
  placeholder="Enter password"
  value={password}
  onChangeText={setPassword}
/>
```

### Phone
```tsx
<InputField
  inputType="phone"
  placeholder="(123) 456-7890"
  value={phone}
  onChangeText={setPhone}
/>
```

### Number
```tsx
<InputField
  inputType="number"
  placeholder="Enter quantity"
  value={quantity}
  onChangeText={setQuantity}
  maxLength={5}
/>
```

## Advanced Usage

### Multiline Input
```tsx
<InputField
  label="Notes"
  placeholder="Enter your notes..."
  value={notes}
  onChangeText={setNotes}
  numberOfLines={4}
  maxLength={500}
  helperText="Maximum 500 characters"
/>
```

### With Icons
```tsx
import { MaterialIcons } from '@expo/vector-icons';

<InputField
  label="Search"
  placeholder="Search..."
  value={search}
  onChangeText={setSearch}
  iconLeft={<MaterialIcons name="search" size={20} color="#666" />}
  iconRight={<MaterialIcons name="clear" size={20} color="#666" />}
/>
```

### Form Integration
```tsx
export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
  };

  return (
    <View>
      <InputField
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        inputType="email"
        error={errors.email}
        required
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        inputType="password"
        error={errors.password}
        required
      />
      <Button onPress={handleSubmit}>Login</Button>
    </View>
  );
}
```

## Styling & Theming

The InputField component uses design tokens from `@/constants/designTokens`:

- **Colors**: Primary, error, success, border, text, background
- **Spacing**: Consistent 8px-based spacing scale
- **Typography**: Font sizes, weights, and line heights
- **Border Radius**: Rounded corners

To customize styling, use the `style` and `inputStyle` props:

```tsx
<InputField
  label="Custom Input"
  value={value}
  onChangeText={setValue}
  style={{ marginBottom: 24 }}
  inputStyle={{ fontSize: 18 }}
/>
```

## Accessibility

The InputField component includes built-in accessibility features:

- **Labels**: Automatically linked to input for screen readers
- **Accessibility States**: Disabled state is properly announced
- **Test IDs**: Support for automated testing
- **Keyboard Navigation**: Full keyboard support

```tsx
<InputField
  label="Email"
  value={email}
  onChangeText={setEmail}
  accessibilityLabel="Email address input"
  testID="email-input"
/>
```

## Best Practices

1. **Always provide a label** for clarity and accessibility
2. **Use appropriate input types** for better keyboard experience
3. **Provide helper text** for guidance
4. **Show errors immediately** when validation fails
5. **Clear errors** when user starts typing
6. **Use required prop** to mark mandatory fields
7. **Test on both iOS and Android** for consistent behavior

## Integration with 5 Core Screens

### 1. Onboarding Screen
- Email input with validation
- Password input with strength indicator
- Username input with availability check

### 2. Recommendations Screen
- Search input for filtering
- Preference inputs for customization

### 3. Drink Filtering Screen
- Multiple filter inputs
- Date range inputs
- Category selection inputs

### 4. Drink Tracking Screen
- Quantity input (number type)
- Notes input (multiline)
- Rating input

### 5. Analytics/Taste Distribution Screen
- Filter inputs for date ranges
- Search inputs for drink names

## Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { InputField } from '@/components/ui';

describe('InputField', () => {
  it('should display label and placeholder', () => {
    const { getByText, getByPlaceholderText } = render(
      <InputField
        label="Email"
        placeholder="Enter email"
        value=""
        onChangeText={() => {}}
      />
    );
    
    expect(getByText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
  });

  it('should display error message', () => {
    const { getByText } = render(
      <InputField
        label="Email"
        value=""
        onChangeText={() => {}}
        error="Email is required"
      />
    );
    
    expect(getByText('Email is required')).toBeTruthy();
  });

  it('should call onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <InputField
        placeholder="Enter text"
        value=""
        onChangeText={onChangeText}
      />
    );
    
    fireEvent.changeText(getByPlaceholderText('Enter text'), 'test');
    expect(onChangeText).toHaveBeenCalledWith('test');
  });
});
```

## Troubleshooting

### Input not responding to changes
- Ensure `value` and `onChangeText` are properly connected
- Check that `onChangeText` updates the state correctly

### Validation state not showing
- Verify that `error` or `success` props are being set
- Check that the state is being updated correctly

### Keyboard not appearing
- Ensure the input is not disabled
- Check that the component is not wrapped in a non-interactive parent

### Styling issues
- Verify design tokens are imported correctly
- Check that custom styles don't conflict with default styles
- Test on both iOS and Android

## Related Components

- **Button**: For form submission
- **Card**: For grouping form inputs
- **Typography**: For labels and helper text
- **ScreenLayout**: For screen structure

## References

- [React Native TextInput Documentation](https://reactnative.dev/docs/textinput)
- [Design Tokens](../../constants/designTokens.ts)
- [Component Stories](./InputField.stories.tsx)
