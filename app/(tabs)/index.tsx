import { View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isLight = colorScheme === 'light';
  const tintColor = isLight ? '#0a7ea4' : '#4FC3F7';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0F4F8', dark: '#0A0D12' }}
      headerImage={
        <View className="absolute -bottom-5 -right-[10px] opacity-[0.08]">
          <IconSymbol size={140} name="house.fill" color={tintColor} />
        </View>
      }>
      <View className="mb-6">
        <ThemedText 
          type="title" 
          style={{ fontFamily: Fonts.rounded, marginBottom: 8 }}
          className="text-5xl">
          Home
        </ThemedText>
        <ThemedText className="text-base opacity-70">
          Welcome to your Expo app
        </ThemedText>
      </View>
    </ParallaxScrollView>
  );
}

