import fs from 'fs';
import path from 'path';
import { FileListItem } from '../../apis/file/types';

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
export const deleteFile = (path: string) => {
  return fs.promises.unlink(path);
};

// userData 保存的路径
export const getUserDataSaveLocation = () => {
  const dir = path.join(remote.app.getPath('userData'), 'editor');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir;
};

// 从 store 获取文件列表
export const getFileListFromStore = async (): Promise<FileListItem[]> => {
  // user data save location
  const userDataSaveLocation = getUserDataSaveLocation();
  // 文件列表保存路径
  const filePath = path.join(userDataSaveLocation, 'fileList.json');
  // 没有文件返回空数组
  if (!fs.existsSync(filePath)) {
    return [];
  }
  // 读取文件
  let result: any = await readFile(filePath);
  if (result) {
    try {
      result = JSON.parse(result);
    } catch (error) {
      result = [];
      console.log('文件列表数据解析失败');
    }
  } else {
    result = [];
  }
  return result as FileListItem[];
};

// 从 store 获取文件
export const getFileFromStore = async (fileListItem: FileListItem) => {
  // user data save location
  const userDataSaveLocation = getUserDataSaveLocation();
  // 文件路径
  const filePath = path.join(userDataSaveLocation, `${fileListItem.title}.md`);

  if (!fs.existsSync(filePath)) {
    console.log(`未找到文件: ${filePath}`);
    return '';
  } else {
    const result = await readFile(filePath);

    return result;
  }
};

// 返回 store 中的 path
export const getFilePathFromStore = async (title: string) => {
  // user data save location
  const userDataSaveLocation = getUserDataSaveLocation();
  // 文件路径
  const filePath = path.join(userDataSaveLocation, `${title}.md`);

  return filePath;
};

// 从 store 判断文件是否已经存在
export const checkFileExistsFromStore = async (title: string) => {
  // user data save location
  const userDataSaveLocation = getUserDataSaveLocation();
  // 文件路径
  const filePath = path.join(userDataSaveLocation, `${title}.md`);

  return fs.existsSync(filePath);
};

// 保存文件列表到 store
export const saveFileListToStore = async (fileList: FileListItem[]) => {
  // user data save location
  const userDataSaveLocation = getUserDataSaveLocation();
  // 文件列表保存路径
  const filePath = path.join(userDataSaveLocation, 'fileList.json');
  const fileListWithStore = fileList.map((item) => ({
    id: item.id,
    title: item.title,
    createdAt: item.createdAt,
  }));
  // 保存文件
  await writeFile(filePath, JSON.stringify(fileListWithStore));

  console.log(`文件列表已保存: ${filePath}`);
};

// 保存文件到 store
export const saveFileToStore = async (fileListItem: FileListItem) => {
  // user data save location
  const userDataSaveLocation = getUserDataSaveLocation();
  // 文件路径
  const filePath = path.join(userDataSaveLocation, `${fileListItem.title}.md`);
  // 保存文件
  await writeFile(filePath, fileListItem.body || '');

  console.log(`已保存文件: ${filePath}`);
};

// 重命名文件到 store
export const renameFileToStore = async (
  oldFileListItem: FileListItem,
  newFileListItem: FileListItem
) => {
  // user data save location
  const userDataSaveLocation = getUserDataSaveLocation();
  // 旧文件路径
  const oldFilePath = path.join(userDataSaveLocation, `${oldFileListItem.title}.md`);
  // 新文件路径
  const newFilePath = path.join(userDataSaveLocation, `${newFileListItem.title}.md`);

  if (!fs.existsSync(oldFilePath)) {
    console.log(`未找到旧文件: ${oldFilePath}`);
  } else {
    // 重命名文件
    await renameFile(oldFilePath, newFilePath);

    console.log(`已重命名文件: ${newFilePath}`);
  }
};

// 删除文件到 store
export const deleteFileToStore = async (fileListItem: FileListItem) => {
  // user data save location
  const userDataSaveLocation = getUserDataSaveLocation();
  // 文件路径
  const filePath = path.join(userDataSaveLocation, `${fileListItem.title}.md`);

  if (!fs.existsSync(filePath)) {
    console.log(`未找到需要删除的文件: ${filePath}`);
  } else {
    // 删除文件
    await deleteFile(filePath);

    console.log(`已删除文件: ${filePath}`);
  }
};
