import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '@/constants/parcus-theme';

export default function SocialButton({ label, onPress, variant }) {
  const isApple = variant === 'apple';
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isApple ? styles.appleButton : styles.googleButton,
      ]}
      onPress={onPress}
    >
      {isApple ? (
        <Ionicons
          name="logo-apple"
          size={24}
          color={colors.common.white}
          style={styles.icon}
        />
      ) : (
        <Ionicons
          name="logo-google"
          size={24}
          color={colors.text.primary}
          style={styles.icon}
        />
      )}
      <Text
        style={[styles.text, isApple ? styles.appleText : styles.googleText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  appleButton: {
    backgroundColor: colors.common.black,
  },
  googleButton: {
    backgroundColor: colors.common.white,
    borderWidth: 1,
    borderColor: colors.text.secondary,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    ...typography.button,
    fontSize: 16,
  },
  appleText: {
    color: colors.common.white,
  },
  googleText: {
    color: colors.text.primary,
  },
});
