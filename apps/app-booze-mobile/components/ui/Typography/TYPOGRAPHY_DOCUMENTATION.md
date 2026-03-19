# Typography Components Documentation

## Overview

The Typography component library provides a comprehensive set of text components for consistent typography throughout the app-booze-mobile application. All components are built with TypeScript, React Native, and follow the design system tokens.

## Components

### Heading

Renders semantic heading elements with appropriate sizing based on heading level (1-6).

#### Props

```typescript
interface HeadingProps extends TypographyProps {
  /** Heading level (1-6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}
```

#### Heading Levels

| Level | Font Size | Font Weight | Line Height | Use Case |
|-------|-----------|-------------|-------------|----------|
| H1 | 36px (4xl) | 800 (extrabold) | 1.2 (tight) | Page title |
| H2 | 30px (3xl) | 700 (bold) | 1.2 (tight) | Section heading |
| H3 | 24px (2xl) | 700 (bold) | 1.2 (tight) | Subsection heading |
| H4 | 20px (xl) | 600 (semibold) | 1.5 (normal) | Minor heading |
| H5 | 18px (lg) | 600 (semibold) | 1.5 (normal) | Small heading |
| H6 | 16px (base) | 600 (semibold) | 1.5 (normal) | Smallest heading |

#### Usage

```tsx
import { Heading } from '@/components/ui';

export function MyComponent() {
  return (
    <>
      <Heading level={1}>Main Title</Heading>
      <Heading level={2}>Subtitle</Heading>
      <Heading level={3}>Section Title</Heading>
    </>
  );
}
```

### Body

Renders regular body text with standard sizing for main content.

#### Props

```typescript
interface TypographyProps {
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
  numberOfLines?: number;
  allowFontScaling?: boolean;
  accessibilityLabel?: string;
  testID?: string;
}
```

#### Styling

- Font Size: 16px (base)
- Font Weight: 400 (normal)
- Line Height: 1.5 (normal)
- Letter Spacing: 0 (normal)

#### Usage

```tsx
import { Body } from '@/components/ui';

export function MyComponent() {
  return (
    <Body>
      This is regular body text used for main content and descriptions.
    </Body>
  );
}
```

### Caption

Renders small caption text for secondary information and metadata.

#### Props

Same as `TypographyProps`

#### Styling

- Font Size: 14px (sm)
- Font Weight: 400 (normal)
- Line Height: 1.5 (normal)
- Letter Spacing: 0 (normal)
- Color: Secondary text color by default

#### Usage

```tsx
import { Caption } from '@/components/ui';

export function MyComponent() {
  return (
    <Caption>
      This is secondary information or helper text.
    </Caption>
  );
}
```

### Label

Renders form labels with appropriate styling for input fields.

#### Props

Same as `TypographyProps`

#### Styling

- Font Size: 14px (sm)
- Font Weight: 500 (medium)
- Line Height: 1.5 (normal)
- Letter Spacing: 0.5 (wide)

#### Usage

```tsx
import { Label, InputField } from '@/components/ui';

export function MyComponent() {
  return (
    <>
      <Label>Email Address</Label>
      <InputField placeholder="Enter your email" />
    </>
  );
}
```

## Common Props

All typography components accept the following props:

### children
- **Type**: `React.ReactNode`
- **Required**: Yes
- **Description**: The text content to render

### style
- **Type**: `TextStyle`
- **Required**: No
- **Description**: Custom style overrides applied after component styles

### color
- **Type**: `string`
- **Required**: No
- **Description**: Text color (overrides default color)

### numberOfLines
- **Type**: `number`
- **Required**: No
- **Description**: Truncates text after specified number of lines

### allowFontScaling
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Allow text to scale with system font size settings

### accessibilityLabel
- **Type**: `string`
- **Required**: No
- **Description**: Label for screen readers and accessibility tools

### testID
- **Type**: `string`
- **Required**: No
- **Description**: Test identifier for automated testing

## Design Tokens

All typography components use design tokens from `constants/designTokens.ts`:

### Font Sizes

```typescript
typography.fontSize = {
  xs: 12,      // Extra small
  sm: 14,      // Small
  base: 16,    // Base/Normal
  lg: 18,      // Large
  xl: 20,      // Extra large
  '2xl': 24,   // 2x Large
  '3xl': 30,   // 3x Large
  '4xl': 36,   // 4x Large
}
```

### Font Weights

```typescript
typography.fontWeight = {
  light: '300',      // Light
  normal: '400',     // Normal
  medium: '500',     // Medium
  semibold: '600',   // Semibold
  bold: '700',       // Bold
  extrabold: '800',  // Extrabold
}
```

