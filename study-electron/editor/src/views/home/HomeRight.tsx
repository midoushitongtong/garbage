import React from 'react';
import 'easymde/dist/easymde.min.css';
import { FileListItem } from '../../apis/file/types';
import FileTabList from '../../components/file-tab-list/FileTabList';
import './HomeRight.scss';
import FileEditor from '../../components/file-editor/FileEditor';

// component props
type Props = {
  fileList: FileListItem[];
  activeFileId: string;
  openFileIdList: string[];
  unsaveFileIdList: string[];
  closeTab: (id: string) => void;
  onChangeFileList: (fileList: FileListItem[]) => void;
  onChangeActiveFileId: (activeFileId: string) => void;
  onChangeUnsaveFileIdList: (unsaveFileIdList: string[]) => void;
};

const HomeRight = (props: Props) => {
  const {
    fileList,
    activeFileId,
    openFileIdList,
    unsaveFileIdList,
    closeTab,
    onChangeFileList,
    onChangeActiveFileId,
    onChangeUnsaveFileIdList,
  } = props;

  // 已打开的文件列表
  const openFileList = React.useMemo(() => {
    return openFileIdList
      .map((item) => fileList.find((item2) => item2.id === item))
      .filter((item) => item !== undefined) as FileListItem[];
  }, [fileList, openFileIdList]);
  // 正在编辑的文件
  const activeFile = React.useMemo(() => {
    return fileList.find((item) => item.id === activeFileId);
  }, [activeFileId, fileList]);

  // 修改文件内容
  const handleFileBodyChange = React.useCallback(
    (id: string, value: string) => {
      const newFileList = fileList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            body: value,
          };
        }
        return item;
      });

      onChangeFileList(newFileList);
      if (!unsaveFileIdList.includes(id)) {
        onChangeUnsaveFileIdList([...unsaveFileIdList, id]);
      }
    },
    [fileList, onChangeFileList, onChangeUnsaveFileIdList, unsaveFileIdList]
  );

  return (
    <div className="home-right">
      {activeFile ? (
        <>
          {/* file tab list */}
          <FileTabList
            openFileList={openFileList}
            activeFileId={activeFileId}
            unsaveFileIdList={unsaveFileIdList}
            onFileTabClick={(id: string) => {
              onChangeActiveFileId(id);
            }}
            onCloseFileTab={(id: string) => {
              closeTab(id);
            }}
          />

          {/* markdown editor */}
          <FileEditor
            value={activeFile?.body}
            onChangeValue={(value) => {
              handleFileBodyChange(activeFileId, value || '');
            }}
          />
        </>
      ) : (
        <>
          <div className="start-page">选择或者创建新的 Markdown 文档</div>
        </>
      )}
    </div>
  );
};

export default HomeRight;