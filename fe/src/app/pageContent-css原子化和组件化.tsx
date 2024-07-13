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
 * 原子化css (tailwind)
 *  - 原子化css是指预先定义好一些css在开发过程中使用这些css进行快速的开发
 *    好处: 代码复用性很高, 通用性很高所有项目都能用
 *    坏处: 对于复杂的样式css类名会很长, 对于一些高度定制化的样式需要微调
 *
 * 组件化 css
 *  - 组件化 css 就是根据当前组件来写css
 *    好处: 组件化, 所有样式只用于当前组件, 避免全局污染, 可维护性高, 找到对应的组件修改即可
 *    换出: 复用性较差, 一套css只能用在一个组件中, 很容易出现重复代码
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
