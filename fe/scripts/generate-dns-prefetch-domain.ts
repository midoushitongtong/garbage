import fs from 'fs';
import os from 'os';
import path from 'path';

// 遍历源代码目录中的所有文件
const searchDomain = () => {
  // 存储外部链接
  const urls = new Set<string>();
  // 获取外部链接的正则表达式
  const urlPattern = /https?:\/\/[^\s'"]+/g;
  // 查找的目录
  const findDir = path.join(__dirname, '../src');
  // 过滤文件后缀
  const allowedFileExtensions = ['.js', '.ts', '.jsx', '.tsx', '.json', '.css', '.scss'];
  // 找到文件中的外部链接
  const files = fs
    .readdirSync(findDir, { recursive: true })
    .filter((item) => allowedFileExtensions.some((extensions) => item.toString().endsWith(extensions)));
  files.forEach((file) => {
    const filePath = path.join(findDir, file.toString());
    const content = fs.readFileSync(filePath, 'utf-8');
    const matchs = [...content.matchAll(urlPattern)].map((item) => item[0]);
    matchs.forEach((url) => {
      urls.add(url);
    });
  });

  return {
    urls,
  };
};

// 获取源代码中用到的外部链接
const { urls } = searchDomain();

// 将外部链接转为外部域名
const domains = new Set<string>();
[...urls].forEach((url) => {
  const u = new URL(url);
  domains.add(u.origin);
});

// 保存域名到文件
const saveDomainToFile = (domains: string[]) => {
  const outputDir = path.join(__dirname, '../src/config/resources');
  const outoutPath = path.join(outputDir, './dns-prefetch-domain.json');
  fs.writeFileSync(
    outoutPath,
    JSON.stringify(
      {
        domains,
      },
      null,
      2
    ) + os.EOL
  );
};

saveDomainToFile([...domains]);
