import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '@/constants/parcus-theme';
import TagLoading from '@/assets/svg/TagLoading';
import BottomBar from '@/components/parcus/BottomBar';
import { useDebounce } from '@/hooks/useDebounce';
import { searchCatalogDrinks } from '@/data/drink-catalog-mock';
import { searchDrinksApi } from '@/utils/drinksSearchApi';
import {
  loadPreferenceProfile,
  primaryCategoryToSearchFilter,
} from '@/utils/preferenceProfile';

const FILTER_OPTIONS = ['All', 'Whiskey', 'Wine', 'Spirits', 'Beer'];

function mapApiDrinkToResult(d) {
  return {
    id: String(d._id ?? d.id),
    name: d.name,
    desc: d.description || d.desc || '',
    category: d.category || '',
    abv: d.abv,
    source: 'api',
  };
}

async function searchDrinks(query, categoryFilter) {
  const q = (query || '').trim();
  if (!q) return [];

  try {
    const { data } = await searchDrinksApi({
      name: q,
      category: categoryFilter === 'All' ? undefined : categoryFilter,
      limit: 40,
      skip: 0,
    });
    if (data.length > 0) {
      return data.map(mapApiDrinkToResult);
    }
  } catch {
    /* fallback below */
  }

  return searchCatalogDrinks(q, categoryFilter).map((d) => ({
    id: d.id,
    name: d.name,
    desc: d.desc || '',
    category: d.category,
    abv: d.abv,
    source: 'catalog',
  }));
}

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const profile = await loadPreferenceProfile();
      if (cancelled || !profile?.primaryCategory) return;
      const mapped = primaryCategoryToSearchFilter(profile.primaryCategory);
      if (FILTER_OPTIONS.includes(mapped)) {
        setSelectedFilter(mapped);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearchText = useDebounce(searchText, 300);

  const runSearch = useCallback(async () => {
    if (!debouncedSearchText?.trim()) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const results = await searchDrinks(
        debouncedSearchText,
        selectedFilter,
      );
      setSearchResults(results);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchText, selectedFilter]);

  useEffect(() => {
    runSearch();
  }, [runSearch]);

  const handleFilterSelect = (filter) => setSelectedFilter(filter);

  const handleResultPress = (result) => {
    setIsSearchFocused(false);
    router.push({
      pathname: '/search-results',
      params: {
        id: result.id,
        name: result.name,
        desc: result.desc || '',
        category: result.category || '',
        abv: result.abv != null ? String(result.abv) : '',
      },
    });
  };

  const highlightText = (text) => {
    if (!searchText) return text;
    const parts = text.split(new RegExp(`(${searchText})`, 'gi'));
    return (
      <Text>
        {parts.map((part, i) => (
          <Text
            key={i}
            style={
              part.toLowerCase() === searchText.toLowerCase()
                ? styles.highlightedText
                : undefined
            }
          >
            {part}
          </Text>
        ))}
      </Text>
    );
  };

  const renderSearchResults = () => (
    <ScrollView style={styles.resultsContainer}>
      {searchResults.map((result) => (
        <TouchableOpacity
          key={`${result.id}-${result.name}`}
          style={styles.resultItem}
          onPress={() => handleResultPress(result)}
        >
          <View style={styles.resultIcon}>
            <Ionicons name="wine" size={22} color={colors.brand.primary} />
          </View>
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>{highlightText(result.name)}</Text>
            <Text style={styles.resultDesc}>{highlightText(result.desc)}</Text>
          </View>
          {result.category ? (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{result.category}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSearchModal = () => (
    <Modal
      visible={isSearchFocused}
      animationType="slide"
      onRequestClose={() => setIsSearchFocused(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => setIsSearchFocused(false)}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <TextInput
            style={styles.modalSearchInput}
            placeholder="Search whiskey, wine, beer…"
            placeholderTextColor={colors.text.secondary}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
          {searchText ? (
            <TouchableOpacity
              onPress={() => setSearchText('')}
              style={styles.clearButton}
            >
              <Ionicons name="close" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        {isLoading ? (
          <View style={styles.searchLoadingContainer}>
            <ActivityIndicator size="large" color={colors.brand.primary} />
          </View>
        ) : (
          renderSearchResults()
        )}
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.screenTitle}>Discover</Text>
          <Text style={styles.screenSub}>
            Search the catalog — filters help you focus on whiskey, wine, and
            more.
          </Text>
          <View style={styles.hintBox}>
            <TagLoading width={64} height={64} />
            <Text style={styles.hintText}>
              Tap the search bar below to find whiskey, wine, and more.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {FILTER_OPTIONS.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => handleFilterSelect(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => setIsSearchFocused(true)}
        >
          <Ionicons name="search" size={20} color={colors.text.secondary} />
          <Text style={styles.searchPlaceholder}>Search drinks…</Text>
        </TouchableOpacity>
      </View>

      {renderSearchModal()}
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
    marginBottom: Platform.select({ ios: 85, android: 60 }),
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  screenTitle: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: 8,
  },
  screenSub: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  hintBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  hintText: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 12,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: Platform.select({ ios: 85, android: 60 }),
    left: 0,
    right: 0,
    backgroundColor: colors.background.primary,
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 12,
  },
  filterWrapper: {
    backgroundColor: colors.background.secondary,
    borderRadius: 25,
    padding: 4,
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingHorizontal: 4,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.brand.primary,
  },
  filterText: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  filterTextActive: {
    color: colors.text.inverse,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  searchPlaceholder: {
    ...typography.body1,
    color: colors.text.secondary,
    marginLeft: 8,
  },
  loadingText: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.common.black,
  },
  backButton: {
    marginRight: 16,
  },
  modalSearchInput: {
    flex: 1,
    ...typography.body1,
    color: colors.text.primary,
  },
  clearButton: {
    padding: 8,
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
    marginRight: 12,
  },
  resultTitle: {
    ...typography.body1,
    color: colors.text.primary,
    marginBottom: 4,
  },
  resultDesc: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  highlightedText: {
    fontWeight: 'bold',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.brand.primary,
    maxWidth: 100,
  },
  tagText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  searchLoadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
