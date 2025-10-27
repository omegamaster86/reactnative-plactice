import { useState, useMemo } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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
        <View style={styles.headerArt}>
          <IconSymbol size={120} name="checkmark.circle.fill" color={Colors[colorScheme].tint} />
        </View>
      }>
      <ThemedView style={styles.headerRow}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Your Todos
        </ThemedText>
        <ThemedText type="default">{remaining} remaining</ThemedText>
      </ThemedView>

      <ThemedView style={styles.inputCard} lightColor="#ffffff" darkColor="#1E2022">
        <IconSymbol name="square.and.pencil" size={20} color={Colors[colorScheme].icon} />
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a new task…"
          placeholderTextColor={colorScheme === 'light' ? '#9BA1A6' : '#687076'}
          style={[styles.input, { color: colorScheme === 'light' ? '#11181C' : '#ECEDEE' }]}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={handleAdd} activeOpacity={0.8}>
          <IconSymbol name="plus.circle.fill" size={26} color={Colors[colorScheme].tint} />
        </TouchableOpacity>
      </ThemedView>

      {tasks === undefined ? (
        <ThemedView style={styles.emptyWrap}>
          <IconSymbol name="hourglass" size={28} color={Colors[colorScheme].icon} />
          <ThemedText>Loading your tasks…</ThemedText>
        </ThemedView>
      ) : tasks.length === 0 ? (
        <ThemedView style={styles.emptyWrap}>
          <IconSymbol name="sparkles" size={28} color={Colors[colorScheme].icon} />
          <ThemedText>No tasks yet. Add your first!</ThemedText>
        </ThemedView>
      ) : (
        <View style={styles.list}>
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
    <ThemedView style={styles.card} lightColor="#ffffff" darkColor="#1E2022">
      <TouchableOpacity style={styles.rowLeft} onPress={onToggle} activeOpacity={0.8}>
        <IconSymbol
          name={task.completed ? 'checkmark.circle.fill' : 'circle'}
          size={24}
          color={task.completed ? Colors[colorScheme].tint : Colors[colorScheme].icon}
          weight={task.completed ? 'bold' : 'regular'}
        />
        <ThemedText
          style={[
            styles.taskText,
            task.completed && { textDecorationLine: 'line-through', opacity: 0.55 },
          ]}>
          {task.text}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemove} activeOpacity={0.8}>
        <IconSymbol name="trash" size={18} color={colorScheme === 'light' ? '#D12D2D' : '#FF6B6B'} />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerArt: {
    position: 'absolute',
    bottom: -20,
    right: -10,
    opacity: 0.12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  list: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  emptyWrap: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 24,
  },
});
