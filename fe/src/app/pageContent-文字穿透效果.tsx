'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  height: 100vh;
  border: 5px solid #06f;
  background-image: url('/2.webp');
  background-repeat: no-repeat;
  background-size: cover;

  .content {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      height: 100%;
      font-size: 5rem;
      text-stroke: 2px #fff;
      -webkit-text-stroke: 2px #fff;
      background: url('/2.webp');
      background-repeat: no-repeat;
      background-size: cover;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="content">
        <h1>Hello World</h1>
      </div>
    </Container>
  );
};

export default PageContent;
