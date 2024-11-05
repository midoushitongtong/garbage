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

class Example {
  constructor(name: string) {
    // @ts-ignore
    this.name = name;
  }

  func() {
    // @ts-ignore
    console.log(this.name);
  }
}

// 将以上代码转为普通构造函数的写法

function Example2(name: string) {
  // 防止直接调用函数, 必须要通过 new 创建对象, 如果直接调用函数需要抛出错误
  // Example2('1');
  // @ts-ignore
  // if (!(this instanceof Example2)) {
  if (!new.target) {
    // eslint-disable-next-line quotes
    throw new TypeError("Class constructor Example cannot be invoked without 'new'");
  }

  // @ts-ignore
  this.name = name;
}

Object.defineProperty(Example2.prototype, 'func', {
  value: function () {
    // 防止直接调用函数, 必须要通过 new 创建对象, 如果直接调用函数需要抛出错误
    // const e2 = new Example2('1');
    // new e2.func();
    // @ts-ignore
    // if (!(this instanceof Example2)) {
    if (new.target) {
      // eslint-disable-next-line quotes
      throw new TypeError("Class constructor Example cannot be invoked without 'new'");
    }

    // @ts-ignore
    console.log(this.name);
  },
  enumerable: true,
});

// @ts-ignore
const e2 = new Example2('1');
e2.func();

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
