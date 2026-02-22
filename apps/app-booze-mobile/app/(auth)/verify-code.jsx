import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography } from '@/constants/parcus-theme';
import PrimaryButton from '@/components/parcus/PrimaryButton';

const AUTHENTICATED_USER_KEY = 'authenticatedUser';
const CELL_COUNT = 6;

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const [value, setValue] = useState('');

  const handleVerify = async () => {
    if (value.length === CELL_COUNT) {
      await AsyncStorage.setItem(
        AUTHENTICATED_USER_KEY,
        JSON.stringify({ phone }),
      );
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.description}>
          Enter the verification code we sent to{'\n'}
          {phone || ''}
        </Text>

        <View style={styles.codeFieldRoot}>
          <TextInput
            value={value}
            onChangeText={(text) =>
              setValue(text.replace(/\D/g, '').slice(0, CELL_COUNT))
            }
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={CELL_COUNT}
            textContentType="oneTimeCode"
          />
        </View>

        <PrimaryButton label="VERIFY" onPress={handleVerify} />
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
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    ...typography.body1,
    textAlign: 'center',
    marginBottom: 32,
  },
  codeFieldRoot: {
    marginBottom: 32,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  codeInput: {
    width: 200,
    height: 48,
    borderWidth: 1,
    borderColor: colors.text.secondary,
    borderRadius: 8,
    ...typography.h2,
    textAlign: 'center',
    letterSpacing: 8,
  },
});
