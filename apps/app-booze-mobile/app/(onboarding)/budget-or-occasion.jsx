import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingChrome from '@/components/onboarding/OnboardingChrome';
import { SelectableCard } from '@/components/primitives';
import {
  loadOnboardingDraft,
  mergeOnboardingDraft,
  completeOnboardingFromDraft,
  BUDGET_OPTIONS,
} from '@/utils/preferenceProfile';
import { skipOnboardingThenGoToScanLogin } from '@/utils/onboardingScanSkip';

export default function BudgetOrOccasionScreen() {
  const router = useRouter();

  const handleSelect = async (budgetTier) => {
    await mergeOnboardingDraft({ budgetTier });
    const draft = await loadOnboardingDraft();
    await completeOnboardingFromDraft(draft);
    router.replace('/(onboarding)/your-picks');
  };

  return (
    <OnboardingChrome
      step={3}
      totalSteps={3}
      kicker="In-store · Question 3 of 3"
      title="Roughly what is your budget?"
      subtitle="We use this to rank suggestions — you can always browse everything later."
      showBack
      escapeHatch={{
        label: 'Skip — scan or enter barcode',
        onPress: () => skipOnboardingThenGoToScanLogin(router),
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {BUDGET_OPTIONS.map((opt) => (
          <SelectableCard
            key={opt.id}
            title={opt.label}
            subtitle={opt.sub}
            onPress={() => handleSelect(opt.id)}
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
