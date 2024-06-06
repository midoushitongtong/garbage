'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const Container = styled.section`
  padding: 5rem;

  .content {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    border: 1px solid #06f;
    animation: rotate linear infinite 10s;
    @keyframes rotate {
      to {
        transform: rotate(360deg);
      }
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -25px;
      margin-left: -25px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      .text {
        animation: rotate2 linear infinite 10s;
        @keyframes rotate2 {
          to {
            transform: rotate(-360deg);
          }
        }
      }

      &:nth-child(1) {
        background-color: #06f;
      }
      &:nth-child(2) {
        background-color: #f60;
      }
      &:nth-child(3) {
        background-color: #ff0;
      }
      &:nth-child(4) {
        background-color: #f0f;
      }
      &:nth-child(5) {
        background-color: #60f;
      }
      .inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        transform-origin: 0 0;
      }
    }
  }
`;

const PageContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const items = [...containerRef.current?.querySelectorAll('.content .item')] as HTMLDivElement[];
    const radius = (containerRef.current?.querySelector('.content')?.clientWidth || 0) / 2;
    const pieceDeg = 360 / items?.length;

    for (let i = 0; i < items?.length; i++) {
      let t = i * pieceDeg;
      t = (Math.PI / 180) * t;
      const x = Math.sin(t) * radius;
      const y = -Math.cos(t) * radius;
      items[i].style.transform = `translate(${x}px, ${y}px)`;
    }
  }, []);

  return (
    <>
      <Container className="container" ref={containerRef}>
        <div className="content">
          <div className="item">
            <span className="text">1</span>
          </div>
          <div className="item">
            <span className="text">2</span>
          </div>
          <div className="item">
            <span className="text">3</span>
          </div>
          <div className="item">
            <span className="text">4</span>
          </div>
          <div className="item">
            <span className="text">5</span>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
