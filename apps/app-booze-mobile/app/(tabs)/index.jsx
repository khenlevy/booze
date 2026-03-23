import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import { AppButton } from '@/components/primitives';
import { useAuth } from '@/contexts/AuthContext';
import {
  getPersonalizedRecommendations,
  getRecommendationStats,
} from '@/utils/recommendationsApi';
import { loadPreferenceProfile } from '@/utils/preferenceProfile';
import { getColdStartPicks } from '@/utils/coldStartPicks';

export default function MyCardsScreen() {
  const router = useRouter();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [recs, setRecs] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [coldPicks, setColdPicks] = useState([]);

  const refreshPreferencePicks = useCallback(async () => {
    const profile = await loadPreferenceProfile();
    setColdPicks(getColdStartPicks(profile, 8));
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshPreferencePicks();
    }, [refreshPreferencePicks]),
  );

  const load = useCallback(async () => {
    setError(null);
    try {
      const [list, stat] = await Promise.all([
        getPersonalizedRecommendations(userId, {
          limit: 12,
          minRating: 1,
          sortBy: 'rating',
        }).catch(() => []),
        getRecommendationStats(userId).catch(() => null),
      ]);
      setRecs(Array.isArray(list) ? list : []);
      setStats(stat);
    } catch (e) {
      setError(e?.message || 'Could not load recommendations');
      setRecs([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId]);

  useEffect(() => {
    setLoading(true);
    load();
  }, [load]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load();
  }, [load]);

  const totalLogs = stats?.ratingStats?.totalLogs ?? 0;
  const showColdStart = !loading && recs.length === 0 && coldPicks.length > 0;
  const showEmpty = !loading && recs.length === 0 && coldPicks.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.brand.primary}
          />
        }
      >
        <Text style={styles.heroTitle}>For you</Text>
        <Text style={styles.heroSub}>
          {recs.length > 0
            ? 'Whiskey & wine picks based on what you have rated.'
            : 'Your next bottle, tuned to your taste.'}
        </Text>

        <View style={styles.actionsRow}>
          <View style={styles.actionFlex}>
            <AppButton
              variant="primary"
              fullWidth
              size="md"
              onPress={() => router.push('/(tabs)/drink-log')}
            >
              Log a drink
            </AppButton>
          </View>
          <View style={styles.actionFlex}>
            <AppButton
              variant="secondary"
              fullWidth
              size="md"
              onPress={() => router.push('/(tabs)/drink-history')}
            >
              History
            </AppButton>
          </View>
        </View>

        {loading ? (
          <View style={styles.centerBlock}>
            <ActivityIndicator size="large" color={colors.brand.primary} />
            <Text style={styles.muted}>Loading your taste profile…</Text>
          </View>
        ) : null}

        {error && !loading ? (
          <Text style={styles.warn}>{error}</Text>
        ) : null}

        {showColdStart ? (
          <>
            <Text style={styles.sectionTitle}>Starter picks for you</Text>
            <Text style={styles.sectionSub}>
              Based on your onboarding answers — tap a bottle for details.
            </Text>
            {coldPicks.map((d) => (
              <TouchableOpacity
                key={d.id}
                style={styles.recCard}
                activeOpacity={0.9}
                onPress={() =>
                  router.push({
                    pathname: '/search-results',
                    params: {
                      id: d.id,
                      name: d.name,
                      desc: d.desc || '',
                      category: d.category || '',
                      abv: d.abv != null ? String(d.abv) : '',
                    },
                  })
                }
              >
                <Text style={styles.recName}>{d.name}</Text>
                <Text style={styles.recMeta}>
                  {d.category} · {d.abv}% ABV
                </Text>
                <Text style={styles.recReason}>{d._matchReason}</Text>
                {(d.tasteTags?.length ?? 0) > 0 ? (
                  <Text style={styles.tags}>
                    {(d.tasteTags || []).join(' · ')}
                  </Text>
                ) : null}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/search')}
              style={styles.linkBtn}
            >
              <Text style={styles.linkBtnText}>Search the full catalog</Text>
            </TouchableOpacity>
          </>
        ) : null}

        {showEmpty && !loading ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Start your journey</Text>
            <Text style={styles.emptyBody}>
              Complete onboarding for starter picks, or log drinks you have
              tried — we will surface your favorites here.
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/search')}
              style={styles.linkBtn}
            >
              <Text style={styles.linkBtnText}>Browse catalog</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {!loading && recs.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>
              Personalized picks
              {totalLogs > 0 ? (
                <Text style={styles.sectionMeta}>
                  {' '}
                  · {totalLogs} log{totalLogs === 1 ? '' : 's'}
                </Text>
              ) : null}
            </Text>
            {recs.map((item, idx) => (
              <View key={`${item.drinkName}-${idx}`} style={styles.recCard}>
                <Text style={styles.recName}>{item.drinkName}</Text>
                {item.averageRating != null ? (
                  <Text style={styles.recMeta}>
                    Avg {item.averageRating}★ · tried {item.timesConsumed ?? 1}{' '}
                    time{item.timesConsumed === 1 ? '' : 's'}
                  </Text>
                ) : item.rating != null ? (
                  <Text style={styles.recMeta}>{item.rating}★</Text>
                ) : null}
                {item.reason ? (
                  <Text style={styles.recReason}>{item.reason}</Text>
                ) : null}
                {(item.tasteTags?.length ?? 0) > 0 ? (
                  <Text style={styles.tags}>
                    {(item.tasteTags || []).join(' · ')}
                  </Text>
                ) : null}
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
}

const bottomPad = Platform.select({ ios: 100, android: 80 });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: bottomPad,
  },
  heroTitle: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: 6,
  },
  heroSub: {
    ...typography.body1,
    color: colors.text.secondary,
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    alignItems: 'stretch',
  },
  actionFlex: {
    flex: 1,
  },
  centerBlock: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  muted: {
    ...typography.body2,
    color: colors.text.secondary,
    marginTop: 12,
  },
  warn: {
    ...typography.body2,
    color: colors.state.error,
    marginBottom: 12,
  },
  emptyCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptyBody: {
    ...typography.body2,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  linkBtn: {
    alignSelf: 'flex-start',
  },
  linkBtnText: {
    ...typography.body1,
    color: colors.brand.primary,
    fontWeight: '600',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 8,
  },
  sectionSub: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: 14,
    lineHeight: 20,
  },
  sectionMeta: {
    ...typography.body2,
    color: colors.text.secondary,
    fontWeight: '400',
  },
  recCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  recName: {
    ...typography.h3,
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 4,
  },
  recMeta: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  recReason: {
    ...typography.body2,
    color: colors.text.primary,
    marginBottom: 6,
  },
  tags: {
    ...typography.caption,
    color: colors.brand.primary,
  },
});
