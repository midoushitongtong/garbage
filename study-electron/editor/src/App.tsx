import './App.scss';
import Home from './views/home/Home';
import BackendHandler from './components/backend-handler/BackendHandler';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Setting from './views/setting/Setting';
import useEffectOnce from './hooks/useEffectOnce';
import { QiniuManage } from './utils/qin-niu';
import path from 'path';
import { notification } from 'antd';

const remote = window.require('@electron/remote');

const App = () => {
  const initData = async () => {
    const qiniuManage = QiniuManage({
      accessKey: 'AedFDk2k1ECs4KyCwTW9IqI4_fpyEb_tpFXsc8iF',
      secretKey: 'HrSmFDk_lK-LAzDsrZC2iqIjluvSVRsNpSLLeJe3',
      bucket: 'yyccyy-editor',
    });

    try {
      const result = await qiniuManage.uploadFile(
        'chrome-icon.png',
        path.join(remote.app.getAppPath(), '..', 'src', 'assets', 'images', 'chrome-icon.png')
      );
      console.log(result);
    } catch (error) {
      console.log(error);

      notification.error({
        message: '上传文件失败',
        description: JSON.stringify(error),
        duration: 3,
      });
    }

    try {
      const result4 = await qiniuManage.downloadFile(
        'chrome-icon.png',
        path.join(remote.app.getAppPath(), '..', 'src', 'assets', 'images', 'chrome-icon-copy.png')
      );

      console.log(result4);
    } catch (error) {
      console.log(error);

      notification.error({
        message: '下载文件失败',
        description: JSON.stringify(error),
        duration: 3,
      });
    }

    // try {
    //   const result2 = await qiniuManage.generateDownloadLink('chrome-icon.png');
    //   console.log(result2);
    // } catch (error) {
    //   console.log(error);
    //   notification.error({
    //     message: '获取文件下载地址失败',
    //     description: JSON.stringify(error),
    //     duration: 3,
    //   });
    // }

    // try {
    //   const result3 = await qiniuManage.deleteFile('chrome-icon.png');
    //   console.log(result3);
    // } catch (error) {
    //   console.log(error);
    //   notification.error({
    //     message: '删除文件失败',
    //     description: JSON.stringify(error),
    //     duration: 3,
    //   });
    // }
  };

  useEffectOnce(() => {
    initData();
  });

  return (
    <>
      {/* router */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>

        {/* backend handler */}
        <BackendHandler />
      </BrowserRouter>
    </>
  );
};

export default App;
