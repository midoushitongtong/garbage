import axios from '../axios';
import fs from 'fs';

const qiniu = window.require('qiniu');

export const QiniuManage = ({
  accessKey,
  secretKey,
  bucket,
}: {
  accessKey: string;
  secretKey: string;
  bucket: string;
}) => {
  // 生成 mac
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  // 生成配置类
  const config = new qiniu.conf.Config();
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z2;
  // 生成 bucket manager
  const bucketManager = new qiniu.rs.BucketManager(mac, config);
  // cdn 域名
  let publicBucketDomain: any = null;

  // 处理 qin niu sdk 返回的结果
  const handleCallback = (resolve: Function, reject: Function) => {
    return (error: any, respBody: any, respInfo: any) => {
      if (error) {
        reject(error);
      } else {
        if (respInfo.statusCode === 200) {
          resolve(respBody);
        } else {
          reject({
            respInfo,
            respBody,
          });
        }
      }
    };
  };

  // 获取 bucket 域名
  const getBucketDomain = () => {
    const requestURL = `http://uc.qbox.me/v2/domains?tbl=${bucket}`;
    const digest = qiniu.util.generateAccessToken(mac, requestURL);
    return new Promise((resolve, reject) => {
      qiniu.rpc.postWithoutForm(requestURL, digest, handleCallback(resolve, reject));
    });
  };

  // 文件上传
  const uploadFile = (key: string, localFilePath: string) => {
    // 生成 uploadToken
    const options = {
      scope: bucket + ':' + key,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    // 生成 putExtra
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();

    return new Promise<any>((resolve, reject) => {
      // 执行文件上传
      formUploader.putFile(
        uploadToken,
        key,
        localFilePath,
        putExtra,
        handleCallback(resolve, reject)
      );
    });
  };

  // 文件下载
  const generateDownloadLink = async (key: string) => {
    const domainList: any = await (publicBucketDomain
      ? Promise.resolve([publicBucketDomain])
      : getBucketDomain());

    return new Promise(async (resolve, reject) => {
      if (Array.isArray(domainList) && domainList.length > 0) {
        const partten = /^https?/;
        publicBucketDomain = partten.test(domainList[0])
          ? domainList[0]
          : `http://${domainList[0]}`;
        // 公开空间访问链接
        const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
        resolve(publicDownloadUrl);
      } else {
        reject('域名未找到, 请检查存储空间是否已经过去');
      }
    });
  };

  // 删除文件
  const deleteFile = (key: string) => {
    return new Promise<any>((resolve, reject) => {
      // 执行文件删除
      bucketManager.delete(bucket, key, handleCallback(resolve, reject));
    });
  };

  // 下载文件
  const downloadFile = async (key: string, downloadPath: string) => {
    // 生成下载链接
    const downloadLink = await generateDownloadLink(key);
    const timeStamp = new Date().getTime();
    const url = `${downloadLink}?r=${timeStamp}`;

    const result = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    const writer = fs.createWriteStream(downloadPath);
    result.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('close', reject);
    });
  };

  return {
    uploadFile,
    generateDownloadLink,
    deleteFile,
    getBucketDomain,
    downloadFile,
  };
};
