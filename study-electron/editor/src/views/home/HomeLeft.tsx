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
  onChangeFileList: (fileList: FileListItem[]) => void;
};

const HomeLeft = (props: Props) => {
  const { fileList, onChangeFileList } = props;

  // handle file click
  const handleFileClick = React.useCallback((id: string) => {
    console.log(id);
  }, []);

  // handle file save edit
  const handleFileSaveEdit = React.useCallback(
    (id: string, fileTitle: string) => {
      onChangeFileList(
        fileList.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              title: fileTitle,
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
    },
    [fileList, onChangeFileList]
  );

  return (
    <nav className="home-left">
      <div className="home-left-content">
        {/* file search */}
        <FileSearch
          title="我的云文档"
          onFileSearch={(value) => {
            console.log(value);
          }}
        />

        {/* file list */}
        <FileList
          fileList={fileList}
          onFileClick={handleFileClick}
          onFileSaveEdit={handleFileSaveEdit}
          onFileDelete={handleFileDelete}
        />
      </div>

      {/* file bottom button */}
      <div className="home-left-bottom">
        <FileBottomButton icon={faPlus} text="新建" variant="primary" />
        <FileBottomButton icon={faFileImport} text="导入" variant="success" />
      </div>
    </nav>
  );
};

export default HomeLeft;
