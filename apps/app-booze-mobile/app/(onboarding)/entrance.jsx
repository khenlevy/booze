import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import PrimaryButton from '@/components/parcus/PrimaryButton';
import ParcusPiggy from '@/assets/svg/ParcusPiggy';

export default function EntranceScreen() {
  const router = useRouter();

  const handleBegin = async () => {
    await router.push('/(onboarding)/community-intro');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <ParcusPiggy width={213} height={189} />
        </View>
        <Text style={styles.title}>PARCUS</Text>
        <Text style={styles.subtitle}>
          Saving you money, one purchase at a time
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton label="BEGIN YOUR JOURNEY" onPress={handleBegin} />
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 165,
  },
  imageContainer: {
    marginBottom: 32,
  },
  title: {
    ...typography.h1,
    fontSize: 40,
    color: colors.brand.primary,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1,
  },
  subtitle: {
    ...typography.body1,
    textAlign: 'center',
    maxWidth: 280,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});
