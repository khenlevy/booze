import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography } from '@/constants/parcus-theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function RatingSelector({
  rating,
  onRatingChange,
  hasError = false,
}) {
  const renderStars = () => {
    return (
      <View style={[styles.starsContainer, hasError && styles.starsContainerError]}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            style={styles.starButton}
            onPress={() => onRatingChange(star)}
          >
            <MaterialIcons
              name={star <= rating ? 'star' : 'star-outline'}
              size={40}
              color={star <= rating ? colors.warning : colors.border.default}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getRatingLabel = () => {
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
  };

  return (
    <View style={styles.container}>
      {renderStars()}
      
      <View style={styles.ratingInfo}>
        <Text style={styles.ratingLabel}>{getRatingLabel()}</Text>
        {rating > 0 && (
          <Text style={styles.ratingValue}>{rating} out of 5</Text>
        )}
      </View>

      {/* Rating Descriptions */}
      <View style={styles.descriptionsContainer}>
        <View style={styles.descriptionRow}>
          <View style={styles.descriptionDot} />
          <Text style={styles.descriptionText}>1 = Poor - Wouldn't drink again</Text>
        </View>
        <View style={styles.descriptionRow}>
          <View style={styles.descriptionDot} />
          <Text style={styles.descriptionText}>3 = Good - Would drink again</Text>
        </View>
        <View style={styles.descriptionRow}>
          <View style={styles.descriptionDot} />
          <Text style={styles.descriptionText}>5 = Excellent - Highly recommend</Text>
        </View>
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
  starsContainerError: {
    opacity: 0.7,
  },
  starButton: {
    padding: 8,
  },
  ratingInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingLabel: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 4,
  },
  ratingValue: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  descriptionsContainer: {
    width: '100%',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  descriptionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.text.secondary,
    marginTop: 6,
  },
  descriptionText: {
    ...typography.caption,
    color: colors.text.secondary,
    flex: 1,
  },
});
