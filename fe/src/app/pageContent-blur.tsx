'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;
  filter: contrast(30px);
  background-color: #000;

  .content {
    font-size: 5rem;
    text-align: center;
    animation: expand-text 3s ease forwards;
    color: #fff;
    @keyframes expand-text {
      0% {
        filter: blur(10px);
        letter-spacing: -3rem;
      }
      100% {
        filter: blur(0);
        letter-spacing: 0rem;
      }
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
