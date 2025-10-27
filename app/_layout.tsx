import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function isAbsoluteHttpUrl(value?: string) {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
  const hasValidUrl = isAbsoluteHttpUrl(convexUrl);

  if (!hasValidUrl) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <ThemedText type="title">Convex URL not set</ThemedText>
          <ThemedText style={{ marginTop: 8 }}>
            Set EXPO_PUBLIC_CONVEX_URL in .env and restart.
          </ThemedText>
        </ThemedView>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  const convexClient = new ConvexReactClient(convexUrl!);

  return (
    <ConvexProvider client={convexClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ConvexProvider>
  );
}
