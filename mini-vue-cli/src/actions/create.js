const { promisify } = require('util');
const axios = require('axios');
const ora = require('ora');
const inquirer = require('inquirer');
const path = require('path');
const ncp = require('ncp');
const { downloadDirectory } = require('../constants');
const download = promisify(require('download-git-repo'));
const Metalsmith = require('metalsmith');
const render = promisify(require('consolidate').ejs.render);
const fs = require('fs');

/**
 * create 的功能是创建项目
 * create 的大致逻辑
 *  - 获取项目列表，让用户选择安装那个项目
 *  - 获取所选项目的版本号, 用户选择版本号
 *  - 下载项目到临时目录, 然后复制到当前目录下(最终创建的目录名称是参数中的 projectName)
 */

// 通过 github api 获取 repo list
const fetchRepoList = async () => {
  const { data } = await axios.get('http://api.github.com/orgs/zhu-cli/repos');
  return data;
};

// 通过 github api 获取 tag list
const fetchTagList = async (repo) => {
  const { data } = await axios.get(`http://api.github.com/repos/zhu-cli/${repo}/tags`);
  return data;
};

// 在命令行中显示 loading
const loading =
  (fn, message) =>
  async (...args) => {
    const spinner = ora(message);
    spinner.start(); // 显示 loading
    let result = await fn(...args);
    spinner.succeed(); // 隐藏 loading
    return result;
  };

// 下载 github 仓库
const downloadGitRepo = async (repo, tag) => {
  let api = `github:zhu-cli/${repo}`;
  if (tag) {
    api += `#${tag}`;
  }
  const destDirectory = `${downloadDirectory}/${repo}`;
  await download(api, destDirectory);
  return destDirectory;
};

module.exports = async (projectName) => {
  if (!projectName) {
    console.log('Please provide project name');
    console.log('e.g. mini-vue-cli create hello');
    return;
  }
  // 1. 获取所有项目模板
  let repos = await loading(fetchRepoList, 'fetching template list ...')();
  repos = repos.map((item) => item.name); // ['vue-simple-template', 'vue-template']

  // 2. 让用户选择一个项目模板
  const { repo } = await inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choise template to create project',
    choices: repos,
  });

  // 3. 获取项目对应的版本号
  let tags = await loading(fetchTagList, 'fetching tag list ...')(repo);
  tags = tags.map((item) => item.name);

  // 4. 让用户选择一个版本号
  const { tag } = await inquirer.prompt({
    name: 'tag',
    type: 'list',
    message: 'please choise tag to create project',
    choices: tags,
  });

  // 5. 下载模板到临时目录
  const tempDirectory = await loading(downloadGitRepo, 'download template ...')(repo, tag);

  // 6. 将模板复制到当前目录
  if (!fs.existsSync(path.join(tempDirectory, 'ask.json'))) {
    // 如果是简单模板, 直接复制即可
    await ncp(tempDirectory, path.resolve(projectName));
  } else {
    // 如果是复杂模板, 需要解析所有文件内的模板字符串
    await new Promise((resolve, reject) => {
      Metalsmith(__dirname)
        // 指定路径为临时目录, 如果不指定, 默认是 __dirname 下的 ./src 目录
        .source(tempDirectory)
        // 文件生成的目录, 如果不指定, 默认是 __dirname 下的 ./build 目录
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          const args = require(path.join(tempDirectory, 'ask.json'));
          const result = await inquirer.prompt(args);
          // 将用户在命令行输入的信息存储到 metadata
          Object.assign(metal.metadata(), result);
          // 删除 ask.js
          delete files['ask.js'];

          done();
        })
        .use((files, metal, done) => {
          // 获取上一个 use 方法中用户输入的信息
          const meta = metal.metadata();
          Reflect.ownKeys(files).forEach(async (file) => {
            if (file.includes('.js') || file.includes('json')) {
              // 拿到文件的内容
              let contents = files[file].contents.toString();
              if (contents.includes('<%')) {
                // 此文件有模板字符串, 需要进行替换
                contents = await render(contents, meta);
                files[file].contents = Buffer.from(contents);
              }
            }
          });

          done();
        })
        .build((error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  // 7. 提示项目创建完成
  console.log('Create successfuly!');
};
