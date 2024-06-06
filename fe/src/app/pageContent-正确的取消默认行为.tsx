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
    height: 200vh;
    color: #fff;
  }
`;

const PageContent = () => {
  const handleWindowWhell = (e: Event) => {
    // const start = Date.now();
    // while (Date.now() - start < 500) {
    //   // 忙等待
    // }

    e.preventDefault();
  };
  useEffect(() => {
    window.addEventListener('wheel', handleWindowWhell, {
      /**
       * passive 如果不设置默认为 true，那么浏览器不会等待回调函数执行完成，浏览器会专注于滚动事件，之后再处理回调函数
       * 相反的，如果 passive 设置为 false 那么就等于告诉浏览器，优先处理回调函数，之后在执行滚动事件
       *
       * 总结：
       * passive: true 优先处理滚动事件，在处理回调函数，提高滚动性能
       * passive: false 优先处理回调函数，在处理滚动事件，可能会影响滚动性能
       */
      passive: false,
    });
    return () => {
      window.removeEventListener('wheel', handleWindowWhell);
    };
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
