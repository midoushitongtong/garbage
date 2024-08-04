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
    width: 300px;
    height: 300px;
    position: relative;
    .text {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

/**
 * 包含块: 包含块是用来定义子元素的尺寸大小和位置定位
 *
 * 正常情况下：一个元素的包含块是指最近的块级父元素
 * 绝对定位的清下：一个元素的包含块是指最近的设置了定位样式的父元素
 * 固定定位的清下：一个元素的包含块是指视口
 *
 */

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">
        <div className="text">Hello World</div>
      </div>
    </Container>
  );
};

export default PageContent;
