// デバッグ用のログ関数
function debugLog(message) {
  console.log(`[Google Docs Cleaner] ${message}`);
}

// Ctrl+A のシミュレート
function simulateSelectAll() {
  const selectAll = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    keyCode: 65,  // 'A'のキーコード
    ctrlKey: true
  });
  document.dispatchEvent(selectAll);
}

// 空白行を削除する関数
function removeEmptyLines() {
  debugLog('処理を開始します');
  
  // 1. 全選択を試みる
  simulateSelectAll();
  debugLog('全選択を実行しました');
  
  // 2. 選択されているかチェック
  const selection = window.getSelection();
  debugLog(`選択されたテキスト: ${selection.toString()}`);
}

// メッセージリスナーを設定
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'removeEmptyLines') {
    debugLog('メッセージを受信しました');
    removeEmptyLines();
    sendResponse({status: 'completed'});
  }
  return true;
});

debugLog('拡張機能が読み込まれました');
