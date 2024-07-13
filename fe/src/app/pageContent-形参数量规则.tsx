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

function a(a: any, b: any) {}
function b(a: any, b: any = 2) {}
function c(a: any, ...b: any) {}

console.log(a.length); // 2
console.log(b.length); // 1
console.log(c.length); // 1
// .length 获取的是期望的最小形参数量, 不包含剩余参数和默认参数, 只包含默认参数前的参数数量

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
