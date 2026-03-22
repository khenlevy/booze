# Component Usage Guide

## Quick Start

The app-booze-mobile design system provides a comprehensive set of reusable UI components. To get started:

```tsx
import {
  Button,
  Card,
  Heading,
  Body,
  Caption,
  Label,
  InputField,
  IconWrapper,
  Divider,
  Badge,
  Avatar,
  ScreenLayout,
} from '@/components/ui';
```

## Typography Components

### Heading

Semantic heading component with 6 levels (H1-H6).

**Props:**
- `level: 1 | 2 | 3 | 4 | 5 | 6` - Heading level (default: 1)
- `children: React.ReactNode` - Heading text content
- `style?: TextStyle` - Custom style overrides

**Usage:**
```tsx
<Heading level={1}>Main Title</Heading>
<Heading level={2}>Section Title</Heading>
<Heading level={3}>Subsection Title</Heading>
```

### Body

Body text component for regular content with size variants.

**Props:**
- `size?: 'sm' | 'md' | 'lg'` - Text size (default: 'md')
- `children: React.ReactNode` - Text content
- `style?: TextStyle` - Custom style overrides

**Usage:**
```tsx
<Body>Default body text</Body>
<Body size="lg">Large body text for emphasis</Body>
<Body size="sm">Small body text for secondary info</Body>
```

### Caption

Caption text component for helper text and metadata.

**Props:**
- `children: React.ReactNode` - Caption text
- `style?: TextStyle` - Custom style overrides

**Usage:**
```tsx
<Caption>Helper text below form fields</Caption>
<Caption>Last updated: Today</Caption>
```

### Label

Form label component with optional required indicator.

**Props:**
- `required?: boolean` - Show required indicator (default: false)
- `children: React.ReactNode` - Label text
- `style?: TextStyle` - Custom style overrides

**Usage:**
```tsx
<Label>Email Address</Label>
<Label required>Password</Label>
```

## Interactive Components

### Button

Versatile button component with multiple variants, sizes, and states.

**Props:**
- `variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'outline' | 'ghost'` (default: 'primary')
- `size?: 'sm' | 'md' | 'lg' | 'xl'` (default: 'md')
- `disabled?: boolean` - Disable button (default: false)
- `loading?: boolean` - Show loading state (default: false)
- `fullWidth?: boolean` - Full width button (default: false)
- `onPress?: () => void | Promise<void>` - Press callback
- `children: React.ReactNode` - Button text
- `iconLeft?: React.ReactNode` - Icon before text
- `iconRight?: React.ReactNode` - Icon after text

**Usage:**
```tsx
<Button variant="primary" onPress={() => {}}>Click me</Button>
<Button variant="secondary" size="lg">Large button</Button>
<Button disabled>Disabled button</Button>
<Button loading>Loading...</Button>
<Button fullWidth>Full width button</Button>
```

### InputField

Text input component with validation states and keyboard types.

**Props:**
- `placeholder?: string` - Placeholder text
- `value?: string` - Input value
- `onChangeText?: (text: string) => void` - Text change callback
- `state?: 'default' | 'error' | 'success'` - Validation state (default: 'default')
- `keyboardType?: KeyboardTypeOptions` - Keyboard type
- `secureTextEntry?: boolean` - Hide text (for passwords)
- `multiline?: boolean` - Allow multiple lines
- `numberOfLines?: number` - Number of lines for multiline
- `maxLength?: number` - Maximum character length
- `editable?: boolean` - Enable/disable input
- `required?: boolean` - Mark as required

**Usage:**
```tsx
<InputField placeholder="Enter text" />
<InputField 
  placeholder="name@example.com"
  keyboardType="email-address"
/>
<InputField 
  placeholder="Password"
  secureTextEntry
/>
<InputField 
  placeholder="Phone"
  keyboardType="phone-pad"
/>
<InputField 
  placeholder="Message"
  multiline
  numberOfLines={4}
/>
<InputField 
  state="error"
  placeholder="Invalid input"
/>
```

## Layout Components

### Card

Container component with multiple variants for grouping content.

**Props:**
- `variant?: 'elevated' | 'outlined' | 'filled'` (default: 'elevated')
- `children: React.ReactNode` - Card content
- `style?: ViewStyle` - Custom style overrides

**Usage:**
```tsx
<Card variant="elevated">
  <Heading level={4}>Card Title</Heading>
  <Body>Card content goes here</Body>
</Card>

<Card variant="outlined">
  <View style={{ padding: spacing[3] }}>
    <Heading level={4}>Outlined Card</Heading>
  </View>
</Card>

<Card variant="filled">
  <Body>Filled card background</Body>
</Card>
```

