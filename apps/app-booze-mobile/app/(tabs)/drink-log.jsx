import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors, typography } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import DrinkLogEntryForm from '@/components/DrinkLogEntryForm';

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

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.drinkId) {
      Alert.alert('Error', 'Please select a drink');
      return;
    }
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }
    if (formData.rating === 0) {
      Alert.alert('Error', 'Please rate the drink');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Integrate with API to submit drink log entry
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
        notes: formData.notes,
      };

      console.log('Submitting drink log entry:', payload);
      
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
