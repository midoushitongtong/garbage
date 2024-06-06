'use client';
import styled from '@emotion/styled';
import { useLayoutEffect, useRef, useState } from 'react';

const Container = styled.section`
  padding: 1rem;

  .one {
    width: 100px;
    line-height: 30px;
    border: 1px solid #06f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .two {
    margin-top: 100px;
    width: 100px;
    line-height: 30px;
    height: 90px;
    border: 1px solid #06f;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .three {
    margin-top: 100px;
    width: 100px;
    line-height: 30px;
    height: 92px;
    border: 1px solid #06f;
    overflow: hidden;
  }
`;

const PageContent = () => {
  const [text] = useState('Hello World Hello World Hello World Hello World');
  const threeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const three = threeRef.current;
    if (!three) {
      return;
    }
    if (three.scrollHeight > three.clientHeight) {
      // 我们可以根据内容高度 > 容器高度, 来判断文字是否溢出
      const removeText = () => {
        if (three.scrollHeight > three.clientHeight) {
          // 每次移除1个字符
          const text = three.textContent?.slice(0, -1) + '';
          three.textContent = text;
          removeText();
        }
      };
      removeText();
      // 将最后三位字符替换为省略号
      const text = three.textContent?.slice(0, -3) + '...';
      three.textContent = text;
    }
  }, [text]);

  return (
    <>
      <Container className="container">
        <div className="one">Hello World Hello World Hello World Hello World</div>
        <div className="two">Hello World Hello World Hello World Hello World</div>
        <div ref={threeRef} className="three">
          {text}
        </div>
      </Container>
    </>
  );
};

export default PageContent;
