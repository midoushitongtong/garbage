const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');

class InitCommand {
  constructor(argv) {
    this.argv = argv;
    this.rootPath = path.resolve();
  }

  async execute() {
    await this.initGitRepository();
    await this.ensurePckagesDir();
    await this.ensurePackageJSON();
    await this.ensureLernaConfig();

    console.info('init 命令执行完成');
  }

  async initGitRepository() {
    console.info('初始化 git 仓库');
    await execa('git', ['init'], {
      stdio: 'pipe',
    });
  }

  async ensurePackageJSON() {
    console.info('创建 package.json');
    await fs.writeJSON(
      path.join(this.rootPath, 'package.json'),
      {
        name: 'root',
        private: true,
        devDependencies: {
          lerna: '^4.0.0',
        },
      },
      {
        spaces: 2,
      }
    );
  }

  async ensureLernaConfig() {
    console.info('创建 lerna.json');
    await fs.writeJSON(
      path.join(this.rootPath, 'lerna.json'),
      {
        packages: ['packages/*'],
        version: '0.0.0',
      },
      {
        spaces: 2,
      }
    );
  }

  async ensurePckagesDir() {
    console.info('创建 packages 目录');
    await fs.mkdirp(path.join(this.rootPath, 'packages'));
  }
}

const factor = (argv) => {
  new InitCommand(argv).execute();
};

module.exports = factor;
