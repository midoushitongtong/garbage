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

  .container {
    --height: 200px;
    --width: 200px;
    --depth: 200px;

    height: var(--height);
    width: var(--width);
    margin: 100px;
    position: relative;
    transform: rotateX(-5deg) rotateY(5deg);

    &,
    .face {
      transform-style: preserve-3d;
    }

    .front-and-back {
      width: 100%;
      height: var(--depth);
      position: absolute;
      transform: translateY(-50%) rotateX(-90deg);

      .front {
        height: var(--height);
        width: 100%;
        top: 100%;
        position: absolute;
        background-color: rgba(0, 0, 255, 0.4);
        transform: rotateX(90deg);
        transform-origin: center top;
      }

      .back {
        height: var(--height);
        width: 100%;
        bottom: 100%;
        position: absolute;
        background-color: rgba(0, 128, 128, 0.4);
        transform: rotateX(-90deg);
        transform-origin: center bottom;
      }
    }

    .right {
      width: var(--depth);
      height: 100%;
      left: 100%;
      position: absolute;
      background-color: rgba(128, 128, 0, 0.4);
      transform: translateX(-50%) rotateY(90deg);
    }

    .left {
      width: var(--depth);
      height: 100%;
      right: 100%;
      position: absolute;
      background-color: rgba(128, 0, 128, 0.4);
      transform: translateX(50%) rotateY(90deg);
    }

    .top {
      height: var(--depth);
      width: 100%;
      bottom: 100%;
      position: absolute;
      background-color: rgba(255, 0, 0, 0.4);
      transform: translateY(50%) rotateX(90deg);
    }

    .bottom {
      height: var(--depth);
      width: 100%;
      top: 100%;
      position: absolute;
      background-color: rgba(0, 255, 0, 0.4);
      transform: translateY(-50%) rotateX(90deg);
    }
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="container">
        <div className="face front-and-back">
          <div className="face front"></div>
          <div className="face back"></div>
        </div>
        <div className="face right"></div>
        <div className="face left"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
    </Container>
  );
};

export default PageContent;
