import { useState, useMemo } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useQuery, useMutation } from 'convex/react';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Task = {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export default function TodosScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const tasks = useQuery('tasks:list', {} as any) as Task[] | undefined;
  const addTask = useMutation('tasks:add');
  const toggleTask = useMutation('tasks:toggle');
  const removeTask = useMutation('tasks:remove');

  const [text, setText] = useState('');

  const remaining = useMemo(
    () => (tasks ? tasks.filter((t) => !t.completed).length : 0),
    [tasks]
  );

  const handleAdd = async () => {
    const value = text.trim();
    if (!value) return;
    await addTask({ text: value } as any);
    setText('');
    Haptics.selectionAsync();
  };

  const handleToggle = async (task: Task) => {
    await toggleTask({ id: task._id as any, completed: !task.completed } as any);
    Haptics.selectionAsync();
  };

  const handleRemove = async (task: Task) => {
    await removeTask({ id: task._id as any } as any);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F4F7FB', dark: '#0F1216' }}
      headerImage={
        <View className="absolute -bottom-5 -right-[10px] opacity-[0.12]">
          <IconSymbol size={120} name="checkmark.circle.fill" color={Colors[colorScheme].tint} />
        </View>
      }>
      <ThemedView className="flex-row items-center justify-between mb-4">
        <ThemedView>
          <ThemedText type="title" style={{ fontFamily: Fonts.rounded }} className="mb-1">
            タスク
          </ThemedText>
          <ThemedText className="text-sm opacity-60">
            {remaining > 0 ? `残り ${remaining} 件` : 'すべて完了！'}
          </ThemedText>
        </ThemedView>
        {remaining > 0 && (
          <ThemedView 
            className="px-3 py-1.5 rounded-full"
            style={{ backgroundColor: colorScheme === 'light' ? '#FEF3C7' : '#3D2E1E' }}
          >
            <ThemedText 
              type="defaultSemiBold"
              style={{ color: colorScheme === 'light' ? '#D97706' : '#FBBF24' }}
            >
              {remaining}
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView
        className="flex-row items-center gap-3 px-4 py-3.5 rounded-2xl mb-4"
        style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 }}
        lightColor="#ffffff"
        darkColor="#1A1D21">
        <IconSymbol name="square.and.pencil" size={22} color={Colors[colorScheme].icon} />
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="新しいタスクを追加…"
          placeholderTextColor={colorScheme === 'light' ? '#9BA1A6' : '#687076'}
          className="flex-1 text-base py-1"
          style={{ color: colorScheme === 'light' ? '#11181C' : '#ECEDEE' }}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity 
          onPress={handleAdd} 
          activeOpacity={0.7}
          className="w-9 h-9 items-center justify-center"
        >
          <IconSymbol name="plus.circle.fill" size={28} color={Colors[colorScheme].tint} />
        </TouchableOpacity>
      </ThemedView>

      {tasks === undefined ? (
        <ThemedView className="items-center gap-3 py-12">
          <View 
            className="w-16 h-16 rounded-full items-center justify-center mb-2"
            style={{ backgroundColor: colorScheme === 'light' ? '#F3F4F6' : '#2A2F36' }}
          >
            <IconSymbol name="hourglass" size={32} color={Colors[colorScheme].icon} />
          </View>
          <ThemedText className="opacity-70">タスクを読み込み中…</ThemedText>
        </ThemedView>
      ) : tasks.length === 0 ? (
        <ThemedView className="items-center gap-3 py-12">
          <View 
            className="w-16 h-16 rounded-full items-center justify-center mb-2"
            style={{ backgroundColor: colorScheme === 'light' ? '#F0F9FF' : '#1E2A35' }}
          >
            <IconSymbol name="sparkles" size={32} color={Colors[colorScheme].tint} />
          </View>
          <ThemedText type="defaultSemiBold" className="mb-1">タスクがありません</ThemedText>
          <ThemedText className="text-sm opacity-60">最初のタスクを追加しましょう！</ThemedText>
        </ThemedView>
      ) : (
        <View className="gap-3">
          {tasks.map((task) => (
            <TaskRow
              key={task._id}
              task={task}
              onToggle={() => handleToggle(task)}
              onRemove={() => handleRemove(task)}
              colorScheme={colorScheme}
            />)
          )}
        </View>
      )}
    </ParallaxScrollView>
  );
}

function TaskRow({
  task,
  onToggle,
  onRemove,
  colorScheme,
}: {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
  colorScheme: 'light' | 'dark';
}) {
  return (
    <ThemedView
      className="flex-row items-center justify-between px-4 py-3.5 rounded-xl"
      style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 }}
      lightColor="#ffffff"
      darkColor="#1A1D21">
      <TouchableOpacity 
        className="flex-row items-center gap-3 flex-1" 
        onPress={onToggle} 
        activeOpacity={0.7}
      >
        <View 
          className={`w-6 h-6 rounded-full items-center justify-center ${
            task.completed ? '' : 'border-2'
          }`}
          style={task.completed 
            ? { backgroundColor: Colors[colorScheme].tint }
            : { 
                borderColor: Colors[colorScheme].icon,
                backgroundColor: 'transparent'
              }
          }
        >
          {task.completed && (
            <IconSymbol
              name="checkmark"
              size={14}
              color={colorScheme === 'light' ? '#FFFFFF' : '#0F1419'}
              weight="bold"
            />
          )}
        </View>
        <ThemedText
          className={task.completed ? 'text-base line-through opacity-50' : 'text-base'}
          style={{ flex: 1 }}
        >
          {task.text}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={onRemove} 
        activeOpacity={0.7}
        className="w-8 h-8 items-center justify-center"
      >
        <IconSymbol 
          name="trash" 
          size={18} 
          color={colorScheme === 'light' ? '#EF4444' : '#FF6B6B'} 
        />
      </TouchableOpacity>
    </ThemedView>
  );
}
