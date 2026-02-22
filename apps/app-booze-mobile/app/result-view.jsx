import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import { MOCK_SEARCH_DATA } from '@/data/search-mock';

export default function ResultViewScreen() {
  const { id } = useLocalSearchParams();
  const item = MOCK_SEARCH_DATA.find(
    (i) => i.id === id && (i.type === 'gift_card' || i.type === 'coupon'),
  );

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.desc}</Text>
        <Text style={styles.type}>
          Type: {item.type === 'gift_card' ? 'Gift Card' : 'Coupon'}
        </Text>
      </View>
      <BottomBar />
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
    padding: 16,
    marginBottom: Platform.select({ ios: 85, android: 60 }),
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: 8,
  },
  description: {
    ...typography.body1,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  type: {
    ...typography.body2,
    color: colors.text.secondary,
  },
});
