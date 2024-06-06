'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const Container = styled.section`
  padding: 1rem;

  div {
    width: 50px;
    height: 50px;
    background-color: #06f;
    border-radius: 50%;
    position: relative;
  }
`;

const PageContent = () => {
  const ballRef = useRef<HTMLDivElement>(null);

  // 使用 setInterval 做动画的劣势:
  // - setInterval 触发时间不稳定, 在 js 繁忙的时候可能会导致动画时间间隔不均匀
  // useEffect(() => {
  //   const ball = ballRef.current;
  //   if (!ball) return;
  //   let left = 0;
  //   const interval = setInterval(() => {
  //     ball.style.left = `${left}px`;
  //     left++;
  //   }, 16);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // 使用 requestAnimationFrame 的优势:
  // - 此api是浏览器专门为动画设计的api，他可以最大程度的保证动画的流畅性
  // - 会根据当前设备的刷新率自动调整动画帧
  // - 当页面不可见时动画会自动暂停，减少cpu占用
  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;
    let left = 0;
    let animation: number;
    const render = () => {
      ball.style.left = `${left}px`;
      left++;
      animation = requestAnimationFrame(render);
    };
    animation = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <>
      <Container className="container">
        <div ref={ballRef} className="ball"></div>
      </Container>
    </>
  );
};

export default PageContent;
