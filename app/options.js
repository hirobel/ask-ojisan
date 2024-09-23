// 保存されたAPIキーをロード
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['openaiApiKey'], (result) => {
    document.getElementById('apiKey').value = result.openaiApiKey || '';
    console.log("[Askおじさん] 保存されたAPIキーをロードしました。");
  });
});

// APIキーを保存
document.getElementById('saveButton').addEventListener('click', () => {
  const apiKey = document.getElementById('apiKey').value;
  chrome.storage.sync.set({ openaiApiKey: apiKey }, () => {
    alert('APIキーを保存しました。');
    console.log("[Askおじさん] APIキーを保存しました。");
  });
});
