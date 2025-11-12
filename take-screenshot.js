const { chromium } = require('playwright');

async function takeScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhoneサイズ
  });
  const page = await context.newPage();
  
  try {
    // ホーム画面
    console.log('ホーム画面を読み込み中...');
    await page.goto('http://localhost:8081', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000); // レンダリングを待つ
    await page.screenshot({ path: 'screenshot-home.png', fullPage: true });
    console.log('ホーム画面のスクリーンショットを保存しました');
    
    // タスク画面（URLを直接変更）
    console.log('タスク画面に移動中...');
    await page.goto('http://localhost:8081/todos', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot-todos.png', fullPage: true });
    console.log('タスク画面のスクリーンショットを保存しました');
    
    // 探索画面（URLを直接変更）
    console.log('探索画面に移動中...');
    await page.goto('http://localhost:8081/explore', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot-explore.png', fullPage: true });
    console.log('探索画面のスクリーンショットを保存しました');
    
  } catch (error) {
    console.error('エラー:', error);
    // エラーが発生してもホーム画面のスクリーンショットは保存されている可能性がある
  } finally {
    await browser.close();
  }
}

takeScreenshots();
