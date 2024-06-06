'use client';
import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useRef } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: #111116;
    height: 100vh;
    align-items: center;
  }

  .progress {
    --delay: -0s;
    --delay2: 1s;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    background: #07070c;
    .overlay {
      width: 50%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      background-color: #07070c;
    }
    .left,
    .right {
      width: 50%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border: 10px solid #06f;
      border-radius: 100px 0px 0px 100px;
      border-right: 0;
      transform-origin: right;
    }
    .left {
      animation: load1 1s var(--delay) linear forwards paused;
    }
    .right {
      animation: load3 1s var(--delay2) linear forwards paused;
    }
  }

  @keyframes load1 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(180deg);
    }
  }

  @keyframes load3 {
    0% {
      z-index: 100;
      transform: rotate(180deg);
    }

    100% {
      z-index: 100;
      transform: rotate(360deg);
    }
  }
`;

const PageContent = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const progres = progressRef.current;
    if (!progres) {
      return;
    }
    const progress = parseFloat(e.target.value);
    progres.style.setProperty('--delay', `-${progress * 2}s`);
    console.log(progress);

    progres.style.setProperty('--delay2', progress > 0.5 ? `${(0.5 - progress) * 2}s` : '1s');
  };

  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container className="container">
      <div className="progress" ref={progressRef}>
        <div className="overlay"></div>
        <div className="left"></div>
        <div className="right"></div>
      </div>

      <input type="range" min={0} max={1} step={0.01} defaultValue={0} onChange={handleChange} />
    </Container>
  );
};

export default PageContent;
