import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import SocialButton from '@/components/parcus/SocialButton';
import PrimaryButton from '@/components/parcus/PrimaryButton';
import ParcusPiggy from '@/assets/svg/ParcusPiggy';
import { DEV_USER_ID, useAuth } from '@/contexts/AuthContext';
import { resetOnboardingProgress } from '@/utils/preferenceProfile';
import { AFTER_LOGIN_SCAN_PARAM } from '@/utils/onboardingScanSkip';

export default function LoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setAuthenticatedUser } = useAuth();
  const [phone, setPhone] = useState('');

  const afterLogin = useMemo(() => {
    const v = params.afterLogin;
    return typeof v === 'string' ? v : '';
  }, [params.afterLogin]);

  const postAuthPath = useMemo(
    () =>
      afterLogin === AFTER_LOGIN_SCAN_PARAM
        ? '/(tabs)/scan-log'
        : '/(tabs)',
    [afterLogin],
  );

  const handleGoogleLogin = async () => {
    await setAuthenticatedUser({ provider: 'google', userId: DEV_USER_ID });
    router.replace(postAuthPath);
  };

  const handleAppleLogin = async () => {
    await setAuthenticatedUser({ provider: 'apple', userId: DEV_USER_ID });
    router.replace(postAuthPath);
  };

  const handlePhoneLogin = async () => {
    const formattedPhone = `+${phone.replace(/\D/g, '')}`;
    if (formattedPhone.length > 1) {
      router.push({
        pathname: '/(auth)/verify-code',
        params: {
          phone: formattedPhone,
          ...(afterLogin === AFTER_LOGIN_SCAN_PARAM
            ? { afterLogin: AFTER_LOGIN_SCAN_PARAM }
            : {}),
        },
      });
    }
  };

  const goToTasteQuiz = async () => {
    await resetOnboardingProgress();
    router.replace('/(onboarding)/taste-category');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <ParcusPiggy width={120} height={120} />
        </View>

        <Pressable
          style={styles.quizBanner}
          onPress={goToTasteQuiz}
          accessibilityRole="button"
          accessibilityLabel="Run in-store taste quiz again"
        >
          <Text style={styles.quizBannerTitle}>In-store taste quiz</Text>
          <Text style={styles.quizBannerSub}>
            Tap here if you want the aisle questions again (category, flavors,
            budget).
          </Text>
        </Pressable>

        <View style={styles.socialButtons}>
          <SocialButton
            label="Continue with Apple"
            onPress={handleAppleLogin}
            variant="apple"
          />
          <SocialButton
            label="Continue with Google"
            onPress={handleGoogleLogin}
            variant="google"
          />
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.phoneSection}>
          <Text style={styles.phoneLabel}>MOBILE</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.phoneInput}
            placeholder="Enter Your Mobile"
            placeholderTextColor={colors.text.secondary}
            keyboardType="phone-pad"
          />
          <PrimaryButton label="LOG IN" onPress={handlePhoneLogin} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  quizBanner: {
    backgroundColor: colors.background.secondary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.brand.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  quizBannerTitle: {
    ...typography.button,
    fontSize: 16,
    color: colors.brand.primary,
    marginBottom: 6,
  },
  quizBannerSub: {
    ...typography.body2,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  socialButtons: {
    marginBottom: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.text.secondary,
    opacity: 0.2,
  },
  orText: {
    ...typography.body1,
    marginHorizontal: 16,
    color: colors.text.primary,
  },
  phoneSection: {
    gap: 16,
  },
  phoneLabel: {
    ...typography.body2,
    color: colors.text.primary,
    fontWeight: '600',
  },
  phoneInput: {
    ...typography.body1,
    borderWidth: 1,
    borderColor: colors.text.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
});
