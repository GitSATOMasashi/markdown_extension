chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes('docs.google.com')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: removeEmptyLines
    });
  }
});

function removeEmptyLines() {
  console.log('[Google Docs Cleaner] 空白行の削除を開始します');
  
  // カーソルを文書の先頭に移動
  const event = new KeyboardEvent('keydown', {
    key: 'Home',
    code: 'Home',
    ctrlKey: true,
    bubbles: true
  });
  document.dispatchEvent(event);
  
  // 文書全体を選択
  const selectAllEvent = new KeyboardEvent('keydown', {
    key: 'a',
    code: 'KeyA',
    ctrlKey: true,
    bubbles: true
  });
  document.dispatchEvent(selectAllEvent);
} 