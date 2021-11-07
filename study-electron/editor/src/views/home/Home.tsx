import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FileSearch from '../../components/file-search/FileSearch';
import FileList from '../../components/file-list/FileList';
import { FileListItem } from '../../apis/file/types';
import './Home.scss';
import useEffectOnce from '../../hooks/useEffectOnce';

function Home() {
  const [fileList, setFileList] = React.useState<FileListItem[]>([]);

  // init data
  const initData = React.useCallback(() => {
    setFileList([
      {
        id: '1',
        title: 'first post',
        body: 'this is the first post content',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'second post',
        body: 'this is the second post content',
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  // handle file click
  const handleFileClick = React.useCallback((id: string) => {
    console.log(id);
  }, []);

  // handle file save edit
  const handleFileSaveEdit = React.useCallback((id: string, fileTitle: string) => {
    console.log(id, fileTitle);

    setFileList((previous) =>
      previous.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: fileTitle,
          };
        }
        return item;
      })
    );
  }, []);

  // handle file delete
  const handleFileDelete = React.useCallback((id: string) => {
    console.log(id);
  }, []);

  useEffectOnce(() => {
    initData();
  });

  return (
    <div className="home">
      <Container fluid className="container">
        <Row>
          <Col xs={12} md={4} lg={3} className="left-panel">
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
          </Col>
          <Col xs={12} md={8} lg={9} className="right-panel">
            <h1>this is the right</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
