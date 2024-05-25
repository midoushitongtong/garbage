'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to right, #b6cb13, #f60);

  div {
    color: #fff;
  }
`;

const PageContent = () => {
  console.log(1);

  const handle = () => {
    if (document.visibilityState === 'visible') {
      console.log('页面可见');
    } else {
      console.log('页面隐藏');
    }
  };
  useEffect(() => {
    document.addEventListener('visibilitychange', handle);
    return () => {
      document.removeEventListener('visibilitychange', handle);
    };
  });
  return (
    <>
      <Container className="container">
        <div>Hello World</div>
      </Container>
    </>
  );
};

export default PageContent;
