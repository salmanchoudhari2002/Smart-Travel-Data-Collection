import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600' as const,
        },
      }}
    >
      <Stack.Screen
        name="household"
        options={{
          title: 'Household Profile',
        }}
      />
      <Stack.Screen
        name="trips"
        options={{
          title: 'My Trips',
        }}
      />
      <Stack.Screen
        name="add-trip"
        options={{
          title: 'Add Trip',
        }}
      />
      <Stack.Screen
        name="auto-mode"
        options={{
          title: 'Travel Mode',
        }}
      />
    </Stack>
  );
}
