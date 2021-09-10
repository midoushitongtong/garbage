const path = require('path');
const fs = require('fs-extra');
const initPackageJSON = require('pify')(require('init-package-json'));

class CreateCommand {
  constructor(argv) {
    this.argv = argv;
    this.rootPath = path.resolve();

    this.targetDir = path.join(this.rootPath, `packages/${this.argv.name}`);
  }

  async execute() {
    console.log(`创建 ${this.argv.name} 目录`);
    await fs.mkdirp(this.targetDir);

    console.log('创建 lib 目录');
    await fs.mkdirp(path.join(this.targetDir, 'lib'));

    console.log('创建 test 目录');
    await fs.mkdirp(path.join(this.targetDir, '__test__'));

    console.log('创建 package.json');
    await initPackageJSON(this.targetDir, '');

    console.info('create 命令执行完成');
  }
}

const factor = (argv) => {
  new CreateCommand(argv).execute();
};

module.exports = factor;
