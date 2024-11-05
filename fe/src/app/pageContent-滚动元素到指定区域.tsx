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

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');

    setTimeout(() => {
      // 使用 scrollIntoView 滚动元素到指定区域的好处：
      // 1. 可以平滑滚动
      // 2. 不会和 hash 类型的路由产生冲突
      // 3. 便于使用 js 进行控制
      document.querySelector('#h-50')?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }, 0);
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
      {new Array(100).fill(1).map((item, index) => (
        <h1 key={index} id={`h-${index}`}>
          {index}
        </h1>
      ))}
    </Container>
  );
};

export default PageContent;
