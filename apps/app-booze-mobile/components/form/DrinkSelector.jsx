import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import { colors, typography } from '@/constants/parcus-theme';
import { MaterialIcons } from '@expo/vector-icons';

// Mock data - replace with API call
const MOCK_DRINKS = [
  { id: '1', name: 'Heineken Lager', category: 'Beer', abv: 5.0 },
  { id: '2', name: 'Guinness Stout', category: 'Beer', abv: 4.2 },
  { id: '3', name: 'Jameson Irish Whiskey', category: 'Whiskey', abv: 40.0 },
  { id: '4', name: 'Bacardi Rum', category: 'Rum', abv: 37.5 },
  { id: '5', name: 'Smirnoff Vodka', category: 'Vodka', abv: 40.0 },
  { id: '6', name: 'Cabernet Sauvignon', category: 'Wine', abv: 13.5 },
  { id: '7', name: 'Pinot Grigio', category: 'Wine', abv: 12.0 },
  { id: '8', name: 'Champagne', category: 'Sparkling', abv: 12.0 },
];

export default function DrinkSelector({
  selectedDrinkId,
  selectedDrinkName,
  onSelectDrink,
  hasError = false,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drinks, setDrinks] = useState(MOCK_DRINKS);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDrinks, setFilteredDrinks] = useState(MOCK_DRINKS);

  useEffect(() => {
    // Filter drinks based on search query
    if (searchQuery.trim() === '') {
      setFilteredDrinks(drinks);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredDrinks(
        drinks.filter(
          drink =>
            drink.name.toLowerCase().includes(query) ||
            drink.category.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, drinks]);

  const handleSelectDrink = (drink) => {
    onSelectDrink(drink.id, drink.name);
    setModalVisible(false);
    setSearchQuery('');
  };

  const selectedDrink = drinks.find(d => d.id === selectedDrinkId);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.selector, hasError && styles.selectorError]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectorContent}>
          <Text style={[
            styles.selectorText,
            !selectedDrinkId && styles.placeholderText,
          ]}>
            {selectedDrinkName || 'Choose a drink...'}
          </Text>
          {selectedDrink && (
            <Text style={styles.categoryText}>
              {selectedDrink.category} • {selectedDrink.abv}% ABV
            </Text>
          )}
        </View>
        <MaterialIcons
          name="expand-more"
          size={24}
          color={colors.text.secondary}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select a Drink</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={colors.text.primary}
                />
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
              <MaterialIcons
                name="search"
                size={20}
                color={colors.text.secondary}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search drinks..."
                placeholderTextColor={colors.text.tertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Drinks List */}
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : (
              <FlatList
                data={filteredDrinks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.drinkItem,
                      selectedDrinkId === item.id && styles.drinkItemSelected,
                    ]}
                    onPress={() => handleSelectDrink(item)}
                  >
                    <View style={styles.drinkInfo}>
                      <Text style={styles.drinkName}>{item.name}</Text>
                      <Text style={styles.drinkMeta}>
                        {item.category} • {item.abv}% ABV
                      </Text>
                    </View>
                    {selectedDrinkId === item.id && (
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No drinks found</Text>
                  </View>
                }
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.background.secondary,
  },
  selectorError: {
    borderColor: colors.error || '#FF6B6B',
  },
  selectorContent: {
    flex: 1,
  },
  selectorText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '500',
  },
  placeholderText: {
    color: colors.text.tertiary,
  },
  categoryText: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '90%',
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    backgroundColor: colors.background.secondary,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: colors.text.primary,
    ...typography.body,
  },
  drinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  drinkItemSelected: {
    backgroundColor: colors.background.secondary,
  },
  drinkInfo: {
    flex: 1,
  },
  drinkName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '500',
  },
  drinkMeta: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
