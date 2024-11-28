// デバッグ用のログ関数
function debugLog(message) {
  console.log(`[Google Docs Cleaner] ${message}`);
}

// ペーストイベントを監視
document.addEventListener('paste', function(e) {
  debugLog('ペーストイベントを検知しました');
  
  // ペースト後に処理を実行（DOMの更新を待つ）
  setTimeout(() => {
    analyzeDocument();
  }, 300);
});

// ドキュメントの解析
function analyzeDocument() {
  debugLog('ドキュメントの解析を開始');
  
  // Google Docsの編集可能な領域を取得
  const editor = document.querySelector('.kix-appview-editor');
  if (!editor) {
    debugLog('エディタ領域が見つかりません');
    return;
  }

  // 行要素を取得
  const lines = editor.querySelectorAll('.kix-lineview');
  debugLog(`検出された行数: ${lines.length}`);
}

// 拡張機能の読み込みを確認
debugLog('拡張機能が読み込まれました');
