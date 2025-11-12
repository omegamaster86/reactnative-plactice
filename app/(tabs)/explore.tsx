import { Image } from 'expo-image';
import { Platform } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0F4F8', dark: '#0F1419' }}
      headerImage={
        <ThemedView className="absolute -bottom-10 -right-10 opacity-[0.08]">
          <IconSymbol size={200} color="#0a7ea4" name="sparkles" />
        </ThemedView>
      }>
      <ThemedView className="mb-6">
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
          className="mb-2"
        >
          探索
        </ThemedText>
        <ThemedText className="text-base opacity-70">
          アプリの機能を発見しましょう
        </ThemedText>
      </ThemedView>
      <ThemedView className="gap-4">
        <Collapsible title="ファイルベースルーティング">
          <ThemedView className="gap-2">
            <ThemedText>
              このアプリには複数の画面があります:{' '}
              <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> と{' '}
              <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
            </ThemedText>
            <ThemedText>
              <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText> のレイアウトファイルが
              タブナビゲーターを設定しています。
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="link">詳細を見る</ThemedText>
            </ExternalLink>
          </ThemedView>
        </Collapsible>
        <Collapsible title="マルチプラットフォーム対応">
          <ThemedView className="gap-2">
            <ThemedText>
              Android、iOS、Webでこのプロジェクトを開くことができます。Web版を開くには、このプロジェクトを実行しているターミナルで{' '}
              <ThemedText type="defaultSemiBold">w</ThemedText> を押してください。
            </ThemedText>
          </ThemedView>
        </Collapsible>
        <Collapsible title="画像の最適化">
          <ThemedView className="gap-2">
            <ThemedText>
              静的画像には、<ThemedText type="defaultSemiBold">@2x</ThemedText> と{' '}
              <ThemedText type="defaultSemiBold">@3x</ThemedText> サフィックスを使用して、
              異なる画面密度用のファイルを提供できます。
            </ThemedText>
            <Image 
              source={require('@/assets/images/react-logo.png')} 
              style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 8 }} 
            />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <ThemedText type="link">詳細を見る</ThemedText>
            </ExternalLink>
          </ThemedView>
        </Collapsible>
        <Collapsible title="ライト/ダークモード">
          <ThemedView className="gap-2">
            <ThemedText>
              このテンプレートにはライトモードとダークモードのサポートが含まれています。{' '}
              <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> フックを使用して、
              ユーザーの現在のカラースキームを確認し、それに応じてUIの色を調整できます。
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="link">詳細を見る</ThemedText>
            </ExternalLink>
          </ThemedView>
        </Collapsible>
        <Collapsible title="アニメーション">
          <ThemedView className="gap-2">
            <ThemedText>
              このテンプレートにはアニメーションコンポーネントの例が含まれています。{' '}
              <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> コンポーネントは、
              強力な{' '}
              <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
                react-native-reanimated
              </ThemedText>{' '}
              ライブラリを使用して手を振るアニメーションを作成しています。
            </ThemedText>
            {Platform.select({
              ios: (
                <ThemedText>
                  <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText> コンポーネントは
                  ヘッダー画像にパララックス効果を提供します。
                </ThemedText>
              ),
            })}
          </ThemedView>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

