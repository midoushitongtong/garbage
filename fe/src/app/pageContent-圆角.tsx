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

  .content {
    position: relative;
    text-align: center;
    padding: 1rem;
    border-radius: 10px 10px 0 0;
    color: #fff;
    background-color: #06f;
    transform-origin: center bottom;
    transform: perspective(40px) rtateX(30deg);
    &::before,
    &::after {
      position: absolute;
      bottom: 0;
      width: 15px;
      height: 15px;
    }
    &::before {
      left: -15px;
      content: '';
      background: radial-gradient(circle at 0 0, transparent 15px, #06f 15px);
    }
    &::after {
      right: -15px;
      content: '';
      background: radial-gradient(circle at 15px 0, transparent 15px, #06f 15px);
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
        <div className="text">Hello World</div>
      </div>
    </Container>
  );
};

export default PageContent;
