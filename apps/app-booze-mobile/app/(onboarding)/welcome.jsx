import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '@/constants/parcus-theme';
import { AppButton } from '@/components/primitives';
import { clearOnboardingDraft } from '@/utils/preferenceProfile';
import { skipOnboardingThenGoToScanLogin } from '@/utils/onboardingScanSkip';

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    clearOnboardingDraft();
  }, []);

  const handleContinue = () => {
    router.push('/(onboarding)/taste-category');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.kicker}>In-store helper</Text>
        <Text style={styles.headline}>Quick questions while you shop</Text>
        <Text style={styles.body}>
          Three short answers — category, flavors you like, and budget — so we
          can narrow the shelf to bottles that fit before you log in.
        </Text>
        <Text style={styles.time}>Takes under 30 seconds.</Text>
      </View>
      <View style={styles.footer}>
        <AppButton onPress={handleContinue}>Help me choose</AppButton>
        <AppButton
          variant="ghost"
          onPress={() => skipOnboardingThenGoToScanLogin(router)}
        >
          Skip — scan or enter barcode
        </AppButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxxl - 4,
    paddingTop: 80,
    justifyContent: 'center',
  },
  kicker: {
    ...typography.label,
    color: colors.brand.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  headline: {
    ...typography.h1,
    fontSize: 32,
    lineHeight: 40,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  body: {
    ...typography.body1,
    color: colors.text.secondary,
    lineHeight: 26,
    marginBottom: spacing.lg,
  },
  time: {
    ...typography.body2,
    color: colors.text.tertiary,
    fontStyle: 'italic',
  },
  footer: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: 40,
    gap: spacing.md,
  },
});
