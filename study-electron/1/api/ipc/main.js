const { app, BrowserWindow, ipcMain } = require('electron');

// 监听 electron 初始化完成
app.whenReady().then(() => {
  // 创建渲染进程
  const window = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      // 启用 node.js api
      nodeIntegration: true,
      // 不需要独立的 context (默认每个渲染进程都是独立的 context 这将会导致无法使用 electron 和 node.js 相关的 api 出于安全考虑)
      contextIsolation: false,
    },
  });

  // 加载 html
  window.loadFile('index.html');

  // 打开浏览器调试工具
  window.webContents.openDevTools();

  // 监听渲染进程发送的信息 (主进程不能主动向渲染进程发送消息)
  ipcMain.on('sync-message', (event, data) => {
    console.log(data);
    // sync 消息用 returnValue 回复渲染进程
    event.returnValue = 'sync: hello from main process';
  });
  ipcMain.on('async-message', (event, data) => {
    console.log(data);
    // async 消息用 reply 回复渲染进程
    event.reply('async-message', 'async: hello from main process');
  });
});
