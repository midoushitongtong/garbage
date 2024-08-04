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

function fn(a: any, b: any, c: any, d: any) {
  console.log('fn called');
  console.log('args', a, b, c, d);
  // @ts-ignore
  console.log('this', this);
  return 5;
}

// @ts-ignore
Function.prototype.myBind = function (ctx, ...args) {
  const fn = this;
  return function (...subArgs: any) {
    const allArgs = [...args, ...subArgs];
    // 判断是否通过 new 创建, 如果是则通过原方法创建对象
    if (new.target) {
      // @ts-ignore
      return new fn(...allArgs);
    } else {
      return fn.call(ctx, ...allArgs);
    }
  };
};

const bindFn = fn.bind({ name: 123 }, 1, 2);
// @ts-ignore
console.log(bindFn(3, 4));

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
