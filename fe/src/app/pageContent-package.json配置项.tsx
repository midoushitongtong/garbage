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
 * package.json 配置项
 *  - 标准字段
 *    - name 包的名字
 *    - version 版本
 *    - description 描述
 *    - main 入口文件
 *    - files 发布到 npm 包中需要发布那些文件
 *    - repository npm 包的元信息
 *    - keywords 关键字，可以通过此关键字搜到此 npm 包
 *    - dependencies 第三方依赖
 *  - 非标准字段
 *    - module esmodule 模块文件, 构建工具会优先使用这个字段进行打包，有利于 tree shaking
 *    - types 用于给 ts 提供类型支持
 *
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
