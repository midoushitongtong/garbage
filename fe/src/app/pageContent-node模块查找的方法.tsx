'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
 * node 的模块查找方式
 *
 * const a = require('./a');
 *
 *  - 文件查找
 *      - 如果是以相对路径开始的话就会根据文件进行查找 ./ ../ 这种就是相对路径
 *  - 文件夹查找
 *    如果文件查找失败, 就会根据文件夹进行查找
 *      - 会从文件夹中读取 package.json 并从 json 中读取 main 字段作为入口文件
 *      - 如果 package.json 中没有 main 字段, 或者没有 package.json 会读取 index.js 作为入口文件
 *  - 内置模块
 *      - 如果不是相对路径, 会判断是不是内置模块, 例如 fs http
 *  - 第三方模块
 *      - 如果不是内置模块, 会从当前目录的 node_modules 中查找, 如果当前目录没有 node_modules 会一直向上级目录查找
 *      - 进入 node_modules, 会根据 "文件查找" 以及 "文件夹查找" 两种方式进行查找
 */

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
