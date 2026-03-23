import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '@/constants/parcus-theme';
import BottomBar from '@/components/parcus/BottomBar';
import DrinkLogEntryForm from '@/components/DrinkLogEntryForm';
import { CatalogSelector } from '@booze/mb-form-expo';
import { MOCK_DRINKS } from '@/data/drink-catalog-mock';
import { validateDrinkLogForm } from '@/utils/formValidation';
import { createDrinkLog, retryWithBackoff } from '@/utils/drinkLogApi';
import { useAuth } from '@/contexts/AuthContext';

export default function DrinkLogScreen() {
  const router = useRouter();
  const { userId } = useAuth();
  const params = useLocalSearchParams();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    drinkId: '',
    drinkName: '',
    date: new Date(),
    time: new Date(),
    quantity: '1',
    quantityUnit: 'bottle',
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleCatalogPick = (drinkId, drinkName) => {
    router.push({
      pathname: '/(tabs)/log-sentiment',
      params: {
        catalogDrinkId: drinkId,
        drinkName,
      },
    });
  };

  const handleSubmit = useCallback(async () => {
    const validation = validateDrinkLogForm(formData);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      const firstError = Object.values(validation.errors)[0];
      Alert.alert('Validation Error', firstError);
      return;
    }

    setIsSubmitting(true);
    try {
      const rawId = formData.drinkId?.trim?.() || '';
      const drinkId =
        rawId && /^[a-f0-9]{24}$/i.test(rawId) ? rawId : null;
      const catalogDrinkId = drinkId ? undefined : rawId || undefined;

      const payload = {
        userId,
        drinkId,
        drinkName: formData.drinkName,
        entryType: 'taste_log',
        consumedAt: new Date(
          formData.date.getFullYear(),
          formData.date.getMonth(),
          formData.date.getDate(),
          formData.time.getHours(),
          formData.time.getMinutes(),
        ).toISOString(),
        quantity: parseFloat(formData.quantity, 10),
        quantityUnit: formData.quantityUnit,
        rating: formData.rating,
        notes: formData.notes || '',
        ...(catalogDrinkId ? { catalogDrinkId } : {}),
      };

      await retryWithBackoff(() => createDrinkLog(payload), 3, 1000);

      Alert.alert('Success', 'Drink logged successfully!');

      setFormData({
        drinkId: '',
        drinkName: '',
        date: new Date(),
        time: new Date(),
        quantity: '1',
        quantityUnit: 'bottle',
        rating: 0,
        notes: '',
      });
      setValidationErrors({});
    } catch (error) {
      console.error('Error submitting drink log:', error);
      Alert.alert('Error', error.message || 'Failed to log drink.');
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
        <View style={styles.header}>
          <Text style={styles.title}>Log a drink</Text>
          <Text style={styles.subtitle}>
            Scan the barcode or pick a bottle — then tap how it tasted. We save
            the date and bottle for you.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryCta}
          onPress={() => router.push('/(tabs)/scan-log')}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons
            name="barcode-scan"
            size={28}
            color={colors.text.inverse}
          />
          <Text style={styles.primaryCtaText}>Scan bottle</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Or pick from catalog</Text>
          <CatalogSelector
            items={MOCK_DRINKS}
            selectedDrinkId={formData.drinkId}
            selectedDrinkName={formData.drinkName}
            onSelectDrink={handleCatalogPick}
            hasError={false}
          />
        </View>

        <TouchableOpacity
          style={styles.advancedToggle}
          onPress={() => setShowAdvanced((v) => !v)}
        >
          <Text style={styles.advancedToggleText}>
            {showAdvanced ? 'Hide detailed log' : 'Detailed log (date, quantity, stars, notes)'}
          </Text>
          <MaterialCommunityIcons
            name={showAdvanced ? 'chevron-up' : 'chevron-down'}
            size={22}
            color={colors.brand.primary}
          />
        </TouchableOpacity>

        {showAdvanced ? (
          <DrinkLogEntryForm
            catalogItems={MOCK_DRINKS}
            formData={formData}
            onFormChange={handleFormChange}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            validationErrors={validationErrors}
          />
        ) : null}
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: Platform.select({ ios: 100, android: 80 }),
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body2,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  primaryCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.brand.primary,
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: spacing.xl,
  },
  primaryCtaText: {
    ...typography.button,
    fontSize: 18,
    color: colors.text.inverse,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.body2,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 10,
  },
  advancedToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  advancedToggleText: {
    ...typography.body2,
    color: colors.brand.primary,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
});
