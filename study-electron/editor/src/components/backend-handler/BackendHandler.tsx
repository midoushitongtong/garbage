import useWebContentsListener from '../../hooks/useWebContentsListener';
import { useLocation } from 'react-router-dom';
import { menuTemplate } from '../../utils/menu';
import React from 'react';
import electron from 'electron';

const remote = window.require('@electron/remote');

// 创建 setting window
const createSettingWindow = () => {
  // 根据 isPackaged 区分生产/开发环境 url
  const url = remote.app.isPackaged ? 'TODO' : 'http://localhost:5000/setting';

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

  settingWindow.on('close', () => {
    // 通知窗口关闭
    electron.ipcRenderer.emit('browser-window-close', 'Setting');
  });
};

const BackendHandler = () => {
  const location = useLocation();

  // 设置 app 菜单
  const setMenu = React.useCallback(() => {
    // 只有在首页在设置 app 菜单
    if (location.pathname === '/') {
      const menu = remote.Menu.buildFromTemplate(menuTemplate);
      remote.Menu.setApplicationMenu(menu);
    }
  }, [location.pathname]);

  useWebContentsListener({
    'open-setting-window': () => {
      createSettingWindow();
    },
    'browser-window-close': () => {
      // 当 brwoser window 关闭的时候, 重新设置 app 菜单
      // 为什么:
      //  - 因为每打开一个新的 browser window 都会重新设置一次 app 菜单, 关闭 browser window 后, 菜单点击事件就会被销毁
      //  - 所以每次关闭 browser window 重新设置一次 app 菜单, 确保事件正常运行
      setMenu();
    },
  });

  React.useEffect(() => {
    setMenu();
  }, [setMenu]);

  return null;
};

export default BackendHandler;
