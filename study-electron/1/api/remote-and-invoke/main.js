const { app, BrowserWindow, ipcMain } = require('electron');
// 老 api
// 初始化 remote api
// require('@electron/remote/main').initialize();

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

  // 老 api
  // 开启渲染进程中的 remote api
  // require('@electron/remote/main').enable(browserWindow.webContents);

  // 加载 html
  window.loadFile('index.html');

  // 打开浏览器调试工具
  window.webContents.openDevTools();

  // 新 api
  // handle 渲染进程中的 invoke
  ipcMain.handle('open-baidu-window', async (event, data) => {
    const window = new BrowserWindow({
      width: 500,
      height: 500,
    });

    window.loadURL('https://baidu.com');

    return 'open ok';
  });
});
