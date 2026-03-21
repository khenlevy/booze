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
      {/* Different variants */}
      <Badge variant="primary">New</Badge>
      <Badge variant="secondary">Featured</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="error">Critical</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Default</Badge>

      {/* Different sizes */}
      <Badge variant="primary" size="sm">Small</Badge>
      <Badge variant="primary" size="md">Medium</Badge>
      <Badge variant="primary" size="lg">Large</Badge>

      {/* Custom styling */}
      <Badge
        variant="success"
        size="md"
        style={{ marginHorizontal: 8 }}
      >
        Custom Style
      </Badge>
    </>
  );
}
```

**Badge Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `children`: React.ReactNode - Badge content/label
- `style`: ViewStyle - Custom container style overrides
- `textStyle`: TextStyle - Custom text style overrides
- `testID`: string - Test identifier for testing

**Badge Variants:**
- `primary` - Indigo background, white text (brand color)
- `secondary` - Pink background, white text
- `success` - Emerald background, white text (positive/success state)
- `error` - Red background, white text (error/critical state)
- `warning` - Amber background, white text (warning state)
- `info` - Blue background, white text (informational state)
- `neutral` - Light gray background, dark text (neutral/default state)

**Badge Sizes:**
- `sm` - Small (12px font, compact padding)
- `md` - Medium (14px font, standard padding) - default
- `lg` - Large (16px font, generous padding)

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
    <ScreenLayout>
      <ScreenLayout.Header>
        <Heading level={1}>Screen Title</Heading>
      </ScreenLayout.Header>
      <ScreenLayout.Content>
        <Body>Main content goes here</Body>
      </ScreenLayout.Content>
      <ScreenLayout.Footer>
        <Button variant="primary" fullWidth>
          Action
        </Button>
      </ScreenLayout.Footer>
    </ScreenLayout>
  );
}
```

**ScreenLayout Props:**
- `children`: React.ReactNode
- `backgroundColor`: string
- `safeAreaEdges`: ('top' | 'bottom' | 'left' | 'right')[]

## Design Tokens

All components use centralized design tokens for consistency:

```typescript
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
} from '@/constants/designTokens';
```

### Colors

- **Primary**: #6366F1 (Indigo)
- **Secondary**: #EC4899 (Pink)
- **Success**: #10B981 (Emerald)
- **Error**: #EF4444 (Red)
- **Warning**: #F59E0B (Amber)
- **Info**: #3B82F6 (Blue)
- **Neutral**: Grayscale from 50-900

### Typography

- **Font Family**: System (native)
- **Font Sizes**: xs (12px) → xl (32px)
- **Font Weights**: regular (400) → bold (700)
- **Line Heights**: tight (1.2) → relaxed (1.75)

### Spacing

- **Scale**: 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64px
- **Usage**: padding, margin, gaps

### Border Radius

- **sm**: 4px
- **md**: 8px
- **lg**: 12px
- **xl**: 16px
- **full**: 9999px (pill-shaped)

## Best Practices

1. **Use Design Tokens**: Always use tokens from `designTokens.ts` for consistency
2. **TypeScript**: Leverage TypeScript for type safety
3. **Accessibility**: Use semantic props like `testID`, `accessibilityLabel`
4. **Composition**: Combine components to build complex UIs
5. **Styling**: Use `style` prop for custom overrides, not inline styles
6. **Performance**: Components use React.forwardRef and StyleSheet for optimization

## Testing

All components support testing via `testID` prop:

```tsx
<Badge testID="badge-success" variant="success">
  Active
</Badge>
```

## Contributing

When adding new components:
1. Create component in `components/ui/ComponentName/`
2. Export from `components/ui/index.ts`
3. Add JSDoc documentation
4. Use design tokens
5. Support TypeScript strict mode
6. Add examples to this README
