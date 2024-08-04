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
    /* 
      houdini api
      为什么需要 houdini api？
      因为开发者无法干预css绘制的过程，导致无法实现一些复杂的动画
      有了 houdini api 开发者就能干预css绘制的的过程，从而实现一些复杂的动画
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    --angle: 0deg;
    aspect-ratio: 0.75/1;
    padding: 10rem;
    background-image: linear-gradient(var(--angle), #5ddcff, #3c67e3, #4e00c2);
    animation: rotate 3s linear infinite;

    @keyframes rotate {
      100% {
        --angle: 360deg;
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
