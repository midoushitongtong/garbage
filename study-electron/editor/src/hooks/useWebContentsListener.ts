import React from 'react';

const remote = require('@electron/remote');

/**
 * 检测 webContent 事件
 */
const useWebContentsListener = (keyCallbackMap: {
  [key in string]: Function;
}) => {
  React.useEffect(() => {
    Object.keys(keyCallbackMap).forEach((key) => {
      // 添加监听事件
      remote.getCurrentWindow().webContents.on(key, keyCallbackMap[key]);
    });

    return () => {
      // 移除监听事件
      Object.keys(keyCallbackMap).forEach((key) => {
        // 添加监听事件
        remote.getCurrentWindow().webContents.removeListener(key, keyCallbackMap[key]);
      });
    };
  });
};

export default useWebContentsListener;
