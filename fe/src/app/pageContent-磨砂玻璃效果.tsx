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
    position: relative;
    width: 100%;
    height: 300px;
    text-align: center;
    font-size: 5rem;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(5px);
      transition: all 1s;
    }
    &:hover {
      &::after {
        width: 0;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">
        <img src="/1.jpeg" />
      </div>
    </Container>
  );
};

export default PageContent;
