'use client';
import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';

const Container = styled.section`
  .card-list {
    display: flex;
    .card {
      flex: none;
      width: 500px;
      height: 300px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
        <XScroll>
          <div className="card-list">
            <div className="card">
              <img src="/1.jpeg" alt="" />
            </div>
            <div className="card">
              <img src="/2.webp" alt="" />
            </div>
            <div className="card">
              <img src="/3.jpeg" alt="" />
            </div>
            <div className="card">
              <img src="/4.webp" alt="" />
            </div>
            <div className="card">
              <img src="/5.jpeg" alt="" />
            </div>
          </div>
        </XScroll>
        {new Array(50).fill(1).map((item, index) => (
          <h1 key={index}>1</h1>
        ))}
      </div>
    </Container>
  );
};

const XScrollContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  .x-scroll-inner {
    width: 300px;
    height: 100vw;
    position: relative;
    overflow: auto;
    transform-origin: 0 0;
    transform: translateY(300px) rotate(-90deg);
    .x-scroll-content {
      position: absolute;
      top: 0;
      left: 100%;
      transform-origin: 0 0;
      transform: rotate(90deg);
    }
  }
`;

const XScroll = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <XScrollContainer>
      <div className="x-scroll-inner">
        <div className="x-scroll-content">{children}</div>
      </div>
    </XScrollContainer>
  );
};

export default PageContent;
