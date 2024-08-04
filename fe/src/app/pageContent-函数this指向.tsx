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

/**
 * 函数的 this 是基于动态作用域的, 可以在运行时动态修改的
 * 1. 通过 new 调用
 *    new fn()
 *    this 指向新对象
 * 2. 直接调用
 *    fn()
 *    this 指向全局对象, 浏览器 window, nodejs global
 * 3. 通过对象调用
 *    test.fn()
 *    this 指向调用者
 * 4. 通过 call、apply、bind 调用
 *    method.call(ctx)
 *    this 指向第一个参数
 *
 * 箭头函数的 this 是基于词法作用域的, 不能再运行时动态修改, 在定义函数的位置就决定了作用域
 */

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
