import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import { useAuth } from '@/contexts/AuthContext';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Account</Text>
        {user?.provider ? (
          <Text style={styles.subtext}>Signed in via {user.provider}</Text>
        ) : null}
        {user?.phone ? (
          <Text style={styles.subtext}>{user.phone}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/(tabs)/drink-history')}
      >
        <Text style={styles.secondaryButtonText}>Drink history</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.select({ ios: 85, android: 60 }),
  },
  text: {
    ...typography.h1,
    color: colors.text.primary,
  },
  subtext: {
    ...typography.body2,
    color: colors.text.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    paddingVertical: 16,
    marginHorizontal: 24,
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
    marginHorizontal: 24,
    marginBottom: Platform.select({ ios: 100, android: 75 }),
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
