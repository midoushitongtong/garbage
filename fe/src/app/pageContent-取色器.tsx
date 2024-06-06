'use client';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

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
  const [curr, setCurr] = useState();
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="content">Hello World</div>
      <div>{curr}</div>
      <button
        onClick={async () => {
          // @ts-ignore
          const eyeDropper = new EyeDropper();
          const result = await eyeDropper.open();
          setCurr(result.sRGBHex);
        }}
      >
        取色
      </button>
    </Container>
  );
};

export default PageContent;
