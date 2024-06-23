'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  border-image: linear-gradient(to right, #b6cb13, #f60) 1;

  .content {
    display: flex;
    width: fit-content; // 根据内容自适应宽度
    background-color: red;
  }
`;

const PageContent = () => {
  useEffect(() => {
    console.log('Hello World');
  }, []);

  return (
    <Container>
      <div className="content">
        <div>热门话题</div>
        <div>更多</div>
      </div>
    </Container>
  );
};

export default PageContent;
