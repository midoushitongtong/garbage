import useWebContentsListener from '../../hooks/useWebContentsListener';

const remote = require('@electron/remote');

// 创建 main window
const createSettingWindow = () => {
  // 根据 isPackaged 区分生产/开发环境 url
  const url = remote.app.isPackaged ? 'TODO' : 'http://localhost:5000';

  // 创建渲染进程
  const settingWindow = new remote.BrowserWindow({
    show: false,
    webPreferences: {
      // 启用 node.js api
      nodeIntegration: true,
      // 不需要独立的 context (默认每个渲染进程都是独立的 context 这将会导致无法使用 electron 和 node.js 相关的 api 出于安全考虑)
      contextIsolation: false,
    },
    backgroundColor: '#efefef',
    parent: remote.getCurrentWindow(),
    width: 1100,
    height: 900,
  });

  // 开启渲染进程中的 remote api
  remote.require('@electron/remote/main').enable(settingWindow.webContents);

  // 显示开发控制台
  settingWindow.webContents.openDevTools();
  // 加载 url
  settingWindow.loadURL(url);
  // 渲染进程准备完成后显示窗口
  settingWindow.once('ready-to-show', () => {
    settingWindow.show();
  });
};

const BackendHandler = () => {
  useWebContentsListener({
    'open-setting-window': () => {
      createSettingWindow();
    },
  });

  return null;
};

export default BackendHandler;
