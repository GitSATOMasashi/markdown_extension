// デバッグ用のログ関数
function debugLog(message) {
  console.log(`[Google Docs Cleaner] ${message}`);
}

// エディタ要素を取得する関数
function getEditor() {
  // Google Docsのエディタ要素を探す
  const editor = document.querySelector('.kix-appview-editor');
  if (!editor) {
    debugLog('エディタ要素が見つかりません');
    return null;
  }
  return editor;
}

// テキスト要素を取得する関数
function getTextElements() {
  const editor = getEditor();
  if (!editor) return [];
  
  // テキストを含む要素を取得
  const textElements = editor.querySelectorAll('.kix-lineview-content');
  debugLog(`テキスト要素数: ${textElements.length}`);
  
  // 各要素の内容をログ出力
  textElements.forEach((element, index) => {
    debugLog(`行 ${index + 1}: "${element.textContent}"`);
  });
  
  return textElements;
}

// 空白行を削除する関数
function removeEmptyLines() {
  debugLog('処理を開始します');
  
  // テキスト要素を取得
  const textElements = getTextElements();
  if (textElements.length === 0) {
    debugLog('テキスト要素が見つかりません');
    return;
  }
  
  // 各要素の状態を確認
  textElements.forEach((element, index) => {
    const text = element.textContent.trim();
    if (text === '') {
      debugLog(`空白行を検出: ${index + 1}行目`);
    } else {
      debugLog(`通常の行: ${index + 1}行目 - "${text}"`);
    }
  });
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
