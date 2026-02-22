import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/parcus-theme';
import EntranceStage from '@/components/parcus/EntranceStage';

export default function OffersIntro() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <EntranceStage
        title="Get offers"
        description="Find in-store deals near you and start saving right away!"
        onNext={() => router.push('/(onboarding)/pay-less-intro')}
        illustrationImage={null}
        currentStep={2}
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
