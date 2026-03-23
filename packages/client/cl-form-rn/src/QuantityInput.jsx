import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useState, useMemo } from 'react';
import { useFormTheme } from './FormThemeContext.jsx';
import { DEFAULT_QUANTITY_UNITS } from './quantityUnits.js';

/**
 * @param {{
 *   quantity: string,
 *   unit: string,
 *   onQuantityChange: (q: string) => void,
 *   onUnitChange: (u: string) => void,
 *   hasError?: boolean,
 *   units?: typeof DEFAULT_QUANTITY_UNITS,
 *   icons?: {
 *     expandMore?: () => import('react').ReactNode,
 *     close?: () => import('react').ReactNode,
 *     checkCircle?: () => import('react').ReactNode,
 *   },
 * }} props
 */
export function QuantityInput({
  quantity,
  unit,
  onQuantityChange,
  onUnitChange,
  hasError = false,
  units = DEFAULT_QUANTITY_UNITS,
  icons = {},
}) {
  const theme = useFormTheme();
  const [unitModal, setUnitModal] = useState(false);
  const selectedUnit = units.find((u) => u.value === unit);
  const { colors: c, typography: typo } = theme;

  const borderError = hasError ? c.error : c.borderDefault;

  const Expand =
    icons.expandMore || (() => <Text style={{ fontSize: 18 }}>▼</Text>);
  const Close = icons.close || (() => <Text style={{ fontSize: 18 }}>✕</Text>);
  const Check =
    icons.checkCircle ||
    (() => <Text style={{ color: c.brandPrimary }}>✓</Text>);

  const quick = useMemo(
    () => [
      { q: '250', u: 'ml', label: '250ml' },
      { q: '500', u: 'ml', label: '500ml' },
      { q: '1.5', u: 'shot', label: '1 Shot' },
      { q: '5', u: 'glass', label: '1 Glass' },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <View
          style={[
            styles.quantityBox,
            {
              borderColor: borderError,
              backgroundColor: c.backgroundSecondary,
            },
          ]}
        >
          <TextInput
            style={[
              typo.body,
              {
                color: c.textPrimary,
                fontWeight: '500',
                paddingHorizontal: 12,
                paddingVertical: 12,
              },
            ]}
            placeholder="0"
            placeholderTextColor={c.textTertiary}
            value={quantity}
            onChangeText={onQuantityChange}
            keyboardType="decimal-pad"
            maxLength={6}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.unitBtn,
            {
              borderColor: borderError,
              backgroundColor: c.backgroundSecondary,
            },
          ]}
          onPress={() => setUnitModal(true)}
        >
          <Text
            style={[
              typo.body,
              { color: c.textPrimary, fontWeight: '500', marginRight: 4 },
            ]}
          >
            {selectedUnit?.label || 'ml'}
          </Text>
          <Expand />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 8 }}>
        <Text
          style={[typo.caption, { color: c.textSecondary, marginBottom: 8 }]}
        >
          Quick select:
        </Text>
        <View style={styles.quickRow}>
          {quick.map(({ q, u, label }) => (
            <TouchableOpacity
              key={`${q}-${u}`}
              style={[
                styles.quickBtn,
                {
                  borderColor: c.borderDefault,
                  backgroundColor: c.backgroundSecondary,
                },
              ]}
              onPress={() => {
                onQuantityChange(q);
                onUnitChange(u);
              }}
            >
              <Text
                style={[
                  typo.caption,
                  { color: c.textPrimary, fontWeight: '500' },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal
        visible={unitModal}
        transparent
        animationType="slide"
        onRequestClose={() => setUnitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalSheet,
              { backgroundColor: c.backgroundPrimary },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                { borderBottomColor: c.borderDefault },
              ]}
            >
              <Text style={[typo.h2, { color: c.textPrimary }]}>
                Select Unit
              </Text>
              <TouchableOpacity onPress={() => setUnitModal(false)}>
                <Close />
              </TouchableOpacity>
            </View>
            <FlatList
              data={units}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.unitRow,
                    { borderBottomColor: c.borderLight },
                    unit === item.value && {
                      backgroundColor: c.backgroundSecondary,
                    },
                  ]}
                  onPress={() => {
                    onUnitChange(item.value);
                    setUnitModal(false);
                  }}
                >
                  <Text
                    style={[
                      typo.body,
                      {
                        color:
                          unit === item.value ? c.brandPrimary : c.textPrimary,
                        fontWeight: unit === item.value ? '600' : '400',
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {unit === item.value ? <Check /> : null}
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
  container: { width: '100%' },
  inputRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  quantityBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
  },
  unitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    minWidth: 100,
  },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
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
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
});
