import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FileListItem } from '../../apis/file/types';
import useEffectOnce from '../../hooks/useEffectOnce';
import './Home.scss';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [initDataLoading, setInitDataLoading] = React.useState(true);
  // 文件列表
  const [fileList, setFileList] = React.useState<FileListItem[]>([]);
  // 已打开的文件列表 id
  const [openFileIdList, setOpenFileIdList] = React.useState<string[]>([]);
  // 正在编辑的文件 id
  const [activeFileId, setActiveFileId] = React.useState('');
  // 未保存的文件列表 id
  const [unsaveFileIdList, setUnsaveFileIdList] = React.useState<string[]>([]);

  // init data
  const initData = React.useCallback(() => {
    const fileList = [
      {
        id: '1',
        title: 'first post',
        body: '# this is the first post content',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'second post',
        body: '# this is the second post content',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'three post',
        body: '# this is the three post content',
        createdAt: new Date().toISOString(),
      },
    ];

    setFileList(fileList);
    setInitDataLoading(false);
  }, []);

  // close tab
  const closeTab = React.useCallback(
    (id: string) => {
      const newOpenFileIdList = openFileIdList.filter((item) => item !== id);
      setOpenFileIdList(newOpenFileIdList);

      // 如果关闭的是当前正在编辑的文件
      // 将正在编辑的文件切换到第 0 个
      if (activeFileId === id) {
        setActiveFileId(newOpenFileIdList[0]);
      }
    },
    [activeFileId, openFileIdList]
  );

  // create new file
  const createNewFile = React.useCallback(() => {
    const newId = uuidv4();

    const newFileList = [
      ...fileList,
      {
        id: newId,
        title: '',
        body: '# 请输出 Markdown',
        createdAt: new Date().toISOString(),
        isNew: true,
      },
    ];

    setFileList(() => newFileList);
  }, [fileList]);

  useEffectOnce(() => {
    initData();
  });

  return (
    <div className="home">
      <Container fluid className="container">
        {!initDataLoading && (
          <Row>
            <Col xs={12} md={4} lg={3} className="left-panel">
              <HomeLeft
                fileList={fileList}
                openFileIdList={openFileIdList}
                closeTab={closeTab}
                onChangeFileList={(newFileList) => {
                  setFileList(() => newFileList);
                }}
                onChangeOpenFileIdList={(openFileIdList) => {
                  setOpenFileIdList(() => openFileIdList);
                }}
                onChangeActiveFileId={(activeFileId) => {
                  setActiveFileId(() => activeFileId);
                }}
                createNewFile={createNewFile}
              />
            </Col>
            <Col xs={12} md={8} lg={9} className="right-panel">
              <HomeRight
                fileList={fileList}
                activeFileId={activeFileId}
                unsaveFileIdList={unsaveFileIdList}
                openFileIdList={openFileIdList}
                closeTab={closeTab}
                onChangeFileList={(newFileList) => {
                  setFileList(() => newFileList);
                }}
                onChangeActiveFileId={(activeFileId) => {
                  setActiveFileId(() => activeFileId);
                }}
                onChangeUnsaveFileIdList={(unsaveFileIdList) => {
                  setUnsaveFileIdList(() => unsaveFileIdList);
                }}
              />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
