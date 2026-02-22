import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/constants/parcus-theme';

const ONBOARDING_COMPLETED_KEY = 'onboardingCompleted';
const AUTHENTICATED_USER_KEY = 'authenticatedUser';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      try {
        const hasOnboarded = await AsyncStorage.getItem(
          ONBOARDING_COMPLETED_KEY,
        );
        const user = await AsyncStorage.getItem(AUTHENTICATED_USER_KEY);

        if (!hasOnboarded) {
          router.replace('/(onboarding)/entrance');
        } else if (!user || user === '') {
          router.replace('/(auth)/login');
        } else {
          router.replace('/(tabs)');
        }
      } catch {
        router.replace('/(onboarding)/entrance');
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
