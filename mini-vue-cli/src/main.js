const { program } = require('commander');
const { version } = require('./constants');
const path = require('path');

// 1. 获取用户传递的参数, e.g. --help
const processArgv = process.argv;

// 2. 配置 cli 支持的命令
const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: ['mini-vue-cli create <project-name>'],
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: ['mini-vue-cli config set <key> <value>', 'mini-vue-cli config get <key>'],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};

Reflect.ownKeys(mapActions).forEach((action) => {
  program
    .command(action) // 配置命令的名字
    .alias(mapActions[action].alias) // 配置命令的别名
    .description(mapActions[action].description) // 配置命令的描述
    .action(() => {
      if (action === '*') {
        console.log(mapActions[action].description);
      } else {
        // 根据 action 找到 actions 目录下对应的文件, 并执行导出的方法
        require(path.resolve(__dirname, 'actions', action))(...processArgv.slice(3));
      }
    });
});

// 3. 监听 cli --help 事件
program.on('--help', () => {
  console.log('\nExamples:');
  Reflect.ownKeys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((example) => {
      console.log(`  ${example}`);
    });
  });
});

// 4. 设置 cli 版本号
program.version(version);

// 5. 解析用户传递的参数
program.parse(processArgv);
