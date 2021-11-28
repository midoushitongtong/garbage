import fs from 'fs';
import path from 'path';

const remote = require('@electron/remote');

/**
 * 本文件导出应用中所有对文件操作的 api
 * 备注: 有些 api 可能是原封不动的调用 node.js 的 api, 例如 renameFile() 这个方法, 初期可能没用, 方便后续可扩展性
 */

// 读文件
export const readFile = (path: string) => {
  return fs.promises.readFile(path, {
    encoding: 'utf8',
  });
};

// 写文件
export const writeFile = (path: string, content: string) => {
  return fs.promises.writeFile(path, content, {
    encoding: 'utf8',
  });
};

// 重命名文件
export const renameFile = (path: string, newPath: string) => {
  return fs.promises.rename(path, newPath);
};

// 删除文件
export const deleteFile = (path: string, newPath: string) => {
  return fs.promises.unlink(path);
};

// 文件保存的路径
export const getFileSaveLocation = () => {
  const dir = path.join(remote.app.getPath('documents'), 'editor');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir;
};
