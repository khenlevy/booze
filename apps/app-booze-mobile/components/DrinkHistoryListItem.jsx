import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors, typography } from '@/constants/parcus-theme';

/**
 * DrinkHistoryListItem Component
 * Displays a single drink log entry in the history list
 */
const DrinkHistoryListItem = ({
  drinkLog,
  onEdit,
  onDelete,
  onPress,
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
    if (isYesterday) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= rating ? '★' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Drink Log',
      `Are you sure you want to delete "${drinkLog.drinkName}"?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setIsDeleting(true);
            try {
              await onDelete(drinkLog._id);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete drink log');
            } finally {
              setIsDeleting(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDeleting}
    >
      <View style={styles.content}>
        {/* Header: Drink Name and Date */}
        <View style={styles.header}>
          <Text style={styles.drinkName} numberOfLines={1}>
            {drinkLog.drinkName}
          </Text>
          <Text style={styles.date}>{formatDate(drinkLog.consumedAt)}</Text>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>{renderStars(drinkLog.rating)}</View>
          <Text style={styles.ratingText}>{drinkLog.rating}/5</Text>
        </View>

        {/* Quantity and ABV */}
        <View style={styles.detailsRow}>
          <Text style={styles.detail}>
            {drinkLog.quantity} {drinkLog.quantityUnit || 'ml'}
          </Text>
          {drinkLog.abv !== null && drinkLog.abv !== undefined && (
            <Text style={styles.detail}>
              {drinkLog.abv}% ABV
            </Text>
          )}
        </View>

        {/* Notes */}
        {drinkLog.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            {drinkLog.notes}
          </Text>
        )}

        {/* Taste Tags */}
        {drinkLog.tasteTags && drinkLog.tasteTags.length > 0 && (
          <View style={styles.tagsContainer}>
            {drinkLog.tasteTags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
            {drinkLog.tasteTags.length > 3 && (
              <Text style={styles.moreTagsText}>
                +{drinkLog.tasteTags.length - 3}
              </Text>
            )}
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => onEdit(drinkLog)}
          disabled={isDeleting}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <ActivityIndicator size="small" color={colors.state.error} />
          ) : (
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
              Delete
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    marginBottom: 12,
  },
  header: {
    marginBottom: 8,
  },
  drinkName: {
    ...typography.h2,
    marginBottom: 4,
    color: colors.text.primary,
  },
  date: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 16,
    color: colors.brand.primary,
    marginRight: 2,
  },
  ratingText: {
    ...typography.body2,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detail: {
    ...typography.body2,
    color: colors.text.secondary,
    marginRight: 16,
  },
  notes: {
    ...typography.body2,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: colors.brand.background,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    ...typography.body2,
    color: colors.brand.primary,
    fontSize: 12,
  },
  moreTagsText: {
    ...typography.body2,
    color: colors.text.secondary,
    fontSize: 12,
    alignSelf: 'center',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: colors.brand.primary,
  },
  deleteButton: {
    backgroundColor: '#FFE8E8',
    borderWidth: 1,
    borderColor: colors.state.error,
  },
  actionButtonText: {
    ...typography.button,
    fontSize: 12,
    color: colors.text.inverse,
  },
  deleteButtonText: {
    color: colors.state.error,
  },
});

export default DrinkHistoryListItem;
