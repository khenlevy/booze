import { useState, useEffect } from 'react';
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
import { searchItems } from '@/data/search-mock';
import ShopIcon from '@/assets/icons/ShopIcon';
import MoneyIcon from '@/assets/icons/MoneyIcon';
import TicketIcon from '@/assets/icons/TicketIcon';

const FILTER_OPTIONS = ['All', 'Gift cards', 'Coupons', 'Deals'];

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    if (!debouncedSearchText) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    const results = searchItems(debouncedSearchText);
    setSearchResults(results);
    setIsLoading(false);
  }, [debouncedSearchText]);

  const handleFilterSelect = (filter) => setSelectedFilter(filter);

  const handleResultPress = (result) => {
    setIsSearchFocused(false);
    if (result.type === 'business') {
      router.push({
        pathname: '/search-results',
        params: { id: result.id },
      });
    } else {
      router.push({
        pathname: '/result-view',
        params: { id: result.id },
      });
    }
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

  const getTagStyle = (type) => {
    switch (type) {
      case 'business':
        return styles.businessTag;
      case 'gift_card':
        return styles.giftCardTag;
      case 'coupon':
        return styles.couponTag;
      default:
        return {};
    }
  };

  const getTagText = (type) => {
    switch (type) {
      case 'business':
        return 'Business';
      case 'gift_card':
        return 'Gift card';
      case 'coupon':
        return 'Coupon';
      default:
        return '';
    }
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'business':
        return <ShopIcon width={24} height={24} />;
      case 'gift_card':
        return <MoneyIcon width={24} height={24} />;
      case 'coupon':
        return <TicketIcon width={24} height={24} />;
      default:
        return <ShopIcon width={24} height={24} />;
    }
  };

  const renderSearchResults = () => (
    <ScrollView style={styles.resultsContainer}>
      {searchResults.map((result) => (
        <TouchableOpacity
          key={result.id}
          style={styles.resultItem}
          onPress={() => handleResultPress(result)}
        >
          <View style={styles.resultIcon}>{getResultIcon(result.type)}</View>
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>{highlightText(result.name)}</Text>
            <Text style={styles.resultDesc}>{highlightText(result.desc)}</Text>
          </View>
          <View style={[styles.tag, getTagStyle(result.type)]}>
            <Text style={styles.tagText}>{getTagText(result.type)}</Text>
          </View>
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
            placeholder="Search by anything.."
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
          {isLoading ? (
            <View style={styles.searchLoadingContainer}>
              <TagLoading width={80} height={80} />
              <Text style={styles.loadingText}>Loading..</Text>
            </View>
          ) : (
            <View style={styles.searchResults} />
          )}
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
          <Text style={styles.searchPlaceholder}>Search by anything..</Text>
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
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
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
  searchResults: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  businessTag: {
    backgroundColor: '#020064',
  },
  giftCardTag: {
    backgroundColor: '#BD82EB',
  },
  couponTag: {
    backgroundColor: '#B0D9FF',
  },
  tagText: {
    ...typography.body2,
    color: colors.text.inverse,
  },
  searchLoadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
