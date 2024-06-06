'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

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

const PageContent = () => {
  useEffect(() => {
    const obj = {
      a: 1,
      b: 2,
    };

    // @ts-ignore
    Object.prototype.c = function () {
      console.log('c');
    };
    for (const key in obj) {
      console.log(key);
      // 会打印 a b c
    }
    // console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'c')); // 可以发现 c 可以被遍历

    // 如果我们希望 c 不能被遍历可以使用 defineProperty
    Object.defineProperty(obj, 'c', {
      value: function () {
        console.log('c');
      },
      writable: true, // 后续可以被修改
      enumerable: false, // 不可被遍历
      configurable: true, // 后续可以被 defineProperty 配置
    });
    for (const key in obj) {
      console.log(key);
      // 会打印 a b
    }
  }, []);

  return (
    <>
      <Container className="container">
        <div>Hello World</div>
      </Container>
    </>
  );
};

export default PageContent;
