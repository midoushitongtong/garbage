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
 * undefined 由于历史原因, 他不是一个关键字, 他是一个的全局属性, 属于 window 的属性
 * 这就会导致可以定义一个变量名字叫 undefined 的变量
 * var undefined = 10; // 但是这样不会生效，window 的 undefined 是只读的
 * function a () {
 *  // 这样就会生效, 因为作用域不在 window 中
 *  var undefined = 10;
 *  // 这样的代码就很奇怪，要避免这样操作
 *  console.log(undefined); // 10
 * }
 */
// @ts-ignore
var undefined = undefined;
console.log(undefined);

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
