import { MaterialIcons } from '@expo/vector-icons';
import {
  DateTimePicker as ClDateTimePicker,
  useFormTheme,
} from '@booze/cl-form-rn';

export function DateTimePicker(props) {
  const theme = useFormTheme();
  const c = theme.colors;
  return (
    <ClDateTimePicker
      {...props}
      icons={{
        calendar: () => (
          <MaterialIcons
            name="calendar-today"
            size={20}
            color={c.brandPrimary}
          />
        ),
        schedule: () => (
          <MaterialIcons name="schedule" size={20} color={c.brandPrimary} />
        ),
        chevronRight: () => (
          <MaterialIcons
            name="chevron-right"
            size={20}
            color={c.textSecondary}
          />
        ),
      }}
    />
  );
}
