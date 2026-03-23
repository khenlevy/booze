import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import OnboardingChrome from '@/components/onboarding/OnboardingChrome';
import { SelectableCard } from '@/components/primitives';
import { mergeOnboardingDraft, PRIMARY_CATEGORIES } from '@/utils/preferenceProfile';
import { skipOnboardingThenGoToScanLogin } from '@/utils/onboardingScanSkip';

export default function TasteCategoryScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const showBack = navigation.canGoBack();

  const handleSelect = async (id) => {
    await mergeOnboardingDraft({ primaryCategory: id });
    router.push('/(onboarding)/taste-tags');
  };

  return (
    <OnboardingChrome
      step={1}
      totalSteps={3}
      kicker="In-store · Question 1 of 3"
      title="What are you shopping for?"
      subtitle="Pick the aisle or section you are in — we will tune picks to match."
      showBack={showBack}
      escapeHatch={{
        label: 'Skip — scan or enter barcode',
        onPress: () => skipOnboardingThenGoToScanLogin(router),
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {PRIMARY_CATEGORIES.map((c) => (
          <SelectableCard
            key={c.id}
            title={c.label}
            subtitle={c.hint}
            onPress={() => handleSelect(c.id)}
          />
        ))}
      </ScrollView>
    </OnboardingChrome>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 32,
  },
});
