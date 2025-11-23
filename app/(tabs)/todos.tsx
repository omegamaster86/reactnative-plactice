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

  const completedCount = useMemo(
    () => (tasks ? tasks.filter((t) => t.completed).length : 0),
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

  const isLight = colorScheme === 'light';
  const cardBg = isLight ? '#FFFFFF' : '#1A1D21';
  const inputBg = isLight ? '#F8F9FA' : '#25282D';
  const borderColor = isLight ? '#E5E7EB' : '#2F3238';
  const tintColor = isLight ? '#0a7ea4' : '#4FC3F7';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0F4F8', dark: '#0A0D12' }}
      headerImage={
        <View className="absolute -bottom-5 -right-[10px] opacity-[0.08]">
          <IconSymbol size={140} name="checkmark.circle.fill" color={tintColor} />
        </View>
      }>
      <View className="mb-6">
        <ThemedText 
          type="title" 
          style={{ fontFamily: Fonts.rounded, marginBottom: 8 }}
          className="text-5xl">
          Todos
        </ThemedText>
        <View className="flex-row items-center gap-4">
          <View 
            className="px-3 py-1.5 rounded-full"
            style={{ backgroundColor: isLight ? '#E3F2FD' : '#1E3A5F' }}>
            <ThemedText 
              className="text-sm font-semibold"
              style={{ color: tintColor }}>
              {remaining} 残り
            </ThemedText>
          </View>
          {completedCount > 0 && (
            <View 
              className="px-3 py-1.5 rounded-full"
              style={{ backgroundColor: isLight ? '#E8F5E9' : '#1B3E1F' }}>
              <ThemedText 
                className="text-sm font-semibold"
                style={{ color: isLight ? '#4CAF50' : '#81C784' }}>
              {completedCount} 完了
            </ThemedText>
          </View>
          )}
        </View>
      </View>

      <ThemedView
        className="flex-row items-center gap-3 px-4 py-4 rounded-2xl mb-4"
        style={{
          backgroundColor: inputBg,
          borderWidth: 1,
          borderColor: borderColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isLight ? 0.05 : 0.2,
          shadowRadius: 12,
          elevation: 3,
        }}>
        <View 
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ backgroundColor: isLight ? '#FFFFFF' : '#2F3238' }}>
          <IconSymbol name="square.and.pencil" size={18} color={tintColor} />
        </View>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="新しいタスクを追加..."
          placeholderTextColor={isLight ? '#9CA3AF' : '#6B7280'}
          className="flex-1 text-base py-2"
          style={{ 
            color: isLight ? '#111827' : '#F9FAFB',
            fontFamily: Fonts.sans,
          }}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity 
          onPress={handleAdd} 
          activeOpacity={0.7}
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ backgroundColor: tintColor }}>
          <IconSymbol name="plus" size={20} color="#FFFFFF" weight="bold" />
        </TouchableOpacity>
      </ThemedView>

      {tasks === undefined ? (
        <ThemedView className="items-center gap-3 py-12">
          <View 
            className="w-16 h-16 rounded-2xl items-center justify-center"
            style={{ backgroundColor: isLight ? '#F3F4F6' : '#25282D' }}>
            <IconSymbol name="hourglass" size={32} color={tintColor} />
          </View>
          <ThemedText className="text-base opacity-70">読み込み中...</ThemedText>
        </ThemedView>
      ) : tasks.length === 0 ? (
        <ThemedView className="items-center gap-3 py-12">
          <View 
            className="w-16 h-16 rounded-2xl items-center justify-center"
            style={{ backgroundColor: isLight ? '#F3F4F6' : '#25282D' }}>
            <IconSymbol name="sparkles" size={32} color={tintColor} />
          </View>
          <ThemedText className="text-base opacity-70">まだタスクがありません</ThemedText>
          <ThemedText className="text-sm opacity-50">最初のタスクを追加してみましょう</ThemedText>
        </ThemedView>
      ) : (
        <View className="gap-3">
          {tasks.map((task, index) => (
            <TaskRow
              key={task._id}
              task={task}
              onToggle={() => handleToggle(task)}
              onRemove={() => handleRemove(task)}
              colorScheme={colorScheme}
              index={index}
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
  index,
}: {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
  colorScheme: 'light' | 'dark';
  index: number;
}) {
  const isLight = colorScheme === 'light';
  const cardBg = isLight ? '#FFFFFF' : '#1A1D21';
  const borderColor = isLight ? '#E5E7EB' : '#2F3238';
  const tintColor = isLight ? '#0a7ea4' : '#4FC3F7';
  const completedBg = isLight ? '#F0FDF4' : '#1A2E1F';
  const completedBorder = isLight ? '#D1FAE5' : '#2D4A35';

  return (
    <ThemedView
      className="flex-row items-center justify-between px-4 py-4 rounded-2xl"
      style={{
        backgroundColor: task.completed ? completedBg : cardBg,
        borderWidth: 1,
        borderColor: task.completed ? completedBorder : borderColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isLight ? 0.03 : 0.15,
        shadowRadius: 8,
        elevation: 2,
        opacity: task.completed ? 0.85 : 1,
      }}>
      <TouchableOpacity 
        className="flex-row items-center gap-3 flex-1" 
        onPress={onToggle} 
        activeOpacity={0.7}>
        <View 
          className={`w-6 h-6 rounded-full items-center justify-center ${task.completed ? '' : 'border-2'}`}
          style={{
            backgroundColor: task.completed ? tintColor : 'transparent',
            borderColor: task.completed ? tintColor : (isLight ? '#D1D5DB' : '#4B5563'),
          }}>
          {task.completed && (
            <IconSymbol name="checkmark" size={14} color="#FFFFFF" weight="bold" />
          )}
        </View>
        <ThemedText
          className={`text-base flex-1 ${task.completed ? 'line-through' : ''}`}
          style={{
            color: task.completed 
              ? (isLight ? '#6B7280' : '#9CA3AF')
              : (isLight ? '#111827' : '#F9FAFB'),
            opacity: task.completed ? 0.6 : 1,
            fontFamily: Fonts.sans,
          }}>
          {task.text}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={onRemove} 
        activeOpacity={0.7}
        className="w-9 h-9 rounded-lg items-center justify-center"
        style={{ backgroundColor: isLight ? '#FEF2F2' : '#3F1F1F' }}>
        <IconSymbol 
          name="trash" 
          size={16} 
          color={isLight ? '#EF4444' : '#F87171'} 
        />
      </TouchableOpacity>
    </ThemedView>
  );
}
