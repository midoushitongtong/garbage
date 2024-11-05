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
    width: 320px;
    position: relative;
    transform-style: preserve-3d;
    .circle {
      width: 100px;
      height: 100px;
      border: 3px solid #000;
      border-radius: 100%;
      position: absolute;
      left: 0;
      top: 0;
      &.circle-1 {
        top: 0;
        left: 0;
        border-color: blue;
        transform: rotateX(-1deg);
      }
      &.circle-2 {
        top: 0;
        left: 110px;
        border-color: #000;
        transform: rotateX(3deg) rotateY(-3deg);
      }
      &.circle-3 {
        top: 0;
        left: 220px;
        border-color: red;
        transform: rotateY(-6deg);
      }
      &.circle-4 {
        top: 60px;
        left: 55px;
        border-color: yellow;
        transform: rotateX(1deg);
      }
      &.circle-5 {
        top: 60px;
        left: 165px;
        border-color: green;
        transform: rotateX(3deg) rotateY(5deg);
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
      <div className="content">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
        <div className="circle circle-5"></div>
      </div>
    </Container>
  );
};

export default PageContent;
