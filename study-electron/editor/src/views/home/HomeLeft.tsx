import React from 'react';
import FileSearch from '../../components/file-search/FileSearch';
import FileList from '../../components/file-list/FileList';
import { FileListItem } from '../../apis/file/types';
import './HomeLeft.scss';
import FileBottomButton from '../../components/file-bottom-button/FileBottomButton';
import { faPlus, faFileImport, faSave } from '@fortawesome/free-solid-svg-icons';
import { getFileSaveLocation, renameFile, writeFile } from '../../utils/file';
import path from 'path';

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
    (id: string) => {
      onChangeActiveFileId(id);
      if (!openFileIdList.includes(id)) {
        onChangeOpenFileIdList([...openFileIdList, id]);
      }
    },
    [onChangeActiveFileId, onChangeOpenFileIdList, openFileIdList]
  );

  // handle file save edit
  const handleFileSaveEdit = React.useCallback(
    async (fileListItem: FileListItem, isNew: boolean) => {
      // file save location
      const fileSaveLocation = getFileSaveLocation();

      try {
        // 文件路径
        const filePath = path.join(fileSaveLocation, `${fileListItem.title}.md`);

        if (isNew) {
          // 创建新文件
          await writeFile(filePath, fileListItem.body);

          console.log(`已创建新文件: ${filePath}`);
        } else {
          // 重命名文件
          // 先拿到旧文件
          const oldFileListItem = fileList.find((item) => item.id === fileListItem.id);

          if (oldFileListItem) {
            // 旧文件地址
            const oldFilePath = path.join(fileSaveLocation, `${oldFileListItem.title}.md`);
            // 重命名文件
            await renameFile(oldFilePath, filePath);

            console.log(`已重命名文件: ${filePath}`);
          }
        }

        onChangeFileList(
          fileList.map((item) => {
            if (item.id === fileListItem.id) {
              return {
                ...fileListItem,
              };
            }
            return item;
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    [fileList, onChangeFileList]
  );

  // handle file delete
  const handleFileDelete = React.useCallback(
    (id: string) => {
      onChangeFileList(fileList.filter((item) => item.id !== id));

      closeTab(id);
    },
    [closeTab, fileList, onChangeFileList]
  );

  // 保存当前文件
  const saveCurrentFile = React.useCallback(async () => {
    // file save location
    const fileSaveLocation = getFileSaveLocation();

    try {
      if (activeFile) {
        const filePath = path.join(fileSaveLocation, `${activeFile.title}.md`);

        await writeFile(filePath, activeFile.body);

        onChangeUnsaveFileIdList(unsaveFileIdList.filter((item) => item !== activeFile.id));

        console.log(`已保存文件: ${filePath}`);
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
