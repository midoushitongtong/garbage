const yargs = require('yargs');

const lernaCLI = () => {
  const cli = yargs();

  return cli
    .strict() // 严格模式, 输入了未知命令会报错
    .recommendCommands() // 输入了未知的命令, 会提示建议的命令
    .fail((message, error) => {
      // 如果执行失败, message 和 error 会有值
      message && console.error(message);
      error && console.error(error);
    })
    .alias('h', 'help') // 配置 help 以及别名
    .alias('v', 'version') // 配置 version 以及别名
    .epilogue('hello world'); // 结语
};

module.exports = lernaCLI;
