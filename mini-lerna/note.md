### mini-lerna

```js
这个仓库是干嘛的?

使用成熟的 lerna 来做一个微型的 lerna, 这里叫他 mini-lerna
```

### 1. 初始化 lerna 项目

```js
lerna init
```

### 2. 创建包

```js
// 第 1 个包: 命令行入口
lerna create mini-lerna

// 第 2 个包: 解析命令行参数工具
lerna create @mini-lerna/cli

// 第 3 个包: 初始化命令
lerna create @mini-lerna/init

// 第 4 个包: 创建包命令
lerna create @mini-lerna/create
```

### 3. 安装所需依赖

```js
// 给 cli 这个 package 安装 yargs 依赖, 用于解析命令行参数
lerna add yargs packages/cli


// 给 init 这个 package 安装 fs-extra 依赖, 增强版的 fs 库
lerna add fs-extra packages/init
// 给 init 这个 package 安装 execa 依赖, 用于开启子进程
lerna add execa packages/init

// 给 create 这个 package 安装 fs-extra 依赖, 增强版的 fs 库
lerna add fs-extra packages/create
// 给 create 这个 package 安装 pipy 依赖, 用于将回调转换为 promise
lerna add pipy packages/create
// 给 create 这个 package 安装 init-package-json 依赖, 用于交互式初始化 package.json
lerna add init-package-json packages/create
```

### 4. 软连接

```js
// 链接 packages 下的每个包中的 dependencies 与 packages 下的包做软连接
lerna link

// 一般不用上面的形式, 用 yarn 的 workspaces 来管理链接的依赖, 只需要 yarn 即可完成链接操作
```

### 5. 链接 mini-lerna 命令

```js
// 进入 packages mini-lerna 目录执行 yarn link
// 用于链接 mini-lerna 命令, 链接后才可以使用 mini-lerna 命令
yarn link
```
