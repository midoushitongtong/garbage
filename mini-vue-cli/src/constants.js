const os = require('os');
// 版本号
const { version } = require('../package.json');

// 临时文件存放的目录
const downloadDirectory = os.homedir();

// 导出常用的常量
module.exports = {
  version,
  downloadDirectory,
};
