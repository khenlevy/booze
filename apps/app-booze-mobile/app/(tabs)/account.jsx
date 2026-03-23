import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import { useAuth } from '@/contexts/AuthContext';
import { resetOnboardingProgress } from '@/utils/preferenceProfile';

export default function AccountScreen() {
  const router = useRouter();
  const { clearAuthenticatedUser, user } = useAuth();

  const handleLogout = async () => {
    try {
      await clearAuthenticatedUser();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.text}>Account</Text>
        {user?.provider ? (
          <Text style={styles.subtext}>Signed in via {user.provider}</Text>
        ) : null}
        {user?.phone ? (
          <Text style={styles.subtext}>{user.phone}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.quizCard}
          activeOpacity={0.85}
          onPress={async () => {
            await resetOnboardingProgress();
            router.replace('/(onboarding)/taste-category');
          }}
        >
          <Text style={styles.quizCardTitle}>In-store taste quiz</Text>
          <Text style={styles.quizCardSub}>
            Run the aisle questions again (category, flavors, budget).
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/(tabs)/drink-history')}
        >
          <Text style={styles.secondaryButtonText}>Drink history</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
}

const TAB_BAR_CLEARANCE =
  Platform.select({ ios: 85, android: 60 }) + 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollInner: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: TAB_BAR_CLEARANCE,
    alignItems: 'stretch',
  },
  text: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtext: {
    ...typography.body2,
    color: colors.text.secondary,
    marginTop: 4,
    textAlign: 'center',
    marginBottom: 24,
  },
  quizCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.brand.primary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  quizCardTitle: {
    ...typography.button,
    fontSize: 16,
    color: colors.brand.primary,
    marginBottom: 6,
  },
  quizCardSub: {
    ...typography.body2,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    paddingVertical: 16,
    marginHorizontal: 0,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.brand.primary,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.common.white,
    paddingVertical: 16,
    marginHorizontal: 0,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: colors.common.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    ...typography.button,
    color: colors.state.error,
    fontSize: 16,
  },
});
