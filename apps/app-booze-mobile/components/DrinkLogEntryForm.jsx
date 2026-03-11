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
import DrinkSelector from './form/DrinkSelector';
import DateTimePicker from './form/DateTimePicker';
import QuantityInput from './form/QuantityInput';
import RatingSelector from './form/RatingSelector';

export default function DrinkLogEntryForm({
  formData,
  onFormChange,
  isSubmitting,
  onSubmit,
}) {
  return (
    <View style={styles.container}>
      {/* Drink Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Select Drink *</Text>
        <DrinkSelector
          selectedDrinkId={formData.drinkId}
          selectedDrinkName={formData.drinkName}
          onSelectDrink={(drinkId, drinkName) => {
            onFormChange('drinkId', drinkId);
            onFormChange('drinkName', drinkName);
          }}
        />
      </View>

      {/* Date & Time */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>When did you drink it? *</Text>
        <DateTimePicker
          date={formData.date}
          time={formData.time}
          onDateChange={(date) => onFormChange('date', date)}
          onTimeChange={(time) => onFormChange('time', time)}
        />
      </View>

      {/* Quantity */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Quantity *</Text>
        <QuantityInput
          quantity={formData.quantity}
          unit={formData.quantityUnit}
          onQuantityChange={(quantity) => onFormChange('quantity', quantity)}
          onUnitChange={(unit) => onFormChange('quantityUnit', unit)}
        />
      </View>

      {/* Rating */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>How would you rate it? *</Text>
        <RatingSelector
          rating={formData.rating}
          onRatingChange={(rating) => onFormChange('rating', rating)}
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
  sectionLabel: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: 12,
    fontWeight: '600',
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
