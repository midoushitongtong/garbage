const { app, BrowserWindow } = require('electron');
// 初始化 remote api
require('@electron/remote/main').initialize();

// 监听 electron 初始化完成
app.whenReady().then(() => {
  // 创建渲染进程
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      // 启用 node.js api
      nodeIntegration: true,
      // 不需要独立的 context (默认每个渲染进程都是独立的 context 这将会导致无法使用 electron 和 node.js 相关的 api 出于安全考虑)
      contextIsolation: false,
    },
  });

  // 开启渲染进程中的 remote api
  require('@electron/remote/main').enable(mainWindow.webContents);

  // 根据 isPackaged 区分生产/开发环境 url
  const url = app.isPackaged ? 'TODO' : 'http://localhost:5000';
  // 加载 url
  mainWindow.loadURL(url);
  // 设置窗口大小为全屏显示
  mainWindow.maximize();
  // 显示开发控制台
  mainWindow.webContents.openDevTools();
  // 显示窗口
  mainWindow.show();
});
