'use client';
import styled from '@emotion/styled';
import { MouseEvent, useEffect, useRef } from 'react';

const Container = styled.section`
  padding: 1rem;
  min-height: 100vh;
  border: 5px solid #06f;
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    width: 3000px;
    height: 3000px;
    background: #06f;
    margin-left: 500px;
  }
`;

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Hello World');
  }, []);

  // 处理鼠标事件
  const handleClick = (e: MouseEvent) => {
    console.log(e.pageX); // 基于整个页面的 x 坐标
    console.log(e.clientX); // 基于视口的 x 坐标
    console.log(e.screenX); // 距离视口 x 坐标
    console.log(e.pageX - (contentRef.current?.offsetLeft || 0)); // 计算基于当前元素点击的 x
  };

  return (
    <Container>
      <div ref={contentRef} className="content" onClick={handleClick}></div>
    </Container>
  );
};

export default PageContent;
