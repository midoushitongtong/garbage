const { ipcRenderer } = require('electron');
// 老 api
// 获取主进程中的功能
// const { BrowserWindow } = require('@electron/remote');

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#node-version').innerHTML = process.versions.node;

  document.querySelector('#send').addEventListener('click', () => {
    // 老 api
    // 直接从渲染进程使用主进程的功能
    // const browserWindow = new BrowserWindow({
    //   width: 500,
    //   height: 500,
    // });
    // browserWindow.loadURL('https://baidu.com');

    // 新 api 使用 invoke
    ipcRenderer.invoke('open-baidu-window').then((result) => {
      console.log(result);
    });
  });
});
