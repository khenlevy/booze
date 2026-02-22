import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import { MOCK_SEARCH_DATA } from '@/data/search-mock';

export default function SearchResultsScreen() {
  const { id } = useLocalSearchParams();
  const business = MOCK_SEARCH_DATA.find(
    (item) => item.id === id && item.type === 'business',
  );

  if (!business) {
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
        <Text style={styles.title}>{business.name}</Text>
        <Text style={styles.description}>{business.desc}</Text>
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
  },
});
