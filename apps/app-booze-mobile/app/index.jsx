import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/constants/parcus-theme';
import {
  ONBOARDING_COMPLETED_KEY,
  loadPreferenceProfile,
  clearOnboardingDraft,
} from '@/utils/preferenceProfile';
const AUTHENTICATED_USER_KEY = 'authenticatedUser';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      try {
        const hasOnboarded =
          (await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY)) === 'true';
        const profile = await loadPreferenceProfile();
        const user = await AsyncStorage.getItem(AUTHENTICATED_USER_KEY);

        // First launch = in-store flow: go straight to question 1 (skip marketing welcome).
        if (!hasOnboarded || !profile) {
          await clearOnboardingDraft();
          router.replace('/(onboarding)/taste-category');
        } else if (!user || user === '') {
          router.replace('/(auth)/login');
        } else {
          router.replace('/(tabs)');
        }
      } catch {
        await clearOnboardingDraft();
        router.replace('/(onboarding)/taste-category');
      }
    }
    redirect();
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.brand.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
});
