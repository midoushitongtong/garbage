'use client';
import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to right, #b6cb13, #f60);

  div {
    color: #fff;
  }
`;

// @ts-ignore
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx === undefined || ctx == null ? globalThis : Object(ctx);
  const key = Symbol('key');
  Object.defineProperty(ctx, key, {
    value: this,
    enumerable: true,
    configurable: true,
  });
  const res = ctx[key](...args);
  delete ctx[key];
  return res;
};

function method(a: number, b: number) {
  // @ts-ignore
  console.log(this, a, b);
  return a + b;
}

// @ts-ignore
console.log(method.myCall({}, 1, 2));

const PageContent = () => {
  return (
    <>
      <Container className="container">
        <div>Hello World</div>
      </Container>
    </>
  );
};

export default PageContent;
