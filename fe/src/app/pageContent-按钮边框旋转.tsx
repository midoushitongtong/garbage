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
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100px;
    background-color: #ccc;
    border-radius: 10px;
    z-index: 1;
    &::before {
      z-index: -1;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200%;
      height: 200%;
      background-color: #06f;
      transform-origin: 0 0;
      animation: contentBeforeAnimation 1.5s linear infinite;
      @keyframes contentBeforeAnimation {
        100% {
          transform: rotate(360deg);
        }
      }
    }
    &::after {
      z-index: -1;
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      border-radius: 10px;
      background-color: #f60;
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
