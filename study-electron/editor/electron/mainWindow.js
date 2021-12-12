const { app, BrowserWindow, Menu } = require('electron');
// 初始化 remote api
require('@electron/remote/main').initialize();

// 创建 main window
const createMainWindow = () => {
  // 根据 isPackaged 区分生产/开发环境 url
  const url = app.isPackaged ? 'TODO' : 'http://localhost:5000';

  // 创建渲染进程
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      // 启用 node.js api
      nodeIntegration: true,
      // 不需要独立的 context (默认每个渲染进程都是独立的 context 这将会导致无法使用 electron 和 node.js 相关的 api 出于安全考虑)
      contextIsolation: false,
    },
    backgroundColor: '#efefef',
  });

  // 开启渲染进程中的 remote api
  require('@electron/remote/main').enable(mainWindow.webContents);

  // 设置窗口大小为全屏显示
  mainWindow.maximize();
  // 显示开发控制台
  mainWindow.webContents.openDevTools();
  // 加载 url
  mainWindow.loadURL(url);
  // 渲染进程准备完成后显示窗口
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 清空默认菜单
  Menu.setApplicationMenu(null);
};

// 监听 electron 初始化完成
app.whenReady().then(() => {
  // 创建 window
  createMainWindow();

  app.on('activate', () => {
    // 在 macOS 上，在应用程序中重新创建一个窗口是很常见的，当点击
    // dock 图标，并且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// 当所有窗口都关闭时退出，但在 macOS 上除外。在那里，常见的情况是
// 应用程序和它们的菜单栏一直处于活动状态，直到用户用 Cmd+Q 退出。
// 明确地用 Cmd+Q 退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
