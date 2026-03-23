import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import { AuthProvider } from '@/contexts/AuthContext';
import { MbFormProvider } from '@booze/mb-form-expo';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <MbFormProvider>
      <AuthProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="search-results"
            options={{
              headerShown: true,
              title: 'Drink',
              headerStyle: { backgroundColor: '#F9F6FF' },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="result-view"
            options={{
              headerShown: true,
              title: 'Drink',
              headerStyle: { backgroundColor: '#F9F6FF' },
              headerShadowVisible: false,
            }}
          />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
      </AuthProvider>
      </MbFormProvider>
    </SafeAreaProvider>
  );
}
