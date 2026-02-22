import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import PrimaryButton from './PrimaryButton';
import ParcusPiggy from '@/assets/svg/ParcusPiggy';

export default function EntranceStage({
  title,
  description,
  onNext,
  illustrationImage,
  currentStep,
  totalSteps = 3,
  showBackButton = true,
  onBack,
}) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          {showBackButton && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.stepIndicator}>
          {currentStep}/{totalSteps}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <ParcusPiggy width={64} height={64} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.illustration}>
          {illustrationImage ? (
            <Image
              source={illustrationImage}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.placeholderIllustration} />
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton label="Next" onPress={onNext} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    position: 'relative',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backArrow: {
    fontSize: 24,
    color: colors.text.primary,
  },
  stepIndicator: {
    ...typography.body1,
    fontSize: 16,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  titleContainer: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    ...typography.body1,
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  illustration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: '100%',
    height: 240,
  },
  placeholderIllustration: {
    width: '80%',
    height: 240,
    backgroundColor: colors.brand.primary,
    opacity: 0.3,
    borderRadius: 16,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});
