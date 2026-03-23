import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import { useAuth } from '@/contexts/AuthContext';
import { createDrinkLog, retryWithBackoff } from '@/utils/drinkLogApi';
import { buildTasteLogPayload } from '@/utils/buildDrinkLogPayload';
import { getCatalogDrinkById } from '@/data/drink-catalog-mock';

export default function LogSentimentScreen() {
  const router = useRouter();
  const { userId } = useAuth();
  const params = useLocalSearchParams();
  const catalogDrinkId = params.catalogDrinkId
    ? String(params.catalogDrinkId)
    : '';
  const drinkNameParam = params.drinkName ? String(params.drinkName) : '';
  const scanUpc = params.upc ? String(params.upc) : '';
  const abvParam = params.abv ? parseFloat(String(params.abv), 10) : null;

  const catalog = catalogDrinkId ? getCatalogDrinkById(catalogDrinkId) : null;
  const drinkName = drinkNameParam || catalog?.name || 'Drink';
  const abv =
    abvParam != null && !Number.isNaN(abvParam)
      ? abvParam
      : catalog?.abv ?? null;
  const tasteTags = catalog?.tasteTags;

  const [submitting, setSubmitting] = useState(false);

  const submit = useCallback(
    async (sentiment) => {
      if (!drinkName.trim()) {
        Alert.alert('Missing drink', 'Go back and select a bottle.');
        return;
      }
      setSubmitting(true);
      try {
        const payload = buildTasteLogPayload({
          userId,
          drinkName: drinkName.trim(),
          catalogDrinkId: catalogDrinkId || undefined,
          scanUpc: scanUpc || undefined,
          sentiment,
          abv,
          tasteTags,
        });
        await retryWithBackoff(() => createDrinkLog(payload), 3, 1000);
        Alert.alert('Saved', 'Added to your collection.', [
          { text: 'OK', onPress: () => router.replace('/(tabs)/drink-history') },
        ]);
      } catch (e) {
        Alert.alert('Error', e?.message || 'Could not save.');
      } finally {
        setSubmitting(false);
      }
    },
    [userId, drinkName, catalogDrinkId, scanUpc, abv, tasteTags, router],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Go back"
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.kicker}>Quick log</Text>
      <Text style={styles.title}>How was it?</Text>
      <Text style={styles.drinkName}>{drinkName}</Text>
      {abv != null ? (
        <Text style={styles.meta}>{abv}% ABV · saved as 1 bottle</Text>
      ) : (
        <Text style={styles.meta}>Saved as 1 bottle · {new Date().toLocaleString()}</Text>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.choice, styles.love]}
          disabled={submitting}
          onPress={() => submit('love')}
        >
          <Text style={styles.choiceText}>Loved it</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.choice, styles.ok]}
          disabled={submitting}
          onPress={() => submit('ok')}
        >
          <Text style={styles.choiceTextDark}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.choice, styles.dislike]}
          disabled={submitting}
          onPress={() => submit('dislike')}
        >
          <Text style={styles.choiceText}>Did not love it</Text>
        </TouchableOpacity>
      </View>

      {submitting ? (
        <ActivityIndicator
          style={{ marginTop: 24 }}
          color={colors.brand.primary}
        />
      ) : null}

      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingBottom: Platform.select({ ios: 88, android: 64 }),
  },
  topBar: {
    paddingHorizontal: 8,
  },
  backBtn: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  kicker: {
    ...typography.label,
    color: colors.brand.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: spacing.xl,
    marginBottom: 4,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    paddingHorizontal: spacing.xl,
    marginBottom: 8,
  },
  drinkName: {
    ...typography.h3,
    color: colors.text.primary,
    paddingHorizontal: spacing.xl,
    marginBottom: 8,
  },
  meta: {
    ...typography.caption,
    color: colors.text.secondary,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xxl,
  },
  buttons: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  choice: {
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  love: {
    backgroundColor: colors.brand.primary,
  },
  ok: {
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderColor: colors.border.default,
  },
  dislike: {
    backgroundColor: colors.text.secondary,
  },
  choiceText: {
    ...typography.button,
    fontSize: 17,
    color: colors.text.inverse,
  },
  choiceTextDark: {
    ...typography.button,
    fontSize: 17,
    color: colors.text.primary,
  },
});
