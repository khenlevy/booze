import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="drink-history" />
      <Stack.Screen name="drink-log" />
      <Stack.Screen name="scan-log" />
      <Stack.Screen name="log-sentiment" />
      <Stack.Screen name="account" />
    </Stack>
  );
}
