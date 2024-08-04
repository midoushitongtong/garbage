'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    img {
      width: 100px;
      padding: 10px;
    }
  }
`;

/**
 * BFC 块级格式化上下文, block format context
 *  受 float, overflow, position, display: table-cell, table-caption, inline-block 的影响
 *
 * IFC 内联格式化上下文, inline format context
 *  不会受到竖直方向padding/margin影响
 *
 * GFC 网格布局格式化上下文, grid format context
 *  受 display: grid 的影响
 *
 * FFC 自适应格式化上下文, flex format context
 *  受 display: flex, inline-flex 的影响
 */

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">
        <span>123</span>
        <span>123</span>
      </div>
    </Container>
  );
};

export default PageContent;
