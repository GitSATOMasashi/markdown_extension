// デバッグ用のログ関数
function debugLog(message) {
  console.log(`[Google Docs Cleaner] ${message}`);
}

// 空白行を削除する関数
function removeEmptyLines() {
  debugLog('空白行の削除を開始');
  
  const editor = document.querySelector('.kix-appview-editor');
  if (!editor) {
    debugLog('エディタ領域が見つかりません');
    return;
  }

  const lines = editor.querySelectorAll('.kix-lineview');
  debugLog(`検出された行数: ${lines.length}`);

  // TODO: 実際の空白行削除ロジックをここに実装
  // この部分は Google Docs の DOM 構造を詳しく確認してから実装します
}

// メッセージリスナーを設定
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'removeEmptyLines') {
    removeEmptyLines();
    sendResponse({status: 'completed'});
  }
});

debugLog('拡張機能が読み込まれました');
