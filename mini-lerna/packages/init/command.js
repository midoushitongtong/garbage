exports.command = 'init';

exports.describe = '创建一个新的 lerna 仓库';

// 命令构建器, 为命令处理器提供所需的参数
exports.builder = (yargs) => {
  console.log('init builder');
};

// 命令处理器, 主要逻辑执行的地方
exports.handler = (argv) => {
  console.log('init handler');
  return require('.')(argv);
};
