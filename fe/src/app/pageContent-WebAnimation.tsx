'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .box {
    width: 100px;
    height: 100px;
    background-image: linear-gradient(to right, #b6cb13, #f60);
    border-radius: 50%;
  }
`;

const PageContent = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  // web animation 的优势:
  //  - 不会改变 dom 树结构
  //  - 不需要主线程参与
  const move = (element: HTMLDivElement, x: number, y: number) => {
    const rect = element.getBoundingClientRect();
    const currentX = rect.left - element.offsetLeft;
    const currentY = rect.top - element.offsetTop;

    element.getAnimations().forEach((animation) => animation.cancel());
    element.animate(
      [
        { transform: `translate(${currentX}px, ${currentY}px)`, offset: 0 },
        { transform: `translate(${x}px, ${y}px)`, offset: 0.6 },
        { transform: `translate(${x}px, ${y}px) scaleX(1.5)`, offset: 0.7 },
        { transform: `translate(${x}px, ${y}px) scaleX(1)`, offset: 0.8 },
        { transform: `translate(${x}px, ${y}px) scaleY(1.5)`, offset: 0.9 },
        { transform: `translate(${x}px, ${y}px) scaleY(1)`, offset: 1 },
      ],
      {
        duration: 1000,
        fill: 'forwards',
      }
    );
  };

  const handleClick = (e: MouseEvent) => {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();

    const x = e.clientX - rect.width / 2 - box.offsetLeft;
    const y = e.clientY - rect.height / 2 - box.offsetTop;

    move(box, x, y);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div ref={boxRef} className="box"></div>
    </Container>
  );
};

export default PageContent;
