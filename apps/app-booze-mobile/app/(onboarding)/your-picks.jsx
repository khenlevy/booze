import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, radius, shadows } from '@/constants/parcus-theme';
import { AppButton } from '@/components/primitives';
import { loadPreferenceProfile } from '@/utils/preferenceProfile';
import { getColdStartPicks } from '@/utils/coldStartPicks';
import { useAuth } from '@/contexts/AuthContext';
import { createDrinkLog, retryWithBackoff } from '@/utils/drinkLogApi';
import { buildPurchasePayload } from '@/utils/buildDrinkLogPayload';
import { goToLoginThenScan } from '@/utils/onboardingScanSkip';

export default function YourPicksScreen() {
  const router = useRouter();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [picks, setPicks] = useState([]);
  const [purchaseBusy, setPurchaseBusy] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const profile = await loadPreferenceProfile();
        const list = getColdStartPicks(profile, 5);
        if (!cancelled) setPicks(list);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const top = picks[0];
  const runnersUp = picks.slice(1);

  const openDetail = (d) => {
    router.push({
      pathname: '/search-results',
      params: {
        id: d.id,
        name: d.name,
        desc: d.desc || d.aiSummary || '',
        category: d.category || '',
        abv: d.abv != null ? String(d.abv) : '',
        fromOnboarding: '1',
      },
    });
  };

  const recordPurchase = async (d) => {
    setPurchaseBusy(d.id);
    try {
      await retryWithBackoff(
        () =>
          createDrinkLog(
            buildPurchasePayload({
              userId,
              drinkName: d.name,
              catalogDrinkId: d.id,
              abv: d.abv,
              tasteTags: d.tasteTags,
            }),
          ),
        3,
        1000,
      );
      Alert.alert('Saved', 'We recorded your purchase.');
    } catch (e) {
      Alert.alert('Error', e?.message || 'Could not save purchase.');
    } finally {
      setPurchaseBusy(null);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>Your match</Text>
        <Text style={styles.headline}>Here is your winning option</Text>
        <Text style={styles.sub}>
          Based on your aisle, flavors, and budget — tap for details. You can
          change this anytime from Account.
        </Text>

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.brand.primary} />
            <Text style={styles.muted}>Finding your bottle…</Text>
          </View>
        ) : null}

        {!loading && top ? (
          <>
            <TouchableOpacity
              activeOpacity={0.92}
              onPress={() => openDetail(top)}
              style={styles.heroCard}
            >
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>Top pick</Text>
              </View>
              <Text style={styles.heroName}>{top.name}</Text>
              <Text style={styles.heroBrand}>{top.brand}</Text>
              <Text style={styles.heroMeta}>
                {top.style} · {top.abv}% ABV · {top.priceBand} tier
              </Text>
              {top.origin?.country ? (
                <Text style={styles.heroOrigin}>
                  {top.origin.region
                    ? `${top.origin.region}, ${top.origin.country}`
                    : top.origin.country}
                </Text>
              ) : null}
              <Text style={styles.heroReason}>{top._matchReason}</Text>
              {top.desc ? (
                <Text style={styles.heroDesc}>{top.desc}</Text>
              ) : null}
              {top.pairingHints?.length ? (
                <Text style={styles.heroPair}>
                  Pairs with: {top.pairingHints.join(', ')}
                </Text>
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.purchaseBtn}
              disabled={purchaseBusy === top.id}
              onPress={() => recordPurchase(top)}
              activeOpacity={0.9}
            >
              {purchaseBusy === top.id ? (
                <ActivityIndicator color={colors.text.inverse} />
              ) : (
                <Text style={styles.purchaseBtnText}>I purchased this</Text>
              )}
            </TouchableOpacity>

            {runnersUp.length > 0 ? (
              <>
                <Text style={styles.runnersTitle}>Also strong fits</Text>
                {runnersUp.map((d) => (
                  <View key={d.id} style={styles.runnerBlock}>
                    <TouchableOpacity
                      style={styles.runnerRow}
                      activeOpacity={0.9}
                      onPress={() => openDetail(d)}
                    >
                      <View style={styles.runnerText}>
                        <Text style={styles.runnerName}>{d.name}</Text>
                        <Text style={styles.runnerSub}>
                          {d.style} · {d._matchReason}
                        </Text>
                      </View>
                      <Text style={styles.chev}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.runnerPurchase}
                      disabled={purchaseBusy === d.id}
                      onPress={() => recordPurchase(d)}
                    >
                      <Text style={styles.runnerPurchaseText}>
                        {purchaseBusy === d.id ? 'Saving…' : 'I purchased this'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            ) : null}
          </>
        ) : null}

        {!loading && !top ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No pick yet</Text>
            <Text style={styles.emptyBody}>
              Try completing onboarding again from Account.
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          onPress={() => router.replace('/(auth)/login')}
          accessibilityLabel="Continue to sign in"
        >
          Continue to sign in
        </AppButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scroll: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  kicker: {
    ...typography.label,
    color: colors.brand.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  headline: {
    ...typography.h1,
    fontSize: 28,
    lineHeight: 36,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  sub: {
    ...typography.body1,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  loading: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 12,
  },
  muted: {
    ...typography.body2,
    color: colors.text.tertiary,
  },
  heroCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: colors.brand.primary,
    ...shadows.card,
    marginBottom: spacing.xl,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.brand.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  heroBadgeText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '700',
  },
  heroName: {
    ...typography.h2,
    fontSize: 22,
    color: colors.text.primary,
    marginBottom: 4,
  },
  heroBrand: {
    ...typography.body1,
    color: colors.brand.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  heroMeta: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  heroOrigin: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginBottom: spacing.md,
  },
  heroReason: {
    ...typography.body2,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  heroDesc: {
    ...typography.body2,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  heroPair: {
    ...typography.caption,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  runnersTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  runnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  runnerText: {
    flex: 1,
  },
  runnerName: {
    ...typography.body1,
    fontWeight: '600',
    color: colors.text.primary,
  },
  runnerSub: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 4,
  },
  chev: {
    fontSize: 22,
    color: colors.brand.primary,
    marginLeft: 8,
  },
  purchaseBtn: {
    backgroundColor: colors.text.primary,
    paddingVertical: 16,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  purchaseBtnText: {
    ...typography.button,
    color: colors.text.inverse,
    fontSize: 16,
  },
  runnerBlock: {
    marginBottom: spacing.sm,
  },
  runnerPurchase: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  runnerPurchaseText: {
    ...typography.caption,
    color: colors.brand.primary,
    fontWeight: '700',
  },
  empty: {
    paddingVertical: 32,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptyBody: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  footer: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
    gap: spacing.md,
  },
  scanFirstBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  scanFirstText: {
    ...typography.body2,
    color: colors.brand.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
