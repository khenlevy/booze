import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  colors,
  typography,
  spacing,
  radius,
  shadows,
} from '@/constants/parcus-theme';

/**
 * Large tappable row (onboarding category, budget tier, etc.).
 */
export default function SelectableCard({
  title,
  subtitle,
  onPress,
  style,
  testID,
}) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={title}
      testID={testID}
    >
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg + 2,
    paddingHorizontal: spacing.lg + 2,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.card,
  },
  title: {
    ...typography.h3,
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body2,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
