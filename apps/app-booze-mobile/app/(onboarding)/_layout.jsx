import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="entrance" />
      <Stack.Screen name="community-intro" />
      <Stack.Screen name="offers-intro" />
      <Stack.Screen name="pay-less-intro" />
    </Stack>
  );
}
