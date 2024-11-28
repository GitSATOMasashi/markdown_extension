chrome.action.onClicked.addListener((tab) => {
  console.log('拡張機能がクリックされました');
  
  if (tab.url.includes('docs.google.com')) {
    chrome.tabs.sendMessage(tab.id, {action: 'removeEmptyLines'}, (response) => {
      if (chrome.runtime.lastError) {
        console.error('エラー:', chrome.runtime.lastError);
      } else {
        console.log('応答:', response);
      }
    });
  }
}); 