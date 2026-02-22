import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/constants/parcus-theme';
import EntranceStage from '@/components/parcus/EntranceStage';

const ONBOARDING_COMPLETED_KEY = 'onboardingCompleted';

export default function PayLessIntro() {
  const router = useRouter();

  const handleNext = async () => {
    await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <EntranceStage
        title="Pay less"
        description="Redeem discount at checkout using our promo code, bar-code or QR code"
        onNext={handleNext}
        illustrationImage={null}
        currentStep={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.background,
  },
});
