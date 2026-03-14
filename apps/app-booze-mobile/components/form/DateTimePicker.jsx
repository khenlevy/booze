import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { colors, typography } from '@/constants/parcus-theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  hasError = false,
}) {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState(date);
  const [tempTime, setTempTime] = useState(time);

  const handleDateConfirm = () => {
    onDateChange(tempDate);
    setDatePickerVisible(false);
  };

  const handleTimeConfirm = () => {
    onTimeChange(tempTime);
    setTimePickerVisible(false);
  };

  const formatDate = (dateObj) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateObj.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (dateObj.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: dateObj.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  const formatTime = (timeObj) => {
    return timeObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getDateRange = () => {
    const today = new Date();
    const dates = [];
    for (let i = 30; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dates.push(d);
    }
    return dates;
  };

  const getTimeRange = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const t = new Date();
        t.setHours(hour, minute, 0);
        times.push(t);
      }
    }
    return times;
  };

  return (
    <View style={styles.container}>
      {/* Date Picker */}
      <View style={styles.pickerRow}>
        <TouchableOpacity
          style={[styles.pickerButton, hasError && styles.pickerButtonError]}
          onPress={() => setDatePickerVisible(true)}
        >
          <MaterialIcons
            name="calendar-today"
            size={20}
            color={colors.primary}
            style={styles.pickerIcon}
          />
          <View style={styles.pickerContent}>
            <Text style={styles.pickerLabel}>Date</Text>
            <Text style={styles.pickerValue}>{formatDate(date)}</Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      </View>

      {/* Time Picker */}
      <View style={styles.pickerRow}>
        <TouchableOpacity
          style={[styles.pickerButton, hasError && styles.pickerButtonError]}
          onPress={() => setTimePickerVisible(true)}
        >
          <MaterialIcons
            name="schedule"
            size={20}
            color={colors.primary}
            style={styles.pickerIcon}
          />
          <View style={styles.pickerContent}>
            <Text style={styles.pickerLabel}>Time</Text>
            <Text style={styles.pickerValue}>{formatTime(time)}</Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <Modal
        visible={isDatePickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setDatePickerVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={handleDateConfirm}>
                <Text style={[styles.modalButtonText, styles.confirmButton]}>Done</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.pickerScroll}
              showsVerticalScrollIndicator={false}
            >
              {getDateRange().map((d, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateOption,
                    tempDate.toDateString() === d.toDateString() && styles.selectedOption,
                  ]}
                  onPress={() => setTempDate(d)}
                >
                  <Text
                    style={[
                      styles.dateOptionText,
                      tempDate.toDateString() === d.toDateString() && styles.selectedOptionText,
                    ]}
                  >
                    {formatDate(d)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        visible={isTimePickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTimePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setTimePickerVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Time</Text>
              <TouchableOpacity onPress={handleTimeConfirm}>
                <Text style={[styles.modalButtonText, styles.confirmButton]}>Done</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.pickerScroll}
              showsVerticalScrollIndicator={false}
            >
              {getTimeRange().map((t, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeOption,
                    tempTime.getHours() === t.getHours() &&
                      tempTime.getMinutes() === t.getMinutes() &&
                      styles.selectedOption,
                  ]}
                  onPress={() => setTempTime(t)}
                >
                  <Text
                    style={[
                      styles.timeOptionText,
                      tempTime.getHours() === t.getHours() &&
                        tempTime.getMinutes() === t.getMinutes() &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {formatTime(t)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pickerRow: {
    marginBottom: 12,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.background.secondary,
  },
  pickerButtonError: {
    borderColor: colors.error || '#FF6B6B',
  },
  pickerIcon: {
    marginRight: 12,
  },
  pickerContent: {
    flex: 1,
  },
  pickerLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  pickerValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  modalButtonText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '500',
  },
  confirmButton: {
    color: colors.primary,
  },
  pickerScroll: {
    maxHeight: 300,
  },
  dateOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  timeOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  dateOptionText: {
    ...typography.body,
    color: colors.text.primary,
  },
  timeOptionText: {
    ...typography.body,
    color: colors.text.primary,
  },
  selectedOption: {
    backgroundColor: colors.background.secondary,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
