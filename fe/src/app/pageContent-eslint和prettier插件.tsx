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
 * Eslint 代码检查工具，提高代码质量
 * Prettier 代码格式化工具，提高代码的可读性
 *
 * eslint
 *  eslint 代码检查插件
 * prettier
 *  prettier 代码格式化插件
 * eslint-plugin-prettier
 *  这个插件用于将 prettier 的错误报告给 eslint，然后 eslint 将这些错误报告输出
 * eslint-config-prettier
 *  禁用所有可能与 eslint 发生冲突的规则，确保 prettier 能正确的格式化代码
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
