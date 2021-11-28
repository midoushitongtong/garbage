# 进程和线程

- 什么进程?
  - 正在执行的计算机程序就叫 `进程`
- 什么是线程
  - `线程` 是操作系统能够进行运算调度的最小单位, 它被包含在进程中, 是进程中实际运作单位
    举例: 车间是进程车间内的每个工人是线程
- 进行和线程的区别
  1. 内存使用区别, 进程之间的内存不可被共享, 线程之间的内存可以相互共享
  2. 通信机制的区别, 进程之间很难相互通信 (但可以借助 IPC 进行相互通信), 线程之间的通信非常简单 (在同一个内存中)
  3. 量级方便的区别, 进程相对较重占用资源较多, 线程相对较轻占用资源较少

# electron 中的主进程和渲染进程

- 主进程 (main process)
  1. 主进程只有 1 个
  2. 可以使用 node.js 的 api
  3. 可以使用全部 electron 提供的 api
  4. 可以创建渲染进程
- 渲染进程 (render process)
  1. 渲染进程可以有多个
  2. 可以使用 node.js 的 api
  3. 可以使用部分 electron 提供的 api
  4. 可以使用 dom api, bom api
- 主进程和渲染进程的区别
  - 主进程可以使用全部 electron 提供的 api, 渲染进行只能使用一部分
  - 渲染进程可以使用 dom api, bom api, 主进程无法使用

# 进程间的通信方式

- ipc

# npx 命令是什么

- npx 会帮我们自动查找依赖包的可执行文件

# API

- 默认只有 preload script (预加载脚本) 中可以执行 node.js 相关的 api, 其他脚本不能执行 node.js 相关的 api 除非特殊设置

- 在 create-react-app 中使用 node.js api
  ```tsx
  // 第一种方式, 无需配置 webpack
  // const fs = window.require('fs');
  // const fs = require('fs'); 不能这样写, 因为 CRA 脚手架 webpack 打包的时候指定运行环境不是 node.js, 所以最终打包出来的脚本不包含 node.js 相关 api, 但是 electron 会将 node.js 相关 api 挂载到全局方便我们引入, 改成 window.require('fs');
  
  // 第二种方式, 配置 webpack
  // import fs from 'fs'; 或者 const fs = require('fs');
  // 需要配置 webpack target 属性 target: 'electron-renderer'
  // 这样 webpack 打包的时候将引入 nodejs.js 相关 api
  ```
