'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
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
    // 判断对象是有有某个 key
    function hasProperty(obj: any, key: any) {
      /**
       * in 和 hasOwnProperty 的区别
       *  - in 会查找自身的属性，也会查找原型链上的属性
       *  - hasOwnProperty 只会查找自身的属性，不会查找原型链上的属性
       */
      return key in obj; // true
      return obj.hasOwnProperty(key); // false
    }

    const a = { a: undefined };
    // @ts-ignore
    Object.prototype.b = 'b';
    console.log(hasProperty(a, 'b'));
  }, []);
  return (
    <Container className="container">
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