### Divider

Separator component for dividing content sections.

**Props:**
- `orientation?: 'horizontal' | 'vertical'` (default: 'horizontal')
- `spacing?: 'sm' | 'md' | 'lg'` - Spacing around divider (default: 'md')
- `style?: ViewStyle` - Custom style overrides

**Usage:**
```tsx
<Body>Content above</Body>
<Divider orientation="horizontal" />
<Body>Content below</Body>

<View style={{ flexDirection: 'row' }}>
  <Body>Left</Body>
  <Divider orientation="vertical" style={{ height: 60 }} />
  <Body>Right</Body>
</View>
```

### ScreenLayout

Wrapper component for screen structure with header, content, and footer.

**Props:**
- `children: React.ReactNode` - Screen content
- `style?: ViewStyle` - Custom style overrides

**Usage:**
```tsx
<ScreenLayout>
  <View style={{ padding: spacing[4] }}>
    <Heading level={2}>Screen Title</Heading>
    <Body>Screen content</Body>
  </View>
</ScreenLayout>

<ScreenLayout>
  <View style={{ padding: spacing[4], backgroundColor: colors.background.secondary }}>
    <Heading level={3}>Header</Heading>
  </View>
  <ScrollView style={{ padding: spacing[4] }}>
    {/* Content */}
  </ScrollView>
  <View style={{ padding: spacing[4] }}>
    <Button fullWidth>Action</Button>
  </View>
</ScreenLayout>
```

## Display Components

### Badge

Small label component for status, tags, and categories.

**Props:**
- `variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning'` (default: 'primary')
- `size?: 'sm' | 'md' | 'lg'` (default: 'md')
- `children: React.ReactNode` - Badge text
- `style?: ViewStyle` - Custom style overrides

**Usage:**
```tsx
<Badge variant="primary">New</Badge>
<Badge variant="success">Completed</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Pending</Badge>
<Badge size="sm">Small</Badge>
<Badge size="lg">Large</Badge>
```

### Avatar

User avatar component with initials or image support.

**Props:**
- `initials?: string` - User initials (2 characters)
- `source?: ImageSourcePropType` - Image source
- `size?: 'sm' | 'md' | 'lg' | 'xl'` (default: 'md')
- `style?: ViewStyle` - Custom style overrides

**Usage:**
```tsx
<Avatar initials="JD" size="md" />
<Avatar 
  source={{ uri: 'https://example.com/avatar.jpg' }} 
  size="lg" 
/>

{/* Avatar Group */}
<View style={{ flexDirection: 'row', gap: spacing[2] }}>
  <Avatar initials="JD" />
  <Avatar initials="AB" />
  <Avatar initials="CD" />
</View>
```

### IconWrapper

Icon component for displaying vector icons.

**Props:**
- `name: string` - Icon name
- `size?: 'sm' | 'md' | 'lg' | 'xl'` (default: 'md')
- `color?: 'primary' | 'success' | 'error' | 'warning'` (default: 'primary')
- `style?: ViewStyle` - Custom style overrides

**Usage:**
```tsx
<IconWrapper name="home" size="md" />
<IconWrapper name="check-circle" color="success" size="lg" />
<IconWrapper name="alert-circle" color="error" />
<IconWrapper name="settings" color="primary" />

{/* Icon with Text */}
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <IconWrapper name="check-circle" color="success" />
  <Body style={{ marginLeft: spacing[2] }}>Success</Body>
</View>
```

## Design Tokens

### Colors

```tsx
import { colors } from '@/constants';

colors.primary.primary      // Primary brand color
colors.secondary.primary    // Secondary color
colors.success.primary      // Success state
colors.error.primary        // Error state
colors.warning.primary      // Warning state
colors.background.primary   // Primary background
colors.background.secondary // Secondary background
colors.text.primary         // Primary text
colors.text.secondary       // Secondary text
colors.border.light         // Light border
colors.border.dark          // Dark border
```

### Spacing

```tsx
import { spacing } from '@/constants';

spacing[1]  // 4px
spacing[2]  // 8px
spacing[3]  // 12px
spacing[4]  // 16px
spacing[5]  // 20px
spacing[6]  // 24px
spacing[8]  // 32px
spacing[10] // 40px
```

### Typography

