import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import { getCatalogDrinkById } from '@/data/drink-catalog-mock';

export default function SearchResultsScreen() {
  const router = useRouter();
  const { id, name, desc, category, abv } = useLocalSearchParams();

  const fromParams =
    name || desc || category || abv
      ? {
          id: String(id || ''),
          name: name ? String(name) : '',
          desc: desc ? String(desc) : '',
          category: category ? String(category) : '',
          abv: abv ? parseFloat(String(abv), 10) : null,
          tasteTags: [],
        }
      : null;

  const catalog = id ? getCatalogDrinkById(String(id)) : null;
  const drink = fromParams?.name
    ? {
        ...fromParams,
        tasteTags: catalog?.tasteTags || [],
        brand: catalog?.brand,
        desc: fromParams.desc || catalog?.desc || '',
        abv:
          fromParams.abv != null && !Number.isNaN(fromParams.abv)
            ? fromParams.abv
            : catalog?.abv ?? null,
      }
    : catalog;

  if (!drink || !drink.name) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Not found</Text>
          <Text style={styles.description}>
            This drink is not in the catalog.
          </Text>
        </View>
        <BottomBar />
      </SafeAreaView>
    );
  }

  const tagLine = (drink.tasteTags || []).filter(Boolean).join(' · ');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {drink.category ? (
            <View style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{drink.category}</Text>
            </View>
          ) : null}
          <Text style={styles.title}>{drink.name}</Text>
          {drink.brand ? (
            <Text style={styles.brand}>{drink.brand}</Text>
          ) : null}
          {drink.abv != null ? (
            <Text style={styles.abv}>{drink.abv}% ABV</Text>
          ) : null}
          {drink.desc ? (
            <Text style={styles.description}>{drink.desc}</Text>
          ) : null}
          {tagLine ? <Text style={styles.tags}>{tagLine}</Text> : null}

          <TouchableOpacity
            style={styles.cta}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/drink-log',
                params: {
                  drinkName: drink.name,
                  catalogDrinkId: String(drink.id || id || ''),
                },
              })
            }
            activeOpacity={0.9}
          >
            <Text style={styles.ctaText}>Log this drink</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollInner: {
    flexGrow: 1,
    paddingBottom: Platform.select({ ios: 100, android: 80 }),
  },
  content: {
    flex: 1,
    padding: 20,
    marginBottom: Platform.select({ ios: 85, android: 60 }),
  },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.brand.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryPillText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text.inverse,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: 8,
  },
  brand: {
    ...typography.subtitle,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  abv: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    ...typography.body1,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: 12,
  },
  tags: {
    ...typography.body2,
    color: colors.brand.primary,
    marginBottom: 28,
  },
  cta: {
    backgroundColor: colors.brand.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: {
    ...typography.button,
    color: colors.text.inverse,
  },
});
