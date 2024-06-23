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
    width: 200px;
    height: 200px;
    background: url(/1.jpeg) #0ff no-repeat;
    background-size: cover;
    background-blend-mode: lighten;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url(./1.jpeg) #f60 no-repeat;
      background-blend-mode: lighten;
      mix-blend-mode: darken;
      animation: shake 0.03s infinite;
      @keyframes shake {
        100% {
          transform: translateX(2%);
        }
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
      <div className="content"></div>
    </Container>
  );
};

export default PageContent;
