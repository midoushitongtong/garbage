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
 * let 和 var 的区别
 *
 * 1. var 会污染全局作用域
 *    var a = 1;
 *    console.log(window.a); // 1
 *    let a = 1;
 *    console.log(window.a);; // a is not defined
 *
 * 2. let 是块级作用域
 *    function a() {
 *      if (true) {
 *        var a = 1; // var 会进行变量提升
 *      }
 *      console.log(a); // 1
 *    }
 *
 *    function a() {
 *      if (true) {
 *        let a = 1;
 *      }
 *      console.log(a); // a is not defined
 *    }
 *
 * 3. 重复声明
 *    var a = 1;
 *    var a = 2; // var 允许重复声明
 *
 *    let a = 1;
 *    let a = 2; // a has already been declared
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
