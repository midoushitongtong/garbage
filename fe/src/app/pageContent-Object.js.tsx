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

// 在 JS 的历史中, 有些看起来是相同的场景, 实际上确是不同的, 例如
// @ts-ignore
console.log(NaN === NaN); // false, 实际上这两个是相同的
console.log(Object.is(NaN, NaN)); // true, 为了解决这个问题, 引入了 Object.is
console.log(-0 === +0); // true, 实际上这两个是不同的
console.log(Object.is(-0, +0)); // false, 为了解决这个问题, 引入了 Object.is

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
