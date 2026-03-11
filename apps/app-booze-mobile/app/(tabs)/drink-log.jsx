import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import DrinkLogEntryForm from '@/components/DrinkLogEntryForm';
import { validateDrinkLogForm } from '@/utils/formValidation';

export default function DrinkLogScreen() {
  const [formData, setFormData] = useState({
    drinkId: '',
    drinkName: '',
    date: new Date(),
    time: new Date(),
    quantity: '',
    quantityUnit: 'ml',
    rating: 0,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    // Validate form
    const validation = validateDrinkLogForm(formData);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      
      // Show first error as alert
      const firstError = Object.values(validation.errors)[0];
      Alert.alert('Validation Error', firstError);
      return;
    }

    setIsSubmitting(true);
    try {
      // Construct the payload
      const payload = {
        drinkId: formData.drinkId,
        drinkName: formData.drinkName,
        consumedAt: new Date(
          formData.date.getFullYear(),
          formData.date.getMonth(),
          formData.date.getDate(),
          formData.time.getHours(),
          formData.time.getMinutes()
        ),
        quantity: parseFloat(formData.quantity),
        quantityUnit: formData.quantityUnit,
        rating: formData.rating,
        notes: formData.notes || '',
      };

      console.log('Submitting drink log entry:', payload);
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/drink-logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert('Success', 'Drink logged successfully!');
      
      // Reset form
      setFormData({
        drinkId: '',
        drinkName: '',
        date: new Date(),
        time: new Date(),
        quantity: '',
        quantityUnit: 'ml',
        rating: 0,
        notes: '',
      });
      setValidationErrors({});
    } catch (error) {
      Alert.alert('Error', 'Failed to log drink. Please try again.');
      console.error('Error submitting drink log:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Log a Drink</Text>
          <Text style={styles.subtitle}>Track your drinking and rate your experience</Text>
        </View>

        <DrinkLogEntryForm 
          formData={formData}
          onFormChange={handleFormChange}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          validationErrors={validationErrors}
        />
      </ScrollView>
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
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.select({ ios: 100, android: 80 }),
  },
  header: {
    marginBottom: 24,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
