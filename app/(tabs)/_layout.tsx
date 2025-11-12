import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#FFFFFF',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ホーム',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 26 : 24} 
              name="house.fill" 
              color={color}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: 'タスク',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 26 : 24} 
              name="checkmark.circle.fill" 
              color={color}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '探索',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 26 : 24} 
              name="sparkles" 
              color={color}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
