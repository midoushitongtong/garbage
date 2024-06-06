'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    font-size: 5rem;
    text-align: center;
  }
`;

/**
什么是幽灵依赖：
假设我 package.json 安装了 vue 依赖
{
  dependencies: {
    vue: '3.0.0'
  }
}
但是呢 vue 会引入其他依赖, 假设 vue 中使用了 loadsh 依赖, 
那么我们在安装依赖的时候由于 npm/yarn 的特性, 会将所有依赖扁平化最终都会安装到 node_modules 目录中, 也是为了减少磁盘占用空间
那么这就导致我们可以直接在项目中使用 lodash 依赖
import { debounce } from 'lodash'
那么这样会有什么问题？这样会导致某一天假如 vue 将 lodash 升级到更高的版本, 但是呢我们不知道 lodash 升级了
如果说有一些 api 进行了破坏性的更改或者api的功能发生了改变，我们很难去排查bug

怎么解决：
可以使用 pnpm 的方式来根除幽灵依赖的问题，因为 pnpm 他不会将所有依赖扁平化的安装到 node_modules 目录中
所有如果我们使用以下方式引入就会报错，因为找不到此依赖
import { debounce } from 'lodash' // 报错
pnmp 使用的是软连接的形式, 来减少磁盘占用

 */

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
