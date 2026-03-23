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
import { useState, useEffect, useMemo } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useFormTheme } from '@booze/cl-form-rn';

/**
 * Searchable catalog picker (drinks, etc.). Pass `items` from the app — no data import here.
 * @param {{
 *   items: Array<{ id: string, name: string, category: string, abv: number }>,
 *   selectedDrinkId?: string,
 *   selectedDrinkName?: string,
 *   onSelectDrink: (id: string, name: string) => void,
 *   hasError?: boolean,
 *   modalTitle?: string,
 *   searchPlaceholder?: string,
 *   emptyMessage?: string,
 *   placeholder?: string,
 * }} props
 */
export function CatalogSelector({
  items,
  selectedDrinkId,
  selectedDrinkName,
  onSelectDrink,
  hasError = false,
  modalTitle = 'Select a Drink',
  searchPlaceholder = 'Search drinks...',
  emptyMessage = 'No drinks found',
  placeholder = 'Choose a drink...',
}) {
  const theme = useFormTheme();
  const c = theme.colors;
  const typo = theme.typography;

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(items);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredItems(
        items.filter(
          (row) =>
            row.name.toLowerCase().includes(query) ||
            row.category.toLowerCase().includes(query),
        ),
      );
    }
  }, [searchQuery, items]);

  const handleSelect = (row) => {
    onSelectDrink(row.id, row.name);
    setModalVisible(false);
    setSearchQuery('');
  };

  const selected = items.find((d) => d.id === selectedDrinkId);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { width: '100%' },
        selector: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: hasError ? c.error : c.borderDefault,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 12,
          backgroundColor: c.backgroundSecondary,
        },
        selectorContent: { flex: 1 },
        selectorText: {
          ...typo.body,
          color: c.textPrimary,
          fontWeight: '500',
        },
        placeholderText: { color: c.textTertiary },
        categoryText: {
          ...typo.caption,
          color: c.textSecondary,
          marginTop: 4,
        },
        modalOverlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        },
        modalContent: {
          backgroundColor: c.backgroundPrimary,
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
          borderBottomColor: c.borderDefault,
        },
        modalTitle: {
          ...typo.h2,
          color: c.textPrimary,
        },
        searchContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 16,
          marginVertical: 12,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: c.borderDefault,
          borderRadius: 8,
          backgroundColor: c.backgroundSecondary,
        },
        searchIcon: { marginRight: 8 },
        searchInput: {
          flex: 1,
          paddingVertical: 10,
          color: c.textPrimary,
          ...typo.body,
        },
        drinkItem: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: c.borderLight,
        },
        drinkItemSelected: { backgroundColor: c.backgroundSecondary },
        drinkInfo: { flex: 1 },
        drinkName: {
          ...typo.body,
          color: c.textPrimary,
          fontWeight: '500',
        },
        drinkMeta: {
          ...typo.caption,
          color: c.textSecondary,
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
          ...typo.body,
          color: c.textSecondary,
        },
      }),
    [c, typo, hasError],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectorContent}>
          <Text
            style={[
              styles.selectorText,
              !selectedDrinkId && styles.placeholderText,
            ]}
          >
            {selectedDrinkName || placeholder}
          </Text>
          {selected ? (
            <Text style={styles.categoryText}>
              {selected.category} • {selected.abv}% ABV
            </Text>
          ) : null}
        </View>
        <MaterialIcons name="expand-more" size={24} color={c.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color={c.textPrimary} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <MaterialIcons
                name="search"
                size={20}
                color={c.textSecondary}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                placeholderTextColor={c.textTertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={c.brandPrimary} />
              </View>
            ) : (
              <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.drinkItem,
                      selectedDrinkId === item.id && styles.drinkItemSelected,
                    ]}
                    onPress={() => handleSelect(item)}
                  >
                    <View style={styles.drinkInfo}>
                      <Text style={styles.drinkName}>{item.name}</Text>
                      <Text style={styles.drinkMeta}>
                        {item.category} • {item.abv}% ABV
                      </Text>
                    </View>
                    {selectedDrinkId === item.id ? (
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color={c.brandPrimary}
                      />
                    ) : null}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{emptyMessage}</Text>
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
