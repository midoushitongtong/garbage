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
    const handle = async () => {
      console.log('Hello World');
      const url = 'https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt';
      const result = await fetch(url);
      const reader = result.body?.getReader();
      if (!reader) {
        return;
      }
      let bigText = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const textDecoder = new TextDecoder();
        const text = textDecoder.decode(value);
        bigText += text;
      }

      console.log(bigText.length);
    };
    handle();
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
