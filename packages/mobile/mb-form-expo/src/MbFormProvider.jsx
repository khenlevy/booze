import { FormThemeProvider } from '@booze/cl-form-rn';
import { boozeNativeFormTheme } from './boozeNativeFormTheme.js';

/**
 * Wraps the app (or a screen) so @booze/cl-form-rn hooks receive Booze tokens.
 * @param {{ theme?: typeof boozeNativeFormTheme, children: import('react').ReactNode }} props
 */
export function MbFormProvider({ theme = boozeNativeFormTheme, children }) {
  return <FormThemeProvider value={theme}>{children}</FormThemeProvider>;
}
