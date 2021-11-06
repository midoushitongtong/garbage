const { app, BrowserWindow } = require('electron');

// 监听 electron 初始化完成
app.whenReady().then(() => {
  // 创建渲染进程
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      // 启用 node.js api
      nodeIntegration: true,
      // 不需要独立的 context (默认每个渲染进程都是独立的 context 这将会导致无法使用 electron 和 node.js 相关的 api 出于安全考虑)
      contextIsolation: false,
    },
  });

  // 根据 isPackaged 区分生成/开发环境 url
  const url = app.isPackaged ? 'TODO' : 'http://localhost:3000';

  // 加载 url
  mainWindow.loadURL(url);
});
