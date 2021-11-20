import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FileListItem } from '../../apis/file/types';
import useEffectOnce from '../../hooks/useEffectOnce';
import './Home.scss';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';

const Home = () => {
  const [initDataLoading, setInitDataLoading] = React.useState(true);
  const [fileList, setFileList] = React.useState<FileListItem[]>([]);
  const [tabFileList, setTabFileList] = React.useState<FileListItem[]>([]);

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
    ];

    setFileList(fileList);
    setTabFileList(fileList);
    setInitDataLoading(false);
  }, []);

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
                onChangeFileList={(newFileList) => {
                  setFileList(() => newFileList);
                }}
              />
            </Col>
            <Col xs={12} md={8} lg={9} className="right-panel">
              <HomeRight
                tabFileList={tabFileList}
                onChangeTabFileList={(newTabFileList) => {
                  setTabFileList(() => newTabFileList);
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
