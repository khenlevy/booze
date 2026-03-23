/**
 * Neutral defaults when no FormThemeProvider is used.
 * Override via MbFormProvider / FormThemeProvider in apps.
 */
export const defaultFormTheme = {
  colors: {
    textPrimary: '#111111',
    textSecondary: '#666666',
    textTertiary: '#999999',
    borderDefault: '#E0E0E0',
    borderLight: '#F0F0F0',
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#f5f5f7',
    brandPrimary: '#5572C3',
    warning: '#FFC107',
    error: '#FF6B6B',
  },
  typography: {
    h2: { fontSize: 24, lineHeight: 32, fontWeight: '600' },
    h3: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
    body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
    caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
    label: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
    button: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  },
};
