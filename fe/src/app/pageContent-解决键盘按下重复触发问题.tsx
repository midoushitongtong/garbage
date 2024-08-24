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
  // useEffect(() => {
  //   // 1. 使用标志解决重复触发 (不推荐)
  //   const pressingKeys = new Set();

  //   const handlerKeyDown = (e: KeyboardEvent) => {
  //     const key = e.key;
  //     if (!pressingKeys.has(key)) {
  //       pressingKeys.add(key);
  //       console.log(key);
  //     }
  //   };

  //   const handlerKeyUp = (e: KeyboardEvent) => {
  //     const key = e.key;
  //     pressingKeys.delete(key);
  //   };

  //   window.addEventListener('keydown', handlerKeyDown);
  //   window.addEventListener('keyup', handlerKeyUp);

  //   return () => {
  //     window.removeEventListener('keydown', handlerKeyDown);
  //     window.removeEventListener('keyup', handlerKeyUp);
  //   };
  // }, []);

  useEffect(() => {
    // 使用 repeat 重复触发 (推荐)
    const handlerKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key;
      console.log(key);
    };

    window.addEventListener('keydown', handlerKeyDown);

    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
