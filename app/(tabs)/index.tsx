import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { View, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';
import { useQuery } from 'convex/react';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const tasks = useQuery('tasks:list', {} as any) as any[] | undefined;
  const completedTasks = tasks?.filter((t) => t.completed).length ?? 0;
  const totalTasks = tasks?.length ?? 0;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0F4F8', dark: '#0F1419' }}
      headerImage={
        <View className="absolute -bottom-10 -right-10 opacity-[0.08]">
          <IconSymbol size={200} name="house.fill" color={Colors[colorScheme].tint} />
        </View>
      }>
      <ThemedView className="mb-6">
        <ThemedText 
          type="title" 
          style={{ fontFamily: Fonts.rounded }}
          className="mb-2"
        >
          ようこそ
        </ThemedText>
        <ThemedText className="text-base opacity-70">
          今日も一日お疲れさまです
        </ThemedText>
      </ThemedView>

      <ThemedView className="gap-4 mb-6">
        <ThemedView
          className="rounded-2xl p-5"
          style={{ 
            shadowColor: '#000', 
            shadowOpacity: 0.08, 
            shadowRadius: 12, 
            elevation: 3 
          }}
          lightColor="#FFFFFF"
          darkColor="#1A1D21">
          <ThemedView className="flex-row items-center justify-between mb-3">
            <ThemedView className="flex-row items-center gap-3">
              <View 
                className="w-12 h-12 rounded-xl items-center justify-center"
                style={{ backgroundColor: colorScheme === 'light' ? '#E8F4F8' : '#1E2A35' }}
              >
                <IconSymbol name="checkmark.circle.fill" size={24} color={Colors[colorScheme].tint} />
              </View>
              <ThemedView>
                <ThemedText type="defaultSemiBold" className="text-lg">
                  タスク進捗
                </ThemedText>
                <ThemedText className="text-sm opacity-60">
                  {totalTasks > 0 
                    ? `${completedTasks} / ${totalTasks} 完了`
                    : 'タスクがありません'
                  }
                </ThemedText>
              </ThemedView>
            </ThemedView>
            {totalTasks > 0 && (
              <ThemedView 
                className="px-3 py-1.5 rounded-full"
                style={{ backgroundColor: colorScheme === 'light' ? '#E8F4F8' : '#1E2A35' }}
              >
                <ThemedText 
                  type="defaultSemiBold"
                  style={{ color: Colors[colorScheme].tint }}
                >
                  {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
          {totalTasks > 0 && (
            <View 
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: colorScheme === 'light' ? '#E5E7EB' : '#2A2F36' }}
            >
              <View
                className="h-full rounded-full"
                style={{ 
                  width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%`,
                  backgroundColor: Colors[colorScheme].tint,
                }}
              />
            </View>
          )}
        </ThemedView>

        <ThemedView className="flex-row gap-3">
          <ThemedView
            className="flex-1 rounded-2xl p-4"
            style={{ 
              shadowColor: '#000', 
              shadowOpacity: 0.06, 
              shadowRadius: 8, 
              elevation: 2 
            }}
            lightColor="#FFFFFF"
            darkColor="#1A1D21">
            <IconSymbol 
              name="sparkles" 
              size={24} 
              color={Colors[colorScheme].tint}
              className="mb-2"
            />
            <ThemedText type="defaultSemiBold" className="mb-1">
              探索
            </ThemedText>
            <ThemedText className="text-xs opacity-60">
              新機能を発見
            </ThemedText>
          </ThemedView>

          <ThemedView
            className="flex-1 rounded-2xl p-4"
            style={{ 
              shadowColor: '#000', 
              shadowOpacity: 0.06, 
              shadowRadius: 8, 
              elevation: 2 
            }}
            lightColor="#FFFFFF"
            darkColor="#1A1D21">
            <IconSymbol 
              name="checkmark.circle.fill" 
              size={24} 
              color={Colors[colorScheme].tint}
              className="mb-2"
            />
            <ThemedText type="defaultSemiBold" className="mb-1">
              タスク
            </ThemedText>
            <ThemedText className="text-xs opacity-60">
              管理を開始
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView className="gap-3">
        <ThemedText type="subtitle" className="mb-1">
          クイックアクション
        </ThemedText>
        <ThemedView
          className="rounded-xl p-4 flex-row items-center justify-between"
          style={{ 
            shadowColor: '#000', 
            shadowOpacity: 0.05, 
            shadowRadius: 6, 
            elevation: 1 
          }}
          lightColor="#F8F9FA"
          darkColor="#1E2226">
          <ThemedView className="flex-row items-center gap-3">
            <IconSymbol name="plus.circle.fill" size={20} color={Colors[colorScheme].tint} />
            <ThemedText>新しいタスクを追加</ThemedText>
          </ThemedView>
          <IconSymbol name="chevron.right" size={16} color={Colors[colorScheme].icon} />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}
