'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    position: relative;
    font-size: 5rem;
    text-align: center;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid #06f;
    background-color: #fff;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: conic-gradient(#ffd700, #f79d03, #c71585);
      z-index: -1;
      filter: blur(10px);
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="content"></div>
    </Container>
  );
};

export default PageContent;
