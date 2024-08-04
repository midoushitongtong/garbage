'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    width: 100px;
    height: 100px;
    background-color: #06f;
    border-radius: 50%;
    /**
      jump-start: 跳过开始的一帧
      jump-end: 跳过结束的一帧 (默认)
      jump-both: 跳过开始的一帧和结束的一帧
      jump-none: 包含开始的一帧和结束的一帧
    */
    animation: contentMove 2s infinite alternate steps(3, jump-none);
    @keyframes contentMove {
      100% {
        transform: translate(calc(100vw - 100% - 2rem));
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
