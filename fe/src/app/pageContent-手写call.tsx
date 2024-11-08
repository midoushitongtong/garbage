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

function test(a: any, b: any, c: any) {
  // @ts-ignore
  console.log(a, b, c, this.d);
}

// @ts-ignore
Function.prototype.myCall = function (ctx, ...args) {
  // 1. null 和 undefined ctx 指向 globalThis
  // 2. 其他类型需要转为相应的包装类
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);

  const fn = this;
  const key = Symbol(); // 用 symbol 作为 key 防止覆盖原对象的属性
  Object.defineProperty(ctx, key, {
    value: fn,
    enumerable: false,
    configurable: true,
  });
  const result = ctx[key](...args);
  return result;
  // return fn.apply(ctx, args);
};

const obj = { d: 4 };
// @ts-ignore
test.myCall(obj, 1, 2, 3);

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
