import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  RatingSelector as ClRatingSelector,
  useFormTheme,
} from '@booze/cl-form-rn';

export function RatingSelector(props) {
  const theme = useFormTheme();
  return (
    <ClRatingSelector
      {...props}
      StarComponent={({ selected, onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ padding: 8 }}>
          <MaterialIcons
            name={selected ? 'star' : 'star-outline'}
            size={40}
            color={selected ? theme.colors.warning : theme.colors.borderDefault}
          />
        </TouchableOpacity>
      )}
    />
  );
}
