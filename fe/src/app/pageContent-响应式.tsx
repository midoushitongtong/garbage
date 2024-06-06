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
 * 什么是响应式：
 * 响应式是数据与函数的关联，当某个数据发生改变，会重新执行这个数据对应的函数，比如常见的
 * - watch
 * - watchEffect
 * - computed
 * - render
 * - useEffect
 * 以上 api 都有一个共有的特性，就是函数运行的期间会使用到响应式数据，那么后续这些响应式数据发生改变就会重新运行函数
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
