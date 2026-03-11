import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import { colors, typography } from '@/constants/parcus-theme';
import { MaterialIcons } from '@expo/vector-icons';

const QUANTITY_UNITS = [
  { id: 'ml', label: 'ml', value: 'ml' },
  { id: 'l', label: 'L', value: 'l' },
  { id: 'oz', label: 'fl oz', value: 'oz' },
  { id: 'pint', label: 'Pint', value: 'pint' },
  { id: 'shot', label: 'Shot (1.5 oz)', value: 'shot' },
  { id: 'glass', label: 'Glass (5 oz)', value: 'glass' },
];

export default function QuantityInput({
  quantity,
  unit,
  onQuantityChange,
  onUnitChange,
  hasError = false,
}) {
  const [isUnitPickerVisible, setUnitPickerVisible] = useState(false);

  const selectedUnit = QUANTITY_UNITS.find(u => u.value === unit);

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        {/* Quantity Input */}
        <View style={[styles.quantityInputContainer, hasError && styles.inputError]}>
          <TextInput
            style={styles.quantityInput}
            placeholder="0"
            placeholderTextColor={colors.text.tertiary}
            value={quantity}
            onChangeText={onQuantityChange}
            keyboardType="decimal-pad"
            maxLength={6}
          />
        </View>

        {/* Unit Selector */}
        <TouchableOpacity
          style={[styles.unitButton, hasError && styles.unitButtonError]}
          onPress={() => setUnitPickerVisible(true)}
        >
          <Text style={styles.unitText}>{selectedUnit?.label || 'ml'}</Text>
          <MaterialIcons
            name="expand-more"
            size={20}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      </View>

      {/* Quick Select Buttons */}
      <View style={styles.quickSelectContainer}>
        <Text style={styles.quickSelectLabel}>Quick select:</Text>
        <View style={styles.quickSelectButtons}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => {
              onQuantityChange('250');
              onUnitChange('ml');
            }}
          >
            <Text style={styles.quickButtonText}>250ml</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => {
              onQuantityChange('500');
              onUnitChange('ml');
            }}
          >
            <Text style={styles.quickButtonText}>500ml</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => {
              onQuantityChange('1.5');
              onUnitChange('shot');
            }}
          >
            <Text style={styles.quickButtonText}>1 Shot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => {
              onQuantityChange('5');
              onUnitChange('glass');
            }}
          >
            <Text style={styles.quickButtonText}>1 Glass</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Unit Picker Modal */}
      <Modal
        visible={isUnitPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setUnitPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Unit</Text>
              <TouchableOpacity onPress={() => setUnitPickerVisible(false)}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={colors.text.primary}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={QUANTITY_UNITS}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.unitOption,
                    unit === item.value && styles.unitOptionSelected,
                  ]}
                  onPress={() => {
                    onUnitChange(item.value);
                    setUnitPickerVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.unitOptionText,
                      unit === item.value && styles.unitOptionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {unit === item.value && (
                    <MaterialIcons
                      name="check-circle"
                      size={24}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
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
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  quantityInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
  },
  inputError: {
    borderColor: colors.error || '#FF6B6B',
  },
  quantityInput: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.text.primary,
    ...typography.body,
    fontSize: 16,
    fontWeight: '500',
  },
  unitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background.secondary,
    minWidth: 100,
  },
  unitButtonError: {
    borderColor: colors.error || '#FF6B6B',
  },
  unitText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '500',
    marginRight: 4,
  },
  quickSelectContainer: {
    marginBottom: 8,
  },
  quickSelectLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  quickSelectButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 6,
    backgroundColor: colors.background.secondary,
  },
  quickButtonText: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '500',
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
    maxHeight: '60%',
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
  unitOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  unitOptionSelected: {
    backgroundColor: colors.background.secondary,
  },
  unitOptionText: {
    ...typography.body,
    color: colors.text.primary,
  },
  unitOptionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
