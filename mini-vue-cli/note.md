### 什么是脚手架

通过脚手架可以快速初始化一个空的项目, 这里面包含了各种各样的配置, 之后在根据业务需求往里面添加新的功能

### 必备模块

- commander: 用于解析参数, 如: --help
- inquire: 命令行交互工具, 用于支持命令行选择功能
- download-git-repo: 在 git 中下载模板
- chalk: 粉笔帮助我们在控制台输出各种颜色的字体
- metalsmith: 读取所有文件, 实现模板渲染
- consolidate: 统一模板引擎

### 大致编码流程

- 通过配置 package.json 中的 bin 属性, 之后在通过 yarn link 命令, 来链接命令对应的可执行文件
- 获取用户输入的参数 e.g. --help
- 根据用户输入的参数, 来执行对应的方法