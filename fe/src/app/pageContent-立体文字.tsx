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
  background-color: #f6f6f6;

  .content {
    position: relative;
    font-size: 5rem;
    text-align: center;
    z-index: 0;
    &::after {
      content: 'Hello World';
      position: absolute;
      left: 0;
      color: #000;
      transform: translate(-35px, 10px) scaleY(0.5) skew(35deg);
      z-index: -1;
      filter: blur(5px);
      -webkit-mask: linear-gradient(transparent 1%, #000);
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">Hello World</div>
    </Container>
  );
};

export default PageContent;
