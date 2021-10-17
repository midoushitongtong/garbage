const { app, BrowserWindow } = require('electron');

// 监听 electron 初始化完成
app.whenReady().then(() => {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      // 启用 node.js api
      nodeIntegration: true,
      // 不需要独立的 context (默认每个 BrowserWindow 都是独立的 context 这将会导致无法使用 electron 和 node.js 相关的 api 出于安全考虑)
      contextIsolation: false,
    },
  });

  // 加载 html
  mainWindow.loadFile('index.html');

  // 打开浏览器调试工具
  mainWindow.webContents.openDevTools();
});
