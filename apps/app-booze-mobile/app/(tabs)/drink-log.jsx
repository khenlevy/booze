import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import DrinkLogEntryForm from '@/components/DrinkLogEntryForm';
import { validateDrinkLogForm } from '@/utils/formValidation';
import { createDrinkLog, retryWithBackoff } from '@/utils/drinkLogApi';
import { useAuth } from '@/contexts/AuthContext';

export default function DrinkLogScreen() {
  const router = useRouter();
  const { userId } = useAuth();
  const params = useLocalSearchParams();
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

  useEffect(() => {
    const name = params.drinkName ? String(params.drinkName) : '';
    const id = params.catalogDrinkId ? String(params.catalogDrinkId) : '';
    if (name || id) {
      setFormData((prev) => ({
        ...prev,
        drinkId: id || prev.drinkId,
        drinkName: name || prev.drinkName,
      }));
    }
  }, [params.drinkName, params.catalogDrinkId]);

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

  const handleSubmit = useCallback(async () => {
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
      const rawId = formData.drinkId?.trim?.() || '';
      const drinkId =
        rawId && /^[a-f0-9]{24}$/i.test(rawId) ? rawId : null;
      const payload = {
        userId,
        drinkId,
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
      
      // Use retry logic for API call
      await retryWithBackoff(
        () => createDrinkLog(payload),
        3, // maxRetries
        1000 // delay in ms
      );
      
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
      console.error('Error submitting drink log:', error);
      
      // Provide user-friendly error message
      let errorMessage = 'Failed to log drink. Please try again.';
      if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, userId]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            accessibilityLabel="Go back"
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colors.text.primary}
            />
          </TouchableOpacity>
        </View>
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
    paddingTop: 8,
    paddingBottom: Platform.select({ ios: 100, android: 80 }),
  },
  topBar: {
    marginBottom: 8,
  },
  backBtn: {
    alignSelf: 'flex-start',
    padding: 8,
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