```tsx
import { typography } from '@/constants';

typography.h1.fontSize      // Heading 1 size
typography.h1.fontWeight    // Heading 1 weight
typography.body.fontSize    // Body text size
typography.body.lineHeight  // Body line height
```

### Border Radius

```tsx
import { borderRadius } from '@/constants';

borderRadius.sm  // 4px
borderRadius.md  // 8px
borderRadius.lg  // 12px
borderRadius.xl  // 16px
```

### Shadows

```tsx
import { shadows } from '@/constants';

shadows.sm  // Small shadow
shadows.md  // Medium shadow
shadows.lg  // Large shadow
```

## Best Practices

### Consistency
- Use design tokens for all styling values
- Maintain consistent spacing using the spacing scale
- Use semantic color values for different states

### Accessibility
- Always provide `accessibilityLabel` for interactive components
- Use proper heading hierarchy (H1 → H2 → H3, etc.)
- Ensure sufficient color contrast for text
- Use `required` prop on form labels for required fields

### Performance
- Use `React.memo` for frequently rendered components
- Avoid inline style objects; use `StyleSheet.create()`
- Use `FlatList` or `SectionList` for long lists instead of `ScrollView`

### Responsive Design
- Use spacing tokens for consistent margins and padding
- Test on multiple screen sizes
- Use `flex` for responsive layouts
- Consider safe area insets for notched devices

### Error Handling
- Always validate form inputs before submission
- Show error states on invalid inputs
- Provide helpful error messages
- Use error badges for status indicators

## Storybook

View interactive component documentation:

```bash
# Start Storybook
yarn storybook:start

# Open in browser
http://localhost:6006
```

## Component Stories

All components have comprehensive Storybook stories demonstrating:
- All variants and sizes
- Different states (default, disabled, loading, error, success)
- Common usage patterns
- Interactive examples

## Common Patterns

### Form Pattern
```tsx
<ScreenLayout>
  <View style={{ padding: spacing[4] }}>
    <Heading level={2}>Contact Form</Heading>
  </View>
  <ScrollView style={{ padding: spacing[4] }}>
    <View style={{ marginBottom: spacing[4] }}>
      <Label required>Full Name</Label>
      <InputField placeholder="Enter your name" />
    </View>
    <View style={{ marginBottom: spacing[4] }}>
      <Label required>Email</Label>
      <InputField 
        placeholder="name@example.com"
        keyboardType="email-address"
      />
    </View>
  </ScrollView>
  <View style={{ padding: spacing[4] }}>
    <Button fullWidth variant="primary">Submit</Button>
  </View>
</ScreenLayout>
```

### List Pattern
```tsx
<ScreenLayout>
  <View style={{ padding: spacing[4] }}>
    <Heading level={2}>Items</Heading>
  </View>
  <ScrollView style={{ padding: spacing[4] }}>
    {items.map((item, index) => (
      <View key={item.id}>
        <Card variant="outlined">
          <View style={{ padding: spacing[3] }}>
            <Heading level={4}>{item.title}</Heading>
            <Body style={{ marginTop: spacing[2] }}>{item.description}</Body>
          </View>
        </Card>
        {index < items.length - 1 && <Divider spacing="md" />}
      </View>
    ))}
  </ScrollView>
</ScreenLayout>
```

### Status Indicator Pattern
```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing[2] }}>
  <IconWrapper name="check-circle" color="success" />
  <Body>Operation completed successfully</Body>
</View>
```

### User List Pattern
```tsx
{users.map((user, index) => (
  <View key={user.id}>
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing[3] }}>
      <Avatar initials={user.initials} size="md" />
      <View style={{ marginLeft: spacing[3], flex: 1 }}>
        <Body>{user.name}</Body>
        <Caption>{user.email}</Caption>
      </View>
      <Badge variant="success">Active</Badge>
    </View>
    {index < users.length - 1 && <Divider spacing="sm" />}
  </View>
))}
```

## Troubleshooting

### Components not rendering
- Ensure all required props are provided
- Check that design tokens are imported correctly
- Verify component is exported from `@/components/ui`

### Styling issues
- Use design tokens instead of hardcoded values
- Check that StyleSheet is used for performance
- Verify spacing and color values are correct

### TypeScript errors
- Import component types: `import { ButtonProps } from '@/components/ui'`
- Use proper type annotations for custom styles
- Check that all required props are provided

## Support

For issues or questions about components:
1. Check Storybook stories for usage examples
2. Review component source code for available props
3. Check design tokens for available values
4. Refer to this documentation
