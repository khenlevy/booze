import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import { getCatalogDrinkById } from '@/data/drink-catalog-mock';
import { useAuth } from '@/contexts/AuthContext';
import { createDrinkLog, retryWithBackoff } from '@/utils/drinkLogApi';
import { buildPurchasePayload } from '@/utils/buildDrinkLogPayload';

export default function SearchResultsScreen() {
  const router = useRouter();
  const { userId } = useAuth();
  const { id, name, desc, category, abv, fromOnboarding } =
    useLocalSearchParams();
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  const isInStore =
    fromOnboarding === '1' ||
    fromOnboarding === 'true' ||
    fromOnboarding === 'yes';

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
        desc: fromParams.desc || catalog?.desc || catalog?.aiSummary || '',
        abv:
          fromParams.abv != null && !Number.isNaN(fromParams.abv)
            ? fromParams.abv
            : catalog?.abv ?? null,
        style: catalog?.style,
        subcategory: catalog?.subcategory,
        priceBand: catalog?.priceBand,
        pairingHints: catalog?.pairingHints,
        occasionTags: catalog?.occasionTags,
        origin: catalog?.origin,
        aiSummary: catalog?.aiSummary,
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

  const catalogId = String(drink.id || id || '');
  const abvNum =
    drink.abv != null && !Number.isNaN(Number(drink.abv))
      ? Number(drink.abv)
      : null;

  const goLogTaste = () => {
    router.push({
      pathname: '/(tabs)/log-sentiment',
      params: {
        catalogDrinkId: catalogId,
        drinkName: drink.name,
        abv: abvNum != null ? String(abvNum) : '',
      },
    });
  };

  const recordPurchase = async () => {
    setPurchaseLoading(true);
    try {
      await retryWithBackoff(
        () =>
          createDrinkLog(
            buildPurchasePayload({
              userId,
              drinkName: drink.name,
              catalogDrinkId: catalogId,
              abv: abvNum,
              tasteTags: drink.tasteTags,
            }),
          ),
        3,
        1000,
      );
      Alert.alert('Saved', 'Purchase recorded.');
    } catch (e) {
      Alert.alert('Error', e?.message || 'Could not save.');
    } finally {
      setPurchaseLoading(false);
    }
  };

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
          {drink.style || drink.subcategory ? (
            <Text style={styles.styleLine}>
              {[drink.style, drink.subcategory].filter(Boolean).join(' · ')}
            </Text>
          ) : null}
          {drink.priceBand ? (
            <Text style={styles.priceBand}>Tier: {drink.priceBand}</Text>
          ) : null}
          {drink.origin?.country ? (
            <Text style={styles.origin}>
              {drink.origin.region
                ? `${drink.origin.region}, ${drink.origin.country}`
                : drink.origin.country}
            </Text>
          ) : null}
          {drink.desc ? (
            <Text style={styles.description}>{drink.desc}</Text>
          ) : null}
          {drink.aiSummary && drink.aiSummary !== drink.desc ? (
            <Text style={styles.aiBlock}>{drink.aiSummary}</Text>
          ) : null}
          {tagLine ? <Text style={styles.tags}>{tagLine}</Text> : null}
          {(drink.pairingHints?.length ?? 0) > 0 ? (
            <Text style={styles.pairing}>
              Pairs with: {drink.pairingHints.join(', ')}
            </Text>
          ) : null}
          {(drink.occasionTags?.length ?? 0) > 0 ? (
            <Text style={styles.occasion}>
              Occasions: {drink.occasionTags.join(', ')}
            </Text>
          ) : null}

          {isInStore ? (
            <>
              <TouchableOpacity
                style={styles.cta}
                onPress={recordPurchase}
                disabled={purchaseLoading}
                activeOpacity={0.9}
              >
                {purchaseLoading ? (
                  <ActivityIndicator color={colors.text.inverse} />
                ) : (
                  <Text style={styles.ctaText}>I purchased this</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ctaSecondary}
                onPress={goLogTaste}
                activeOpacity={0.9}
              >
                <Text style={styles.ctaSecondaryText}>Log how it tasted</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.cta}
                onPress={goLogTaste}
                activeOpacity={0.9}
              >
                <Text style={styles.ctaText}>Log how it tasted</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ctaSecondary}
                onPress={recordPurchase}
                disabled={purchaseLoading}
                activeOpacity={0.9}
              >
                {purchaseLoading ? (
                  <ActivityIndicator color={colors.brand.primary} />
                ) : (
                  <Text style={styles.ctaSecondaryText}>Record purchase</Text>
                )}
              </TouchableOpacity>
            </>
          )}
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
    marginBottom: 8,
  },
  styleLine: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  priceBand: {
    ...typography.caption,
    color: colors.brand.primary,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  origin: {
    ...typography.caption,
    color: colors.text.tertiary,
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
    marginBottom: 12,
  },
  aiBlock: {
    ...typography.body2,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  pairing: {
    ...typography.body2,
    color: colors.text.primary,
    marginBottom: 8,
  },
  occasion: {
    ...typography.caption,
    color: colors.text.secondary,
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
  ctaSecondary: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.brand.primary,
    backgroundColor: colors.background.primary,
  },
  ctaSecondaryText: {
    ...typography.button,
    color: colors.brand.primary,
  },
});
