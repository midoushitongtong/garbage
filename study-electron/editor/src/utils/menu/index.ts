import electron from 'electron';

const remote = window.require('@electron/remote');

export const menuTemplate: any[] = [
  {
    label: '文件',
    submenu: [
      {
        label: '新建',
        accelerator: 'CmdOrCtrl+N',
        click: (menuItme: any, browserWindow: any, event: any) => {
          electron.ipcRenderer.emit('create-new-file');
        },
      },
      {
        label: '保存',
        accelerator: 'CmdOrCtrl+S',
        click: (menuItme: any, browserWindow: any, event: any) => {
          electron.ipcRenderer.emit('save-edit-file');
        },
      },
      {
        label: '搜索',
        accelerator: 'CmdOrCtrl+F',
        click: (menuItme: any, browserWindow: any, event: any) => {
          electron.ipcRenderer.emit('search-file');
        },
      },
      {
        label: '导入',
        accelerator: 'CmdOrCtrl+O',
        click: (menuItme: any, browserWindow: any, event: any) => {
          electron.ipcRenderer.emit('import-file');
        },
      },
    ],
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo',
      },
      {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo',
      },
      {
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut',
      },
      {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy',
      },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
      },
      {
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectAll',
      },
    ],
  },
  {
    label: '视图',
    submenu: [
      {
        label: '刷新当前页面',
        accelerator: 'CmdOrCtrl+R',
        click: (menuItme: any, browserWindow: any, event: any) => {
          if (browserWindow) {
            browserWindow.reload();
          }
        },
      },
      {
        label: '切换全屏幕',
        accelerator: () => {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F';
          }
          return 'F11';
        },
        click: (menuItme: any, browserWindow: any, event: any) => {
          if (browserWindow) {
            browserWindow.setFullScreen(!browserWindow.isFullScreen());
          }
        },
      },
      {
        label: '切换开发者工具',
        accelerator: () => {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I';
          }
          return 'Ctrl+Shift+I';
        },
        click: (menuItme: any, browserWindow: any, event: any) => {
          if (browserWindow) {
            browserWindow.toggleDevTools();
          }
        },
      },
    ],
  },
  {
    label: '窗口',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
    ],
  },
  {
    label: '帮助',
    submenu: [
      {
        label: 'electron 文档',
        click: (menuItme: any, browserWindow: any, event: any) => {
          remote.shell.openExternal('https://www.electronjs.org');
        },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({
    label: '我的云文档',
    submenu: [
      {
        label: '关于我的云文档',
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: '设置',
        accelerator: 'Command+,',
        click: (menuItme: any, browserWindow: any, event: any) => {
          electron.ipcRenderer.emit('open-setting-window');
        },
      },
      {
        type: 'separator',
      },
      {
        label: '隐藏我的云文档',
        accelerator: 'Command+H',
        role: 'hide',
      },
      {
        label: '隐藏其它',
        accelerator: 'Command+Alt+H',
        role: 'hideOthers',
      },
      {
        label: '显示全部',
        role: 'unhide',
      },
      {
        type: 'separator',
      },
      {
        label: '退出',
        accelerator: 'Command+Q',
        click: () => {
          remote.app.quit();
        },
      },
    ],
  });
} else {
  menuTemplate[0].submenu.push({
    label: '设置',
    accelerator: 'Ctrl+,',
    click: (menuItme: any, browserWindow: any, event: any) => {
      electron.ipcRenderer.emit('open-setting-window');
    },
  });
}
