'use client';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 200px;
    height: 200px;
    border: 10px solid #06f;
    overflow-y: auto;
    margin: 10px;
    padding: 10px;
  }
`;

const PageContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    console.log('边框内的尺寸，不包含边框');
    console.log(content.clientWidth);
    console.log(content.clientHeight);

    console.log('包含边框的尺寸');
    console.log(content.offsetWidth);
    console.log(content.offsetHeight);

    console.log('整个内容的尺寸, 包含滚动条');
    console.log(content.scrollWidth);
    console.log(content.scrollHeight);

    console.log('包含边框的尺寸, getBoundingClientRect');
    console.log(content.getBoundingClientRect());
  }, []);

  return (
    <>
      <Container className="container">
        <div ref={contentRef} className="content">
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
        </div>
      </Container>
    </>
  );
};

export default PageContent;
