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
    // const obj = {
    //   name: '123',
    //   sayHi1: () => {
    //     // console.log(this.name); // ''
    //   },
    //   sayHi2() {
    //     (() => {
    //       console.log(this.name); // 123
    //     })();
    //   },
    // };
    // obj.sayHi1();
    // obj.sayHi2();

    // console.log(
    //   [
    //     { name: '1', price: 1 },
    //     { name: '2', price: 1 },
    //     { name: '3', price: 1 },
    //   ].map((item) => (item.name === '2' ? { ...item, price: item.price + 1 } : item))
    // );

    // 科里化，让函数变得更具体
    function currying(fn: Function, ...args: any) {
      return function (...args2: any) {
        const allArgs = [...args, ...args2];
        if (allArgs.length === fn.length) {
          // @ts-ignore
          return fn.call(this, ...allArgs);
        } else {
          return currying(fn, ...allArgs);
        }
      };
    }
    const sum = (a: number, b: number, c: number, d: number) => a + b + c + d;
    console.log(currying(sum)(1)(2)(3)(4));
    console.log(currying(sum, 1, 2, 3)(4));
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
