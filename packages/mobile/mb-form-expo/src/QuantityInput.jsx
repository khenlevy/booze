import { MaterialIcons } from '@expo/vector-icons';
import {
  QuantityInput as ClQuantityInput,
  useFormTheme,
} from '@booze/cl-form-rn';

export function QuantityInput(props) {
  const theme = useFormTheme();
  const c = theme.colors;
  return (
    <ClQuantityInput
      {...props}
      icons={{
        expandMore: () => (
          <MaterialIcons name="expand-more" size={20} color={c.textSecondary} />
        ),
        close: () => (
          <MaterialIcons name="close" size={24} color={c.textPrimary} />
        ),
        checkCircle: () => (
          <MaterialIcons name="check-circle" size={24} color={c.brandPrimary} />
        ),
      }}
    />
  );
}
