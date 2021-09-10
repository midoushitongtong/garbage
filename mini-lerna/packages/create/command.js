exports.command = 'create <name>';

exports.describe = '创建一个新的 lerna 管理的包';

// 命令构建器, 为命令处理器提供所需的参数
exports.builder = (yargs) => {
  console.log('create builder');
  yargs
    // 解析位置参数
    // 假如输入命令 "mini-lerna create xxx" 会解析 xxx 参数
    .positional('name', {
      type: 'string',
      describe: '包名',
    })
    .options({
      // 解析可选参数
      // 假如输入命令 "mini-lerna create xxx --registry=https://registry.npmjs.org" 会解析 https://registry.npmjs.org 参数
      registry: {
        type: 'string',
        group: 'Command Groups:',
        describe: '配置包发布的仓库地址',
      },
    });
};

// 命令处理器, 主要逻辑执行的地方
exports.handler = (argv) => {
  console.log('create handler');
  return require('.')(argv);
};
