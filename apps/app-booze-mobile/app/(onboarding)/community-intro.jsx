import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/parcus-theme';
import EntranceStage from '@/components/parcus/EntranceStage';

export default function CommunityIntro() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <EntranceStage
        title="Our community"
        description="Use the community discounts, promotions, gift cards directly to a redeemable credit."
        onNext={() => router.push('/(onboarding)/offers-intro')}
        illustrationImage={null}
        currentStep={1}
        showBackButton={false}
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
