// 拡張機能のアイコンがクリックされたときの処理
chrome.action.onClicked.addListener((tab) => {
  // Google Docs のページでのみ動作
  if (tab.url.match(/docs\.google\.com/)) {
    chrome.tabs.sendMessage(tab.id, {action: 'removeEmptyLines'});
  }
}); 