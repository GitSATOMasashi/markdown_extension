console.log('[Google Docs Cleaner] Content script が読み込まれました');

// 空白行を削除する関数
function removeEmptyLines() {
  console.log('[Google Docs Cleaner] 空白行の削除を開始します');
  
  // Google Docsのエディタを取得
  const editor = document.querySelector('.kix-appview-editor');
  if (!editor) {
    console.log('[Google Docs Cleaner] エディタが見つかりません');
    return;
  }

  // 現在のカーソル位置を保存
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  try {
    // カーソルを文書の先頭に移動
    document.execCommand('selectAll', false, null);
    
    // 選択されたテキストを取得
    const text = selection.toString();
    
    // 空白行を削除
    const lines = text.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    const newText = nonEmptyLines.join('\n');
    
    // 新しいテキストを挿入
    document.execCommand('insertText', false, newText);
    
    console.log('[Google Docs Cleaner] 空白行の削除が完了しました');
  } catch (error) {
    console.error('[Google Docs Cleaner] エラーが発生しました:', error);
  }
}
