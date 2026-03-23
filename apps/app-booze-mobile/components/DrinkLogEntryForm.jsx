import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { colors, typography } from '@/constants/parcus-theme';
import { MaterialIcons } from '@expo/vector-icons';
import {
  CatalogSelector,
  DateTimePicker,
  QuantityInput,
  RatingSelector,
} from '@booze/mb-form-expo';

export default function DrinkLogEntryForm({
  catalogItems,
  formData,
  onFormChange,
  isSubmitting,
  onSubmit,
  validationErrors = {},
}) {
  const getErrorMessage = (fieldName) => {
    return validationErrors[fieldName] || null;
  };

  const hasError = (fieldName) => {
    return !!validationErrors[fieldName];
  };

  return (
    <View style={styles.container}>
      {/* Drink Selection */}
      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Text style={styles.sectionLabel}>Select Drink *</Text>
          {hasError('drinkId') && (
            <Text style={styles.errorText}>{getErrorMessage('drinkId')}</Text>
          )}
        </View>
        <CatalogSelector
          items={catalogItems}
          selectedDrinkId={formData.drinkId}
          selectedDrinkName={formData.drinkName}
          onSelectDrink={(drinkId, drinkName) => {
            onFormChange('drinkId', drinkId);
            onFormChange('drinkName', drinkName);
          }}
          hasError={hasError('drinkId')}
        />
      </View>

      {/* Date & Time */}
      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Text style={styles.sectionLabel}>When did you drink it? *</Text>
          {(hasError('date') || hasError('time')) && (
            <Text style={styles.errorText}>
              {getErrorMessage('date') || getErrorMessage('time')}
            </Text>
          )}
        </View>
        <DateTimePicker
          date={formData.date}
          time={formData.time}
          onDateChange={(date) => onFormChange('date', date)}
          onTimeChange={(time) => onFormChange('time', time)}
          hasError={hasError('date') || hasError('time')}
        />
      </View>

      {/* Quantity */}
      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Text style={styles.sectionLabel}>Quantity *</Text>
          {hasError('quantity') && (
            <Text style={styles.errorText}>{getErrorMessage('quantity')}</Text>
          )}
        </View>
        <QuantityInput
          quantity={formData.quantity}
          unit={formData.quantityUnit}
          onQuantityChange={(quantity) => onFormChange('quantity', quantity)}
          onUnitChange={(unit) => onFormChange('quantityUnit', unit)}
          hasError={hasError('quantity')}
        />
      </View>

      {/* Rating */}
      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Text style={styles.sectionLabel}>How would you rate it? *</Text>
          {hasError('rating') && (
            <Text style={styles.errorText}>{getErrorMessage('rating')}</Text>
          )}
        </View>
        <RatingSelector
          rating={formData.rating}
          onRatingChange={(rating) => onFormChange('rating', rating)}
          hasError={hasError('rating')}
        />
      </View>

      {/* Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Notes (Optional)</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add any notes about this drink..."
          placeholderTextColor={colors.text.tertiary}
          value={formData.notes}
          onChangeText={(text) => onFormChange('notes', text)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color={colors.text.inverse} size="small" />
        ) : (
          <Text style={styles.submitButtonText}>Log Drink</Text>
        )}
      </TouchableOpacity>

      {/* Required Fields Note */}
      <Text style={styles.requiredNote}>* Required fields</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  section: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.text.primary,
    fontWeight: '600',
  },
  errorText: {
    ...typography.caption,
    color: colors.error || '#FF6B6B',
    fontWeight: '500',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.background.secondary,
    color: colors.text.primary,
    ...typography.body,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    ...typography.button,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  requiredNote: {
    ...typography.caption,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: 8,
  },
});
