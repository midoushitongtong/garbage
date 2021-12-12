import React from 'react';
import FileSearch from '../../components/file-search/FileSearch';
import FileList from '../../components/file-list/FileList';
import { FileListItem } from '../../apis/file/types';
import './HomeLeft.scss';
import FileBottomButton from '../../components/file-bottom-button/FileBottomButton';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons';
import {
  saveFileToStore,
  renameFileToStore,
  saveFileListToStore,
  deleteFileToStore,
  getFileFromStore,
  checkFileExistsFromStore,
  readFile,
} from '../../utils/file';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { notification } from 'antd';
import useWebContentsListener from '../../hooks/useWebContentsListener';

const remote = require('@electron/remote');

// components props
type Props = {
  fileList: FileListItem[];
  openFileIdList: string[];
  closeTab: (id: string) => void;
  onChangeFileList: (fileList: FileListItem[]) => void;
  onChangeActiveFileId: (activeFileId: string) => void;
  onChangeOpenFileIdList: (openFileIdList: string[]) => void;
  createNewFile: () => void;
};

const HomeLeft = (props: Props) => {
  const {
    fileList,
    openFileIdList,
    closeTab,
    onChangeFileList,
    onChangeActiveFileId,
    onChangeOpenFileIdList,
    createNewFile,
  } = props;

  // search keyword
  const [searchKeyword, setSearchKeyword] = React.useState('');

  // search file list
  const searchFileList = React.useMemo(() => {
    if (searchKeyword) {
      return fileList.filter((item) => item.title.includes(searchKeyword));
    }
    return fileList;
  }, [fileList, searchKeyword]);

  // handle file click
  const handleFileClick = React.useCallback(
    async (id: string) => {
      onChangeActiveFileId(id);

      if (!openFileIdList.includes(id)) {
        onChangeOpenFileIdList([...openFileIdList, id]);
      }

      // 获取文件内容 (只获取一次, 已经获取过了就不需要再次获取)
      const fileListItem = fileList.find((item) => item.id === id);
      if (fileListItem && !fileListItem.isLoad) {
        const fileBody = await getFileFromStore(fileListItem);
        onChangeFileList(
          fileList.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                body: fileBody,
                isLoad: true, // 标记已经获取过了
              };
            }
            return item;
          })
        );
      }
    },
    [fileList, onChangeActiveFileId, onChangeFileList, onChangeOpenFileIdList, openFileIdList]
  );

  // handle file save edit
  const handleFileSaveEdit = React.useCallback(
    async (fileListItem: FileListItem, isNew: boolean) => {
      try {
        const newFileList = fileList.map((item) => {
          if (item.id === fileListItem.id) {
            return {
              ...fileListItem,
            };
          }
          return item;
        });

        if (isNew) {
          // 创建新文件
          await saveFileToStore(fileListItem);
          // 保存文件列表
          await saveFileListToStore(newFileList);
          onChangeFileList(newFileList);
        } else {
          // 重命名文件
          // 先拿到旧文件
          const oldFileListItem = fileList.find((item) => item.id === fileListItem.id);
          if (oldFileListItem) {
            // 重命名文件
            await renameFileToStore(oldFileListItem, fileListItem);
            // 保存文件列表
            await saveFileListToStore(newFileList);
            onChangeFileList(newFileList);
          } else {
            console.log(`未找到旧文件, id: ${fileListItem.id}`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [fileList, onChangeFileList]
  );

  // handle file delete
  const handleFileDelete = React.useCallback(
    async (id: string) => {
      const fileListItem = fileList.find((item) => item.id === id);
      const newFileList = fileList.filter((item) => item.id !== id);

      if (fileListItem) {
        // 加 isNew 判断, 不是新文件才进行 store 操作
        if (!fileListItem.isNew) {
          // 删除文件
          await deleteFileToStore(fileListItem);
          // 保存文件列表
          await saveFileListToStore(newFileList);
        }

        onChangeFileList(newFileList);
        closeTab(id);
      }
    },
    [closeTab, fileList, onChangeFileList]
  );

  // 导入文件
  const handleImportFile = React.useCallback(async () => {
    try {
      const result = await remote.dialog.showOpenDialog({
        title: '请选择需要导入的 markdown 文件',
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Markdown files', extensions: ['md'] }],
      });

      if (!result.canceled) {
        // 过滤 path 已经存在的文件不能在导入
        const filterFilePaths: string[] = [];
        for await (const item of result.filePaths) {
          const fileName = path.basename(item, path.extname(item));
          const exists = await checkFileExistsFromStore(fileName);
          if (exists) {
            notification.error({
              message: `此文件已存在: ${fileName}`,
              description: '请更换其他文件名称',
              duration: 3,
            });
          } else {
            filterFilePaths.push(item);
          }
        }

        // 为什么要加 > 0 判断
        // 假如一次打开 2 个文件选择 modal 后者可能会覆盖前者 (第 1 个 modal 保存后的 fileList 第 2 个 modal 无法获取最新的 fileList)
        if (filterFilePaths.length > 0) {
          // 组成需要导入的文件信息
          const importFileList: FileListItem[] = [];
          for await (const item of filterFilePaths) {
            const importFileListItem: FileListItem = {
              id: uuidv4(),
              title: path.basename(item, path.extname(item)),
              body: await readFile(item),
              createdAt: new Date().toISOString(),
            };
            importFileList.push(importFileListItem);
          }

          // 创建新文件
          for await (const item of importFileList) {
            await saveFileToStore(item);
          }

          const newFileList = [...fileList, ...importFileList];

          // 保存文件列表
          await saveFileListToStore(newFileList);
          onChangeFileList(newFileList);

          remote.dialog.showMessageBox({
            type: 'info',
            title: '我的云文档',
            message: `成功导入 ${importFileList.length} 个文件`,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [fileList, onChangeFileList]);

  useWebContentsListener({
    'import-file': handleImportFile,
  });

  return (
    <nav className="home-left">
      <div className="home-left-content">
        {/* file search */}
        <FileSearch
          title="我的云文档"
          onFileSearch={(keyword: string) => {
            setSearchKeyword(() => keyword);
          }}
        />

        {/* file list */}
        <FileList
          fileList={searchFileList}
          onFileClick={handleFileClick}
          onFileSaveEdit={handleFileSaveEdit}
          onFileDelete={handleFileDelete}
        />
      </div>

      {/* file bottom button */}
      <div className="home-left-bottom">
        <FileBottomButton icon={faPlus} text="新建" variant="primary" onClick={createNewFile} />
        <FileBottomButton
          icon={faFileImport}
          text="导入"
          variant="success"
          onClick={handleImportFile}
        />
      </div>
    </nav>
  );
};

export default HomeLeft;
