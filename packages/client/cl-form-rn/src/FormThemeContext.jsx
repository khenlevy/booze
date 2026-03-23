import { createContext, useContext } from 'react';
import { defaultFormTheme } from './theme/defaultTheme.js';

const FormThemeContext = createContext(defaultFormTheme);

/**
 * @param {{ value?: typeof defaultFormTheme, children: import('react').ReactNode }} props
 */
export function FormThemeProvider({ value, children }) {
  return (
    <FormThemeContext.Provider value={value ?? defaultFormTheme}>
      {children}
    </FormThemeContext.Provider>
  );
}

export function useFormTheme() {
  return useContext(FormThemeContext);
}
