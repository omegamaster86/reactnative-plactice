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
      <ThemedView className="flex-row items-center justify-between mb-3">
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Your Todos
        </ThemedText>
        <ThemedText type="default">{remaining} remaining</ThemedText>
      </ThemedView>

      <ThemedView
        className="flex-row items-center gap-2.5 px-[14px] py-3 rounded-[14px] mb-3"
        style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 2 }}
        lightColor="#ffffff"
        darkColor="#1E2022">
        <IconSymbol name="square.and.pencil" size={20} color={Colors[colorScheme].icon} />
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a new task…"
          placeholderTextColor={colorScheme === 'light' ? '#9BA1A6' : '#687076'}
          className="flex-1 text-base py-1"
          style={{ color: colorScheme === 'light' ? '#11181C' : '#ECEDEE' }}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={handleAdd} activeOpacity={0.8}>
          <IconSymbol name="plus.circle.fill" size={26} color={Colors[colorScheme].tint} />
        </TouchableOpacity>
      </ThemedView>

      {tasks === undefined ? (
        <ThemedView className="items-center gap-2 py-6">
          <IconSymbol name="hourglass" size={28} color={Colors[colorScheme].icon} />
          <ThemedText>Loading your tasks…</ThemedText>
        </ThemedView>
      ) : tasks.length === 0 ? (
        <ThemedView className="items-center gap-2 py-6">
          <IconSymbol name="sparkles" size={28} color={Colors[colorScheme].icon} />
          <ThemedText>No tasks yet. Add your first!</ThemedText>
        </ThemedView>
      ) : (
        <View className="gap-2.5">
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
      className="flex-row items-center justify-between px-[14px] py-3 rounded-[14px]"
      style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 1 }}
      lightColor="#ffffff"
      darkColor="#1E2022">
      <TouchableOpacity className="flex-row items-center gap-2.5 flex-1" onPress={onToggle} activeOpacity={0.8}>
        <IconSymbol
          name={task.completed ? 'checkmark.circle.fill' : 'circle'}
          size={24}
          color={task.completed ? Colors[colorScheme].tint : Colors[colorScheme].icon}
          weight={task.completed ? 'bold' : 'regular'}
        />
        <ThemedText
          className={task.completed ? 'text-base line-through opacity-[0.55]' : 'text-base'}>
          {task.text}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemove} activeOpacity={0.8}>
        <IconSymbol name="trash" size={18} color={colorScheme === 'light' ? '#D12D2D' : '#FF6B6B'} />
      </TouchableOpacity>
    </ThemedView>
  );
}
