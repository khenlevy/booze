import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMemo } from 'react';
import { useFormTheme } from './FormThemeContext.jsx';

function DefaultStar({ selected, onPress, theme }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.starButton}>
      <Text
        style={{
          fontSize: 36,
          color: selected ? theme.colors.warning : theme.colors.borderDefault,
        }}
      >
        {selected ? '★' : '☆'}
      </Text>
    </TouchableOpacity>
  );
}

/**
 * @param {{
 *   rating: number,
 *   onRatingChange: (n: number) => void,
 *   hasError?: boolean,
 *   StarComponent?: import('react').ComponentType<{
 *     selected: boolean,
 *     onPress: () => void,
 *     starNumber: number,
 *     theme: ReturnType<typeof useFormTheme>,
 *   }>,
 * }} props
 */
export function RatingSelector({
  rating,
  onRatingChange,
  hasError = false,
  StarComponent,
}) {
  const theme = useFormTheme();
  const Star = StarComponent || DefaultStar;

  const ratingLabel = useMemo(() => {
    switch (rating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return 'Not rated';
    }
  }, [rating]);

  const t = theme.colors;
  const typo = theme.typography;

  return (
    <View style={styles.container}>
      <View style={[styles.starsContainer, hasError && styles.starsDim]}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            selected={star <= rating}
            onPress={() => onRatingChange(star)}
            starNumber={star}
            theme={theme}
          />
        ))}
      </View>

      <View style={styles.ratingInfo}>
        <Text style={[typo.h3, { color: t.textPrimary, marginBottom: 4 }]}>
          {ratingLabel}
        </Text>
        {rating > 0 ? (
          <Text style={[typo.caption, { color: t.textSecondary }]}>
            {rating} out of 5
          </Text>
        ) : null}
      </View>

      <View
        style={[
          styles.descriptionsContainer,
          { backgroundColor: t.backgroundSecondary },
        ]}
      >
        {[
          '1 = Poor — would not drink again',
          '3 = Good — would drink again',
          '5 = Excellent — highly recommend',
        ].map((line) => (
          <View key={line} style={styles.descriptionRow}>
            <View style={[styles.dot, { backgroundColor: t.textSecondary }]} />
            <Text style={[typo.caption, { color: t.textSecondary, flex: 1 }]}>
              {line}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  starsDim: {
    opacity: 0.7,
  },
  starButton: {
    padding: 8,
  },
  ratingInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  descriptionsContainer: {
    width: '100%',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
});
