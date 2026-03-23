import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="taste-category" />
      <Stack.Screen name="taste-tags" />
      <Stack.Screen name="budget-or-occasion" />
      <Stack.Screen name="your-picks" />
    </Stack>
  );
}
