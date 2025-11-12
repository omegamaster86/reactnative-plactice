const fs = require('fs');

// 画像をbase64エンコード
const homeImg = fs.readFileSync('screenshot-home.png').toString('base64');
const todosImg = fs.readFileSync('screenshot-todos.png').toString('base64');
const exploreImg = fs.readFileSync('screenshot-explore.png').toString('base64');

// HTMLを作成
const html = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>アプリのスクリーンショット</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 40px;
        }
        .screenshot-container {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .screenshot-container h2 {
            margin-top: 0;
            color: #0a7ea4;
            margin-bottom: 20px;
        }
        img {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 8px;
            display: block;
            margin: 0 auto;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
    </style>
</head>
<body>
    <h1>改善されたアプリレイアウト</h1>
    
    <div class="screenshot-container">
        <h2>1. ホーム画面</h2>
        <img src="data:image/png;base64,${homeImg}" alt="ホーム画面" />
    </div>
    
    <div class="screenshot-container">
        <h2>2. タスク画面</h2>
        <img src="data:image/png;base64,${todosImg}" alt="タスク画面" />
    </div>
    
    <div class="screenshot-container">
        <h2>3. 探索画面</h2>
        <img src="data:image/png;base64,${exploreImg}" alt="探索画面" />
    </div>
</body>
</html>`;

fs.writeFileSync('screenshots.html', html);
console.log('screenshots.html を作成しました');
