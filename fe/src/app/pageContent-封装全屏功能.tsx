'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

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
    cursor: pointer;
  }

  .video-container {
    text-align: center;
    background-color: #fff;
  }
`;

const requestFullscreen = (element: HTMLElement | EventTarget) => {
  const funcNames = [
    'requestFullscreen',
    'webkitRequestFullScreen',
    'mozRequestFullScreen',
    'msRequestFullScreen',
  ];
  const name = funcNames.find((funcName) => funcName in element);
  if (name) {
    // @ts-ignore
    element[name]();
  }
};

const exitFullscreen = () => {
  const funcNames = [
    'exitFullscreen',
    'webkitExitFullscreen',
    'mozCancelFullScreen',
    'msExitFullscreen',
  ];
  const name = funcNames.find((funcName) => funcName in document);
  if (name) {
    // @ts-ignore
    document[name]().catch((error) => {
      console.log(error);
    });
  }
};

const isFullscreen = (element: HTMLElement | EventTarget) => {
  const funcNames = [
    'fullscreenElement',
    'webkitFullscreenElement',
    'mozFullScreenElement',
    'msFullscreenElement',
  ];
  const name = funcNames.find((funcName) => funcName in document);
  if (name) {
    // @ts-ignore
    return document[name] === element;
  }
  return false;
};

const PageContent = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <button
        className="content"
        onClick={() => {
          requestFullscreen(videoContainerRef.current as HTMLDivElement);
        }}
      >
        进入全屏
      </button>
      <div ref={videoContainerRef} className="video-container">
        <h1>视频播放</h1>
        <button
          onClick={() => {
            exitFullscreen();
          }}
        >
          退出全屏
        </button>
        <video src="/oceans.mp4" controls />
      </div>
    </Container>
  );
};

export default PageContent;
