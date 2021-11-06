const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#node-version').innerHTML = process.versions.node;

  document.querySelector('#send').addEventListener('click', () => {
    console.log(ipcRenderer.sendSync('sync-message', 'sync: hello from renderer process'));
    ipcRenderer.send('async-message', 'async: hello from renderer process');
  });

  // 监听主进程发送的消息
  ipcRenderer.on('async-message', (event, data) => {
    console.log(data);
  });
});
