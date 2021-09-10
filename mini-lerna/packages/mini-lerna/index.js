const cli = require('@lerna/cli');
const initCmd = require('@lerna/init/command');
const createCmd = require('@lerna/create/command');

const main = (argv) => {
  return (
    cli()
      // 配置 init 命令
      .command(initCmd)
      // 配置 create 命令
      .command(createCmd)
      // 最后解析命令行输入的参数
      .parse(argv)
  );
};

module.exports = main;
