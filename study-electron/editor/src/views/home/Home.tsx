import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FileListItem } from '../../apis/file/types';
import useEffectOnce from '../../hooks/useEffectOnce';
import './Home.scss';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
import { v4 as uuidv4 } from 'uuid';
import {
  getFileListFromStore,
  getFilePathFromStore,
  getIsAutoSyncToQinNiu,
  saveFileListToStore,
  saveFileToStore,
} from '../../utils/file';
import useWebContentsListener from '../../hooks/useWebContentsListener';
import { createQinNiuManageWithStore } from '../../utils/qin-niu';
import { notification } from 'antd';
import electron from 'electron';

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
  // 正在编辑的文件
  const activeFile = React.useMemo(() => {
    return fileList.find((item) => item.id === activeFileId);
  }, [activeFileId, fileList]);

  useWebContentsListener({
    'qin-niu-upload-all-file': async () => {
      // 显示 loading
      electron.ipcRenderer.emit('toggle-loading', true);

      const qinNiuManage = await createQinNiuManageWithStore();
      const fileList = await getFileListFromStore();

      // 新的文件列表 (临时的数组, 数组内容会被修改)
      let newFileList = fileList;

      try {
        const uploadPromiseArr = fileList.map((item) => {
          return new Promise(async (resolve, reject) => {
            // 删除旧文件
            if (item.fileKey) {
              try {
                await qinNiuManage.deleteFile(item.fileKey);
              } catch (error) {
                // 文件删除失败, 不需要处理
              }
            }

            // 上传新文件
            try {
              const fileKey = `${item.title}_${new Date().getTime()}.md`;
              const result = await qinNiuManage.uploadFile(
                fileKey,
                await getFilePathFromStore(item.title)
              );
              newFileList = newFileList.map((item2) => {
                if (item2.id === item.id) {
                  return {
                    ...item2,
                    fileKey,
                    isSynced: true,
                    lastSyncedAt: new Date().getTime(),
                  };
                }
                return item2;
              });
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        });

        const result = await Promise.all(uploadPromiseArr);

        setFileList(newFileList);
        saveFileListToStore(newFileList);

        notification.success({
          message: '云同步 - 文件已同步完成',
          description: `共同步 ${result.length} 个文件`,
          duration: 3,
        });
      } catch (error) {
        console.log(error);

        notification.error({
          message: '云同步 - 文件同步失败, 请检查七牛云参数是否正确!',
          description: JSON.stringify(error),
          // 永久显示不会自动关闭
          duration: 0,
        });
      } finally {
        // 隐藏 loading
        electron.ipcRenderer.emit('toggle-loading', false);
      }
    },
  });

  // init data
  const initData = React.useCallback(async () => {
    const fileList = await getFileListFromStore();

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
      // 过滤新文件
      ...fileList.filter((item) => !item.isNew),
      {
        id: newId,
        title: '',
        body: '# 请输出 Markdown',
        createdAt: new Date().getTime(),
        isNew: true,
      },
    ];

    setFileList(() => newFileList);
  }, [fileList]);

  // 保存当前文件
  const saveCurrentFile = React.useCallback(async () => {
    try {
      if (activeFile) {
        await saveFileToStore(activeFile);

        setUnsaveFileIdList((previous) => previous.filter((item) => item !== activeFile.id));

        // 是否自动同步到七牛云
        const isAutoSyncToQinNiu = await getIsAutoSyncToQinNiu();
        if (isAutoSyncToQinNiu) {
          // 同步文件到七牛云
          const qinNiuManage = await createQinNiuManageWithStore();
          try {
            // 删除旧文件
            if (activeFile.fileKey) {
              try {
                await qinNiuManage.deleteFile(activeFile.fileKey);
              } catch (error) {
                // 文件删除失败, 不需要处理
              }
            }
            // 上传新文件
            const fileKey = `${activeFile.title}_${new Date().getTime()}.md`;
            await qinNiuManage.uploadFile(fileKey, await getFilePathFromStore(activeFile.title));

            // 新的文件列表
            const newFileList = fileList.map((item) => {
              if (item.id === activeFile.id) {
                return {
                  ...item,
                  fileKey,
                  isSynced: true,
                  lastSyncedAt: new Date().getTime(),
                };
              }

              return item;
            });
            setFileList(newFileList);
            saveFileListToStore(newFileList);

            console.log(`云同步 - 已上传文件: ${activeFile.title}.md`);
          } catch (error) {
            console.log(error);

            notification.error({
              message: '云同步 - 上传文件失败, 请检查七牛云参数是否正确!',
              description: JSON.stringify(error),
              // 永久显示不会自动关闭
              duration: 0,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [activeFile, fileList]);

  useEffectOnce(() => {
    initData();
  });

  useWebContentsListener({
    'create-new-file': createNewFile,
    'save-edit-file': saveCurrentFile,
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
                openFileIdList={openFileIdList}
                unsaveFileIdList={unsaveFileIdList}
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
