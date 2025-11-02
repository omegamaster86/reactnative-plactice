import '@/global.css';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { cssInterop } from 'react-native-css-interop';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Enable className on standard React Native components
cssInterop(View, { className: 'style' });
cssInterop(Text, { className: 'style' });
cssInterop(TextInput, { className: 'style' });
cssInterop(TouchableOpacity, { className: 'style' });
cssInterop(Pressable, { className: 'style' });

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
        <ThemedView className="flex-1 items-center justify-center p-6">
          <ThemedText type="title">Convex URL not set</ThemedText>
          <ThemedText className="mt-2">
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
