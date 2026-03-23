import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { useFormTheme } from './FormThemeContext.jsx';

/**
 * @param {{
 *   date: Date,
 *   time: Date,
 *   onDateChange: (d: Date) => void,
 *   onTimeChange: (t: Date) => void,
 *   hasError?: boolean,
 *   icons?: {
 *     calendar?: () => import('react').ReactNode,
 *     schedule?: () => import('react').ReactNode,
 *     chevronRight?: () => import('react').ReactNode,
 *   },
 * }} props
 */
export function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  hasError = false,
  icons = {},
}) {
  const theme = useFormTheme();
  const { colors: c, typography: typo } = theme;
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [tempDate, setTempDate] = useState(date);
  const [tempTime, setTempTime] = useState(time);

  const borderErr = hasError ? c.error : c.borderDefault;

  const Cal = icons.calendar || (() => <Text style={{ fontSize: 16 }}>▦</Text>);
  const Sched =
    icons.schedule || (() => <Text style={{ fontSize: 16 }}>◷</Text>);
  const Chev =
    icons.chevronRight ||
    (() => <Text style={{ fontSize: 16, color: c.textSecondary }}>›</Text>);

  const formatDate = (dateObj) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (dateObj.toDateString() === today.toDateString()) return 'Today';
    if (dateObj.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year:
        dateObj.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
  };

  const formatTime = (timeObj) =>
    timeObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

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
        t.setHours(hour, minute, 0, 0);
        times.push(t);
      }
    }
    return times;
  };

  const rowStyle = [
    styles.pickerButton,
    { borderColor: borderErr, backgroundColor: c.backgroundSecondary },
  ];

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 12 }}>
        <TouchableOpacity style={rowStyle} onPress={() => setDateOpen(true)}>
          <View style={{ marginRight: 12 }}>
            <Cal />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                typo.caption,
                { color: c.textSecondary, marginBottom: 4 },
              ]}
            >
              Date
            </Text>
            <Text
              style={[typo.body, { color: c.textPrimary, fontWeight: '500' }]}
            >
              {formatDate(date)}
            </Text>
          </View>
          <Chev />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 12 }}>
        <TouchableOpacity style={rowStyle} onPress={() => setTimeOpen(true)}>
          <View style={{ marginRight: 12 }}>
            <Sched />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                typo.caption,
                { color: c.textSecondary, marginBottom: 4 },
              ]}
            >
              Time
            </Text>
            <Text
              style={[typo.body, { color: c.textPrimary, fontWeight: '500' }]}
            >
              {formatTime(time)}
            </Text>
          </View>
          <Chev />
        </TouchableOpacity>
      </View>

      <Modal
        visible={dateOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setDateOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: c.backgroundPrimary },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                { borderBottomColor: c.borderDefault },
              ]}
            >
              <TouchableOpacity onPress={() => setDateOpen(false)}>
                <Text
                  style={[
                    typo.body,
                    { color: c.brandPrimary, fontWeight: '500' },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <Text style={[typo.h3, { color: c.textPrimary }]}>
                Select Date
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onDateChange(tempDate);
                  setDateOpen(false);
                }}
              >
                <Text
                  style={[
                    typo.body,
                    { color: c.brandPrimary, fontWeight: '500' },
                  ]}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{ maxHeight: 300 }}
              showsVerticalScrollIndicator={false}
            >
              {getDateRange().map((d, index) => {
                const sel = tempDate.toDateString() === d.toDateString();
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.opt,
                      { borderBottomColor: c.borderLight },
                      sel && { backgroundColor: c.backgroundSecondary },
                    ]}
                    onPress={() => setTempDate(d)}
                  >
                    <Text
                      style={[
                        typo.body,
                        {
                          color: sel ? c.brandPrimary : c.textPrimary,
                          fontWeight: sel ? '600' : '400',
                        },
                      ]}
                    >
                      {formatDate(d)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={timeOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setTimeOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: c.backgroundPrimary },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                { borderBottomColor: c.borderDefault },
              ]}
            >
              <TouchableOpacity onPress={() => setTimeOpen(false)}>
                <Text
                  style={[
                    typo.body,
                    { color: c.brandPrimary, fontWeight: '500' },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <Text style={[typo.h3, { color: c.textPrimary }]}>
                Select Time
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onTimeChange(tempTime);
                  setTimeOpen(false);
                }}
              >
                <Text
                  style={[
                    typo.body,
                    { color: c.brandPrimary, fontWeight: '500' },
                  ]}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{ maxHeight: 300 }}
              showsVerticalScrollIndicator={false}
            >
              {getTimeRange().map((t, index) => {
                const sel =
                  tempTime.getHours() === t.getHours() &&
                  tempTime.getMinutes() === t.getMinutes();
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.opt,
                      { borderBottomColor: c.borderLight },
                      sel && { backgroundColor: c.backgroundSecondary },
                    ]}
                    onPress={() => setTempTime(t)}
                  >
                    <Text
                      style={[
                        typo.body,
                        {
                          color: sel ? c.brandPrimary : c.textPrimary,
                          fontWeight: sel ? '600' : '400',
                        },
                      ]}
                    >
                      {formatTime(t)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
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
  },
  opt: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
});
