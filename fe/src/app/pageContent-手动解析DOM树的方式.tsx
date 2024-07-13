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
    console.log('Hello World');

    // 手动解析dom树

    // 1. 第一种做法、使用 DOMParser api
    const str = `
      <div>
        123
        <h1>abc</h1>
      </div>
    `;

    // const parser = new DOMParser();
    // const doc = parser.parseFromString(str, 'text/html');
    // doc.querySelector('h1')?.remove();
    // console.log(doc);

    // 2. 第二种做法、使用 innerHTML
    const div = document.createElement('div');
    div.innerHTML = str;
    console.log(div);
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
