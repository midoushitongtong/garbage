'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  min-height: 100vh;
  display: flex;
  .content {
    width: 100px;
    height: 100px;
    background-color: #06f;
    /* margin-left: auto; // 吃掉左边剩余空间
    margin-right: auto; // 吃掉右边剩余空间 */
    margin: auto; // 吃掉 上边、右边、下边、左边 的剩余空间
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content"></div>
    </Container>
  );
};

export default PageContent;
