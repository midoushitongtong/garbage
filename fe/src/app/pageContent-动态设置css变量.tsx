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
    width: 500px;
    height: 300px;
    border: 1px solid #ccc;
    .ball {
      width: 50px;
      height: 50px;
      background-color: #06f;
      border-radius: 50%;
      animation: move 3s infinite alternate;
      @keyframes move {
        100% {
          transform: translateX(calc(var(--width) - 100%));
        }
      }
    }
  }
`;

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current as HTMLDivElement;
    content.style.setProperty('--width', content.clientWidth + 'px');
  }, []);

  return (
    <Container>
      <div ref={contentRef} className="content">
        <div className="ball"></div>
      </div>
    </Container>
  );
};

export default PageContent;
