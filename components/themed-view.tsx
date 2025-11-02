import { View, type ViewProps } from 'react-native';
import { cssInterop } from 'react-native-css-interop';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

// Enable `className` on ThemedView by mapping it to `style`
cssInterop(ThemedView, { className: 'style' });
