import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { FileListItem } from '../../apis/file/types';
import FileTabList from '../../components/file-tab-list/FileTabList';
import './HomeRight.scss';
import FileEditor from '../../components/file-editor/FileEditor';

// component props
type Props = {
  tabFileList: FileListItem[];
  onChangeTabFileList: (fileList: FileListItem[]) => void;
};

const HomeRight = (props: Props) => {
  const { tabFileList, onChangeTabFileList } = props;

  // 正在编辑的文件 id
  const [activeFileId, setActiveFileId] = React.useState<string | undefined>('1');
  // 未保存的文件 id 列表
  const [unsaveFileIdList, setUnsaveFileIdList] = React.useState<string[]>([]);
  // 正在编辑的文件内容
  const [fileBody, setFileBody] = React.useState(
    tabFileList.find((item) => item.id === activeFileId)?.body
  );

  return (
    <div className="home-right">
      {/* file tab list */}
      <FileTabList
        tabFileList={tabFileList}
        activeFileId={activeFileId}
        unsaveFileIdList={unsaveFileIdList}
        onFileTabClick={(id: string) => {
          setActiveFileId(id);
        }}
        onCloseFileTab={(id: string) => {
          const newTabFileList = tabFileList.filter((item) => item.id !== id);
          onChangeTabFileList(newTabFileList);
          setActiveFileId(newTabFileList[0]?.id);
        }}
      />

      {/* markdown editor */}
      <FileEditor value={fileBody} onChangeValue={setFileBody} />
    </div>
  );
};

export default HomeRight;
