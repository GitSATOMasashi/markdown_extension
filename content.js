// デバッグ用のログ関数
function debugLog(message) {
  console.log(`[Google Docs Cleaner] ${message}`);
}

// 空白行を削除する関数
function removeEmptyLines() {
  debugLog('空白行の削除を開始');
  
  // Google Docsの編集可能な領域を取得
  const editor = document.querySelector('.kix-appview-editor');
  if (!editor) {
    debugLog('エディタ領域が見つかりません');
    return;
  }

  // 空白行の削除処理
  try {
    // 現在の選択範囲を保存
    document.execCommand('selectAll', false, null);
    const text = document.getSelection().toString();
    
    // 空白行を削除
    const lines = text.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    const newText = nonEmptyLines.join('\n');
    
    // 新しいテキストをクリップボードにコピー
    navigator.clipboard.writeText(newText).then(() => {
      // テキストを貼り付け
      document.execCommand('paste', false, null);
      debugLog('空白行の削除が完了しました');
    });
  } catch (error) {
    debugLog('エラーが発生しました: ' + error.message);
  }
}

// メッセージリスナーを設定
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'removeEmptyLines') {
    removeEmptyLines();
    sendResponse({status: 'completed'});
  }
});

debugLog('拡張機能が読み込まれました');
