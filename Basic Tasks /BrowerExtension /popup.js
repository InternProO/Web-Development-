// popup.js
document.getElementById('activate').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'activate' });
});
