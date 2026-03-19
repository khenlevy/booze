# UI Component Library

A comprehensive, reusable component library for the app-booze-mobile application. Built with React Native and TypeScript, this library provides a consistent design system across the entire application.

## Overview

The UI component library includes:

- **Typography Components**: Heading, Body, Caption, Label
- **Interactive Components**: Button, InputField
- **Layout Components**: Card, ScreenLayout, Divider
- **Display Components**: Badge, Avatar, IconWrapper

All components are built with:
- ✅ TypeScript strict mode compliance
- ✅ React Native StyleSheet for performance
- ✅ Accessibility support (ARIA labels, roles, states)
- ✅ JSDoc documentation
- ✅ Consistent design tokens
- ✅ Light/dark theme support ready

## Installation & Usage

### Basic Import

```tsx
import {
  Button,
  Card,
  Heading,
  Body,
  InputField,
  Badge,
  Avatar,
  ScreenLayout,
} from '@/components/ui';
```

### Component Examples

#### Typography

```tsx
import { Heading, Body, Caption, Label } from '@/components/ui';

export function TextExample() {
  return (
    <>
      <Heading level={1}>Main Title</Heading>
      <Heading level={2}>Subtitle</Heading>
      <Body>Regular body text with normal weight</Body>
      <Caption>Small secondary text</Caption>
      <Label>Form label text</Label>
    </>
  );
}
```

#### Button

```tsx
import { Button } from '@/components/ui';

export function ButtonExample() {
  return (
    <>
      {/* Primary button */}
      <Button
        variant="primary"
        size="md"
        onPress={() => console.log('Pressed')}
      >
        Click Me
      </Button>

      {/* Loading state */}
      <Button
        variant="primary"
        loading={isLoading}
        onPress={handleSubmit}
      >
        Submit
      </Button>

      {/* Disabled state */}
      <Button variant="primary" disabled>
        Disabled
      </Button>

      {/* Different variants */}
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="error">Error</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </>
  );
}
```

**Button Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `disabled`: boolean
- `loading`: boolean
- `onPress`: () => void
- `fullWidth`: boolean
- `iconLeft`: React.ReactNode
- `iconRight`: React.ReactNode

#### Card

```tsx
import { Card, Heading, Body, Button } from '@/components/ui';

export function CardExample() {
  return (
    <Card>
      <Card.Header>
        <Heading level={3}>Card Title</Heading>
      </Card.Header>
      <Card.Body>
        <Body>Card content goes here</Body>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" size="sm">
          Action
        </Button>
      </Card.Footer>
    </Card>
  );
}
```

**Card Props:**
- `padding`: number (default: spacing[4])
- `elevated`: boolean (default: true)
- `backgroundColor`: string

#### InputField

```tsx
import { InputField } from '@/components/ui';
import { useState } from 'react';

export function InputExample() {
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

**InputField Props:**
- `label`: string
- `placeholder`: string
- `value`: string
- `onChangeText`: (text: string) => void
- `inputType`: 'text' | 'email' | 'password' | 'number' | 'phone'
- `error`: string
- `success`: string
- `disabled`: boolean
- `required`: boolean
- `helperText`: string
- `maxLength`: number
- `numberOfLines`: number (for multiline)
- `iconLeft`: React.ReactNode
- `iconRight`: React.ReactNode

#### Badge

```tsx
import { Badge } from '@/components/ui';

export function BadgeExample() {
  return (
    <>
      <Badge variant="primary">New</Badge>
      <Badge variant="success" size="md">Active</Badge>
      <Badge variant="error" size="lg">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </>
  );
}
```

**Badge Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'
- `size`: 'sm' | 'md' | 'lg'

#### Avatar

```tsx
import { Avatar } from '@/components/ui';

export function AvatarExample() {
  return (
    <>
      {/* With image */}
      <Avatar
        size="md"
        source={{ uri: 'https://example.com/avatar.jpg' }}
      />

      {/* With initials fallback */}
      <Avatar
        size="lg"
        initials="JD"
        backgroundColor="#6366F1"
      />

      {/* Different sizes */}
      <Avatar size="xs" initials="A" />
      <Avatar size="sm" initials="B" />
      <Avatar size="md" initials="C" />
      <Avatar size="lg" initials="D" />
      <Avatar size="xl" initials="E" />

      {/* Square shape */}
      <Avatar
        size="md"
        shape="square"
        initials="JD"
      />
    </>
  );
}
```

**Avatar Props:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `shape`: 'circle' | 'square'
- `source`: ImageSourcePropType
- `initials`: string
- `backgroundColor`: string
- `textColor`: string

#### Divider

```tsx
import { Divider, Body } from '@/components/ui';

export function DividerExample() {
  return (
    <>
      <Body>Section 1</Body>
      <Divider orientation="horizontal" />
      <Body>Section 2</Body>
    </>
  );
}
```

**Divider Props:**
- `orientation`: 'horizontal' | 'vertical'
- `color`: string
- `thickness`: number
- `margin`: number

#### IconWrapper

```tsx
import { IconWrapper } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';

