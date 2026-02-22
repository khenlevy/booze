/**
 * Parcus theme - colors and typography
 * Ported from parcus_mobile
 */

export const colors = {
  brand: {
    primary: '#5572C3',
    background: '#F9F6FF',
  },
  text: {
    primary: '#32253C',
    secondary: '#666666',
    inverse: '#ffffff',
  },
  background: {
    primary: '#F9F6FF',
    secondary: '#ffffff',
    card: '#ffffff',
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
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.text.inverse,
  },
};
