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
    // == 如果比较的对象, 会调动对象的 valueOf 方法, 如果没有 valueOf 就会调用 toString
    // const a = {
    //   n: 1,
    //   valueOf: function () {
    //     return this.n++;
    //   },
    // };
    // console.log(a == 1 && a == 2 && a == 3);
    //
    //
    //
    // 在 js 对象中的 key 只运行存储 string 或者 symbol
    // const a = {};
    // const b = { key: 'b' };
    // const c = { key: 'c' };
    // // @ts-ignore
    // a[b] = 123;
    // // @ts-ignore
    // a[c] = 456;
    // // @ts-ignore
    // console.log(a[b]);
    //
    //
    //
    // outerLoop: for (let i = 0; i < 10; i++) {
    //   console.log('外层循环');
    //   for (let j = 0; j < 10; j++) {
    //     console.log('内层循环');
    //     // 结束外层循环
    //     break outerLoop;
    //   }
    // }
    //
    //
    //
    const obj = {
      p2: 'a',
      p1: 'p1',
      1: '1',
      2: '2',
    };

    for (const key in obj) {
      console.log(key);
      // 1 2 p2, p1, 在js中对象的属性是无序的, 因此输出的顺序可能是不固定的, 这种情况js会将数字进行升序处理
    }
  }, []);

  return (
    <Container className="container">
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