export function IconExample() {
  return (
    <>
      <IconWrapper size="sm" color="primary">
        <Ionicons name="home" size={20} />
      </IconWrapper>
      <IconWrapper size="md" color="success">
        <Ionicons name="checkmark" size={24} />
      </IconWrapper>
      <IconWrapper size="lg" color="error">
        <Ionicons name="close" size={32} />
      </IconWrapper>
    </>
  );
}
```

**IconWrapper Props:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `color`: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit'

#### ScreenLayout

```tsx
import { ScreenLayout, Heading, Body, Button } from '@/components/ui';

export function ScreenExample() {
  return (
    <ScreenLayout scrollable>
      <ScreenLayout.Header>
        <Heading level={1}>Screen Title</Heading>
      </ScreenLayout.Header>

      <ScreenLayout.Content>
        <Body>Main content goes here</Body>
      </ScreenLayout.Content>

      <ScreenLayout.Footer>
        <Button variant="primary" fullWidth>
          Continue
        </Button>
      </ScreenLayout.Footer>
    </ScreenLayout>
  );
}
```

**ScreenLayout Props:**
- `scrollable`: boolean (default: true)
- `padding`: number (default: spacing[4])
- `backgroundColor`: string
- `useSafeArea`: boolean (default: true)

## Design Tokens

All components use centralized design tokens from `constants/designTokens.ts`. This ensures consistency across the application.

### Colors

```tsx
import { colors } from '@/constants/designTokens';

// Primary colors
colors.primary.light    // '#6366F1'
colors.secondary.light  // '#EC4899'

// Semantic colors
colors.success.light    // '#10B981'
colors.error.light      // '#EF4444'
colors.warning.light    // '#F59E0B'
colors.info.light       // '#3B82F6'

// Neutral grayscale
colors.neutral[50]      // '#F9FAFB'
colors.neutral[900]     // '#111827'

// Text colors
colors.text.primary     // '#111827'
colors.text.secondary   // '#6B7280'
colors.text.inverse     // '#FFFFFF'
```

### Typography

```tsx
import { typography } from '@/constants/designTokens';

// Font sizes
typography.fontSize.xs      // 12
typography.fontSize.base    // 16
typography.fontSize['4xl']  // 36

// Font weights
typography.fontWeight.normal      // '400'
typography.fontWeight.semibold    // '600'
typography.fontWeight.bold        // '700'

// Line heights
typography.lineHeight.tight       // 1.2
typography.lineHeight.normal      // 1.5
typography.lineHeight.loose       // 2
```

### Spacing

```tsx
import { spacing } from '@/constants/designTokens';

// 8px base unit
spacing[1]   // 4px
spacing[2]   // 8px
spacing[4]   // 16px
spacing[8]   // 32px
spacing[16]  // 64px
```

### Shadows

```tsx
import { shadows } from '@/constants/designTokens';

// Elevation-based shadows
shadows.sm    // Small shadow
shadows.base  // Base shadow
shadows.md    // Medium shadow
shadows.lg    // Large shadow
shadows.xl    // Extra large shadow
```

## Accessibility

All components include accessibility features:

- **Semantic roles**: Buttons, headers, etc. have proper roles
- **ARIA states**: Disabled, busy, and other states are announced
- **Labels**: All interactive elements have accessible labels
- **Keyboard support**: Components respond to keyboard navigation
- **Color contrast**: All text meets WCAG AA standards

### Example with Accessibility

```tsx
<Button
  accessibilityLabel="Submit form"
  accessibilityRole="button"
  onPress={handleSubmit}
>
  Submit
</Button>
```

## TypeScript Support

All components are fully typed with TypeScript. Props interfaces are exported for use in your components:

```tsx
import { Button, type ButtonProps } from '@/components/ui';

interface MyButtonProps extends ButtonProps {
  customProp?: string;
}

export function MyButton(props: MyButtonProps) {
  return <Button {...props} />;
}
```

## Performance

- **React Native StyleSheet**: All styles use `StyleSheet.create()` for optimal performance
- **Memoization**: Components use `React.forwardRef` for proper ref handling
- **No unnecessary re-renders**: Props are carefully designed to minimize re-renders

## Contributing

When adding new components:

1. Create a new directory under `components/ui/ComponentName/`
2. Create `ComponentName.tsx` with the component implementation
3. Create `index.ts` with exports
4. Add JSDoc comments to all components and props
5. Use design tokens from `constants/designTokens.ts`
6. Export from main `components/ui/index.ts`
7. Add usage examples to this README

## Testing

Components can be tested using React Native Testing Library:

```tsx
import { render, screen } from '@testing-library/react-native';
import { Button } from '@/components/ui';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeTruthy();
});
```

## Theme Support

The design system is built to support light and dark themes. Theme switching can be implemented by:

1. Creating theme variants in `constants/designTokens.ts`
2. Using React Context to provide theme values
3. Updating component styles based on theme context

## Related Documentation

- [Design Tokens](../constants/designTokens.ts)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

This component library is part of the app-booze-mobile application.
