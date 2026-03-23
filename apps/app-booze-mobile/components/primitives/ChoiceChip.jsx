import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, radius } from '@/constants/parcus-theme';

/**
 * Toggle chip (taste tags, filters).
 */
export default function ChoiceChip({
  label,
  selected,
  onPress,
  disabled = false,
  testID,
}) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={label}
      testID={testID}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.default,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  disabled: {
    opacity: 0.45,
  },
  text: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '500',
  },
  textSelected: {
    color: colors.text.inverse,
  },
});
