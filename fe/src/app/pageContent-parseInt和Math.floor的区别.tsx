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

// parseInt 和 Math.floor 的区别

// 在正数的情况下，结果都是一样的
console.log(parseInt('1.1')); // 1
console.log(Math.floor(Number('1.1'))); // 1

// 在负数的情况下，结果是不一样的
// 负数的情况下, parseInt 会上取整
console.log(parseInt('-1.1')); // -1
// 负数的情况下, Math.floor 会向下取整
console.log(Math.floor(Number('-1.1'))); // -2
// 负数的情况下, Math.floor 会向下取整
console.log(Math.round(Number('-1.6'))); // -2

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
