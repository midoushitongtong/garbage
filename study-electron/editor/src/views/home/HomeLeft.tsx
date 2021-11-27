import React from 'react';
import FileSearch from '../../components/file-search/FileSearch';
import FileList from '../../components/file-list/FileList';
import { FileListItem } from '../../apis/file/types';
import './HomeLeft.scss';
import FileBottomButton from '../../components/file-bottom-button/FileBottomButton';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons';

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
    (fileListItem: FileListItem) => {
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
      </div>
    </nav>
  );
};

export default HomeLeft;
