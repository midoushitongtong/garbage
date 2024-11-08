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

    // 使用生成器实现
    // Object.prototype[Symbol.iterator] = function* () {
    //   for (const value of Object.values(this)) {
    //     yield value;
    //   }
    // };

    // 使用对象值实现
    // 让 Object 遵循可迭代协议, 以便可以使用 for...of 语句或数组解构赋值
    // @ts-ignore
    Object.prototype[Symbol.iterator] = function () {
      // 返回对象值的迭代器
      return Object.values(this)[Symbol.iterator]();
    };

    // @ts-ignore
    const [a, b] = {
      a: 3,
      b: 4,
    };

    console.log(a, b);
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
