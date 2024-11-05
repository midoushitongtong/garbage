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
    // const createElement = (item: { type: string }) => {
    //   if (item.type === 'ball') {
    //     const div = document.createElement('div');
    //     div.className = 'ball';
    //     div.textContent = 'ball';
    //     return div;
    //   } else if (item.type === 'square') {
    //     const div = document.createElement('div');
    //     div.className = 'square';
    //     div.textContent = 'square';
    //     return div;
    //   } else {
    //     throw new Error('Unknown type');
    //   }
    // };

    // 代码分支优化
    const createElement = (item: { type: string }) => {
      const map = {
        ball: { className: 'ball', text: 'ball' },
        square: { className: 'square', text: 'square' },
      };

      // @ts-ignore
      const meta = map[item.type];
      if (!meta) {
        throw new Error('Unknown type');
      }

      const div = document.createElement('div');
      div.className = meta.className;
      div.textContent = meta.text;
      return div;
    };

    console.log(createElement({ type: 'ball' }));
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
