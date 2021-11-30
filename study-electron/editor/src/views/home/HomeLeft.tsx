import React from 'react';
import FileSearch from '../../components/file-search/FileSearch';
import FileList from '../../components/file-list/FileList';
import { FileListItem } from '../../apis/file/types';
import './HomeLeft.scss';
import FileBottomButton from '../../components/file-bottom-button/FileBottomButton';
import { faPlus, faFileImport, faSave } from '@fortawesome/free-solid-svg-icons';
import {
  saveFileToStore,
  renameFileToStore,
  saveFileListToStore,
  deleteFileToStore,
  getFileFromStore,
} from '../../utils/file';

// components props
type Props = {
  fileList: FileListItem[];
  activeFileId: string;
  unsaveFileIdList: string[];
  openFileIdList: string[];
  closeTab: (id: string) => void;
  onChangeFileList: (fileList: FileListItem[]) => void;
  onChangeActiveFileId: (activeFileId: string) => void;
  onChangeOpenFileIdList: (openFileIdList: string[]) => void;
  onChangeUnsaveFileIdList: (unsaveFileIdList: string[]) => void;
  createNewFile: () => void;
};

const HomeLeft = (props: Props) => {
  const {
    fileList,
    activeFileId,
    openFileIdList,
    unsaveFileIdList,
    closeTab,
    onChangeFileList,
    onChangeActiveFileId,
    onChangeOpenFileIdList,
    onChangeUnsaveFileIdList,
    createNewFile,
  } = props;

  // 正在编辑的文件
  const activeFile = React.useMemo(() => {
    return fileList.find((item) => item.id === activeFileId);
  }, [activeFileId, fileList]);

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

  // 保存当前文件
  const saveCurrentFile = React.useCallback(async () => {
    try {
      if (activeFile) {
        await saveFileToStore(activeFile);

        onChangeUnsaveFileIdList(unsaveFileIdList.filter((item) => item !== activeFile.id));
      }
    } catch (error) {
      console.log(error);
    }
  }, [activeFile, onChangeUnsaveFileIdList, unsaveFileIdList]);

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
        <FileBottomButton icon={faFileImport} text="导入" variant="success" />
        {activeFile && (
          <FileBottomButton icon={faSave} text="保存" variant="warning" onClick={saveCurrentFile} />
        )}
      </div>
    </nav>
  );
};

export default HomeLeft;
