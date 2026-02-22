import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography } from '@/constants/parcus-theme';
import SocialButton from '@/components/parcus/SocialButton';
import PrimaryButton from '@/components/parcus/PrimaryButton';
import ParcusPiggy from '@/assets/svg/ParcusPiggy';

const AUTHENTICATED_USER_KEY = 'authenticatedUser';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const handleGoogleLogin = async () => {
    await AsyncStorage.setItem(
      AUTHENTICATED_USER_KEY,
      JSON.stringify({ provider: 'google' }),
    );
    router.replace('/(tabs)');
  };

  const handleAppleLogin = async () => {
    await AsyncStorage.setItem(
      AUTHENTICATED_USER_KEY,
      JSON.stringify({ provider: 'apple' }),
    );
    router.replace('/(tabs)');
  };

  const handlePhoneLogin = async () => {
    const formattedPhone = `+${phone.replace(/\D/g, '')}`;
    if (formattedPhone.length > 1) {
      router.push({
        pathname: '/(auth)/verify-code',
        params: { phone: formattedPhone },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <ParcusPiggy width={120} height={120} />
        </View>

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
      </View>
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
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
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
