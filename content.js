// デバッグ用のログ関数
function debugLog(message) {
  console.log(`[Google Docs Cleaner] ${message}`);
}

// キーボードイベントをシミュレート
function simulateKeyPress(key, ctrl = false) {
  const eventOptions = {
    bubbles: true,
    cancelable: true,
    keyCode: key.charCodeAt(0),
    key: key
  };
  
  if (ctrl) {
    eventOptions.ctrlKey = true;
  }

  document.activeElement.dispatchEvent(new KeyboardEvent('keydown', eventOptions));
  document.activeElement.dispatchEvent(new KeyboardEvent('keypress', eventOptions));
  document.activeElement.dispatchEvent(new KeyboardEvent('keyup', eventOptions));
}

// 空白行を削除する関数
function removeEmptyLines() {
  debugLog('空白行の削除を開始');

  // 1. 全選択（Ctrl+A）
  simulateKeyPress('a', true);
  
  // 2. コピー（Ctrl+C）
  simulateKeyPress('c', true);
  
  // 3. クリップボードからテキストを取得して処理
  navigator.clipboard.readText().then(text => {
    // 空白行を削除
    const lines = text.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    const newText = nonEmptyLines.join('\n');
    
    // 4. 新しいテキストをクリップボードに設定
    return navigator.clipboard.writeText(newText);
  }).then(() => {
    // 5. 貼り付け（Ctrl+V）
    simulateKeyPress('v', true);
    debugLog('空白行の削除が完了しました');
  }).catch(error => {
    debugLog('エラーが発生しました: ' + error.message);
  });
}

// メッセージリスナーを設定
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'removeEmptyLines') {
    removeEmptyLines();
    sendResponse({status: 'completed'});
  }
  return true;
});

debugLog('拡張機能が読み込まれました');
