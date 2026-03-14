/**
 * Parcus theme - colors and typography
 * Ported from parcus_mobile
 */

export const colors = {
  primary: '#5572C3',
  error: '#F44336',
  brand: {
    primary: '#5572C3',
    background: '#F9F6FF',
  },
  text: {
    primary: '#32253C',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#ffffff',
  },
  background: {
    primary: '#F9F6FF',
    secondary: '#ffffff',
    card: '#ffffff',
  },
  surface: '#ffffff',
  border: {
    default: '#E0E0E0',
    light: '#F0F0F0',
  },
  state: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
  },
  common: {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
  },
};

export const typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    color: colors.text.primary,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: colors.text.secondary,
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: colors.text.secondary,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: colors.text.secondary,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: colors.text.tertiary,
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.text.inverse,
  },
};

export const parcusTheme = {
  colors,
  typography,
};
