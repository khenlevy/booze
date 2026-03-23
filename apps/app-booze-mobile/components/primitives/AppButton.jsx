import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import {
  colors,
  typography,
  spacing,
  radius,
  shadows,
} from '@/constants/parcus-theme';

/**
 * App-wide CTA. Uses parcus-theme tokens (same as most screens).
 * For Storybook / advanced variants use `components/ui/Button`.
 */
export default function AppButton({
  children,
  onPress,
  variant = 'primary',
  fullWidth = true,
  loading = false,
  disabled = false,
  size = 'lg',
  accessibilityLabel,
  testID,
}) {
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const isSecondary = variant === 'secondary';
  const busy = disabled || loading;
  const spinnerColor =
    variant === 'primary' ? colors.text.inverse : colors.brand.primary;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        size === 'lg' && styles.sizeLg,
        size === 'md' && styles.sizeMd,
        isOutline && styles.outline,
        isGhost && styles.ghost,
        isSecondary && styles.secondary,
        !isOutline && !isGhost && !isSecondary && styles.primary,
        fullWidth && styles.fullWidth,
        busy && styles.disabled,
      ]}
      onPress={onPress}
      disabled={busy}
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: busy }}
      testID={testID}
    >
      {loading ? (
        <View style={styles.row}>
          <ActivityIndicator color={spinnerColor} />
        </View>
      ) : (
        <Text
          style={[
            styles.label,
            size === 'lg' && styles.labelLg,
            variant === 'primary' && styles.labelOnPrimary,
            variant === 'outline' && styles.labelOutline,
            variant === 'ghost' && styles.labelGhost,
            variant === 'secondary' && styles.labelSecondary,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    ...shadows.button,
  },
  fullWidth: {
    width: '100%',
  },
  sizeLg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    minHeight: 52,
  },
  sizeMd: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 44,
  },
  primary: {
    backgroundColor: colors.brand.primary,
  },
  secondary: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.default,
    shadowOpacity: 0,
    elevation: 0,
  },
  outline: {
    backgroundColor: colors.common.transparent,
    borderWidth: 2,
    borderColor: colors.brand.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  ghost: {
    backgroundColor: colors.common.transparent,
    shadowOpacity: 0,
    elevation: 0,
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    ...typography.button,
    textAlign: 'center',
  },
  labelLg: {
    fontSize: 17,
  },
  labelOnPrimary: {
    color: colors.text.inverse,
  },
  labelOutline: {
    color: colors.brand.primary,
  },
  labelGhost: {
    color: colors.text.secondary,
    fontWeight: '600',
  },
  labelSecondary: {
    color: colors.brand.primary,
  },
  row: {
    minHeight: 24,
    justifyContent: 'center',
  },
});
