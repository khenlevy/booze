import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '@/constants/parcus-theme';

/**
 * Shared layout: back, step counter, title area, scrollable body via children.
 * @param {{ label: string, onPress: () => void }} [escapeHatch] — e.g. skip to scan / sign in
 */
export default function OnboardingChrome({
  step,
  totalSteps,
  kicker,
  title,
  subtitle,
  children,
  footer,
  showBack = true,
  escapeHatch,
}) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backHit}
            accessibilityLabel="Back"
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backHit} />
        )}
        <Text style={styles.step}>
          {step}/{totalSteps}
        </Text>
      </View>

      <View style={styles.titleBlock}>
        {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {escapeHatch ? (
          <TouchableOpacity
            onPress={escapeHatch.onPress}
            style={styles.escapeHatch}
            accessibilityRole="button"
            accessibilityLabel={escapeHatch.label}
          >
            <Text style={styles.escapeHatchText}>{escapeHatch.label}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.body}>{children}</View>

      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  backHit: {
    minWidth: 44,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  step: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  titleBlock: {
    paddingHorizontal: spacing.xxl,
    marginBottom: spacing.xl,
  },
  kicker: {
    ...typography.label,
    color: colors.brand.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    lineHeight: 36,
    color: colors.text.primary,
    marginBottom: spacing.sm + 2,
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  escapeHatch: {
    marginTop: spacing.lg,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  escapeHatchText: {
    ...typography.body2,
    color: colors.brand.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
  },
  footer: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
});
