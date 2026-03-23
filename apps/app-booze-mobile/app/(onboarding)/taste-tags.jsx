import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '@/constants/parcus-theme';
import OnboardingChrome from '@/components/onboarding/OnboardingChrome';
import { AppButton, ChoiceChip } from '@/components/primitives';
import {
  mergeOnboardingDraft,
  ONBOARDING_TASTE_TAGS,
} from '@/utils/preferenceProfile';
import { skipOnboardingThenGoToScanLogin } from '@/utils/onboardingScanSkip';

const MAX_TAGS = 3;

export default function TasteTagsScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const toggle = useCallback((tag) => {
    setSelected((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      if (prev.length >= MAX_TAGS) {
        return prev;
      }
      return [...prev, tag];
    });
  }, []);

  const handleSkip = async () => {
    await mergeOnboardingDraft({ tasteTags: [] });
    router.push('/(onboarding)/budget-or-occasion');
  };

  const handleNext = async () => {
    await mergeOnboardingDraft({ tasteTags: selected });
    router.push('/(onboarding)/budget-or-occasion');
  };

  const footer = (
    <View style={styles.footerRow}>
      <View style={styles.footerHalf}>
        <AppButton variant="ghost" fullWidth size="md" onPress={handleSkip}>
          Not sure / Skip
        </AppButton>
      </View>
      <View style={styles.footerHalf}>
        <AppButton variant="primary" fullWidth size="md" onPress={handleNext}>
          Next
        </AppButton>
      </View>
    </View>
  );

  return (
    <OnboardingChrome
      step={2}
      totalSteps={3}
      kicker="In-store · Question 2 of 3"
      title="What flavors do you like?"
      subtitle={`Choose up to ${MAX_TAGS} — e.g. dry wine, smoky whiskey, crisp beer.`}
      footer={footer}
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
        <Text style={styles.counter}>
          {selected.length}/{MAX_TAGS} selected
        </Text>
        <View style={styles.chips}>
          {ONBOARDING_TASTE_TAGS.map((tag) => (
            <ChoiceChip
              key={tag}
              label={tag}
              selected={selected.includes(tag)}
              disabled={
                !selected.includes(tag) && selected.length >= MAX_TAGS
              }
              onPress={() => toggle(tag)}
            />
          ))}
        </View>
      </ScrollView>
    </OnboardingChrome>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: spacing.xxl,
  },
  counter: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: 14,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  footerRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'stretch',
  },
  footerHalf: {
    flex: 1,
  },
});
