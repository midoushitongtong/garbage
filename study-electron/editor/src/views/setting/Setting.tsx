import './Setting.scss';
import React from 'react';
import { Button, Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import {
  getAppConfigFromStore,
  getFileSaveLocation,
  moveFileToNewDirectory,
  saveAppConfigToStore,
} from '../../utils/file';
import useEffectOnce from '../../hooks/useEffectOnce';
import { notification } from 'antd';

const remote = window.require('@electron/remote');

const Setting = () => {
  const [initDataLoading, setInitDataLoading] = React.useState(true);
  // file store path
  const [fileStorePath, setFileStorePath] = React.useState<string>('');

  // select store path
  const selectFileStorePath = React.useCallback(async () => {
    const result = await remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      message: '选择文件的存储路径',
    });

    if (!result.canceled && result.filePaths.length > 0) {
      setFileStorePath(result.filePaths[0]);
    }
  }, []);

  // init data
  const initData = React.useCallback(async () => {
    const appConfig = await getAppConfigFromStore();

    setFileStorePath(appConfig.fileStorePath || '');
    setInitDataLoading(false);
  }, []);

  // submit
  const submit = React.useCallback(async () => {
    if (fileStorePath) {
      // 迁移文件
      await moveFileToNewDirectory(await getFileSaveLocation(), fileStorePath);
      // 保存 app 配置
      await saveAppConfigToStore({
        fileStorePath,
      });
    }

    notification.success({
      message: '保存成功',
      duration: 3,
    });
  }, [fileStorePath]);

  useEffectOnce(() => {
    initData();
  });

  return (
    <div className="home">
      <Container fluid className="container">
        {!initDataLoading && (
          <div className="settting">
            {/* title */}
            <div className="title">设置</div>

            {/* label */}
            <Form.Label htmlFor="basic-url">文件存储位置</Form.Label>
            {/* input */}
            <InputGroup className="mb-3">
              <FormControl value={fileStorePath} disabled placeholder="当前存储位置" />
              <Button variant="outline-primary" onClick={selectFileStorePath}>
                选择新的位置
              </Button>
            </InputGroup>

            {/* save */}
            <Button onClick={submit}>保存</Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Setting;