### Line Heights

```typescript
typography.lineHeight = {
  tight: 1.2,    // Tight spacing
  normal: 1.5,   // Normal spacing
  relaxed: 1.75, // Relaxed spacing
  loose: 2,      // Loose spacing
}
```

### Letter Spacing

```typescript
typography.letterSpacing = {
  tight: -0.5,  // Tight spacing
  normal: 0,    // Normal spacing
  wide: 0.5,    // Wide spacing
}
```

## Color Variants

Typography components support all colors from the design system:

```tsx
import { Heading, Body, colors } from '@/components/ui';

export function ColorExample() {
  return (
    <>
      <Heading color={colors.text.primary}>Primary Text</Heading>
      <Body color={colors.text.secondary}>Secondary Text</Body>
      <Body color={colors.success.light}>Success Message</Body>
      <Body color={colors.error.light}>Error Message</Body>
      <Body color={colors.warning.light}>Warning Message</Body>
      <Body color={colors.info.light}>Info Message</Body>
    </>
  );
}
```

## Accessibility

All typography components include accessibility support:

- **Semantic Roles**: Heading components use `accessibilityRole="header"`
- **Labels**: Support `accessibilityLabel` prop for screen readers
- **Test IDs**: Support `testID` prop for automated testing
- **Font Scaling**: Respect system font size settings when enabled

### Accessible Usage

```tsx
import { Heading, Body, Label } from '@/components/ui';

export function AccessibleComponent() {
  return (
    <>
      <Heading
        level={1}
        accessibilityLabel="Main page heading"
        testID="page-title"
      >
        Welcome
      </Heading>
      
      <Body accessibilityLabel="Page description">
        This is the main content of the page.
      </Body>
      
      <Label accessibilityLabel="Email input label">
        Email Address
      </Label>
    </>
  );
}
```

## Real-world Examples

### Form with Labels and Captions

```tsx
import { Heading, Label, Caption, InputField, Button } from '@/components/ui';

export function LoginForm() {
  return (
    <>
      <Heading level={2}>Sign In</Heading>
      
      <Label>Email Address</Label>
      <InputField placeholder="your@email.com" />
      <Caption>We'll never share your email.</Caption>
      
      <Label>Password</Label>
      <InputField placeholder="••••••••" secureTextEntry />
      <Caption>Must be at least 8 characters.</Caption>
      
      <Button variant="primary">Sign In</Button>
    </>
  );
}
```

### Article/Content Display

```tsx
import { Heading, Body, Caption } from '@/components/ui';

export function ArticleCard() {
  return (
    <>
      <Heading level={3}>Article Title</Heading>
      <Caption>Published on January 1, 2024</Caption>
      
      <Body>
        This is the article content. It uses body text for optimal readability
        and can span multiple lines without any issues.
      </Body>
    </>
  );
}
```

### Status Messages

```tsx
import { Body, colors } from '@/components/ui';

export function StatusMessage() {
  return (
    <>
      <Body color={colors.success.light}>✓ Changes saved successfully</Body>
      <Body color={colors.error.light}>✗ An error occurred</Body>
      <Body color={colors.warning.light}>⚠ Please review your input</Body>
    </>
  );
}
```

## Testing

All typography components support testing through `testID` prop:

```tsx
import { render } from '@testing-library/react-native';
import { Heading, Body } from '@/components/ui';

describe('Typography Components', () => {
  it('renders heading with test ID', () => {
    const { getByTestId } = render(
      <Heading testID="main-heading">Test Heading</Heading>
    );
    
    expect(getByTestId('main-heading')).toBeTruthy();
  });
  
  it('renders body text with accessibility label', () => {
    const { getByLabelText } = render(
      <Body accessibilityLabel="Body text">Content</Body>
    );
    
    expect(getByLabelText('Body text')).toBeTruthy();
  });
});
```

## Performance Considerations

- Components use `React.forwardRef` for ref forwarding
- Styles are created with `StyleSheet.create()` for performance optimization
- Font scaling is disabled by default to prevent layout shifts
- Components are memoized for efficient re-renders

## Browser/Platform Support

- ✅ iOS (React Native)
- ✅ Android (React Native)
- ✅ Web (React Native Web)

## Related Components

- [Button Component](../Button/README.md)
- [Card Component](../Card/README.md)
- [InputField Component](../InputField/README.md)
- [Design Tokens](../../constants/designTokens.ts)

## Changelog

### Version 1.0.0
- Initial release with Heading, Body, Caption, and Label components
- Full TypeScript support
- Accessibility features
- Design token integration
- Comprehensive documentation and stories
